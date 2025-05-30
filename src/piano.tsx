import * as Tone from 'tone'
import StartAudioContext from 'startaudiocontext'

const noiseGen = () => {
  let scale = 1
  const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t
  const r: number[] = []
  for (let i = 0; i < 1024; ++i) r.push(Math.random())
  const l = r.length - 1
  return {
    scale: (x: number) => {
      scale = x
    },
    sample: (x: number) => {
      const s = x * scale
      const f = Math.floor(s)
      const t = s - f
      const ss = t * t * (3 - 2 * t)
      return lerp(r[f % l], r[(f + 1) % l], ss)
    },
  }
}

class Piano {
  ng = noiseGen()
  _step = 0
  last = 0
  notes: string[] = []
  sampler = sampler()
  muted = false
  scaleIndex = 0

  constructor() {
    this.ng.scale(0.3)
  }

  step() {
    return this.ng.sample(this._step++)
  }

  setScale(index: number) {
    this.scaleIndex = index
  }

  playRandomNote(velocity?: number) {
    const t = performance.now()
    const dt = t - this.last
    //prevent double triggers
    if (this.muted || !this.sampler.loaded || dt < 100) return

    const scale = scales[this.scaleIndex]
    this.last = t
    const index = Math.floor(this.step() * scale.length)
    const note = scale[index]

    this.notes.unshift(note)
    if (this.notes.length > 4) {
      const n = this.notes.pop() as string
      this.sampler.triggerRelease(n, '+0.5')
    }
    this.sampler.triggerAttack(note, undefined, velocity)
  }

  playStart() {
    if (this.muted || !this.sampler.loaded) return
    this.sampler.releaseAll()
    const idxs: number[] = []
    const scale = scales[this.scaleIndex]
    while (idxs.length < 3) {
      //skip some steps
      this.step()
      this.step()
      const idx = Math.floor((0.5 + 0.5 * this.step()) * scale.length)
      if (!idxs.includes(idx)) idxs.push(idx)
    }
    idxs.forEach((n, i) =>
      this.sampler.triggerAttackRelease(
        scale[n],
        1 + i,
        `+${i * (0.1 + Math.random() * 0.2)}`,
        0.55 + Math.random() * 0.3,
      ),
    )
  }

  playEnd() {
    if (this.muted || !this.sampler.loaded) return
    this.sampler.releaseAll()
    const scale = scales[this.scaleIndex]
    const f = Math.floor(0.2 * Math.random() * scale.length)
    const s = 3 + Math.floor(Math.random() * 3)
    const notes = [0, 1, 2, 3].map((i) => {
      const index = (f + s * i) % scale.length
      return scale[index]
    })
    notes.forEach((n, i) =>
      this.sampler.triggerAttackRelease(
        n,
        3,
        `+0.${i}1`,
        0.55 + Math.random() * 0.3,
      ),
    )
  }
}

const startPiano = async () => {
  try {
    await StartAudioContext(Tone.context)
    // Tone.context.latencyHint = 'fastest'
    const piano = new Piano()
    return piano
  } catch (e) {
    console.log(e)
  }
}

const scales = [
  [2, 3, 4, 5].reduce(
    (arr, el) => [...arr, ...'CDEGA'.split('').map((x) => x + el)],
    [] as string[],
  ),
  [1, 2].reduce(
    (a, e) => [
      ...a,
      ...['C', 'D', 'F', 'A', 'C', 'E', 'G', 'B'].map(
        (x, i) => x + (e * 2 + (i > 3 ? 1 : 0)),
      ),
    ],
    [] as string[],
  ),
  [2, 3, 4, 5].reduce(
    (arr, el) => [
      ...arr,
      ...['C', 'D', 'E', 'F#', 'G#', 'A#'].map((x) => x + el),
    ],
    [] as string[],
  ),
  [2, 3, 4, 5].reduce(
    (arr, el) => [
      ...arr,
      ...['C', 'D#', 'E', 'F', 'G#', 'A', 'B'].map((x) => x + el),
    ],
    [] as string[],
  ),
]

const sampler = () =>
  new Tone.Sampler(
    {
      A0: 'A0.mp3',
      C1: 'C1.mp3',
      'D#1': 'Ds1.mp3',
      'F#1': 'Fs1.mp3',
      A1: 'A1.mp3',
      C2: 'C2.mp3',
      'D#2': 'Ds2.mp3',
      'F#2': 'Fs2.mp3',
      A2: 'A2.mp3',
      C3: 'C3.mp3',
      'D#3': 'Ds3.mp3',
      'F#3': 'Fs3.mp3',
      A3: 'A3.mp3',
      C4: 'C4.mp3',
      'D#4': 'Ds4.mp3',
      'F#4': 'Fs4.mp3',
      A4: 'A4.mp3',
      C5: 'C5.mp3',
      'D#5': 'Ds5.mp3',
      'F#5': 'Fs5.mp3',
      A5: 'A5.mp3',
      C6: 'C6.mp3',
      'D#6': 'Ds6.mp3',
      'F#6': 'Fs6.mp3',
      A6: 'A6.mp3',
      C7: 'C7.mp3',
      'D#7': 'Ds7.mp3',
      'F#7': 'Fs7.mp3',
      A7: 'A7.mp3',
      C8: 'C8.mp3',
    },
    {
      release: 1,
      baseUrl: 'https://tonejs.github.io/audio/salamander/',
      onload: () => {
        //console.log('loaded sampler')
      },
    },
  ).toDestination()

export { startPiano, Piano }

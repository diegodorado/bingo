import * as Ably from 'ably'

const ably_client = new Ably.Realtime(process.env.ABLY_API_KEY as string)
const channel = ably_client.channels.get('bingo')

const pub = (topic: string, content: object) => {
  channel.publish(topic, content)
}

const sub = (topic: string, callback: (data: object) => void) => {
  channel.subscribe(topic, (d) => {
    callback(d.data)
  })
}

const unsub = (topic: string) => {
  channel.unsubscribe(topic)
}

const client = {
  sub,
  pub,
  unsub,
}

export { client }

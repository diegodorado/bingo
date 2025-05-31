# Musical Bingo

**A web-based Bingo game created as a gift to my mother during the COVID-19 lockdown.**

This is a browser-based multiplayer Bingo game built with TypeScript and modern frontend tooling. 
It uses [Ably](https://ably.com) for real-time communication between players.

> ⚠️ **Disclaimer**  
> This project was created for personal use and shared as-is. No special effort has been made (yet) to make the code easy to understand, well-documented, or suitable for general reuse.


## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) 
- An [Ably](https://ably.com/) account (free tier is sufficient)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/diegodorado/bingo.git
   cd bingo
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **Set up your Ably API key:**

   Create a `.env` file in the root of the project:

   ```env
   ABLY_API_KEY=your-ably-api-key:here
   ```

   You can find this key in your Ably dashboard under **API Keys**.

### Running the App

Start the server:

```bash
yarn start
```

Then open your browser and go to [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
yarn build
```

This will generate the output in the `dist` directory.

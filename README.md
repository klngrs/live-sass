# Live-Sass

Live-Sass is a mono-repo designed to compile SASS at runtime using WebAssembly. This allows developers to see style updates in real-time directly in their browser, facilitating a faster and more interactive development process.

![live-sass.gif](..%2F..%2FDownloads%2Flive-sass.gif)

The web assembly module is built from libsass and compiled with a module federated wrapper for decentralized consumption.

## Architecture

The repository consists of two main packages:

- **`wasm-sass`**: A WebAssembly module that compiles SASS. This package is hosted using Module Federation, allowing it to be dynamically loaded by different frontend applications that need real-time SASS compilation.
- **`live-sass-app`**: A Vue application that consumes the `wasm-sass` package. This app demonstrates the real-time compilation and application of styles, serving as both a practical example and a development tool.

## Features

- **Real-Time Compilation**: Instantly compile and apply SASS styles directly in the browser.
- **Module Federation**: Leverages Webpack's module federation to dynamically load `wasm-sass`, ensuring up-to-date compilation logic without redeploying dependent applications.
- **Vue Integration**: Out-of-the-box integration with Vue.js, showcasing practical implementation in a modern JavaScript framework.

### Prerequisites

Ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- pnpm (npm i -g pnpm)

## Getting started

Clone the repository:

```bash
git clone https://github.com/your-username/live-sass.git
cd live-sass
```

Install dependencies:
```bash
pnpm install
```

### Running the Application

```bash
# terminal 1
cd packages/wasm-sass
pnpm dev

# terminal 2
cd packages/live-sass
pnpm dev
```

Open https://localhost:8080, click 'compile' to view the live sass change styles.

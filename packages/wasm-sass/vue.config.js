const { defineConfig } = require('@vue/cli-service');
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

console.info('Live sass port:', process.env.PORT_LIVE_SASS, '\nWasm sass port:', process.env.PORT_WASM_SASS);

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: 'auto',
  runtimeCompiler: true,
  devServer: {
    port: process.env.PORT_WASM_SASS,
    client: {
      /* https://webpack.js.org/configuration/dev-server/#websocketurl */
      webSocketURL: {
        protocol: 'wss',
      },
    },
    /* https://webpack.js.org/configuration/dev-server/#devserverserver */
    server: 'https',
    https: true,
    compress: true,
    hot: false,
    liveReload: true,
    allowedHosts: 'all', // replaces disableHostCheck https://next.cli.vuejs.org/migrations/migrate-from-v4.html#vue-cli-service
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    experiments: {
      asyncWebAssembly: true,
      syncWebAssembly: true,
    },
    resolve: {
      fallback: {
        fs: false,
        crypto: false,
      },
    },
  },
  chainWebpack(config) {
    config.entryPoints.clear();
    config.entry('wasm-sass').add('./lib/wasm-sass.js').end();
    config.output.filename("[name].bundle.js");
    config.output.chunkFilename("[name].js");
    config.module.rule('wasm').merge({
      test: /\.wasm$/,
      type: 'asset/resource',
      generator: {
        filename: '[name].wasm'
      }
    });

    config.optimization.splitChunks(false);

    config.plugin("module-federation").use(ModuleFederationPlugin, [
      {
        name: "wasm_sass",
        filename: "remoteEntry.js",
        exposes: {
          "./main": "./lib/index", // DON'T PUT FILE EXTENSION!
        },
        // shared: {
        //   // adds vue as shared module
        //   vue: { singleton: true },
        // },
      },
    ]);

    /* development-only webpack config */
    if (process.env.NODE_ENV === "development") {
      // config.watch(true);
      config.mode("development");
      config.devtool("inline-source-map");
      config.optimization.minimize(false);
    }
  }
});

const { defineConfig } = require('@vue/cli-service');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

console.info('Live sass port:', process.env.PORT_LIVE_SASS, '\nWasm sass port:', process.env.PORT_WASM_SASS);

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: 'auto',
  runtimeCompiler: true,
  devServer: {
    port: process.env.PORT_LIVE_SASS,
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
  // configureWebpack: {
  //   resolve: {
  //     fallback: {
  //       fs: false,
  //       crypto: require.resolve('crypto-browserify'),
  //     },
  //   },
  // },
  chainWebpack(config) {
    /* development-only webpack config */
    if (process.env.NODE_ENV === 'development') {
      // config.watch(true);
      config.mode('development');
      config.devtool('inline-source-map');
      config.optimization.minimize(false);
    }

    config.optimization.splitChunks(false);

    config.plugin('module-federation').use(ModuleFederationPlugin, [
      {
        name: 'LiveSass',
        filename: 'remoteEntry.js',
        remotes: {
          'wasm-sass': [`wasm_sass@https://localhost:${process.env.PORT_WASM_SASS}/remoteEntry.js`],
        },
        // shared: {
        //   // adds vue as shared module
        //   vue: { singleton: true },
        // },
      },
    ]);
  },
});

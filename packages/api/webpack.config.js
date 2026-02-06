var webpack = require('webpack');
var path = require('path');
var getBundleExternals = require('../../common/getBundleExternals');

var externals = getBundleExternals();

var config = {
  mode: 'production',
  context: __dirname + '/src',

  entry: {
    app: './index.js',
  },
  target: 'node',
  node: {
    __dirname: false,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
  },

  optimization: {
    minimize: true,
    minimizer: [
      new (require('terser-webpack-plugin'))({
        terserOptions: {
          compress: {
            // Prevent inlining of isProApp function
            inline: false,
            // Prevent evaluation of constant expressions
            evaluate: false,
            // Keep function names
            keep_fnames: true,
          },
          mangle: false, // Don't mangle variable names
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
  },

  module: {
    rules: [
      {
        test: /\.node$/,
        use: 'node-loader',
      },
    ],
  },
  // plugins: [
  //   new webpack.IgnorePlugin({
  //     checkResource(resource) {
  //       const lazyImports = ['uws'];
  //       if (!lazyImports.includes(resource)) {
  //         return false;
  //       }
  //       try {
  //         require.resolve(resource);
  //       } catch (err) {
  //         return true;
  //       }
  //       return false;
  //     },
  //   }),
  // ],
  // externals: {
  //   'better-sqlite3': 'commonjs better-sqlite3',
  //   'oracledb': 'commonjs oracledb',
  //   'msnodesqlv8': 'commonjs msnodesqlv8',
  // },
  externals,
};

module.exports = config;

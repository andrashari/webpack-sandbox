const path = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const ManifestPlugin = require("webpack-manifest-plugin")
const BabiliPlugin = require("babili-webpack-plugin")

module.exports = {
mode: 'development',
  //Code-splitting, entry points and [name].bundle.js output
  entry: {
    index: './src/index.js',
	print: './src/print.js',
  },
  plugins: [
    //clean dist folder
    new CleanWebpackPlugin(),
    //Generate HTML file(~s) in dist folder
    new HtmlWebpackPlugin({
      title: "Webpack-Study",
    }),
    //Create manifest file
    new ManifestPlugin(),
    //Remove unused code before transpilation
    new BabiliPlugin(),
  ],
  output: {
    // Hashed filenames for cache, names based on entries
    filename: "[name].[contenthash].js",
	chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
  optimization: {
    //vendor.js should not be hashed, so it can be cached for a long time
    moduleIds: "hashed",
    //Tree-shaking: https://webpack.js.org/guides/tree-shaking/#add-a-utility
    usedExports: true,
    //runtime 1 file: https://webpack.js.org/guides/caching/#extracting-boilerplate
    //runtimeChunk: "single",
    //Separate vendor chunk as they are less likely to change:
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
}

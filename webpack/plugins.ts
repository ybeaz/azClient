import webpack from 'webpack'

import CompressionPlugin from 'compression-webpack-plugin'
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import ErrorOverlayPlugin from 'error-overlay-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import WebpackNotifierPlugin from 'webpack-notifier'

export const commonPlugins = []

export const prodPlugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new webpack.DefinePlugin({
    // <-- key to reducing React's size
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new DuplicatePackageCheckerPlugin(),
  new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
  new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: [],
  }),
  new CompressionPlugin({
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
  }),
]

export const devPlugins = [
  new BundleAnalyzerPlugin({
    analyzerMode: 'disabled',
    generateStatsFile: true,
    statsOptions: { source: false },
  }),
  new ForkTsCheckerWebpackPlugin(),
  new webpack.ProvidePlugin({
    React: 'react',
    'react-dom': 'ReactDOM',
  }),
  new WebpackNotifierPlugin({
    title: function (params) {
      return `Build status is ${params.status} with message ${params.message}`
    },
    // excludeWarning: true,
    alwaysNotify: true,
    emoji: true,
  }),
  new HtmlWebpackPlugin({
    title: 'Dev-server',
    template: 'template.html',
  }),
  new ESLintPlugin({
    files: 'src/**/*.(js|jsx|ts|tsx)',
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    configFile: '.eslintrc.json',
    lintDirtyModulesOnly: true,
    emitError: true,
    emitWarning: true,
    failOnError: false,
    failOnWarning: false,
  }),
  new ErrorOverlayPlugin(),
  new webpack.HotModuleReplacementPlugin({}),
]

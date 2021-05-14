import webpack from 'webpack'

import ESLintPlugin from 'eslint-webpack-plugin'
import ErrorOverlayPlugin from 'error-overlay-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import WebpackNotifierPlugin from 'webpack-notifier'

export const commonPlugins = [
  new webpack.ProvidePlugin({
    React: 'react',
    'react-dom': 'ReactDOM',
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: 'disabled',
    generateStatsFile: true,
    statsOptions: { source: false },
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new ForkTsCheckerWebpackPlugin(),
  new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: [],
  }),
]

export const prodPlugins = []

export const devPlugins = [
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

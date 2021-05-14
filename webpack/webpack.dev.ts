import { common } from './webpack.common'
import { commonPlugins, devPlugins } from './plugins'

export default {
  ...common,
  devtool: 'cheap-module-source-map', // 'source-map'
  devServer: {
    hot: true,
    historyApiFallback: true,
    compress: true,
    port: 3401,
    inline: true,
    overlay: true,
    stats: {
      colors: true,
      chunks: true,
      chunkModules: false,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      children: false,
      source: false,
      warnings: false,
      noInfo: false,
      contentBase: './dist',
      hot: true,
      errors: true,
      modules: false,
      reasons: true,
      errorDetails: true,
    },
  },
  plugins: [...commonPlugins, ...devPlugins],
}

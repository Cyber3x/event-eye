const webpack = require('webpack')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')

const config = (env) => {
  const currentPath = path.join(__dirname)
  const basePath = currentPath + '/.env.local'
  const envPath = basePath + '.' + env.ENVIROMENT
  const finalPath = fs.existsSync(envPath) ? envPath : basePath
  const fileEnv = dotenv.config({ path: finalPath }).parsed

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next])
    return prev
  }, {})

  return {
    entry: ['react-hot-loader/patch', './src/index.js'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
    devServer: {
      historyApiFallback: true,
      contentBase: './dist',
    },
    plugins: [new webpack.DefinePlugin(envKeys)],
  }
}

module.exports = config

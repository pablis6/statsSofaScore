var path = require('path');
var webpack = require("webpack");

let config = {
  output: {
    path: __dirname + '/dist'
  }
}

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let extractSCSS = new ExtractTextPlugin('bundle.css');

module.exports = {
  entry: "./src/main.js",
  output: { 
    path: config.output.path, 
    filename: 'bundle.js' 
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            
          }
        ]
      }, 
      {
        test: /\.html$/,
        exclude: /(node_modules|bower_components)/,
        loader: ["ngtemplate-loader", "html-loader"]
      },
      {
        test: /\.scss$/,
        use: extractSCSS.extract({
          use: [  
            {
              loader: "css-loader"
            }, {
              loader: "sass-loader"
            }
          ]
        })
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: 'file-loader?name=./assets/fonts/[name].[ext]'
      },
      {
        test: /\.(png|gif|svg)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /src\\(.+\\includes)/,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: "./modales/[name].[ext]",
              regExp: /src\\(.+\\)/
            }
          }
        ]
      }    
    ]
  },
  plugins: [
    extractSCSS,
    new webpack.ProvidePlugin({
      "window.jQuery": "jquery",
      "jQuery": "jquery",
      "$": "jquery"
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src',
    proxy: [{
      context:["/api/**"],
      target: "http://[::1]:9009"
    }]
  },
  devtool: 'source-map'
};

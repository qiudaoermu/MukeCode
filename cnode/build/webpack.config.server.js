
const  path = require('path');
const  HTMLPlugin = require('html-webpack-plugin');
const  webpack =require('webpack');
module.exports = {
    target: "node",
    entry:{
        app:path.join(__dirname,'../client/server-entry.js')
    },
  externals:Object.keys(require('../package').dependencies),
  output:{
        filename:'server-entry.js',
        path: path.join(__dirname,'../dist'),
        publicPath: '/public',
        libraryTarget: "commonjs2"
    },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_BASE':'"http://127.0.0.1:3000"'
    })
  ],
  resolve: {
    extensions: ['.js','.jsx']
  },
    module: {
        rules: [
            {
                enforce: "pre",
                test:/.(js|jsx)$/,
                //loader: "eslint-loader",
                exclude:[
                    path.resolve(__dirname,'../node_modules')
                ]
            },
            {
                test: /.jsx$/,
                loader: "babel-loader"
            },
            {
                test: /.js$/,
                loader: "babel-loader",
                exclude:[
                    path.join(__dirname,'../node_modules')
                ]
            },
          {
            test:/\.(png|jpg|gif|svg)$/,
            loader:'file-loader',
            options:{
              name:"[name].[ext]?[hash]"
            }
          }
        ]
    }
};


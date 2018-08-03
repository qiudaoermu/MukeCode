
const  path = require('path');
const  HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


const isDev = process.env.NODE_ENV === 'development';
const config = {
    entry:{
        app:path.join(__dirname,'../client/app.js')
    },
    output:{
        filename:'[name].[hash].js',
        path: path.join(__dirname,'../dist'),
        publicPath: '/public'
    },
  resolve: {
    extensions: ['.js','.jsx']
  },
  devtool: "source-map",
  module: {
        rules: [
            {
                enforce: "pre",
                test:/.(js|jsx)$/,
                loader: "eslint-loader",
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
          },

        ]
    },
    plugins: [
        new HTMLPlugin({
            template:path.join(__dirname,'../client/template.html')
        }),
        new HTMLPlugin({
          template:'!!ejs-compiled-loader!'+ path.join(__dirname,'../client/server.template.ejs'),
          filename:'server.ejs'
        })
    ]
};
//localhost:8888/filename
if(isDev){
    config.entry ={
        app:[
            'react-hot-loader/patch',
             path.join(__dirname,'../client/app.js')
        ]
    };
    config.devServer = {
        host:'0.0.0.0',
        port:'8888',
      //  contentBase:path.join(__dirname,'../dist'),
        hot:true,
        overlay:{
            errors: true
        },
        publicPath: '/public',
        historyApiFallback:{
            index:'/public/index.html'
        },
       proxy:{
          '/api':'http://localhost:3333'
       }
    };
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config;

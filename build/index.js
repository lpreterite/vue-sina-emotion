const path = require('path');
const webpack = require('webpack');
var options = require('./base.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

options.module.rules.shift();
options.module.rules.unshift({
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
        loaders: {
            'js': 'babel-loader',
            'css': ExtractTextPlugin.extract({
                use: 'css-loader',
                fallback: {
                    loader: 'vue-style-loader',
                    options: {sourceMap: false}
                }
            }),
            'scss': ExtractTextPlugin.extract({
                use: [
                    { loader: 'css-loader', options: {sourceMap: false} },
                    { loader: 'sass-loader', options: {sourceMap: false} }
                ],
                fallback: {
                    loader: 'vue-style-loader',
                    options: {sourceMap: false}
                }
            })
        }
    }
})
options.plugins = [
    new ExtractTextPlugin('vue-sina-emotion.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
];
module.exports = options;
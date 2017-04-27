const path = require('path');
const webpack = require('webpack');
var options = require('./base.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

options.module.rules.pop();
options.module.rules.unshift([{
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
        loaders: {
            'js': 'babel-loader',
            'css': ExtractTextPlugin.extract({
                use: 'css-loader',
                fallback: 'vue-style-loader'
            }),
            'scss': ExtractTextPlugin.extract({
                use: 'css-loader!sass-loader',
                fallback: 'vue-style-loader'
            })
        }
    }
}])
options.devtool = '#source-map';
options.plugins = [
    new ExtractTextPlugin('vue-sina-emotion.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
];
module.exports = options;
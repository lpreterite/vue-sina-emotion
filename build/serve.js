const path = require('path');
const webpack = require('webpack');
var options = require('./base.js');

options.devtool = '#source-map';
options.output = {
    library: 'VueSinaEmotion',
    libraryTarget: "umd",
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'vue-sina-emotion.js'
};
options.devServer = {
    historyApiFallback: true,
    noInfo: true,
    contentBase: [path.join(__dirname, '../example'), path.join(__dirname, "../node_modules")]
};
module.exports = options;
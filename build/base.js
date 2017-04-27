const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        library: 'VueSinaEmotion',
        libraryTarget: "umd",
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'vue-sina-emotion.js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    'js': 'babel-loader',
                    'css': 'vue-style-loader!css-loader',
                    'scss': 'vue-style-loader!css-loader!sass-loader'
                }
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['.vue','.js']
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}
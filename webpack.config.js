const path = require('path');
const webpack = require('webpack');
const js = path.resolve(__dirname, 'js');
const modules = path.resolve(__dirname, 'js/modules');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './js/main.js',
    output: {
        filename: './js/app.js'
    },
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                // use: [
                //     { loader: "style-loader" },
                //     { loader: "css-loader" },
                //     { loader: "sass-loader" }
                // ]
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                })
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts',
                        publicPath: 'fonts'
                    }
                }]
            },
        ],
        loaders: [
            {
                loader: 'babel-loader',
            },
        ]
    },
    plugins: [
        new extractTextPlugin({filename:'app.bundle.css'}),
    ],
    devtool: '#inline-source-map',
    //plugins: [
    // new BrowserSyncPlugin(
    //     {
    //         host: 'localhost',
    //         port: 3000,
    //         proxy: 'http://localhost:8080/',
    //         files: [{
    //             match: [
    //                 '**/*.js'
    //             ],
    //             fn: function (event, file) {
    //                 if (event === "change") {
    //                     const bs = require('browser-sync').get('bs-webpack-plugin');
    //                     bs.reload();
    //                 }
    //             }
    //         }]
    //     },
    //     {
    //         reload: false
    //     }
    // )
    //],
    watch: true,
    // devServer: {
    //     hot: true,

    //     contentBase: path.resolve(__dirname, 'dist'),
    // }
};

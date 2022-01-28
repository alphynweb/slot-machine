const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    // Mode
    mode: 'production',
    module: {
        rules: [
            // Scss
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
        ],
    },
    // Plugins
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin(
            [
                {from: 'config.js', to: 'config.js'},
                { from: "img", to: "img" },
            ],
        ),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new OptimizeCSSAssetsPlugin({})
    ]
});
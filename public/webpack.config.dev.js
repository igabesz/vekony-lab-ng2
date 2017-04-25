const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: 'http://localhost:8080/',
        filename: 'js/[name].js',
        chunkFilename: '[id].chunk.js'
    },
    module: {
		// @TODO
        // preLoaders: [{ 'test': /\.ts$/, 'loader': 'tslint', exclude: [/node_modules/] }]
    },
    plugins: [
        new ExtractTextPlugin({
			filename: 'css/[name].[hash].css',
			disable: false
		}),
		new webpack.LoaderOptionsPlugin({
			debug: true
		}),
    ],
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});

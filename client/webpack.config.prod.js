const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const PUBLIC_PATH = process.env.PUBLIC_PATH;

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: PUBLIC_PATH || '/',
        filename: 'js/[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },
    plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
			mangle: {
				keep_fnames: true
			}
		}),
		new ExtractTextPlugin({
			filename: 'css/[name].[hash].css',
			disable: false
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'ENV': JSON.stringify(ENV)
			}
		}),
		new webpack.LoaderOptionsPlugin({
			// minimize: true,
			debug: false,
			htmlLoader: {
				minimize: false // workaround for ng2
			}
		})
    ]
});

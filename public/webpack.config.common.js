const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		polyfills: './polyfills.ts',
		app: './main.ts'
	},
	resolve: {
		extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
	},
	module: {
		rules: [
			// Support for .ts files.
			{
				test: /\.ts$/,
				use: [
					{ loader: 'awesome-typescript-loader' },
					{ loader: 'angular2-template-loader' },
				],
				exclude: [/node_modules/]
			},

			{
				test: /\.html$/,
				loader: 'html-loader'
			},

			// copy assets to output
			{
				test: /\.(svg|woff|woff2|ttf|eot|ico)([\?]?.*)$/,
				// include: path.join(__dirname, 'node_modules'),
				loader: 'file-loader?name=fonts/[name].[hash].[ext]?'
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				include: path.join(__dirname, 'src'),
				loader: 'file-loader?name=[path][name].[hash].[ext]&context=src'
			},

			// support for .scss files
			// all scss in src/styles will be bundled in an external css file
			{
				test: /\.scss$/,
				exclude: path.join(__dirname, 'src', 'app'),
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader',
						'postcss-loader',
						'sass-loader?sourceMap'
					]
				})
			},

			// all css required in src/app files will be merged in js files
			{
				test: /\.scss$/,
				exclude: path.join(__dirname, 'src', 'styles'),
				use: [
					// 'raw-loader',
					'to-string-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader?sourceMap'
				]
			},

			// Any CSS
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						// 'raw-loader',
						// 'to-string-loader',
						'css-loader?sourceMap',
						'postcss-loader',
					]
				}),
			},
		],
	},

	plugins: [
		// Workaround for angular/angular#11580
		new webpack.ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)@angular/,
			path.resolve('./src'),
			{}
		),

		new webpack.optimize.CommonsChunkPlugin({
			name: 'polyfills',
			chunks: ['polyfills']
		}),

		// This enables tree shaking of the vendor modules
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			chunks: ['app'],
			minChunks: module => /node_modules/.test(module.resource)
		}),

		// Specify the correct order the scripts will be injected in
		new webpack.optimize.CommonsChunkPlugin({
			name: ['polyfills', 'vendor'].reverse()
		}),

		// Inject script and link tags into html files
		new HtmlWebpackPlugin({
			template: 'public/index.html',
			chunksSortMode: 'dependency'
		}),

		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'Tether': 'tether',
			'window.Tether': 'tether'
		}),

		new webpack.LoaderOptionsPlugin({
			debug: true,
		}),
	],
};

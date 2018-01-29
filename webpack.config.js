const webpack = require('webpack');

module.exports = {
	entry: './src/TodoList.js',
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
				options: {
					compact: false,
					presets: ['babel-preset-es2015'],
					plugins: ['babel-plugin-transform-node-env-inline']
				}
			}
		}, {
			test: /\.scss$/,
			use: [{
				loader: "style-loader"
			}, {
				loader: "css-loader"
			}, {
				loader: "sass-loader"
			}]
		}]
	},

	devServer: {
		port: 8887,
		contentBase: './demos',
		compress: true
	},

	output: {
		library: 'metal',
		libraryTarget: 'this',
		filename: './build/globals/todo-list.js'
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin()
	]
};

const path = require('path');
const htmlWebpackPlugins = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: path.join(__dirname, 'src/main.js'),
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	plugins: [
		new htmlWebpackPlugins({
			template: path.join(__dirname, 'src/index.html'),
			filename: 'index.html'
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/, use: [
					"style-loader",
					"css-loader"
				]
			},
			{test: /\.scss$/, use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							modules: {
								localIdentName: "[name]__[local]___[hash:base64:5]",
							},
						}
					},
					"sass-loader"
				]},
			{test: /\.(png|img|gif|jpeg|bmp)$/, use: "url-loader?limit=5000"},
			{test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/}
		],
	}
};
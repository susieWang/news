var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('./config');
var appName = config.appName;

module.exports = {
	entry: {
        main :['./src/main.js']
	},
	output: {
		path: path.resolve(__dirname, appName),
		filename: '[name].js',
		publicPath:'/'
	},
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			loaders: ['react-hot-loader','babel-loader'],
			exclude: /node_modules/
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.less/,
			loader: 'style-loader!css-loader!less-loader'
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url-loader?limit=25000'
		},{
            test: /\.(woff|svg|otf|eot|ttf)$/,
            loader: 'url-loader?name=[name]-[hash].[ext]'
        }]
	},
	plugins:[
        new CopyWebpackPlugin([{
            from: './src/common/lib',
            to: path.join(__dirname, appName, "/lib")
        }]),
        new webpack.optimize.CommonsChunkPlugin({
            name:"vendor",
            minChunks:2
        }),
        new webpack.HotModuleReplacementPlugin()
	]
};
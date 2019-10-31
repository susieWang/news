var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
//var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
var HtmlReplace = require('./webpack.htmlreplace');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
// path：用来存放打包后文件的输出目录 
// publicPath：指定资源文件引用的目录
var config = require('./config');
var appName = config.appName;

module.exports = {
	entry: {
		main :['./src/main'],
        vendor: ['react','react-dom','react-router']
	},
	output: {
		path: path.resolve(__dirname, appName),
		filename: '[name].[chunkHash:5].js',
		publicPath:''
	},
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			loaders: ['react-hot-loader','babel-loader'],
			exclude: /node_modules/
		}, {
            test: /\.(less|css)$/,
            loader: 'style-loader!css-loader?minimize&-autoprefixer!less-loader'
        },{
			test: /\.(png|jpg)$/,
			loader: 'url-loader?limit=25000'
		},{
            test: /\.(woff|svg|otf|eot|ttf)$/,
            loader: 'url-loader?name=[name]-[hash].[ext]'
        }]
	},
	plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new CopyWebpackPlugin([{
            from: './src/common/lib',
            to: path.join(__dirname, appName, "/lib")
        }]),
        new uglifyJsPlugin({
			compress: {
				warnings: false
			}
    	}),
        new webpack.optimize.CommonsChunkPlugin("vendor"),
        new HtmlWebpackPlugin({
            //处理后目标位置
            filename: path.join(__dirname, appName + '/index.html'),
            //模板位置
            template: './index.html',
            chunks: ['vendor','main'],
        }),
        new HtmlReplace()
	]
};
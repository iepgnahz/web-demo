var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var path_prefix = require('config').get('pathPrefix');
var api_prefix = require('config').get('webApiPrefix');

var config = {
    entry: {
        'index': './src/components/main.js',
        "vendors": ['react', 'react-dom']
    },

    output: {               //打包后的文件
        path: __dirname + '/public/assets/',   //表示使用绝对路径
        filename: '[name].js' //输出文件名
    },
    module: {
        rules: [            //用于加载一些静态文件夹（css样式，图片之类）
            {
                test: /\.css$/, loader: "style!css"
            },
            {
                test: /\.js?$/,
                include: [
                    path.resolve(__dirname, '/src')
                ],
                loader: "babel-loader",
                options: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/, //不进行转换的文件，可以提高打包速度
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!less-loader"
                })
            },

            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&minetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=10000&name=/build/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.js'
        }),
        new webpack.DefinePlugin({
            URI_PREFIX: JSON.stringify(path_prefix),
            // STUDENT_URI_PREFIX: JSON.stringify(path_prefix),
            API_PREFIX: JSON.stringify(api_prefix),
            // DOMAIN: JSON.stringify(domain)
        }),
        new ExtractTextPlugin('[chunkhash:8].[name].css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            minify: {collapseWhitespace: true},
            template: path.join(__dirname, 'index.html'),
            inject: true,
            chunks: ['index', 'vendors']
        })
    ],
    resolve: {
        alias: {
             'bootstrap.css': 'bootstrap/dist/css/bootstrap.css',
        }
    }
};


module.exports = config;
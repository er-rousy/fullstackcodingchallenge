const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

var config = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.hidden.js',
        sourceMapFilename: 'bundle.hidden.js.map'
    },
    // generate source map for debugging
    devtool: 'source-map',

    module: {
        // React/Babel ES6 loader
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader'],
                include: /flexboxgrid/
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        // create HTML index file dynamically based on Ejs template file 
        new HtmlWebpackPlugin({
            title: 'My Facebook App',
            filename: 'index.html',
            template: './src/template.ejs',
            // inject compiled bundle
            files: {
                js: ['bundle.hidden.js']
            }
        }),
        new webpack.DefinePlugin({
            'FACEBOOK_APP_ID': JSON.stringify(process.env.FACEBOOK_APP_ID || '116569408989417'),
        })
    ]
}

module.exports = config;
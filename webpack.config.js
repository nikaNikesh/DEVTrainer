 const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: './src/index.tsx',
    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                auto: (resourcePath) => resourcePath.endsWith('.module.scss'),
                                localIdentName: '[name]__[local]__[hash:base64:5]',
                            },
                            importLoaders: 1,
                        },
                    },
                    'sass-loader',
                ],
                include: path.resolve(__dirname, 'src'),
            },
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
            },
        ],
    },


    devServer: {
        historyApiFallback: true,
        /*proxy: [
          {
            context: ['/api'],
            target: 'http://192.168.3.13:8084',
            changeOrigin: true,
            secure: false,
            timeout: 60000,
            logLevel: 'debug'
          }
        ]*/
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss'],
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'

    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
}
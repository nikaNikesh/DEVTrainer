const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: "development",
    entry: './src/index.tsx',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.module\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-modules-typescript-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },


            {
                test: /\.(ts|tsx)?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
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
            logLevel: 'debug'  // Добавление логирования
          }
        ]*/
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'

    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}
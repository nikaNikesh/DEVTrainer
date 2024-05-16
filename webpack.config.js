const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: "development",
    entry: './src/index.js',

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
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')

    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}
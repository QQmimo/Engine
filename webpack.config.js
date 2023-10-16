const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './app.ts',
    output: {
        filename: './engine.js',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/node_modules/, /Tests/],
                loader: 'ts-loader'
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            }
        ],
    },
    plugins: [new HtmlWebpackPlugin()],
    resolve: {
        extensions: ['.ts', '.json', '.js', '.html']
    }
};

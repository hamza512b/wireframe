const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const copyWebpackPlugin = require("copy-webpack-plugin")

module.exports = (env) => {
    let devtool, mode, stats,
        isProd = env.production !== undefined && env.production === true;
    if (isProd) {
        devtool = 'hidden-source-map';
        mode = 'production';
        stats = 'none';
    } else {
        devtool = 'eval';
        mode = 'development';
        stats = 'minimal';
    }
    return {
        devtool, mode, stats,
        entry: path.resolve(__dirname, 'src'),
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist'),
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            open: true,
            quiet: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/index.html'),
                filename: "index.html"
            }),
            new CleanWebpackPlugin({
                cleanStaleWebpackAssets: false
            }),
            new copyWebpackPlugin({
                patterns: [{ from: "./public", to: "./" }]
            })
        ]
    }
}
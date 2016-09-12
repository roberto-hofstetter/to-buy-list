module.exports = {
    devServer: {
        inline: true,
        port: 4444,
        historyApiFallback: true
    },
    entry: "./scripts/app.js",
    output: {
        path: __dirname,
        filename: "./scripts/main.js"
    },
    module: {
        loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
    }
};
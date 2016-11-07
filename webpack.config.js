var BrowserSyncPlugin = require("browser-sync-webpack-plugin");
module.exports = {
    entry: "./src/app.js",
    output: {
        path: "./dist",
        filename: "bundle.js",
        publicPath: "/"
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel",
                query: {
                    presets: ["es2015"]
                }
            }
        ]
    },

    plugins: [
        new BrowserSyncPlugin({
            host: "localhost",
            port: 3000,
            server: { baseDir: [""] }
        })
    ]
}; 
// Some hints from:
// https://dev.to/deepanjangh/react-setup-with-webpack-for-beginners-2a8k
const path = require("path");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
    entry: path.resolve(__dirname, "./src/index.js"),
    devServer: {
        static: path.resolve(__dirname, "./public"),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
    },
};

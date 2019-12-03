const path = require('path');

module.exports = {
    entry: './src/chart.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js?$/,  // This will match either .js or .jsx
            exclude: /node_modules/,
            options: {
                presets: ["@babel/preset-env"]
            },
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public')
    },
    watch: true
};

const path = require('path');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: './react/script.js',
    output: {
        filename: 'script.min.js',
        path: path.resolve(__dirname, 'src/public/js')
    },
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react'],
                    plugins: [
                        "react-html-attrs"
                    ]
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader'
            }, {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            }
        ]
    },
};
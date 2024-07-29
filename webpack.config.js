const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'app'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/',
                            publicPath: 'assets/',
                        },
                    },
                ],
            },
        ]
    }
};

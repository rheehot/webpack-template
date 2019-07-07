import * as path from 'path';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import postcssPresetEnv from 'postcss-preset-env';
import WebpackBar from 'webpackbar';

const config: webpack.Configuration = {
    entry: {
        app: './src/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    'babel-loader',
                    'ts-loader',
                ],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            title: 'Template by tirr-c',
            description: 'Placeholder description.',
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            },
        }),
        new WebpackBar(),
    ],
    stats: {
        all: false,
        assets: true,
        assetsSort: 'id',
        errors: true,
        errorDetails: true,
        hash: true,
        moduleTrace: true,
        version: true,
        warnings: true,
        warningsFilter: 'size limit',
    },
    devtool: 'inline-source-map',
};

export function makeCssConfig(isProduction: boolean) {
    return {
        test: /\.css$/,
        use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    camelCase: true,
                    importLoaders: 1,
                },
            },
            {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    plugins: () => [postcssPresetEnv()],
                },
            },
        ],
    };
}

export default config;

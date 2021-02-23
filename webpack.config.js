const path = require('path');
const fs = require('fs');
const packageJson = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { TypedCssModulesPlugin } = require('typed-css-modules-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    target: 'electron-renderer',
    entry: {
        index: './src/index.tsx',
    },
    devtool: 'source-map',
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ],
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        },
                    },
                ],
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
			},
			{
                test: /\.(scss|sass)$/,
                use: [
                    ...(
                        process.env.NODE_ENV === 'production' ? [
                            {
                                loader: MiniCssExtractPlugin.loader
                            }
                        ] : [
                            {
                                loader: 'style-loader'
                            }
                        ]
                    ),
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.ttf$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts'
                }
            },
            {
                test: /\.(gif|png|jpg|jpeg|webp)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'images'
                }
            }
        ],
    },
    plugins: [
        ...(
            process.env.NODE_ENV === 'production' ? [
                new MiniCssExtractPlugin({
                    filename: 'style.css'
                }),
            ] :
            [
                new TypedCssModulesPlugin({
                    globPattern: 'src/**/*.{scss,sass}'
                })
            ]
        ),

        new HardSourceWebpackPlugin(),
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            templateParameters: {
                title: packageJson.productName,
                indexCssTag: (
                    process.env.NODE_ENV === 'production' ?
                    `<link href="./style.css" rel="stylesheet">`
                    : ''
                ),
            },
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
        }),
    ],
    devServer: {
        historyApiFallback: true,
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'docs')
    }
};

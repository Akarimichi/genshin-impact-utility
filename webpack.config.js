const path = require('path');
const packageJson = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { TypedCssModulesPlugin } = require('typed-css-modules-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FontminPlugin = require('fontmin-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');


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
                    outputPath: 'fonts/'
                }
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images/'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            webp: {
                                quality: 75
                            }
                        },
                    },
                ],
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
                url: packageJson.url,
                description: packageJson.description,
                author: packageJson.author
            },
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
        }),
        new FontminPlugin({
            glyphs: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.?,!éè&à)("_-ç=-+:/\\²%£$€#{[}];@<>|`°*ù~©™\''.split(''),
        }),
        new CopyPlugin([
                {
                    from: 'src/assets/images/meta/*',
                    to: 'images/[name].[ext]'
                }
            ],
        ),
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(fr|en-gb)$/)
    ],
    devServer: {
        historyApiFallback: true,
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'docs')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                react: {
                    test: /[\\/]node_modules[\\/]((react).*)[\\/]/,
                    name: 'vendor-1',
                    chunks: 'all'
                },
                moment: {
                    test: /[\\/]node_modules[\\/](hammerjs|moment|overlayscrollbars)[\\/]/,
                    name: 'vendor-2',
                    chunks: 'all'
                }
            }
        }
    }
};

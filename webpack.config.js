const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist'),
};

const commonConfig = merge([
  {
    entry: {
      app: PATHS.app,
    },
    output: {
      path: PATHS.build,
      filename: '[name]-[chunkhash:8].js',
    },
    resolve: {
      alias: {
        pages: path.resolve(__dirname, 'app/pages/'),
        actions: path.resolve(__dirname, 'app/actions/'),
        reducers: path.resolve(__dirname, 'app/reducers/'),
        components: path.resolve(__dirname, 'app/pages/components/'),
      },
      extensions: ['.js', '.jsx'],
      plugins: [
        new webpack.LoaderOptionsPlugin({
          // test: /\.xxx$/, // may apply this only for some modules
          options: {
            publicPath: 'assets/',
          },
        }),
      ],
    },
  },
  {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ],
  },
  parts.indexTemplate({
    title: `${process.env.NODE_ENV === 'production'? '': 'DEV'} DAM-视觉中国数字资产管理系统`,
    appMountId: 'app',
  }),
  parts.lintCSS({include: PATHS.app, exclude: PATHS.app + '/apis'}),
  parts.lintJavaScript({include: PATHS.app, exclude: PATHS.app + '/apis'}),
  parts.loadJavaScript({include: PATHS.app}),
]);

const productionConfig = merge([
  parts.clean(PATHS.build),
  parts.minifyJavaScript(),
  parts.generateSourceMaps({type: 'source-map'}),
  parts.loadFonts({
    options: {
      name: '[name].[ext]',
    },
  }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[ext]',
    },
  }),
  parts.extractCSS({
    use: [
      {
        loader: 'css-loader',
        options: { minimize: true }, //css压缩
      },
      parts.autoprefixer(),
    ],
  }),
]);

const developmentConfig = merge([
  {
    output: {
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    },
  },
  parts.generateSourceMaps({ type: 'cheap-module-eval-source-map' }),
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadImages(),
  parts.loadFonts(),
  parts.loadCSS(),
]);

module.exports = env => {
  console.log(env);

  process.env.BABEL_ENV = env;
  process.env.NODE_ENV = env;
  if (env == 'production')
    return merge(commonConfig, productionConfig);
  else
    return merge(commonConfig, developmentConfig);
};

const BabiliPlugin = require('babili-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

exports.indexTemplate = (options) => ({
  plugins: [
    new HtmlWebpackPlugin({
      template: require('html-webpack-template'),
      title: options.title,
      appMountId: options.appMountId,
      inject: false,
    }),
  ],
});

exports.devServer = ({host, port}) => ({
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
	// disableHostCheck: true,
    host,
    port,
    overlay: {
      errors: true,
      warning: true,
    },
    // disableHostCheck:true,
    proxy: {
      '/api/*': {
        //target: 'http://192.168.0.203:8087/',
        target: 'http://127.0.0.1:8087/',
        secure: false,
        logLevel: 'debug',
      },
    },
  },
});

exports.lintJavaScript = ({include, exclude, options}) => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include,
        exclude,
        enforce: 'pre',
        loader: 'eslint-loader',
        options,
      },
    ],
  },
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)$/,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options,
        },
      },
    ],
  },
});

exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        include,
        exclude,
        use: {
          loader: 'file-loader',
          options,
        },
      },
    ],
  },
});

exports.loadCSS = ({include, exclude} = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
});

exports.extractCSS = ({include, exclude, use}) => {
  const plugin = new ExtractTextPlugin({
    filename: '[name]-[chunkhash:8].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.css/,
          include,
          exclude,
          use: plugin.extract({
            use,
            fallback: 'style-loader',
          }),
        },
      ],
    },
    plugins: [plugin],
  };
};

exports.autoprefixer = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      require('autoprefixer'),
    ]),
  },
});

exports.purifyCSS = ({paths}) => ({
  plugins: [
    new PurifyCSSPlugin({paths}),
  ],
});

exports.lintCSS = ({include, exclude}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        enforce: 'pre',
        loader: 'postcss-loader',
        options: {
          plugins: () => ([
            require('stylelint')({
              ignoreFiles: 'node_modules/**/*.css',
            }),
          ]),
        },
      },
    ],
  },
});

exports.loadJavaScript = ({include, exclude}) => {
  return {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include,
          exclude,
          loader: 'babel-loader',
          options: {
            plugins:[['import', {libraryName: 'antd', style: 'css'}]],
            cacheDirectory: true,
          },
        },
      ],
    },
  };
};

exports.clean = (path) => ({
  plugins: [
    new CleanWebpackPlugin([path]),
  ],
});

exports.generateSourceMaps = ({type}) => ({
  devtool: type,
});

exports.minifyJavaScript = () => ({
  plugins: [
    new BabiliPlugin({}, {comments: false}),
  ],
});

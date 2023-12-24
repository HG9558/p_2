const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpackbar = require('webpackbar');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');
const AutoImport = require('unplugin-auto-import/webpack');
const AutoComponents = require('unplugin-vue-components/webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production'; // 是否生产环境
const { styleLoader, _resolve, VERSION, getCommandParams, SITE_CONFIG } = require('./common');
// 使用@vue/cli初始化的项目
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackBar = require('webpackbar');
var CompressionWebpackPlugin = require('compression-webpack-plugin');
const BASE_STYL_DIR = '../src';
const globalStyles = [`${BASE_STYL_DIR}/scss/theme/default.scss`];
const { ENVI, SITE, LANG } = getCommandParams();

const now = new Date();
const V = [now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes()].join('.');
const version = ENVI === 'prod' ? VERSION[SITE] : V;

console.log('====================');
console.log('当前环境', ENVI);
console.log('当前版本', version);
console.log('当前站点', SITE);
console.log('====================');


let defineObj = {
  isProd: `${isProd}`,
  version: `'${version}'`,
  ENVI: `'${ENVI}'`,
  lang: `'${LANG}'`,
  site: `'${SITE}'`,
  __VUE_OPTIONS_API__: JSON.stringify(true),
  __VUE_PROD_DEVTOOLS__: JSON.stringify(false)
};

const assetsCDN = {
  // 放置需要使用 cdn 的库
  externals: {
    'echarts': 'echarts',
    'vue': 'Vue',
    'element-plus': 'ElementPlus',
    'xlsx': 'XLSX'
  },
  css: [
    // 存放 引用 css文件的地址
    'https://unpkg.com/element-plus@1.0.2-beta.47/lib/theme-chalk/index.css',
  ],
  js: [
    // 存放 引用 js 文件的地址
    `https://cdn.jsdelivr.net/npm/vue@3.2.6/dist/vue.${isProd ? 'global.prod' : "global"}.js`,
    'https://unpkg.com/element-plus@1.0.2-beta.47/lib/index.full.js',
    'https://unpkg.com/echarts@5.2.1/dist/echarts.min.js',
    'https://unpkg.com/xlsx@0.17.3/dist/xlsx.full.min.js'
  ]
}
const Timestamp = new Date().getTime();
const config = {
  mode: isProd ? 'production' : 'development',
  entry: _resolve('../src/main.ts'),
  output: {
    path: _resolve(`../dist/statics`),
    filename: `js/[name].[chunkhash:8].js?v=${version}`,
    chunkFilename: `js/[chunkhash:8].js?v=${version}`,
    publicPath: '/statics' // 测试环境
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ['cache-loader', 'thread-loader', 'vue-loader']
      },
      {
        // 匹配tsx文件
        test: /\.tsx?$/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@vue/babel-plugin-jsx']
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [/\.vue$/],
              happyPackMode: true,
              experimentalWatchApi: true,
              compilerOptions: {
                module: 'es2015'
              }
            }
          }

        ],
      },
      {
        test: /\.val\.ts$/,
        use: [
          'thread-loader',
          {
            loader: `val-loader`,
            options: {
              test: 'null'
            }
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js\.cjs$/,
        use: ['thread-loader', 'babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [...styleLoader]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'cache-loader',
          ...styleLoader,
          'sass-loader',
          {
            loader: 'style-resources-loader',
            options: {
              patterns: globalStyles
            }
          }
        ]
      },
      {
        test: /\.json$/,
        use: 'json-loader',
        type: 'javascript/auto'
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 限制于 8kb
          }
        }
      },
      {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          name: 'font/[name].[ext]'
        }
      },
      { test: /\.xlsx$/, use: 'raw-loader' }
    ]
  },

  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

  externals: assetsCDN.externals,

  // "external" is deprecated
  plugins: [
    new CleanWebpackPlugin({}),

    // new BundleAnalyzerPlugin(),

    new VueLoaderPlugin(),

    new WebpackBar(),

    // new CompressionWebpackPlugin({ //gzip 压缩
    //   test: /./, // 哪些文件要压缩
    //   filename: "[path][base].gz", // 压缩后的文件名
    //   algorithm: "gzip", // 使用gzip压缩
    //   threshold: 10240, //大于 10240字节，既10k时
    //   minRatio: 0.8,  //压缩率
    // }),


    new MiniCssExtractPlugin({
      filename: `css/[name].${Timestamp}.css?cv=${version}`,
      chunkFilename: `css/[name].${Timestamp}.css?cv=${version}`
    }),

    // new ForkTsCheckerWebpackPlugin({
    //   typescript: {
    //     configFile: _resolve('../tsconfig.json')
    //   },
    //   eslint: {
    //     files: '../src/**/*.{ts,js}'
    //   }
    // }),

    new HtmlWebpackPlugin({
      chunks: ['main'],
      filename: ENVI === 'dev' ? 'index.html' : '../index.html',
      template: '../public/index.ejs',
      title: SITE_CONFIG[SITE].title,
      ico: ENVI === 'dev' ? SITE_CONFIG[SITE].ico : `{CDN_URL}${SITE_CONFIG[SITE].ico}`,
      inject: false,
      externals: {
        "js": assetsCDN.js,
        'css': assetsCDN.css
      }
    }),

    new webpack.DefinePlugin(defineObj),

    new CopyWebpackPlugin({
      patterns: [{ from: _resolve('../public/img'), to: 'img' }]
    }),

    new Webpackbar(),

  ],

  resolve: {
    modules: [_resolve('../node_modules')],
    alias: {
      '@': _resolve('../src')
    },
    extensions: ['.ts', '.js', '.vue', '.scss', '.tsx']
  }
};

module.exports = config;

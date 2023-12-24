const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProd = process.env.NODE_ENV === 'production'; // 是否生产环境
// 大版本/重要功能/BUG修复优化
const VERSION = {
  bb8: '1.0.0',
};

// 配置站点 title 和 ico
const SITE_CONFIG = {
  bb8: {
    title: 'LB888 后台管理系统',
    ico: '/img/lb888.png'
  },
};

const _resolve = filePath => {
  return path.resolve(__dirname, '../', filePath);
};

const styleLoader = [
  isProd ? MiniCssExtractPlugin.loader : 'style-loader',
  {
    loader: 'css-loader',
    options: {
      url: false
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [['postcss-preset-env', require('autoprefixer')]]
      }
    }
  }
];

/**
 * 获取命令行参数
 */
function getCommandParams() {
  // CLI参数从第三个开始获取
  const args = process.argv.slice(2);
  const result = {};
  const REG = /^--([^-]+)/;

  for (let i = 0; i < args.length; i++) {
    const match = REG.exec(args[i]);
    // 判断当前参数是否--开头，如果--开头才算合法参数
    if (match) {
      const key = match[1];
      // 如果下个参数也是--开头，本参数则值为空
      if (REG.test(match[i + 1])) {
        // 下一个参数
        result[key] = '';
      } else {
        // 直接跳过下一个参数
        i++;
        result[key] = args[i] || '';
      }
    }
  }

  return result;
}

module.exports = {
  SITE_CONFIG,
  styleLoader,
  _resolve,
  VERSION,
  getCommandParams
};

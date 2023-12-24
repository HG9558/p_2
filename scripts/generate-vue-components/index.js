// index.js
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const resolve = (...file) => path.resolve(__dirname, ...file);
const log = message => console.log(chalk.green(`${message}`));
const successLog = message => console.log(chalk.blue(`${message}`));
const errorLog = error => console.log(chalk.red(`${error}`));
// 导入模板
const { vueElementDialog, generateSerch, vueElementPage } = require('./template');

async function generateComponents(chunk, type, path) {
  errorLog('Error')
}

module.exports = {
  generateComponents
};

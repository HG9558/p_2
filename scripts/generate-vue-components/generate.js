const inquirer = require('inquirer');
const { resolve } = require('path');
const fs = require('fs');
const { generateTemplate, generateTab, genEdit, genAdd } = require('./template')

const promptList = [
  {
    type: 'input',
    message: '请输入一级路由名称(例如：/vip/list 中的vip):',
    name: 'firstRouteName',
  },
  {
    type: 'input',
    message: '请输入二级路由名称(例如：/vip/list 中的list):',
    name: 'secondRouteName',
  },
  {
    type: 'confirm',
    message: '是否存在Tab',
    name: 'tab',
    default: true,
  },
  {
    type: 'input',
    message: '请输入Tab的名称，多个Tab用空格隔开',
    name: 'tabName',
    when: answers => answers.tab
  },
  {
    type: 'confirm',
    message: '是否需要操作列',
    name: 'isOperate',
    default: true,
  },
  {
    type: 'confirm',
    message: '是否需要删除功能',
    name: 'isDelete',
    default: true,
  },
  {
    type: 'confirm',
    message: '是否需要导出功能',
    name: 'isExport',
    default: true,
  },
  {
    type: 'confirm',
    message: '是否需要编辑功能',
    name: 'isEdit',
    default: true,
  },
  {
    type: 'confirm',
    message: '是否需要新增功能',
    name: 'isAdd',
    default: true,
  },
];


const viewPath = resolve(__dirname, '../../src/views');

function tabYes(answers) {
  const tabNameList = answers.tabName.trim().split(/\s+/).filter(item => item);

  tabNo(answers, generateTab(tabNameList), false);

  tabNameList.forEach(tabName => {
    const tabPath = `${viewPath}/${answers.firstRouteName}/${answers.secondRouteName}/${tabName}`;
    if (!fs.existsSync(tabPath)) {
      fs.mkdirSync(tabPath, { recursive: true });
    }
    const indexVue = `${tabPath}/index.vue`;
    const editVue = `${tabPath}/Edit.vue`;
    const addVue = `${tabPath}/Add.vue`;
    if (fs.existsSync(indexVue)) {
      console.log(`${indexVue} 已存在`);
      return;
    }
    fs.writeFileSync(indexVue, generateTemplate(answers.isOperate, answers.isDelete, answers.isExport, answers.isEdit, answers.isAdd));
    if (answers.isEdit) {
      fs.writeFileSync(editVue, genEdit());
    }
    if (answers.isAdd) {
      fs.writeFileSync(addVue, genAdd());
    }
  });
}

function tabNo(answers, template, isAddOrEdit = true) {
  const tabPath = `${viewPath}/${answers.firstRouteName}/${answers.secondRouteName}`;
  if (!fs.existsSync(tabPath)) {
    fs.mkdirSync(tabPath, { recursive: true });
  }
  const indexVue = `${tabPath}/index.vue`;
  const editVue = `${tabPath}/Edit.vue`;
  const addVue = `${tabPath}/Add.vue`;
  if (fs.existsSync(indexVue)) {
    console.log(`${indexVue} 已存在`);
    return;
  }
  fs.writeFileSync(indexVue, template ? template : generateTemplate(answers.isOperate, answers.isDelete, answers.isExport, answers.isEdit, answers.isAdd));
  if (answers.isEdit && isAddOrEdit) {
    fs.writeFileSync(editVue, genEdit());
  }
  if (answers.isAdd && isAddOrEdit) {
    fs.writeFileSync(addVue, genAdd());
  }
}

inquirer.prompt(promptList).then(answers => {
  if (answers.tab) {
    tabYes(answers);
  } else {
    tabNo(answers);
  }
});

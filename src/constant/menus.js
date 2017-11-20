const fixMenus = {
  defaultOpened: ['menu1'],
  menu: [{
    name: '菜单1',
    index: 'menu1',
    icoClass: 'el-icon-location',
    groups: [{
      groupName: '分组1',
      items: [
        {index: 'audit', name: '选项1'},
        {index: 'aduit2', name: '选项2'}]
    }, {
      groupName: '分组2',
      items: [
        {index: 'aduit3', name: '选项1'},
        {index: 'aduit4', name: '选项2'}]
    }]
  }, {
    name: '菜单二',
    index: 'menu2',
    icoClass: 'el-icon-location',
    groups: [{
      groupName: '分组1',
      items: [
        {index: 'aduit5', name: '选项一'},
        {index: 'aduit6', name: '选项二'}]
    }, {
      groupName: '分组2',
      items: [
        {index: 'aduit7', name: '选项一'},
        {index: 'aduit8', name: '选项一'}]
    }]
  }, {
    name: '单独菜单三',
    index: 'hello1',
    groups: null,
    icoClass: 'el-icon-menu'
  }, {
    name: '单独菜单四',
    index: 'hello2',
    groups: null,
    icoClass: 'el-icon-setting'
  }]
}
export default fixMenus
(function(){
  'use strict';

  var i18n_en = {
    ok: 'Ok',
    save: 'Save',
    cancel: 'Cancel',
  };
  var i18n_zh = {
    ok: '确定',
    saving: '保存中',
    save: '保存',
    cancel: '取消',
    add: '添加',
    edit: '编辑',
    delete: '删除所选信息',
    warnDelete: '您确定要删除？请注意，此操作无法撤销！',
    signup: '注册',
    signin: '登录',
    goBackHomePage: '返回首页'
  };

  angular.module('app')
    .config(['$translateProvider', function($translateProvider) {
      $translateProvider
        .translations('en', i18n_en)
        .translations('zh', i18n_zh);

      // Tell the module what language to use by default
      $translateProvider.preferredLanguage('zh');

      // Enable escaping of HTML
      $translateProvider.useSanitizeValueStrategy('escape');
  }]);

})();

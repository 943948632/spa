(function() {
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Common 3rd Party Dependencies
            //'uiGmapgoogle-maps',
            'textAngular',
            'xeditable',

            'app.core',
            // Navigation
            'app.navigation',
            // Toolbar
            'app.toolbar',
            // Quick Panel
            'app.quick-panel',
            // Apps
            // 'app.dashboards',
            // 'app.calendar',
            // 'app.e-commerce',
            // 'app.mail',
            // 'app.chat',
            // 'app.file-manager',
            // 'app.gantt-chart',
            // 'app.scrumboard',
            // 'app.todo',
            // 'app.contacts',
            // 'app.notes',

            // Pages
            'app.pages',
            // User Interface
            // 'app.ui',
            // Components
            // 'app.components',

            /////////////
            //登录 注册 找回密码·

            //Trade  交易
            'app.trade',
            //资金账户
            'app.account',
            //冲值与取款
            'app.deltawthd',
            //市场行情
            'app.marketquotation',
            //
            //'app.server'
        ]);
})();
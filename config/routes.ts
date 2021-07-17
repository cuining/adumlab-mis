export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/product',
                name: 'product',
                icon: 'SettingOutlined',
                routes: [
                  {
                    path: '/product/cleaner',
                    icon: 'smile',
                    name: 'cleaner',
                    component: './Product/cleaner'
                  },
                  {
                    path: '/product/green-fan',
                    icon: 'smile',
                    name: 'green-fan',
                    component: './Product/GreenFan'
                  },
                  {
                    path: '/product/green-fan-cirq',
                    icon: 'smile',
                    name: 'green-fan-cirq',
                    component: './Product/GreenFan-Cirq'
                  },
                  {
                    path: '/product/lantern',
                    icon: 'smile',
                    name: 'lantern',
                    component: './Product/Lantern'
                  },
                  {
                    path: '/product/light',
                    icon: 'smile',
                    name: 'light',
                    component: './Product/Light'
                  },
                  {
                    path: '/product/pot',
                    icon: 'smile',
                    name: 'pot',
                    component: './Product/Pot'
                  },
                  {
                    path: '/product/pure',
                    icon: 'smile',
                    name: 'pure',
                    component: './Product/Pure'
                  },
                  {
                    path: '/product/rain',
                    icon: 'smile',
                    name: 'rain',
                    component: './Product/Rain'
                  },
                  {
                    path: '/product/speaker',
                    icon: 'smile',
                    name: 'speaker',
                    component: './Product/Speaker'
                  },
                  {
                    path: '/product/toaster',
                    icon: 'smile',
                    name: 'toaster',
                    component: './Product/Toaster'
                  },
                ]
              },
              {
                path: '/system',
                name: 'system',
                icon: 'SettingOutlined',
                authority: ['admin'],
                routes: [
                  {
                    path: '/system/account',
                    icon: 'smile',
                    name: 'account',
                    component: './System/Account/index',
                    authority: ['admin'],
                  },
                ],
              },
              {
                name: 'list.article-list',
                icon: 'table',
                path: '/article-list',
                component: './ArticleList',
              },
              {
                name: 'list.comment-list',
                icon: 'table',
                path: '/comment-list',
                component: './CommentList',
              },
              {
                name: 'list.banner-list',
                icon: 'table',
                path: '/banner-list',
                component: './BannerList',
              },
              {
                component: './404',
              }
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];

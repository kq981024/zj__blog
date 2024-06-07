import { defineUserConfig } from 'vuepress'
import recoTheme from 'vuepress-theme-reco'
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'

export default defineUserConfig({
  base: '/XY_BLOG/',
  title: '心✌',
  description: 'Just playing around',
  bundler: viteBundler(),
  // bundler: webpackBundler(),
  theme: recoTheme({
    style: '@vuepress-reco/style-default',
    logo: '/logo.jpg',
    author: '心野',
    authorAvatar: 'avatar.gif',
    docsRepo: 'https://github.com/vuepress-reco/vuepress-theme-reco-next',
    docsBranch: 'main',
    docsDir: 'example',
    lastUpdatedText: '',
    colorMode: 'dark',
    series: {
      '/docs/tool/': [
        {
          text: '前端工具库',
          children: ['react', 'react-native'],
          collapsible: true, // 默认展开，true 为折叠
        },
        {
          text: '后端工具库',
          children: ['react', 'react-native'],
        },
        {
          text: '常规工具库',
          children: ['react', 'react-native'],
        },
      ],
    },
    // primaryColor: '#3aa675',
    // catalogTitle: '自定义目录标题',
    repo: 'https://github.com/kq981024',
    navbar: [
      { text: '博客', link: '/', icon: 'Compass' },
      {
        text: '工具库',
        children: [
          { text: '前端', link: '/docs/tool/react' },
          { text: '后端', link: '/docs/tool/react-native' },
          { text: '常规', link: '/docs/tool/react-native' },
        ],
        icon: 'Document',
      },
    ],
    autoSetBlogCategories: true,
    // commentConfig: {
    //   type: 'valine',
    //   options: {
    //     appId: '...', // your appId
    //     appKey: '...', // your appKey
    //     hideComments: false, // 全局隐藏评论，默认 false
    //   },
    // },
    // bulletin: {
    //   body: [
    //     {
    //       type: 'text',
    //       content: `🎉🎉🎉 reco 主题 2.x 已经接近 Beta 版本，在发布 Latest 版本之前不会再有大的更新，大家可以尽情尝鲜了，并且希望大家在 QQ 群和 GitHub 踊跃反馈使用体验，我会在第一时间响应。`,
    //       style: 'font-size: 12px;',
    //     },
    //     {
    //       type: 'hr',
    //     },
    //     {
    //       type: 'title',
    //       content: 'QQ 群',
    //     },
    //     {
    //       type: 'text',
    //       content: `
    //       <ul>
    //         <li>QQ群1：1037296104</li>
    //         <li>QQ群2：1061561395</li>
    //         <li>QQ群3：962687802</li>
    //       </ul>`,
    //       style: 'font-size: 12px;',
    //     },
    //     {
    //       type: 'hr',
    //     },
    //     {
    //       type: 'title',
    //       content: 'GitHub',
    //     },
    //     {
    //       type: 'text',
    //       content: `
    //       <ul>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/issues">Issues<a/></li>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/discussions/1">Discussions<a/></li>
    //       </ul>`,
    //       style: 'font-size: 12px;',
    //     },
    //     {
    //       type: 'hr',
    //     },
    //     {
    //       type: 'buttongroup',
    //       children: [
    //         {
    //           text: '打赏',
    //           link: '/docs/others/donate.html',
    //         },
    //       ],
    //     },
    //   ],
    // },
    // commentConfig: {
    //   type: 'valine',
    //   // options 与 1.x 的 valineConfig 配置一致
    //   options: {
    //     // appId: 'xxx',
    //     // appKey: 'xxx',
    //     // placeholder: '填写邮箱可以收到回复提醒哦！',
    //     // verify: true, // 验证码服务
    //     // notify: true,
    //     // recordIP: true,
    //     // hideComments: true // 隐藏评论
    //   },
    // },
  }),
  // debug: true,
})

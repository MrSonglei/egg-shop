import Vue from 'vue';
import inlineCode from 'raw-loader!./inline.js';

export default function createLayout(name, components, tpl) {
  return {
    name,
    props: ['title', 'description', 'keywords'],
    components,
    computed: {
      vTitle() {
        return this.$root.title || this.title || 'Egg + Vue SSR/CSR 工程化方案';
      },
      vKeywords() {
        return this.$root.keywords || this.keywords || 'easyjs, egg vue ssr, egg, typescript, vue, webpack, server side render';
      },
      vDescription() {
        return this.$root.description || this.description || 'Egg Vue SSR/CSR 服务端渲染';
      },
      baseClass() {
        return this.$root.baseClass;
      },
      inlineScript() {
        return '<script>("inline js code");</script>';
      },
      inlineJSFileScript() {
        return `<script>${inlineCode}</script>`;
      }
    },
    template: EASY_ENV_IS_BROWSER ? tpl : `<!DOCTYPE html>
                  <html lang="en">
                    <head>
                      <title>{{vTitle}}</title>
                      <meta charset="utf-8">
                      <meta http-equiv="X-UA-Compatible" content="IE=edge">
                      <meta name="keywords" :content="vKeywords">
                      <meta name="description" :content="vDescription">
                      <meta http-equiv="content-type" content="text/html;charset=utf-8">
                      <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
                      <!-- Add to home screen for Windows -->
                      <meta name="msapplication-TileImage" content="images/icons/icon-144x144.png">
                      <meta name="msapplication-TileColor" content="#2F3BA2">
                      <!-- Add to home screen for Safari on iOS -->
                      <meta name="apple-mobile-web-app-capable" content="yes">
                      <meta name="apple-mobile-web-app-status-bar-style" content="black">
                      <meta name="apple-mobile-web-app-title" content="Weather PWA">
                      <link rel="apple-touch-icon" href="/logo.png">
                      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                      <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
                      <template v-html="inlineScript"></template>
                      <template v-html="inlineJSFileScript"></template>
                    </head>
                    <body :class="baseClass">
                      ${tpl}
                    </body>
                  </html>`,
    install(vue, options) {
      //
    }
  };
}

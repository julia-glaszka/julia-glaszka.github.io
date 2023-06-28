import DefaultLayout from '~/layouts/Default.vue'
import '~/assets/scss/main.scss'
import 'bulma-helpers/css/bulma-helpers.min.css'


export default function (Vue, { head }) {
  Vue.component('Layout', DefaultLayout)

  head.htmlAttrs = { lang: 'en', class: 'h-full' }
  head.bodyAttrs = { class: 'antialiased font-serif' }

  // Chrome, Firefox OS and Opera
  head.meta.push({
    name: 'theme-color',
    content: '#fff'
  })
  //  Windows Phone
  head.meta.push({
    name: 'msapplication-navbutton-color',
    content: '#fff'
  })

  // iOS Safari
  head.meta.push({
    name: 'apple-mobile-web-app-status-bar-style',
    content: '#fff'
  })

//favicon
  // head.link.push({
  //   href: 'images/favicon.ico',
  //   rel: 'icon',
  //   type: 'image/x-icon'
  // })

  head.meta.push({
    name: 'viewport',
    content: 'width=device-width'
  })


}

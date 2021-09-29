import DefaultLayout from '~/layouts/Default.vue'
import '~/assets/scss/main.scss'
import 'bulma-helpers/css/bulma-helpers.min.css'


export default function (Vue, { head }) {
  Vue.component('Layout', DefaultLayout)

  head.htmlAttrs = { lang: 'en', class: 'h-full' }
  head.bodyAttrs = { class: 'antialiased font-serif' }

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Montserrat|Work+Sans:700&display=swap'
  })
  // Chrome, Firefox OS and Opera
  head.meta.push({
    name: 'theme-color',
    content: '#261447'
  })
  //  Windows Phone
  head.meta.push({
    name: 'msapplication-navbutton-color',
    content: '#261447'
  })

  // iOS Safari
  head.meta.push({
    name: 'apple-mobile-web-app-status-bar-style',
    content: '#261447'
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

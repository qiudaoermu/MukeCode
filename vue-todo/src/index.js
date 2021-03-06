import Vue from 'vue';
import App from './RouterView.vue';
import './assets/styles/global.styl'
const root = document.createElement('div');
import VueRouter from 'vue-router'
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'

Vue.use(MintUI)
Vue.use(VueRouter)


import Index from './app.vue'
import Address from './page/AddressPage.vue'
import Number from './page/numberGrow.vue'
import scrollUpAndDown from './page/css3AniamtionScrollTextUpAndDown.vue'
const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/', component: Index },
    { path:'/address',component:Address},
	  {path:'/bounceNumber',component:Number},
	  {path:'/scrollUpAndDown',component:scrollUpAndDown},
  ]
})


document.body.appendChild(root);


new Vue({
    router,
    render:(h) => h(App)
}).$mount(root);

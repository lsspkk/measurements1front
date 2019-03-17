import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMaterial from 'vue-material'
import VueRouter from 'vue-router'
//import { MdButton, MdContent, MdApp, MdAppToolbar, MdIcon} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import About from './components/About.vue'
import Measurement from './components/Measurement.vue'
import Statistics from './components/Statistics.vue'
import Groups from './components/Groups.vue'
import Settings from './components/Settings.vue'
import Home from './components/Home.vue'


Vue.config.productionTip = false
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://localhost:3000'

//Vue.use(MdButton)
//Vue.use(MdContent)
//Vue.use(MdApp)
//Vue.use(MdAppToolbar)
//Vue.use(MdIcon)
Vue.use(VueMaterial)

Vue.use(VueRouter)

const routes = [
  { path: '/', component : Home, props: true },
  { path: '/about', component : About },
  { path: '/groups', component : Groups },
  { path: '/measurement', component : Measurement },
  { path: '/settings', component : Settings },
  { path: '/statistics', component : Statistics },
]
const router = new VueRouter({ routes })


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

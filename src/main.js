import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMaterial from 'vue-material'
//import { MdButton, MdContent, MdApp, MdAppToolbar, MdIcon} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'


Vue.config.productionTip = false
Vue.use(VueAxios, axios)

//Vue.use(MdButton)
//Vue.use(MdContent)
//Vue.use(MdApp)
//Vue.use(MdAppToolbar)
//Vue.use(MdIcon)
Vue.use(VueMaterial)


new Vue({
  render: h => h(App),
}).$mount('#app')

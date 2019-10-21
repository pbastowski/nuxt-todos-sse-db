import 'bootstrap/dist/css/bootstrap.min.css'
import Vue from 'vue'

console.clear()

Vue.prototype.log = console.log.bind(console)

Vue.config.productionTip = false
Vue.config.devtools = false

export default ({ store }) => {
    store.dispatch('init')
}

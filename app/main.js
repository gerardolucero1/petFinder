import Vue from 'nativescript-vue'
import App from './components/App'
import Index from './components/Index'

import VueDevtools from 'nativescript-vue-devtools'
import store from './store'

//Components
import Footer from './components/shared/Footer.vue'
import Navbar from './components/shared/Navbar.vue'

Vue.use(VueDevtools, { host: '192.168.0.5' })

var firebase = require("nativescript-plugin-firebase")

firebase.init({
    showNotifications: true,
    showNotificationsWhenInForeground: true,

    onPushTokenReceivedCallback: (token) => {
        console.log('[Firebase] onPushTokenReceivedCallback:', { token });
        store.commit('updateToken', token)
    },

    onMessageReceivedCallback: (message) => {
        console.log('[Firebase] onMessageReceivedCallback:', { message });
    }
}).then(
    function() {
        console.log("firebase.init done")
    },
    function(error) {
        console.log("firebase.init error: " + error)
    }
)
  
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement(
  'RadSideDrawer',
  () => require('nativescript-ui-sidedrawer').RadSideDrawer
)

Vue.registerElement('DropDown', () => require('nativescript-drop-down/drop-down').DropDown)
Vue.component('Footer', Footer)
Vue.component('Navbar', Navbar)

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()

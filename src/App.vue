<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="flexible">
      <md-app-toolbar class="md-large md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>
          </div>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button">
              <md-icon>more_vert</md-icon>
            </md-button>
          </div>
        </div>

        <div class="md-toolbar-row md-toolbar-offset">
          <span class="md-display-1">{{title}}</span>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="5">Measurements App</md-toolbar>

        <md-list>
          <md-list-item v-on:click="menuVisible=!menuVisible;currentPage='Measurement'">
            <md-icon>create</md-icon>
            <span class="md-list-item-text">Mittaus</span>
          </md-list-item>

          <md-list-item v-on:click="menuVisible=!menuVisible;currentPage='Statistics'">
            <md-icon>timeline</md-icon>
            <span class="md-list-item-text">Tilastot</span>
          </md-list-item>

          <md-list-item v-on:click="menuVisible=!menuVisible;currentPage='Groups'">
            <md-icon>group</md-icon>
            <span class="md-list-item-text">Ryhmät</span>
          </md-list-item>

          <md-list-item v-on:click="menuVisible=!menuVisible;currentPage='Settings'">
            <md-icon>settings</md-icon>
            <span class="md-list-item-text">Asetukset</span>
          </md-list-item>

          <md-list-item v-on:click="menuVisible=!menuVisible;currentPage='About'">
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Info</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
      <component v-bind:is="currentPageComponent" :user="user"/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>

import About from './components/About.vue'
import Measurement from './components/Measurement.vue'
import Statistics from './components/Statistics.vue'
import Groups from './components/Groups.vue'
import Settings from './components/Settings.vue'

export default {
  name: 'app',
  components: {
    About, 
    Measurement,
    Statistics,
    Groups,
    Settings
  },
  data: () => ({
    menuVisible: false,
    user: '',
    currentPage: 'Measurement'
  }),
  mounted() {
    this.loadUser()
  },
  computed: {
    currentPageComponent: function() {
      if( this.user === '' ) {
        return 'About'
      }
      return this.currentPage
    },
    title: function() {
      var text = { 
        'About': 'Info',
        'Measurement': 'Mittaus',
        'Statistics' : 'Tilastot',
        'Groups' : 'Ryhmät',
        'Settings' : 'Asetukset'
        };
      return text[this.currentPage]
    }
  },
  methods: {
    loadUser() {
      this.user = 'testi@osoite.fi'
      /*
      this.axios.get('http://localhost:3000/user', {withCredentials:true}).then((res) => {
        console.log(res.data)
        if( res.data && res.data.email )
          this.user = res.data.email
      })
      */
    }
  }
}

</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(blue, A200), // The primary color of your application
  accent: md-get-palette-color(red, A200) // The accent or secondary color
));

@import "~vue-material/dist/theme/all"; // Apply the theme

.md-app-container {  overflow-x: hidden !important ; }
</style>

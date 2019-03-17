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
            <router-link to="/measurement" active-class="current">
          <md-list-item v-on:click="menuVisible=!menuVisible">
              <md-icon>create</md-icon>
              <span class="md-list-item-text">Mittaus</span>
          </md-list-item>
                      </router-link>


            <router-link to="/statistics" active-class="current">
          <md-list-item v-on:click="menuVisible=!menuVisible">
              <md-icon>timeline</md-icon>
              <span class="md-list-item-text">Tilastot</span>
          </md-list-item>
            </router-link>

            <router-link to="/groups" active-class="current">
          <md-list-item v-on:click="menuVisible=!menuVisible">
              <md-icon>group</md-icon>
              <span class="md-list-item-text">Ryhmät</span>
          </md-list-item>
            </router-link>

            <router-link to="/settings" active-class="current">
          <md-list-item v-on:click="menuVisible=!menuVisible">
              <md-icon>settings</md-icon>
              <span class="md-list-item-text">Asetukset</span>
          </md-list-item>
            </router-link>

            <router-link to="/about" active-class="current">
          <md-list-item v-on:click="menuVisible=!menuVisible">
              <md-icon>error</md-icon>
              <span class="md-list-item-text">Info</span>
          </md-list-item>
            </router-link>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view v-bind:user="user" msg="Welcome"></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      menuVisible: false,
      user: "",
      title: ""
    }
  },
  mounted() {
    this.loadUser()
  },
  watch: {
    '$route' (to) {
      var text = {
        "/about": "Info",
        "/measurement": "Mittaus",
        "/statistics": "Tilastot",
        "/sroups": "Ryhmät",
        "/settings": "Asetukset"
      }
      this.title = text[to.path]
    }
  },
  methods: {
    loadUser() {
      this.user = "testi@osoite.fi"
      /*
      this.axios.get('/user', {withCredentials:true}).then((res) => {
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

@include md-register-theme(
  "default",
  (
    primary: md-get-palette-color(blue, A200),
    // The primary color of your application
      accent: md-get-palette-color(red, A200) // The accent or secondary color
  )
);

@import "~vue-material/dist/theme/all"; // Apply the theme

.md-app-container {
  overflow-x: hidden !important ;
}
</style>

<template>
  <div>
    <md-content>
    <h1>{{ msg }}</h1>
    </md-content>
    <md-content >
          <img src="../assets/logo.png">

    <div>      
    <ul>

    <li v-if="user.length == 0"><a href="http://localhost:3000/auth/google"><md-button class="md-raised md-primary">Sign In</md-button></a></li>
    <li v-else>{{ user}}</li>
    </ul>
    </div>
    </md-content>
    <md-content>
    <div>
    </div>
    </md-content>
  </div>
</template>

<script>

export default {
  props: {
    msg: String,
    user: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .md-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

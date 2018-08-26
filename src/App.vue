<template>
  <div id="app" class="grey lighten-3">
    <div class="wrap white">
      <v-toolbar color="teal darken-1">
        <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
        <v-toolbar-title class="white--text">メモApp</v-toolbar-title>
        <v-spacer></v-spacer>
        <!--<v-btn icon>-->
          <!--<v-icon>search</v-icon>-->
        <!--</v-btn>-->
      </v-toolbar>
      <app-form/>
      <app-lists/>
    </div>
  </div>
</template>

<script>
import AppForm from '@/components/AppForm'
import AppLists from '@/components/AppLists'
export default {
  name: 'App',
  components: {AppForm, AppLists}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 20px;
  min-height: 700px;
}
.wrap {
  max-width: 600px;
  margin: auto;
}
</style>

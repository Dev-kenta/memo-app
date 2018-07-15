<template>
    <v-card>
        <v-container
                fluid
                style="min-height: 0;"
                grid-list-lg
        >
            <v-layout row wrap>
                <v-flex xs12 v-for="(list,index) in lists" :key="index">
                    <v-card color="cyan lighten-2" class="white--text">
                        <v-card-title primary-title>
                            <v-flex xs2>
                                <v-checkbox v-model="checkbox[index]"></v-checkbox>
                            </v-flex>
                            <v-flex xs6>
                                <div class="headline" xs6 align="left">{{ list.name }}</div>
                            </v-flex>
                            <v-flex xs4>
                                <v-btn color="cyan darken-2" class="white--text">{{ list.category }}</v-btn>
                            </v-flex>
                        </v-card-title>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
import PropertyStore from '../models/store.js'
export default {
  data () {
    return {
      sharedState: PropertyStore,
      checkbox: []
    }
  },
  mounted () {
    this.sharedState.state.property.memoLists = JSON.parse(localStorage.getItem('memoLists')) || []
  },
  computed: {
    lists () {
      return this.sharedState.state.property.memoLists
    },
    checked () {
      return this.checkbox.filter(item => {
        return item
      })
    }
  }
}
</script>

<style>
    .input-group__details {
      display: none;
    }
</style>

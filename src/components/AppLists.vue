<template>
    <v-card>
        <v-container
                fluid
                style="min-height: 0;"
                grid-list-lg
        >
            <v-layout row wrap>
                <v-flex xs12 v-for="(list,index) in lists" :key="index" v-if="!list.completed">
                    <v-card color="cyan lighten-2" class="white--text">
                        <v-card-title primary-title>
                            <v-flex xs2>
                                <v-checkbox v-model="checkbox[index]" @click="completed(index)"></v-checkbox>
                            </v-flex>
                            <v-flex xs6>
                                <div class="headline" xs6 align="left">{{ list.name }}</div>
                            </v-flex>
                            <v-flex xs4>
                                <v-btn color="cyan darken-2" class="white--text">{{ category(list.category) }}</v-btn>
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
      let lists = this.sharedState.state.property.memoLists
      return lists
    }
  },
  methods: {
    category (index) {
      let categorys = this.sharedState.state.const.category
      return categorys[index]
    },
    completed (item) {
      this.sharedState.state.property.memoLists[item]['completed'] = true
      localStorage.setItem('memoLists', JSON.stringify(this.sharedState.state.property.memoLists))
      console.log(this.sharedState.state.property.memoLists[item]['completed'])
    }
  }
}
</script>

<style>
    .input-group__details {
      display: none;
    }
</style>

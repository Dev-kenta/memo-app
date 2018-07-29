<template>
    <v-card>
        <v-container
                fluid
                style="min-height: 0;"
                grid-list-lg
        >
            <v-layout row wrap>
                <v-flex xs12 v-for="(list,index) in lists" :key="index" v-if="!list.completed">
                    <v-card color="blue-grey lighten-2" class="white--text">
                        <v-card-title primary-title>
                            <v-flex xs2>
                                <v-checkbox v-model="checkbox[index]" @click="completed(index)"></v-checkbox>
                            </v-flex>
                            <v-flex xs6>
                                <div class="headline" xs6 align="left">{{ list.name }}</div>
                            </v-flex>
                            <v-flex xs4>
                                <v-btn v-bind:color="list.cardClass" class="white--text">{{ category(list.category) }}</v-btn>
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
      checkbox: [],
      list: []
    }
  },
  mounted () {
    this.list = this.listen()
  },
  computed: {
    lists () {
      let lists = this.list
      return lists
    }
  },
  methods: {
    category (index) {
      let categorys = this.sharedState.state.const.category
      return categorys[index]
    },
    completed (item) {
      let key = ''
      firebase.database().ref('memoLists/').on('value', snapshot => { // eslint-disable-line
        if (snapshot) {
          let count = 0
          snapshot.forEach((val) => {
            if (count === item) {
              key = val.key
            }
            count++
          })
        }
      })
      firebase.database().ref(`memoLists/${key}`).update({ // eslint-disable-line
        'completed': true
      })
    },
    listen () {
      firebase.database().ref('memoLists/').on('value', snapshot => { // eslint-disable-line
        if (snapshot) {
          const rootList = snapshot.val()
          this.list = []
          Object.keys(rootList).forEach((val, key) => {
            rootList[val].id = val
            this.list.push(rootList[val])
          })
        }
      })
      return this.list
    }
  }
}
</script>

<style>
    .input-group__details {
      display: none;
    }
</style>

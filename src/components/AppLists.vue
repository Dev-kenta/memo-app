<template>
    <v-card>
        <v-container
                fluid
                style="min-height: 0;"
                grid-list-lg
        >
            <v-layout row wrap>
                <v-flex xs12 v-for="(list,index) in lists" :key="index" v-if="!list.deleted">
                    <v-card color="blue-grey lighten-2" class="white--text" v-bind:class="state(list.completed)">
                        <v-btn v-bind:color="list.cardClass" class="white--text category_label">{{ category(list.category) }}</v-btn>
                        <v-card-title primary-title>
                            <v-flex xs2>
                                <v-checkbox v-model="checkbox[index]" @click="completed(index,list.completed)"></v-checkbox>
                            </v-flex>
                            <v-flex xs8>
                                <div class="headline" xs6 align="left">{{ list.name }}</div>
                            </v-flex>
                            <v-flex xs2>
                                <v-btn icon @click="deleted(index)">
                                  <v-icon>clear</v-icon>
                                </v-btn>
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
      list: [],
      db: PropertyStore.state.db[process.env.NODE_ENV]
    }
  },
  mounted () {
    this.list = this.listen()
    this.checkbox = this.completedState()
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
    completed (item, state) {
      let key = ''
      firebase.database().ref(`${this.db}/`).on('value', snapshot => { // eslint-disable-line
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
      if (state) {
        firebase.database().ref(`${this.db}/${key}`).update({ // eslint-disable-line
          'completed': false
        })
        this.checkbox[item] = false
      } else {
        firebase.database().ref(`${this.db}/${key}`).update({ // eslint-disable-line
          'completed': true
        })
        this.checkbox[item] = true
      }
    },
    deleted (item) {
      let key = ''
      firebase.database().ref(`${this.db}/`).on('value', snapshot => { // eslint-disable-line
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
      firebase.database().ref(`${this.db}/${key}`).update({ // eslint-disable-line
        'deleted': true
      })
    },
    state (state) {
      if (state) {
        return 'completed'
      }
    },
    listen () {
      firebase.database().ref(`${this.db}/`).on('value', snapshot => { // eslint-disable-line
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
    },
    completedState () {
      firebase.database().ref(`${this.db}/`).on('value', snapshot => { // eslint-disable-line
        if (snapshot) {
          const rootList = snapshot.val()
          this.checkbox = []
          Object.keys(rootList).forEach((val, key) => {
            rootList[val].id = val
            this.checkbox.push(rootList[val]['completed'])
          })
        }
      })
      return this.checkbox
    }
  }
}
</script>

<style>
    .input-group__details {
      display: none;
    }
    .card.completed {
        opacity: 0.4;
    }
    .card.completed .headline {
        text-decoration: line-through;
    }
    .container .category_label {
        position: absolute;
        top: -15px;
        left: -15px;
    }
</style>

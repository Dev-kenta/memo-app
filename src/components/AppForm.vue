<template>
  <v-content>
    <v-container fluid>
      <v-layout row>
        <v-flex xs10 offset-xs1>
          <v-form @submit.prevent="submit">
            <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="商品名"
                    required
            ></v-text-field>
            <v-radio-group
                    v-model="radios"
                    :mandatory="false"
            >
              <v-radio
                      v-for="(item,index) in categorys"
                      :key="index"
                      :label="item"
                      :value="index"
              ></v-radio>
            </v-radio-group>
            <v-btn @click="submit">追加</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import PropertyStore from '../models/store.js'
export default {
  data: () => ({
    sharedState: PropertyStore,
    db: PropertyStore.state.db[process.env.NODE_ENV],
    name: '',
    nameRules: [
      v => !!v || '商品名は必須です'
    ],
    radios: '0',
    categorys: PropertyStore.state.const.category
  }),
  methods: {
    submit () {
      let cardClass = ''
      if (this.radios === '0') {
        cardClass = 'cyan darken-2'
      } else if (this.radios === '1') {
        cardClass = 'pink darken-2'
      } else if (this.radios === '2') {
        cardClass = 'lime darken-2'
      } else if (this.radios === '3') {
        cardClass = 'deep-orange darken-2'
      }
      firebase.database().ref(`${this.db}/`).push({ // eslint-disable-line
        name: this.name,
        category: this.radios,
        completed: false,
        deleted: false,
        cardClass: cardClass
      })
      this.name = ''
    }
  }
}
</script>

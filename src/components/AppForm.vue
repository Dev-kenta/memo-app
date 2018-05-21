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
                      :label="item.name"
                      :value="item.name"
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
export default {
  data: () => ({
    memoLists: [],
    name: '',
    nameRules: [
      v => !!v || '商品名は必須です'
    ],
    radios: '食料品',
    categorys: [
      { name: '食料品' },
      { name: '飲み物' },
      { name: 'お菓子' }
    ]
  }),
  mounted () {
    this.memoLists = JSON.parse(localStorage.getItem('memoLists')) || []
  },
  methods: {
    submit () {
      this.memoLists.push(
        { name: this.name, category: this.radios }
      )
      localStorage.setItem('memoLists', JSON.stringify(this.memoLists))
      this.name = ''
    }
  }
}
</script>

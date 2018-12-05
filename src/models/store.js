let PropertyStore = {
  state: {
    property: {
      memoLists: []
    },
    const: {
      category: {
        0: '食料品',
        1: '飲み物',
        2: 'お菓子',
        3: '雑貨'
      }
    },
    db: {
      development: 'memoLists-local',
      production: 'memoLists'
    }
  }
}
export default PropertyStore

import API from '@/services/API'

export default {
  fetchCategory (name, page) {
    return API().get('categories/' + name + '/products/pages/' + page)
  },
  fetchCategories () {
    return API().get('categories')
  },
  fetchSearchedCategories (name) {
    return API().get('categories/' + name)
  }
}

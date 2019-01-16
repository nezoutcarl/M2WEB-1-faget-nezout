import API from '@/services/API'

export default {
  fetchCategories () {
    return API().get('categories')
  }
}

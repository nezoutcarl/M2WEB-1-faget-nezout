import API from '@/services/API'

export default {
  fetchProducts (page) {
    return API().get('products/' + page)
  }
}

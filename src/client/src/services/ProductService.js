import API from '@/services/API'

export default {
  fetchProduct (code) {
    return API().get('products/' + code)
  },
  fetchProducts (page) {
    return API().get('products/pages/' + page)
  },
  fetchSearchedProducts (code, page) {
    return API().get('products/' + code + '/pages/' + page)
  }
}

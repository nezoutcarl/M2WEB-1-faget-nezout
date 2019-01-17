import API from '@/services/API'

export default {
  fetchProduct (code) {
    return API().get('product/' + code)
  },
  fetchProducts (page) {
    return API().get('products/' + page)
  },
  fetchSearchedProducts (code, page) {
    return API().get('products/' + code + '/' + page)
  }
}

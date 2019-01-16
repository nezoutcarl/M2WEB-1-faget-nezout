import API from '@/services/API'

export default {
  fetchProduct (code) {
    return API().get('product/' + code)
  }
}

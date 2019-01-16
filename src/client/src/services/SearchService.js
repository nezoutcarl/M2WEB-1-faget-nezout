import API from '@/services/API'

export default {
  fetchSearch (code, page) {
    return API().get('products/' + code + '/' + page)
  }
}

import API from '@/services/API'

export default {
  fetchCategory (id, page) {
    return API().get('category/' + id + '/products/' + page)
  }
}

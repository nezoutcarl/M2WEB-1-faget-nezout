import API from '@/services/API'

export default {
  fetchCountry (id, page) {
    return API().get('country/' + id + '/products/' + page)
  }
}

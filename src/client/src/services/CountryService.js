import API from '@/services/API'

export default {
  fetchCountry (name, page) {
    return API().get('country/' + name + '/products/' + page)
  },
  fetchCountries () {
    return API().get('countries')
  },
  fetchSearchedCountries (name) {
    return API().get('countries/' + name)
  }
}

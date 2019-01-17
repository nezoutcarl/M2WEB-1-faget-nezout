import API from '@/services/API'

export default {
  fetchCountry (name, page) {
    return API().get('countries/' + name + '/products/pages/' + page)
  },
  fetchCountries () {
    return API().get('countries')
  },
  fetchSearchedCountries (name) {
    return API().get('countries/' + name)
  }
}

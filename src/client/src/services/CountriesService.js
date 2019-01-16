import API from '@/services/API'

export default {
  fetchCountries () {
    return API().get('countries')
  }
}

import API from '@/services/API'

export default {
  fetchTest () {
    return API().get('test')
  }
}

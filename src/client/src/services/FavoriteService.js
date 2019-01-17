import API from '@/services/API'

export default {
  fetchUserFavorites () {
    return API().get('favorites')
  }
}

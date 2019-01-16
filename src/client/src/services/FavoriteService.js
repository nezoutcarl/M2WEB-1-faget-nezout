import API from '@/services/API'

export default {
  fetchUserFavorite () {
    return API().get('favorites')
  }
}

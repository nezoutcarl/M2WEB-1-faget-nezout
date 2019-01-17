import API from '@/services/API'

export default {
  fetchAddFavorite (id, code) {
    return API().post('users/' + id + '/favorites', {code: code})
  },
  fetchRemoveFavorite (id, code) {
    return API().delete('users/' + id + '/favorites/' + code)
  },
  fetchFavorites (id) {
    return API().get('users/' + id + '/favorites')
  }
}

import API from '@/services/API'

export default {
  fetchBrand (name, page) {
    return API().get('brand/' + name + '/products/' + page)
  },
  fetchBrands () {
    return API().get('brands')
  }
}

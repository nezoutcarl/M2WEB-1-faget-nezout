import API from '@/services/API'

export default {
  fetchBrand (name, page) {
    return API().get('brands/' + name + '/products/pages/' + page)
  },
  fetchBrands () {
    return API().get('brands')
  }
}

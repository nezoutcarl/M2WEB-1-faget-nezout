<template>
  <div class="product">
    <div class="jumbotron">
      <h1 class="display-3">Product</h1>
      <div slot="media">
          <img v-bind:src="product.image_url" /><br/>
          <span><img :src="getNutriScore(product.nutrition_grades)" alt="No nutrition grade."></span>
          <span><img :src="getNovaGroup(product.nova_group)" alt="No nova group."></span>
      </div>
      <b-table stacked :items="items" :fields="fields"></b-table>
    </div>
  </div>
</template>

<script>
import ProductService from '@/services/ProductService'
export default {
  name: 'product',
  data () {
    return {
      fields: ['code', 'generic_name', 'product_name',
        'brands', 'origins', 'categories',
        'product_quantity', 'ingredients_text_with_allergens',
        'fat_100g', 'saturated_fat_100g', 'sugars_100g', 'salt_100g',
        'fat', 'saturated_fat', 'sugars', 'salt'],
      product: [],
      items: []
    }
  },
  mounted () {
    this.getProduct(this.$route.params.code)
  },
  methods: {
    async getProduct (code) {
      const response = await ProductService.fetchProduct(code)
      this.product = response.data
      this.setItems()
    },

    setItems () {
      this.items = [{
        code: this.product.code,
        generic_name: this.product.generic_name,
        product_name: this.product.product_name,
        brands: this.product.brands,
        origins: this.product.origins,
        categories: this.product.categories,
        product_quantity: this.product.product_quantity + 'g',
        ingredients_text_with_allergens: this.product.ingredients_text_with_allergens,
        fat_100g: this.product.fat_100g,
        saturated_fat_100g: this.product.saturated_fat_100g,
        sugars_100g: this.product.sugars_100g,
        salt_100g: this.product.salt_100g,
        fat: this.product.fat,
        saturated_fat: this.product.saturated_fat,
        sugars: this.product.sugars,
        salt: this.product.salt
      }]
    },

    getNovaGroup (novaGroup) {
      return 'http://static.openfoodfacts.net/images/misc/nova-group-' + novaGroup + '.svg'
    },

    getNutriScore (nutriScore) {
      return 'http://static.openfoodfacts.org/images/misc/nutriscore-' + nutriScore + '.png'
    }
  }
}
</script>

<template>
  <div class="product">
    <h1>Product</h1>

    <div slot="media">
        <img v-bind:src="product.image_url" />
    </div>

    <div slot="media">
        <img v-bind:src="product.image_front_small_url" />
    </div>

    <p>
        <span><b>{{ product.saturated_fat_100g }}</b></span><br />
        <span><b>{{ product.sugars_100g }}</b></span><br />
        <span><b>{{ product.salt_100g }}</b></span><br />
        <span><b>{{ product.fat }}</b></span><br />
        <span><b>{{ product.saturated_fat }}</b></span><br />
        <span><b>{{ product.sugars }}</b></span><br />
        <span><b>{{ product.salt }}</b></span><br />
        <span><b>{{ product.nutrition_grades }}</b></span><br />
        <span><b>{{ product.nova_group }}</b></span><br />
    </p>

    <b-table stacked :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
import ProductService from '@/services/ProductService'
export default {
  name: 'product',
  data () {
    return {
      fields: ['code', 'generic_name',
       'product_name', 'brands', 'origins',
        'categories',
         'product_quantity', 'ingredients_text_with_allergens', 'fat_100g', 'nova_group', 'nutrition_grades'],
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
        nova_group: this.product.nova_group,
        nutrition_grades: this.product.nutrition_grades
      }]
    }
  }
}
</script>

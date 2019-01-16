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
        <span><b>{{ product.code }}</b></span><br />
        <span><b>{{ product.generic_name }}</b></span><br />
        <span><b>{{ product.product_name }}</b></span><br />
        <span><b>{{ product.brands }}</b></span><br />
        <span><b>{{ product.origins }}</b></span><br />
        <span><b>{{ product.categories }}</b></span><br />
        <span><b>{{ product.product_quantity }}</b></span><br />
        <span><b>{{ product.ingredients_text_with_allergens }}</b></span><br />
        <span><b>{{ product.fat_100g }}</b></span><br />
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
  </div>
</template>

<script>
import ProductService from '@/services/ProductService'
export default {
  name: 'product',
  data () {
    return {
      product: []
    }
  },
  mounted () {
    this.getProduct(this.$route.params.code)
  },
  methods: {
    async getProduct (code) {
      const response = await ProductService.fetchProduct(code)
      this.product = response.data
    }
  }
}
</script>

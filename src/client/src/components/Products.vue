<template>
  <div class="products">
    <h1>Products</h1>

    <span><b>{{ products.page }}</b></span><br />
    <span><b>{{ products.page_size }}</b></span><br />
    <span><b>{{ products.count }}</b></span><br />

    <div v-for="(product, index) in products.elements" :key="index">
        <div slot="media">
            <img v-bind:src="product.image_front_small_url" />
        </div>

        <p>
            <span><b>{{ product.product_name }}</b></span><br />
            <span><b>{{ product.nutrition_grades }}</b></span><br />
            <span><b>{{ product.nova_group }}</b></span><br />
        </p>
    </div>

    <div slot="media">
        <img v-bind:src="products.image_url" />
    </div>

    <p>
    </p>
  </div>
</template>

<script>
import ProductsService from '@/services/ProductsService'
export default {
  name: 'products',
  data () {
    return {
      products: []
    }
  },
  mounted () {
    this.getProducts(this.$route.params.page)
  },
  methods: {
    async getProducts (page) {
      const response = await ProductsService.fetchProducts(page)
      this.products = response.data
    }
  }
}
</script>

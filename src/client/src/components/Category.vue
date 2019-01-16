<template>
  <div class="category">
    <h1>Category</h1>

    <span><b>{{ category.page }}</b></span><br />
    <span><b>{{ category.page_size }}</b></span><br />
    <span><b>{{ category.count }}</b></span><br />

    <div v-for="(product, index) in category.elements" :key="index">
        <div slot="media">
            <a v-bind:href="'/product/' + product.code"><img v-bind:src="product.image_front_small_url" /></a>
        </div>

        <p>
            <span><a v-bind:href="'/product/' + product.code"><b>{{ product.product_name }}</b></a></span><br />
            <span><b>{{ product.nutrition_grades }}</b></span><br />
            <span><b>{{ product.nova_group }}</b></span><br />
        </p>
    </div>
  </div>
</template>

<script>
import CategoryService from '@/services/CategoryService'
export default {
  name: 'category',
  data () {
    return {
      category: []
    }
  },
  mounted () {
    this.getCategory(this.$route.params.id, this.$route.params.page)
  },
  methods: {
    async getCategory (id, page) {
      const response = await CategoryService.fetchCategory(id, page)
      this.category = response.data
    }
  }
}
</script>

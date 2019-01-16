<template>
  <div class="categories">
    <h1>Categories</h1>

    <span><b>{{ categories.count }}</b></span><br />

    <div v-for="(category, index) in categories.elements" :key="index">
        <span><a v-bind:href="'/category/' + category.id + '/products/1'"><b>{{ category.name }}</b></a></span><br />
        <span><b>{{ category.products }}</b></span><br />
    </div>
  </div>
</template>

<script>
import CategoriesService from '@/services/CategoriesService'
export default {
  name: 'categories',
  data () {
    return {
      categories: []
    }
  },
  mounted () {
    this.getCategories()
  },
  methods: {
    async getCategories () {
      const response = await CategoriesService.fetchCategories()
      this.categories = response.data
    }
  }
}
</script>

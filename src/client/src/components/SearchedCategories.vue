<template>
  <div class="searched_categories">
    <div class="jumbotron">
      <h1 class="display-3">Searched categories</h1>
    </div>
    <b-card-group columns>
      <div v-for="(category, index) in categories.elements" :key="index">
        <b-card class="rounded" :header="category.name"
                                  header-text-variant="white"
                                  header-tag="header"
                                  header-bg-variant="dark"
                                  footer-tag="footer"
                                  footer-bg-variant="warning"
                                  style="max-width: 30rem;"
                                  align="center">
          <p class="card-text">
            <router-link :to="{path: '/categories/' + category.name + '/products/pages/1'}">
              <button type="button" class="btn btn-primary">Open</button>
            </router-link>
          </p>
        </b-card>
      </div>
    </b-card-group>
  </div>
</template>

<script>
import CategoryService from '@/services/CategoryService'
export default {
  name: 'categories',
  data () {
    return {
      categories: []
    }
  },
  mounted () {
    this.getSearchedCategories(this.$route.params.name)
  },
  methods: {
    async getSearchedCategories (name) {
      const response = await CategoryService.fetchSearchedCategories(name)
      this.categories = response.data
    }
  }
}
</script>

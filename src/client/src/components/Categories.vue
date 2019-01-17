<template>
  <div class="categories">
    <div class="jumbotron">
      <h1 class="display-3">Categories</h1>
      <p class="lead">Categories found: {{ categories.count }}<br />
      <input v-model="message" placeholder="">
      <router-link :to="{path: '/categories/' + message}">
        <button type="button" class="btn btn-primary"><i class="fa fa-search"></i></button>
      </router-link>
      </p>
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
            <span><b>{{ category.products }} products</b></span>
          </p>
          <div slot="footer">
            <router-link :to="{path: '/categories/' + category.name + '/products/pages/1'}">
              <button type="button" class="btn btn-primary">Open</button>
            </router-link>
          </div>
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
      categories: [],
      message: ''
    }
  },
  mounted () {
    this.getCategories()
  },
  methods: {
    async getCategories () {
      const response = await CategoryService.fetchCategories()
      this.categories = response.data
    }
  }
}
</script>

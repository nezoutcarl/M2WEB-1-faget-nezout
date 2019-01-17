<template>
  <div id="parentx">
    <vs-button @click="active=!active, notExpand=false" color="success" type="filled"><i class="fa fa-bars    "></i> Menu</vs-button>
    <vs-sidebar :reduce="reduce" :reduce-not-hover-expand="notExpand" parent="body" default-index="1"  color="success" class="sidebarx" spacer v-model="active">

      <div class="header-sidebar"  vs-align="flex-start" slot="header">
        <vs-avatar  size="70px" :src="$auth.user.picture"/>
        <h4>{{$auth.user.name}}</h4>
      </div>
      <vs-sidebar-group open title="Application">
        <vs-sidebar-item index="1" icon="menu" @click="reduce=!reduce">
          Toggle Sidebar
        </vs-sidebar-item>
        <vs-sidebar-item index="5" icon="bookmarks">
          Favorites
        </vs-sidebar-item>
        <vs-sidebar-group icon="search" title="Research">
          <vs-sidebar-item index="2.1" icon="store" href="/products/1">
            Products
          </vs-sidebar-item>
          <vs-sidebar-item index="2.2" icon="local_activity" href="/brands">
            Brands
          </vs-sidebar-item>
          <vs-sidebar-item index="2.2" icon="category" href="/categories">
            Categories
          </vs-sidebar-item>
          <vs-sidebar-item index="2.2" icon="flag" href="/countries">
            Countries
          </vs-sidebar-item>
        </vs-sidebar-group>
      </vs-sidebar-group>

      <vs-divider icon="person" position="left">
        User
      </vs-divider>

      <vs-sidebar-item index="6" icon="account_box">
        Profile
      </vs-sidebar-item>

      <div class="footer-sidebar" slot="footer">
        <vs-button icon="reply" color="danger" type="border" @click="$auth.logout()"><span >Log Out</span></vs-button>
      </div>

    </vs-sidebar>
  </div>
</template>

<script>

export default {
  name: 'app-nav',
  data: () => ({
    active: false,
    notExpand: false,
    reduce: false
  }),
  methods: {
    navigateToProducts () {
      this.$router.push({name: 'Products'})
    },

    navigateToCategories () {
      this.$router.push({name: 'Categories'})
    }
  }
}
</script>

<style >
@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
</style>

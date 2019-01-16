<template>
  <div id="parentx">
    <vs-sidebar :reduce="reduce" :reduce-not-hover-expand="notExpand" parent="body" default-index="1"  color="success" class="sidebarx" spacer v-model="active">

      <div class="header-sidebar"  vs-align="flex-start" slot="header">
        <vs-avatar  size="70px" :src="$auth.user.picture"/>
        <h4>{{$auth.user.name}}</h4>
      </div>
      <vs-sidebar-group open title="Application">
        <vs-sidebar-item index="1" icon="menu" @click="reduce=!reduce">
         Toggle Sidebar
        </vs-sidebar-item>
        <vs-sidebar-item index="5" icon="verified_user">
          Configurations
        </vs-sidebar-item>
        <vs-sidebar-group icon="search" title="Recherche">
          <vs-sidebar-item index="2.1" icon="store">
            Store
          </vs-sidebar-item>
          <vs-sidebar-item index="2.2" icon="nature_people">
            Nature
          </vs-sidebar-item>
          <vs-sidebar-item index="2.3" icon="style">
            Style
          </vs-sidebar-item>
        </vs-sidebar-group>
        <vs-sidebar-item index="2" icon="gavel">
          History
        </vs-sidebar-item>
        <vs-idebsar-item index="3" icon="https">
          Security
        </vs-idebsar-item>
        <vs-sidebar-item index="4" icon="help">
          Help
        </vs-sidebar-item>
      </vs-sidebar-group>

      <vs-divider icon="person" position="left">
        User
      </vs-divider>

      <vs-sidebar-item index="6" icon="account_box">
        Profile
      </vs-sidebar-item>

      <div class="footer-sidebar" slot="footer">
        <vs-button icon="reply" color="danger" type="border" @click="$auth.logout()">log out</vs-button>
      </div>

    </vs-sidebar>
  </div>
</template>

<script>

export default {
  name: 'app-nav',
  data () {
    return {
      active: true,
      notExpand: false,
      reduce: true
    }
  }
}
</script>

<style>
@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
</style>

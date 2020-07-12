<template>
  <AdminLayout :title="title">
    <transition 
      name="fade" 
      mode="out-in">
      <router-view/>
    </transition>
  </AdminLayout>
</template>
<script type="text/babel">
import AdminLayout from 'component/layout/admin';

export default {
  components: {
    AdminLayout,
  },
  computed: {
    title() {
      return this.$store.state.title;
    }
  },
  mounted() {},
};
</script>

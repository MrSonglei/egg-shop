<template>
  <div>
    <el-form :model="form">
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          v-model="form.description"
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { SET_ROLE_DETAL } from '../../store/app/mutation-type'
export default {
  data() {
    return {
      
    }
  },
  computed: {
    form() {
      return this.$store.state.roleDetail
    }
  },
  methods: {
    fetchApi(store, route, params = {}) {
      return store.dispatch(SET_ROLE_DETAL, {
        id: route.params.id
      })
    },
    onSubmit() {
      this.$request
        .post('/api/admin/role/edit', this.form, this.$store)
        .then(({ data }) => {
          if(data.code == 1) {
            this.$router.push('/role')
          } else {
            this.$message({
              message: data.msg,
              type: 'warning'
            })
          }
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
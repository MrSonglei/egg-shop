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
        >立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$request
        .post('/api/admin/role/add', this.form, this.$store)
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
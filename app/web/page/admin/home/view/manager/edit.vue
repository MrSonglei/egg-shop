<template>
  <div>
    <el-form :model="form">
      <el-form-item label="管理员名称">
        <el-input
          v-model="form.username"
          disabled
        />
      </el-form-item>
      <el-form-item label="旧密码">
        <el-input v-model="form.oldPassword" />
      </el-form-item>
      <el-form-item label="旧密码">
        <el-input v-model="form.newPassword" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.mobile" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="管理员角色">
        <el-select
          v-model="form.role_id"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item._id"
            :label="item.title"
            :value="item._id"
          />
        </el-select>

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
import { SET_MANAGER_DETAL, SET_ROLE_LIST } from '../../store/app/mutation-type'
import { log } from 'util'
export default {
  data() {
    return {}
  },
  computed: {
    form() {
      return {
        ...this.$store.state.managerDetail,
        oldPassword: '',
        newPassword: ''
      }
    },
    options() {
      return this.$store.state.roleList
    }
  },
  methods: {
    fetchApi(store, route, params = {}) {
      store.dispatch(SET_ROLE_LIST, {})
      return store.dispatch(SET_MANAGER_DETAL, {
        id: route.params.id
      })
      // store.dispatch(SET_ROLE_LIST, params)
    },
    onSubmit() {
      this.$request
        .post('/api/admin/manager/edit', this.form, this.$store)
        .then(({ data }) => {
          if (data.code == 1) {
            this.$router.push('/manager')
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
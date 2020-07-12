<template>
  <div>
    <el-form :model="form">
      <el-form-item label="模块名称">
        <el-input v-model="form.module_name" />
      </el-form-item>
      <el-form-item label="操作地址">
        <el-input v-model="form.url" />
      </el-form-item>
      <el-form-item label="所属模块">
        <el-select
          v-model="form.module_id"
          placeholder="请选择"
        >
          <el-option
            label="顶级模块"
            value="0"
          />
          <el-option
            v-for="item in moduleList"
            :key="item._id"
            :label="item.module_name"
            :value="item._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select
          v-model="form.type"
          placeholder="请选择"
        >
          <el-option
            label="菜单"
            value="1"
          />
          <el-option
            label="非菜单"
            value="2"
          />
        </el-select>
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
import {
  SET_ACCESS_LIST,
  SET_ACCESS_DETAIL
} from '../../store/app/mutation-type'
export default {
  data() {
    return {
      // form: {
      //   module_name: '',
      //   module_id: '',
      //   url: '',
      //   action_name: '',
      //   type: '1',
      //   sort: '',
      //   description: ''
      // }
    }
  },
  computed: {
    moduleList() {
      return this.$store.state.moduleList
    },
    form() {
      return this.$store.state.accessDetail
    }
  },
  methods: {
    fetchApi(store, route, params = {}) {
      store.dispatch(SET_ACCESS_DETAIL, {
        id: route.params.id
      })
      if (!store.state.moduleList.length) {
        return store.dispatch(SET_ACCESS_LIST, params)
      }
    },
    onSubmit() {
      this.$request
        .post('/api/admin/access/edit', this.form, this.$store)
        .then(({ data }) => {
          if (data.code == 1) {
            this.$router.push('/access')
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
<template>
  <div>
    <div style="margin: 10px">
      <el-button
        type="primary"
        @click="add"
      >新增</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column width="150">
        <template slot-scope="scope">
          <el-button
            type="success"
            @click="edit(scope.$index, scope.row)"
          >修改</el-button>
          <el-button
            type="danger"
            @click="del(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="username"
        label="管理员名称"
      />
      <el-table-column
        prop="mobile"
        label="手机号"
      />
      <el-table-column
        prop="email"
        label="邮箱"
      />
      <el-table-column
        prop="role_title"
        label="角色"
      />
    </el-table>
  </div>
</template>

<script>
import { SET_MANAGER_LIST } from '../../store/app/mutation-type'
export default {
  data() {
    return {}
  },
  computed: {
    tableData() {
      return this.$store.state.managerList
    }
  },
  methods: {
    fetchApi(store, route, params = {}) {
      return store.dispatch(SET_MANAGER_LIST, params)
    },
    add() {
      this.$router.push('/manager/add')
    },
    edit(index, row) {
      this.$router.push({
        path: '/manager/edit/' + row._id
      })
    },
    del(index, row) {
      this.$request
        .get('/api/admin/manager/del/'+ row._id, this.$store)
        .then(({ data }) => {
          if(data.code == 1) {
            this.fetchApi(this.$store, this.$route)
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
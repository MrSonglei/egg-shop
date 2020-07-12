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
        prop="title"
        label="角色名称"
        width="180"
      />
      <el-table-column
        prop="description"
        label="角色描述"
        width="180"
      />
      <el-table-column
        prop="status"
        label="状态"
      />
      <el-table-column
        prop="add_time"
        label="添加时间"
      />
    </el-table>
  </div>
</template>

<script>
import { SET_ROLE_LIST } from '../../store/app/mutation-type'
export default {
  data() {
    return {}
  },
  computed: {
    tableData() {
      return this.$store.state.roleList
    },
    total() {
      return this.$store.state.articleTotal
    }
  },
  methods: {
    fetchApi(store, route, params = {}) {
      return store.dispatch(SET_ROLE_LIST, params)
    },
    add() {
      this.$router.push('/role/add')
    },
    edit(index, row) {
      this.$router.push({
        path: '/role/edit/' + row._id
      })
    },
    del(index, row) {
      this.$request
        .get('/api/admin/role/del/'+ row._id, this.$store)
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
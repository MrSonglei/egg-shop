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
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      row-key="_id"
      border
      default-expand-all
      style="width: 100%"
    >
      <el-table-column width="80"/>
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
        prop="module_name"
        label="模块名称"
        width="180"
      />
      <el-table-column
        prop="type"
        label="节点类型"
        width="180"
        :formatter="typeFormatter"
      />
      <el-table-column
        prop="sort"
        label="排序"
      />
      <el-table-column
        prop="description"
        label="描述"
      />
    </el-table>
  </div>
</template>

<script>
import { SET_ACCESS_LIST } from '../../store/app/mutation-type'
import { log } from 'util'
export default {
  data() {
    return {}
  },
  computed: {
    tableData() {
      return this.$store.state.accessList
    }
  },
  mounted() {
    console.log(this.$store.state.accessList)
  },
  methods: {
    fetchApi(store, route, params = {}) {
      return store.dispatch(SET_ACCESS_LIST, params)
    },
    add() {
      this.$router.push('/access/add')
    },
    edit(index, row) {
      this.$router.push({
        path: '/access/edit/' + row._id
      })
    },
    del(index, row) {
      this.$request
        .get('/api/admin/access/del/' + row._id, this.$store)
        .then(({ data }) => {
          if (data.code == 1) {
            this.fetchApi(this.$store, this.$route)
          } else {
            this.$message({
              message: data.msg,
              type: 'warning'
            })
          }
        })
        .catch(() => {})
    },
    typeFormatter(row, column, cellvalue) {
      if(cellvalue == '1') {
        return '菜单'
      } 
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
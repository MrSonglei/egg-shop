'use strict';

const Base = require('../Base');

class ManagerController extends Base {
  async list() {
    try {
      let list = await this.ctx.model.Admin.aggregate([
        {
          $match: {
            is_super: 0//匹配number>=100的记录
          }
        },
        {
          $lookup: {
            from: 'role',
            localField: 'role_id',
            foreignField: '_id',
            as: 'role'
          }
        }])
      list = list.map(item => {
        return {
          _id: item._id,
          username: item.username,
          mobile: item.mobile,
          email: item.email,
          role_title: item.role.length ? item.role[0].title : ''
        }
      })
      this.ctx.body = {
        list,
        code: 0,
        msg: '操作成功'
      }
    } catch (error) {
      this.ctx.redirect('/error')
    }
  }
  async add() {
    let { username, email, mobile, role_id } = this.ctx.request.body
    let password = this.ctx.service.tools.md5(this.ctx.request.body.password)
    let admin = new this.ctx.model.Admin({
      username, email, mobile, role_id, password
    })
    try {
      await admin.save()
      this.ctx.body = {
        code: 1,
        msg: '操作成功'
      }
    } catch (error) {
      (error);
      this.ctx.body = {
        code: 0
      }
      // this.ctx.redirect('/error', {
      //   msg: '服务端错误'
      // })
    }
  }
  async edit() {
    let { username, email, mobile, role_id, _id } = this.ctx.request.body
    try {
      let result = await this.ctx.model.Admin.findOne({ _id })
      if (result) {
        await this.ctx.model.Admin.updateOne({
          _id
        }, {
          $set: {
            username, email, mobile, role_id
          }
        })
      }
      this.ctx.body = {
        code: 1,
        msg: '操作成功'
      }
    } catch (error) {
      this.ctx.redirect('/error', {
        msg: '服务端错误'
      })
    }

  }
  async del() {
    let id = this.ctx.params.id
    let result = await this.ctx.model.Admin.findOne({ _id: id })
    if (result) {
      await this.ctx.model.Admin.deleteOne({
        _id: id
      })
    }
    this.ctx.body = {
      code: 1,
      msg: '操作成功'
    }

  }
  async detail() {
    let id = this.ctx.request.body.id
    try {
      let { _id, username, mobile, email, role_id } = await this.ctx.model.Admin.findOne({
        _id: id
      })
      this.ctx.body = {
        _id, username, mobile, email, role_id
      }
    } catch (error) {
      this.redirect('/error')
    }
  }
}

module.exports = ManagerController;

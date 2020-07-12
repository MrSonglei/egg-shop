'use strict';

const Base = require('../Base');

class RoleAccessController extends Base {
  async list() {
    try {
      let list = await this.ctx.model.Access.find({})
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
    let body = this.ctx.request.body
    let access = new this.ctx.model.Access(body)
    try {
      await access.save()
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
  async edit() {
    let body = this.ctx.request.body
    let id = this.ctx.request.body._id
    try {
      let result = await this.ctx.model.Role.findOne({ _id: id })
      if (result) {
        await this.ctx.model.Role.updateOne({
          _id: id
        }, {
          $set: {
            body
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
    let result = await this.ctx.model.Role.findOne({ _id: id })
    if (result) {
      await this.ctx.model.Role.deleteOne({
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
      let result = await this.ctx.model.Access.findOne({
        _id: id
      })
      this.ctx.body = result
    } catch (error) {
      this.redirect('/error')
    }
  }
}

module.exports = RoleAccessController;

/**
 * 
 * https://shuju.wdzj.com/platdata-1.html
 * 
 * yuanjie
 */
const schedule = require('node-schedule');
const express = require('express')
const superagent = require('superagent')
const Wdzj = require('../service/wdzj')

let app = express()

/**
 * 每天18点 自动抓取数据
*/
app.get('/spider', function (req, res, next) {
  schedule.scheduleJob({ hour: 16,minute: 15,second: 0 }, () => {
    let wdzjService = new Wdzj()
    superagent.post('https://shuju.wdzj.com/plat-data-custom.html')//请求地址
      .end(async function (err, sres) {//获取到的数据
        if (err) return next(err)
        let list = []
        if (sres && sres.hasOwnProperty('text')) {
          list = JSON.parse(sres.text)
        }
        let successfulNum = 0
        let failuresNum = 0
        let index = 1
        for (let item of list) {
          item.amountIndex = index
          await wdzjService.insert(item).then(() => {
            successfulNum += 1
          }).catch((err) => {
            console.log(err)
            failuresNum += 1
          })
          index++
        }
        let data = new Date()
        let resultMessage = `${data} 抓取数据：${list.length}；成功数量：${successfulNum}; 失败数量：${failuresNum}`
        logger.info(resultMessage)
      })
  })
  res.send('每天12:00点自动抓取数据!!!!!!!')
})

module.exports = app
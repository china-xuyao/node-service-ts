const express = require('express')
const request = require('superagent')
const cheerio = require('cheerio')
const app = express()
const Fund = require('../service/fund')
const fund = new Fund()
const PAGE_BASE_MAP = require('./config/fund.config')
const PAGE_ORG_MAP = require('./config/fund.org.config')

/**
 * http://gs.amac.org.cn/amac-infodisc/res/pof/manager/index.html
*/
app.get('/spider', (req, res) => {
  // 根据企业名称查找企业信息
  let index = 35285
  let method = async function () {
    for (; index < 100392; index++) {
      let requestUrl = 'http://gs.amac.org.cn/amac-infodisc/api/pof/fund?rand=0.32383577018974563&page=' + index + '&size=1'
      let resultData = await request.post(requestUrl)
        .send({})
        .then(function (sres) {//获取到的数据
          return sres
        }).catch(err => {
          logger.error(err)
        })
      if (!(resultData && resultData.hasOwnProperty('text'))) {
        break
      }
      let data = JSON.parse(resultData.text)

      if (typeof data.content === 'object' && data.content.length > 0) {
        let item = data.content[0]
        // 基金信息
        let pageUrl = `http://gs.amac.org.cn/amac-infodisc/res/pof/fund/${item.url.replace('../', '')}`
        // 基金管理人信息
        let pageOrgUrl = `http://gs.amac.org.cn/amac-infodisc/res/pof/${item.managerUrl.replace('../', '')}`
        let orgId = item.managerUrl.substring(
          item.managerUrl.lastIndexOf('/') + 1,
          item.managerUrl.lastIndexOf('.'))

        insertCommon(pageOrgUrl, PAGE_ORG_MAP, { id: orgId }).then(data => {
          fund.insertOrg(data).then(() => {
            logger.info('机构新增成功' + data.id + '|||||||' + index)
          }).catch(err => {
            logger.error(err.sqlMessage)
          })
        }).catch(err => {
          logger.info(err)
        })

        insertCommon(pageUrl, PAGE_BASE_MAP, { fund_org_id: orgId, id: item.id }).then(data => {
          fund.insert(data).then(() => {
            logger.info(`基金新增成功 ${data.id} |||||||' ${index}`)
          }).catch((err) => {
            logger.error(`基金新增失败' ${err.sqlMessage} ||||||||||||| ${index}`)
          })
        }).catch(err => {
          logger.error(err)
        })
        setTimeout(() => {

        }, 10);
      }
    }

    if (index < 100392) {
      method()
    }
    res.send('over!!!!!!!!')
  }
  method()
})

app.get('/query', (req, res) => {
  fund.query().then((data) => {
    logger.info('查询成功！！')
    res.send(data)
  })
})

function insertCommon (requestUrl, pageMap, params) {
  let resultData = {}
  if (params) {
    resultData = params
  }
  return new Promise((resolve) => {
    request.get(requestUrl)
      .timeout({
        response: 2000,  // Wait 5 seconds for the server to start sending,
        deadline: 6000, // but allow 1 minute for the file to finish loading.
      })
      .then(pageRes => {
        let html = pageRes.text
        const $ = cheerio.load(html)
        $('.td-title').each((index) => {
          let currentDom = $($('.td-title')[index])
          let fullname = currentDom.text().trim()
          fullname = fullname.substr(0, fullname.length - 1)
          if (pageMap.hasOwnProperty(fullname)) {
            let pageBase = pageMap[fullname + '']
            resultData[pageBase.column] = currentDom.next()[pageBase.fnName]().trim()
          }
        })
        resolve(resultData)
      }).catch(() => {

      })
  })
}


module.exports = app

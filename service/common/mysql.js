const MYSQL = require('mysql')
const MYSQL_CONFIG = require('../../config/mysql.config')
/**
 *  mysql common
 *  
 * @class mysql
 * @author xuyao
 */
class mysql {
  /**
   * 创建mysql连接池
   */
  constructor() {
    this.pool = MYSQL.createPool(MYSQL_CONFIG)
  }
  /**
   * 执行sql
   * @param {*} sql e.g.'UPDATE websites SET name = ?,url = ? WHERE Id = ?'
   * @param {*} params e.g. ['baidu', 'http://www.baidu.com','001']
   * @returns {Promise}
   */
  execute (sql, params) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          reject(err)
        }
        connection.query(sql, params, (err, result) => {
          connection.release()
          if (err) {
            reject(err)
          }
          resolve(result)
        })
      })
    })
  }
  /**
   * 解析参数-拼接sql
   * @param {*} sql  e.g.'UPDATE websites SET name = ?,url = ? WHERE Id = ?'
   * @param {Object} params e.g. { name: 'baidu', url: 'http://www.baidu.com', id: '001' }
   * @returns {String} sql
   */
  parseParams (sql, params) {
    let result = ''
    let sqlArray = sql.replace(/[\n\r]/g,'').split('\'')
    result = ''
    for (let val of sqlArray) {
      if (val != null) {
        val = val.trim()
        if (params.hasOwnProperty(val)) {
          result += `'${params[val]}'`
          continue
        } else if (val.indexOf(',') > -1) {
          result += val
        } else if (val.indexOf(')') > -1) {
          result += val
        }  else if (val != null) {
          result += 'null'
        }
      }
    }
    return result
  }
}
module.exports = mysql
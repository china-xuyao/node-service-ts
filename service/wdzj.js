module.exports = class wdzj {
  constructor() {
    this.sql = {
      query: `
        select 	id, 
        name, 
        account
        from 
        xuyao.user 
        limit 0, 50;
        `,
			insert: `
			
insert into boss.spider_wdzj 
(id, 
amountIndex,
amount, 
avgBidMoney, 
avgBorrowMoney, 
background, 
bidderNum, 
borrowerNum, 
businessTypeIdS, 
currentLeverageAmount, 
developZhishu, 
differStatus, 
endDate, 
firstLetter, 
fullloanTime, 
incomeRate, 
loanPeriod, 
logUrl, 
netInflowOfThirty, 
newbackground, 
onlineTime, 
platId, 
platName, 
prizeTypeDetail, 
regCapital, 
startDate, 
stayStillOfNextSixty, 
stayStillOfTotal, 
timeOperation, 
top10DueInProportion, 
top10StayStillProportion, 
totalLoanNum, 
wdzjPlatId, 
weightedAmount
)
values
('id', 
'amountIndex',
'amount', 
'avgBidMoney', 
'avgBorrowMoney', 
'background', 
'bidderNum', 
'borrowerNum', 
'businessTypeIdS', 
'currentLeverageAmount', 
'developZhishu', 
'differStatus', 
'endDate', 
'firstLetter', 
'fullloanTime', 
'incomeRate', 
'loanPeriod', 
'logUrl', 
'netInflowOfThirty', 
'newbackground', 
'onlineTime', 
'platId', 
'platName', 
'prizeTypeDetail', 
'regCapital', 
'startDate', 
'stayStillOfNextSixty', 
'stayStillOfTotal', 
'timeOperation', 
'top10DueInProportion', 
'top10StayStillProportion', 
'totalLoanNum', 
'wdzjPlatId', 
'weightedAmount'
)

        `
    }
  }

  query () {
    return mysqlPool.execute(this.sql.query)
  }

  insert (params) {
    let sql = mysqlPool.parseParams(this.sql.insert, params)
    return mysqlPool.execute(sql)
  }
}
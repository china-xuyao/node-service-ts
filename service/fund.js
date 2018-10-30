module.exports = class fund {
  constructor() {
    this.sql = {
      query: `
			select 	id, 
			fund_org_id, 
			fund_name, 
			fund_code, 
			established_time, 
			record_time, 
			record_phase, 
			fund_type, 
			currency, 
			manager_name, 
			manager_type, 
			trustee_name, 
			operation_status, 
			updatetime, 
			specialTips, 
			information_disclosure_m, 
			information_disclosure_h, 
			information_disclosure_y, 
			information_disclosure_q
			 
			from 
			boss.spider_fund 
			limit 0, 50
        `,
      insertFund: `
insert into boss.spider_fund 
(id, 
fund_org_id, 
fund_name, 
fund_code, 
established_time, 
record_time, 
record_phase, 
fund_type, 
currency, 
manager_name, 
manager_type, 
trustee_name, 
operation_status, 
updatetime, 
specialTips, 
information_disclosure_m, 
information_disclosure_h, 
information_disclosure_y, 
information_disclosure_q
)
values
('id', 
'fund_org_id', 
'fund_name', 
'fund_code', 
'established_time', 
'record_time', 
'record_phase', 
'fund_type', 
'currency', 
'manager_name', 
'manager_type', 
'trustee_name', 
'operation_status', 
'updatetime', 
'specialTips', 
'information_disclosure_m', 
'information_disclosure_h', 
'information_disclosure_y', 
'information_disclosure_q'
)

        `,
      insertFundOrg: `
insert into boss.spider_fund_org 
	(id, 
	org_integrity, 
	name_cn, 
	name_en, 
	regist_num, 
	org_code, 
	registration_time, 
	regtime, 
	regurl, 
	office_address, 
	registered_capital, 
	contributed_capital, 
	enterprise_property, 
	registered_capital_proportion, 
	org_type, 
	business_type, 
	employees, 
	org_website, 
	legal_opinion_state, 
	legal_person, 
	fund_qualification, 
	fund_qualification_method, 
	work_experience, 
	executive_situation, 
	before_fund, 
	after_fund, 
	lasttime, 
	special_tips
	)
	values
	('id', 
	'org_integrity', 
	'name_cn', 
	'name_en', 
	'regist_num', 
	'org_code', 
	'registration_time', 
	'regtime', 
	'regurl', 
	'office_address', 
	'registered_capital', 
	'contributed_capital', 
	'enterprise_property', 
	'registered_capital_proportion', 
	'org_type', 
	'business_type', 
	'employees', 
	'org_website', 
	'legal_opinion_state', 
	'legal_person', 
	'fund_qualification', 
	'fund_qualification_method', 
	'work_experience', 
	'executive_situation', 
	'before_fund', 
	'after_fund', 
	'lasttime', 
	'special_tips'
	)
        `
    }
  }

  query () {
    return mysqlPool.execute(this.sql.query)
  }

  insert (params) {
    let sql = mysqlPool.parseParams(this.sql.insertFund, params)
    return mysqlPool.execute(sql)
  }

  insertOrg (params) {
    let sql = mysqlPool.parseParams(this.sql.insertFundOrg, params)
    return mysqlPool.execute(sql)
  }
}
import _ from 'lodash'

const DATA = { errcode: 0,
  errmsg: '成功！',
  data:
     { query_path: { path: '/promotionalActivityList', params: [] },
       edit_uid: 0,
       status: 'undone',
       type: 'static',
       req_body_is_json_schema: true,
       res_body_is_json_schema: true,
       api_opened: false,
       index: 0,
       tag: [],
       _id: 16589,
       method: 'GET',
       catid: 3122,
       title: '大促活动列表',
       path: '/promotionalActivityList',
       project_id: 436,
       res_body_type: 'json',
       uid: 194,
       add_time: 1537932639,
       up_time: 1537935131,
       req_body_form: [],
       req_params: [],
       req_headers: [],
       req_query: [],
       __v: 0,
       markdown: '',
       desc: '',
       res_body: '{"$schema":"http://json-schema.org/draft-04/schema#","type":"object","properties":{"code":{"type":"number","enum":[200,404]},"errorMsg":{"type":"null"},"data":{"type":"object","properties":{"pageSize":{"type":"number","maximum":100,"minimum":1},"pageNum":{"type":"number","minimum":1,"maximum":10},"recordCount":{"type":"number","maximum":200,"minimum":0},"errorMsg":{"type":"null"},"records":{"type":"array","items":{"type":"object","properties":{"promotionalUID":{"type":"number"},"activityPicUrl":{"type":"string","enum":["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537945179313&di=bc1d2e7a04ce45b80420c40dee963eff&imgtype=0&src=http%3A%2F%2Fjperrin.oristeam.fr%2F_data%2Fi%2Fupload%2F2014%2F06%2F29%2F20140629000108-0a909513-me.jpg"]},"activityName":{"type":"string"},"activityDesc":{"type":"string"},"enrollTime":{"type":"string"},"activityTime":{"type":"string"},"activityLevel":{"type":"string","enum":["S","A","B","C"]},"status":{"type":"string"},"creator":{"type":"string"}},"required":["promotionalUID","activityPicUrl","activityName","activityDesc","enrollTime","activityTime","activityLevel","status","creator"]}}}}}}',
       username: '孙华成' } }

const template = `
author <%= data.username %>
<%= _.get(res_body, 'properties.code.type') %>
`

var compiled = _.template(template)
var str = compiled({ 'data': DATA.data, 'res_body': JSON.parse(_.get(DATA, 'data.res_body'))})
console.log(str)

const schema = {
  type: 'object',
  properties: {
    username: {type:'string'},
    pwd: {type: 'string'},
  },
  additionalProperties: false,
}


module.exports = schema;

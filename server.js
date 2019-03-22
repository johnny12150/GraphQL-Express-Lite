var express = require('express');
var graphqlHTTP = require('express-graphql');
var {buildSchema} = require('graphql');
const fetch = require('node-fetch');

// schema
var schema = buildSchema(`
  type data {
    text: String,
    id: Int
  }
  
  type list {
    text: String,
    id: Int
  }
  
  type stack {
    id: String,
    type: String,
    name: String,
    state: String,
    created: String,
    description: String
  }
  
  type Query {
    hello(id: Int!): data,
    "顯示完整的array"
    list: [list],
    "取Rancher 1.6 API stack的基礎資料"
    stack: stack
  }
`);

// 建立一筆假資料
let fake_data = [
    {
        text: "world!!",
        id: 0
    },
    {
        text: "not found",
        id: 1
    }
];

// resolver
var root = {
    // 對應到 shema下的 Query的 field name為 hello
    hello: (source, args) => {
        // source 是 client端帶入的參數
        console.log(source);
        return fake_data[source.id]
    },
    list: () => {
        // 直接回傳array
        return fake_data;
    },
    stack: () => {
        // fetch Rancher的stack API
        return fetch('http://192.168.1.43/v2-beta/projects/1a5/stacks/1st47').then(res => res.json())
    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

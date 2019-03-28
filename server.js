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
  
  type project {
    id: String,
    name: String,
    state: String,
    description: String,
    healthState: String,
    created: String
  }
  
  type Query {
    hello(id: Int!): data,
    "顯示完整的array"
    list: [list],
    "取Rancher 1.6 API stack的基礎資料"
    stack(id: String!): stack,
    "顯示指定project/ environment下有哪些stack"
    project: project,
    all_stacks: [stack]
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
    stack: (source) => {
        // fetch Rancher的stack API
        return fetch('http://192.168.1.43/v2-beta/projects/1a5/stacks/' + source.id, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic RTA1QzJGQTVDN0Y5MUE2OTcwMTI6dEN5ZTNvM3BZNHd6ak1XV1ZES1RZU0dFRnR0ejJkVXJEbXhjWFBHVA==',
                'Accept': 'application/json'
            }
        }).then(res => res.json())
    },
    project: () => {
        return fetch('http://192.168.1.43/v2-beta/projects/1a5', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic RTA1QzJGQTVDN0Y5MUE2OTcwMTI6dEN5ZTNvM3BZNHd6ak1XV1ZES1RZU0dFRnR0ejJkVXJEbXhjWFBHVA==',
                'Accept': 'application/json'
            }
        }).then(res => res.json())
    },
    all_stacks: () => {
        return fetch('http://192.168.1.43/v2-beta/projects/1a5/stacks', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic RTA1QzJGQTVDN0Y5MUE2OTcwMTI6dEN5ZTNvM3BZNHd6ak1XV1ZES1RZU0dFRnR0ejJkVXJEbXhjWFBHVA==',
                'Accept': 'application/json'
            }
        }).then(res => res.json())
            .then(result => result.data)
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

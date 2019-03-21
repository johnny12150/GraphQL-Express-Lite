var express = require('express');
var graphqlHTTP = require('express-graphql');
var {buildSchema} = require('graphql');

// schema
var schema = buildSchema(`
  type data {
    text: String,
    id: Int
  }
  
  type Query {
    hello(id: Int!): data
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
    hello: (source, args) => {
        // source 是 client端帶入的參數
        console.log(source);
        return fake_data[source.id]
    },
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

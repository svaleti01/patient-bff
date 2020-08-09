var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
var { getClaims, addClaims } = require("./data/claims");

var cors = require("cors");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`

  type Drug {
    drugid: Int
    userid: Int
    claimsid: Int
    drugname: String
    count: Int
  },
  type Claims {
    claimsid: Int
    status: String
    opioidflag: String
    claimsdate: String
    druglist: [Drug]
  },
  type ClaimsRequest {
    username: String
    date: String
    drug: String
    count: Int
  },
  type Query {
    claimsHistory: [Claims]
  },
  type Mutation {
    addClaims(username: String!, date: String!, drug: String!, count: Int!): String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  claimsHistory: () => {
    return getClaims();
  },
  addClaims: args => {
    return addClaims(args);
  }
};

var app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

var router = express.Router();

router.get('/', function (req, res, next) {
  res.json({status: 'UP'});
});

app.use("/health", router);

app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");

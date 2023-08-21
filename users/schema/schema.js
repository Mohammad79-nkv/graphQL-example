const _ = require("lodash");
const graphQl = require("graphql");
const axios = require("axios");

const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema } = graphQl;

const users = [
  { id: "1", userName: "John", age: 20 },
  { id: "2", userName: "tonny", age: 30 },
];

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});


const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then((res) => res.data);
      },
    },
  },    
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

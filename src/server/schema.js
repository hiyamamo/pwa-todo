const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

// In memory data store
const TodoStore = [
  { title: "Learn some GraphQL", completed: false },
  { title: "Build a sample app", completed: false }
];

const TodoItemType = new GraphQLObjectType({
  name: "TodoItemType",
  fields: {
    title: { type: GraphQLString },
    completed: { type: GraphQLBoolean }
  }
})

// Root level queries
const TodosQuery = new GraphQLObjectType({
  name: "TodosQuery",
  fields: () => ({
    items: {
      type: new GraphQLList(TodoItemType),
      description: "List of todo items",
      resolve() {
        // close and send
        return TodoStore.concat([]);
      }
    }
  })
});

// Mutations
const TodosMutations = new GraphQLObjectType({
  name: 'TodosMutations',
  fields: () => ({
    addItem: {
      type: GraphQLString,
      description: "Add a new todo item",
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parent, {title}) {
        if(TodoStore.length >= 10) {
          // Remove the third time by keeping the first two
          TodoStore.splice(2, 1);
        }

        TodoStore.push({ title: title, completed: false });
        return title;
      }
    }
  })
});

// Schema
const TodosSchema = new GraphQLSchema({
  name: "TodosSchema",
  query: TodosQuery,
  mutation: TodosMutations
});

module.exports = TodosSchema;

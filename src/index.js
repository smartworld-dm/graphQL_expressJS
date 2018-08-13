const { GraphQLServer } = require('graphql-yoga')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  Mutation: {
    addLink: (root, args) => {
       const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (root, args) => {
      let link = {}
      for (let i = 0; i < links.length; i++){
      	if (links[i].id === args.id){
      		link = {
	          id: args.id,
	          description: args.description,
	          url: args.url,
	        }
      		links[i] = link
      	}
      }
      return link
    },
    deleteLink: (root, args) => {
      let link = {}
      let links_len = links.length
      for (let i = 0; i < links_len; i++){
      	if (links[i].id === args.id){
      		link = links[i]
      		links.splice(i, 1)
      	}
      }
      return link
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
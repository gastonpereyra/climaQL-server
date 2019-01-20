import express from 'express'; // Modulo de Express
import { ApolloServer } from 'apollo-server-express'; // Modulo para Apollo
import { typeDefs } from './api/schemas'; // Schemas
import { resolvers } from './api/resolvers'; // Resolvers

// Iniciar Express
const app = express();

// Paginas Estaticas
app.use(express.static('public'));
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// Iniciar el Server de GraphQL
const server = new ApolloServer({typeDefs, resolvers});
server.applyMiddleware({app}); // Conectar Apollo con Express

// Listo para Escuchar Request
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

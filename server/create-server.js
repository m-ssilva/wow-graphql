const app = require('../src/index')
const port = process.env.PORT || 4000

app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:4000`))
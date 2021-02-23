const logging = {
  requestDidStart: (requestContext) => {
    if (requestContext.request.operationName !== 'IntrospectionQuery') {
      if (!process.env.NODE_ENV === 'test') {
        console.log('Request started! Query')
        console.log('Variables:', requestContext.request.variables)
        console.log('Query:', requestContext.request.query)
      }
    }
  }
}

module.exports = logging
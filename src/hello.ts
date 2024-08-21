export const handler = async (event) => {
  console.log('event=', event);
  console.log('2=', event.requestContext.method);

  if (event.requestContext.http.method !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({
        message: 'Method Not Allowed',
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello from AWS Lambda w/ SST v3 and TypeScript! (time=${new Date().toISOString()})`,
    })
  }
}
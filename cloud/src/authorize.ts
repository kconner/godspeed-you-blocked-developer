import * as Lambda from 'aws-lambda'

export const authorize: Lambda.CustomAuthorizerHandler = (event, context, callback) => {
  // authorizationToken = the value of the Authorization header
  const effect = event.authorizationToken === 'o hai mark' ? 'Allow' : 'Deny'

  const result: Lambda.CustomAuthorizerResult = {
    principalId: 'user',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [{
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: event.methodArn
      }]
    }
  }

  callback(null, result)
}

import { CognitoIdentityServiceProvider } from 'aws-sdk'
import * as async from '../async'

const cognito = new CognitoIdentityServiceProvider()

export const adminCreateUserAsync = async (userPoolID: string, userPoolClientID: string, username: string) => {
    const request: CognitoIdentityServiceProvider.AdminCreateUserRequest = {
        UserPoolId: userPoolID,
        Username: username,
        MessageAction: 'SUPPRESS',
    }

    const response = await async.lift<CognitoIdentityServiceProvider.AdminCreateUserResponse>(callback =>
        cognito.adminCreateUser(request, callback)
    )

    return response.User || null
}

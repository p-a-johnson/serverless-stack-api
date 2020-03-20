import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    const params = {
        TableName: process.env.tableName,
        // 'Key' defines the partition key and sort key of the item to be removed
        // - 'createdBy': Identity Pool identity id of the authenticated user
        // - 'productSpecificationId': path parameter
        Key: {
            // createdBy: event.requestContext.identity.cognitoIdentityId,
            productSpecificationId: event.pathParameters.id
        }
    };

    try {
        await dynamoDbLib.call("delete", params);
        return success({ status: true });
    } catch (e) {
        return failure({ status: false , error: e });
    }
}

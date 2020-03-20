import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'createdBy': Identity Pool identity id of the authenticated user
    // - 'productSpecificationId': path parameter
    Key: {
      // createdBy: event.requestContext.identity.cognitoIdentityId,
      productSpecificationId: event.pathParameters.id
    }
  };

  try {
    console.log("calling get: " + params.Key.productSpecificationId);
    const result = await dynamoDbLib.call("get", params);
    console.log("after get: " + params.Key.productSpecificationId);
    if (result.Item) {
      // Return the retrieved item
      return success(result.Item);
    } else {
      return failure({ status: false, error: "Item not found." });
    }
  } catch (e) {
    return failure({ status: false , error: e });
  }
}

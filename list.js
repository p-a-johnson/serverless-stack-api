import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'createdBy = :createdBy': only return items with matching 'createdBy'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':createdBy': defines 'createdBy' to be Identity Pool identity id
    //   of the authenticated user
    // KeyConditionExpression: "createdBy = :createdBy",
    // ExpressionAttributeValues: {
    //   ":createdBy": event.requestContext.identity.cognitoIdentityId
    // }
  };

  try {
    console.log("calling list");
    const result = await dynamoDbLib.call("scan", params);
    console.log("after list");
    // Return the matching list of items in response body
    return success(result.Items);
  } catch (e) {
    return failure({ status: false , error: e });
  }
}

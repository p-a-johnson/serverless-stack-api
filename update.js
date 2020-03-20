import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'createdBy': Identity Pool identity id of the authenticated user
    // - 'productSpecificationId': path parameter
    Key: {
      // createdBy: event.requestContext.identity.cognitoIdentityId,
      productSpecificationId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET psname = :psname, description = :description, sku = :sku, financialCode = :financialCode",
    ExpressionAttributeValues: {
      ":psname": data.psname || null,
      ":description": data.description || null,
      ":sku": data.sku || null,
      ":financialCode": data.financialCode || null
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false , error: e});
  }
}

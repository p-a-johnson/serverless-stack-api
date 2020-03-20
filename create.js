import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      createdBy: event.requestContext.identity.cognitoIdentityId,
      productSpecificationId: uuid.v1(),
      createdAt: Date.now(),
      psname: data.psname,
      description: data.description,
      sku: data.sku,
      effectiveStartDate: data.effectiveStartDate,
      effectiveEndDate: data.effectiveEndDate,
      availableStartDate: data.availableStartDate,
      availableEndDate: data.availableEndDate,
      financialCode: data.financialCode,
      financeAccountGroup: data.financeAccountGroup,
      generalLedgerCode: data.generalLedgerCode,
      taxCode: data.taxCode,
      vendorCode: data.vendorCode
    }
  };

  try {
    console.log("calling put");
    await dynamoDbLib.call("put", params);
    console.log("after put");
    return success(params.Item);
  } catch (e) {
    return failure({ status: false , error: e });
  }
}

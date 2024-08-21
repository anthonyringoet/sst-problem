import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import { Resource } from "sst";
const client = new SNSClient();

export const handler = async (event) => {
  if (event.requestContext.http.method !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({
        message: 'Method Not Allowed',
      })
    }
  }

  const is_even_seconds = new Date().getSeconds() % 2 === 0;
  const SELECTED_TYPE = `event.${is_even_seconds ? "even" : "odd"}`;
  const input = {
    TopicArn: Resource.topic.arn,
    Message: JSON.stringify({
      time: new Date().toISOString(),
      hello: "world",
      type: SELECTED_TYPE,
    }),
    MessageAttributes: {
      type: {
        DataType: "String",
        StringValue: SELECTED_TYPE
      },
    }
  }
  const result = await client.send(new PublishCommand(input));
  console.log('result=', result);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Added your message (time=${new Date().toISOString()})`,
    })
  }
}
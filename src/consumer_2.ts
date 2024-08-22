import { Resource } from "sst";

export const handler = async (event) => {
	console.log('⛳️ START CONSUMER 2')

	// supports batched events
	const records = event.Records;
	console.log(`Number of records: ${records.length}`);

	// https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html#example-standard-queue-message-event
	const entries = records
		.map((sqs_record) => {
			try {
				const sqs_msg_body = JSON.parse(sqs_record.body);
				const msg_body = JSON.parse(sqs_msg_body.Message);
				return {
					type: msg_body.type,
					data: sqs_msg_body.Message,
				};
			} catch (error) {
				return false;
			}
		})
		.filter((entry) => entry);

  console.log('entries=', entries);
  console.log('⛳️ DONE CONSUMER 2')

	return;
};

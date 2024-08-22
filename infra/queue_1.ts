import { topic } from "./topic";

const queue_one = new sst.aws.Queue("one");
queue_one.subscribe({
  handler: "src/consumer_1.handler"
});

// topic.subscribeQueue(queue_one.arn);
topic.subscribeQueue(queue_one.arn, {
  filter: {
    type: [
      "event.odd"
    ]
  }
});

export { queue_one };
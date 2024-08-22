import { topic } from "./topic";

const queue_two = new sst.aws.Queue("two");
queue_two.subscribe({
  handler: "src/consumer_2.handler"
});

// topic.subscribeQueue(queue_two.arn);
topic.subscribeQueue(queue_two.arn, {
  filter: {
    type: [
      "event.even"
    ]
  }
});

export { queue_two };
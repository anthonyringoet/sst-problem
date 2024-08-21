/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "debug",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    // random components
    const hello_fn = new sst.aws.Function("hello", {
      handler: "src/hello.handler",
      url: true,
      logging: false
    });
    const bucket_beep = new sst.aws.Bucket("beep", {
      public: false
    });

    // where we focus on our issue
    const some_queue = new sst.aws.Queue("some");
    some_queue.subscribe({
      handler: "src/consumer.handler"
    });
    const topic = new sst.aws.SnsTopic("topic");
    // This works
    // topic.subscribeQueue(some_queue.arn);


    // Below also works but cannot be updated,
    // eg. add an event to the filter list.
    // Only solution is removing the subscription completely.

    // Once you end up in the following error territory, you can't always properly recover without removing
    //     Failed
    //     TopicSubscriberBammmzSubscription aws:sns:TopicSubscription
    //     Subscription: operation error SNS: Subscribe, https response error StatusCode: 400, RequestID: 76bf1625-81f5-5d8f-90fd-49
    //  65b44a4544, InvalidParameter: Invalid parameter: Attributes Reason: Subscription already exists with different attributes

    topic.subscribeQueue(some_queue.arn, {
        filter: {
            type: [
                "event.even",
                "event.odd",
                "event.random"
            ]
        }
    });

    const publish_api = new sst.aws.Function("api", {
      handler: "src/api.handler",
      url: true,
      logging: false,
      link: [topic]
    });

    return {
      bucket_name: bucket_beep.name,
      queue_url: some_queue.url,
      hello_function_url: hello_fn.url,
      api_url: publish_api.url
    }

  },
});

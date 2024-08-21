/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    "api": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "beep": {
      "name": string
      "type": "sst.aws.Bucket"
    }
    "hello": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "some": {
      "type": "sst.aws.Queue"
      "url": string
    }
    "topic": {
      "arn": string
      "type": "sst.aws.SnsTopic"
    }
  }
}
export {}

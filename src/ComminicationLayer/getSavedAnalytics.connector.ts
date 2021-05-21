import { IAnalyticsInput } from '../Interfaces/IAnalyticsInput'
import { SERVERS } from '../Constants/servers.const'
import { getDetectedEnv } from '../Shared/getDetectedEnv'
import { getAssetHash } from '../Shared/getAssetHash'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  timestamp: +new Date(),
}

export const getSavedAnalyticsConnector: Function = (
  props: IAnalyticsInput
): any => {
  const hash256 = getAssetHash(props)
  const envType = getDetectedEnv()

  const obj: any = {
    testCapture: 'should return 200 code and data defined',
    method: 'post',
    url: <string>`${SERVERS[envType]}/graphql`,
    options: { headers: { ...headers } },
    payload: {
      operationName: 'SaveAnalytics',
      variables: {
        analyticsInput: {
          ...(props.analyticsID && { analyticsID: props.analyticsID }),
          hash256,
          ...(props.initData && { initData: props.initData }),
          ...(props.topic && { topic: props.topic }),
          ...(props.event && { event: props.event }),
          ...(props.target && { target: props.target }),
        },
      },
      query:
        'mutation SaveAnalytics($analyticsInput: AnalyticsInput!){saveAnalytics(analyticsInput: $analyticsInput){ analyticsID, hash256, dateCreate, dateUpdate }}',
    },
  }

  return obj
}

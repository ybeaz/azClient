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
  const url = <string>`${SERVERS[envType]}/graphql`

  const obj: any = {
    testCapture: 'should return 200 code and data defined',
    method: 'post',
    url,
    options: { headers: { ...headers } },
    payload: {
      operationName: 'SaveAnalytics',
      variables: {
        analyticsInput: {
          ...(props.analyticsID && { analyticsID: props.analyticsID }),
          hash256,
          ...(props.initData && { initData: props.initData }),
          ...(props.event && { event: props.event }),
        },
      },
      query:
        'mutation SaveAnalytics($analyticsInput: AnalyticsInput!){saveAnalytics(analyticsInput: $analyticsInput){ analyticsID, hash256, dateCreate, dateUpdate }}',
    },
  }

  return obj
}

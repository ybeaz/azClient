// import { SERVERS } from '../Constants/servers.const'
// import { PATH_NAME_LOADED_VARS } from '../Constants/pathNameLoadedVars.const'
// import { getDetectedEnv } from '../Shared/getDetectedEnv'

// const headers = {
//   'Access-Control-Allow-Origin': '*',
//   'Content-Type': 'application/json',
//   timestamp: +new Date(),
// }

// export const getSavedAnalytics: Function = (): any => {
//   const envType = getDetectedEnv()
//   // console.info('getContentInfo.connector [15]', { envType })
//   const obj: any = {
//     testCapture: 'should return 200 code and data defined',
//     method: 'get',
//     options: { headers: { ...headers } },
//     url: <string>(
//       `${SERVERS[envType]}${PATH_NAME_LOADED_VARS[envType]}/contentInfo.json`
//     ),
//   }

//   return obj
// }

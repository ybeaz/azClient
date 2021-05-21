export const getDetectedEnv: Function = (source: string = 'local'): string => {
  return location.hostname === '127.0.0.1' ? 'localWebpack' : 'remote'
}

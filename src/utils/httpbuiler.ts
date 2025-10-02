export const buildHttpQueryParams = (object: object) => {
  let httpString = "?"
  Object.entries(object).filter(([key, value]) => value && key).forEach(([key, value]) => {
    httpString += `${key}=${value}&`
  })
  return httpString.replace(/&$/, '')
}
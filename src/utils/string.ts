export const toPascalCase = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`
export const getLastDirectry = (pathStr: string) => pathStr.split('/').pop() ?? ''

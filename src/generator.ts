// import {readFile, writeFile, readdir, access, mkdir} from 'fs/promises'
// import {join} from 'path'
// import {compile} from 'handlebars'
// import chalk from 'chalk'
//
// const checkDir = async (pathToComponent: string) => {
//   try {
//     await access(pathToComponent)
//     console.log(chalk.blue, 'exited such directory!!\n')
//   } catch {
//     console.log(chalk.blue, 'No such directory, so make dir!!\n')
//     try {
//       await mkdir(pathToComponent, {recursive: true})
//       console.log(chalk.green, 'completed to make directory!!\n')
//     } catch (error) {
//       console.error(chalk.red, 'make directory :(\n')
//     }
//   }
// }
//
// export const generate = async (name: string, directory: string) => {
//   const templates = await readdir(join(__dirname, '/templates/'))
//   const pathToComponent = join(process.cwd(), `/src/components/${directory}/${name}/`)
//   await checkDir(pathToComponent)
//   return Promise.all(templates.map(async template => {
//     try {
//       const buffer = await readFile(join(__dirname, `/templates/${template}`))
//       const compiled = compile(buffer.toString())
//       const fileName = template.replace('fc', name).slice(0, -4)
//       await writeFile(join(pathToComponent, fileName), compiled({name, directory}))
//       console.info(chalk.green, `created: ${pathToComponent}${fileName}`)
//     } catch (error) {
//       console.error(chalk.red, 'generate component :(\n', error)
//     }
//   }))
// }

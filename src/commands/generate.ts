import {Command, Flags} from '@oclif/core'
import {compile} from 'handlebars'
import {access, mkdir, readFile, readdir, writeFile} from 'fs/promises'
import {join} from 'path'
import {error, info, success} from '../utils/prefix'

const toPascalCase = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

export default class Generate extends Command {
  static description = 'generate React Component'

  static examples = [
    `$ cpoo generate Button src/components/atoms
    `,
  ]

  static flags = {
    help: Flags.help({char: 'h'}),
  }

  static args = [
    {name: 'componentName', description: 'component name', required: true},
    {name: 'path', description: 'path to component'},
  ]

  async run(): Promise<void> {
    const {args} = await this.parse(Generate)

    await this.generate(toPascalCase(args.componentName), args.path)
    this.log('\n', info(), ': completed to generate component :)')
  }

  private async checkDir(pathToComponent: string) {
    try {
      await access(pathToComponent)
      this.log(info(), ': existed such directory.\n')
    } catch {
      console.log(info(), ': No such directory, so make dir.\n')
      try {
        await mkdir(pathToComponent, {recursive: true})
        this.log(success(), ': completed to make directory :3\n')
      } catch {
        this.log(error(), ': make directory :(\n')
      }
    }
  }

  private async generate(name: string, path: string) {
    const templates = await readdir(join(__dirname, '/templates/'))
    const pathToComponent = join(process.cwd(), `${path}/${name}/`)
    await this.checkDir(pathToComponent)
    return Promise.all(templates.map(async template => {
      try {
        const buffer = await readFile(join(__dirname, `/templates/${template}`))
        const compiled = compile(buffer.toString())
        const fileName = template.replace('fc', name).slice(0, -4)
        await writeFile(join(pathToComponent, fileName), compiled({name, path}))
        this.log(`${success()} created: ${pathToComponent}${fileName}`)
      } catch (error_) {
        this.log(error(), ': generate component :(\n', error_)
      }
    }))
  }
}

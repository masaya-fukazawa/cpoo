import {Command, Flags} from '@oclif/core'
import {compile} from 'handlebars'
import {access, mkdir, readFile, readdir, writeFile} from 'fs/promises'
import {join} from 'path'
import {Config} from '../config'
import {error, info, success} from '../utils/prefix'
import {toPascalCase, getLastDirectry} from '../utils/string'

export default class Generate extends Command {
  static description = 'generate React Component'

  static examples = [
    `$ cpoo generate Button src/components/atoms

info : No such directory, so make dir.

success : completed to make directory :3

success created: /your/project/src/components/atoms/Button/Button.stories.tsx
success created: /your/project/src/components/atoms/Button/Button.test.tsx
success created: /your/project/src/components/atoms/Button/Button.tsx
success created: /your/project/src/components/atoms/Button/Button.ts

 info : completed to generate component :)
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
    const {args} = await this.parse<{}, {componentName: string, path: string}>(Generate)
    const {componentName, path} = args
    const pathToComponent = join(process.cwd(), `${path}/${componentName}/`)
    await this.makeDir(pathToComponent)
    const config = await this.readConfig()
    console.log(config)
    await this.generate(componentName, path, config)
    this.log('\n', info(), ': completed to generate component :)')
  }

  private async makeDir(pathToComponent: string) {
    try {
      await access(pathToComponent)
      this.log(info(), ': existed such directory.\n')
    } catch {
      console.log(info(), ': No such directory, so make dir.\n')
      await mkdir(pathToComponent, {recursive: true})
      this.log(success(), ': completed to make directory :3\n')
    }
  }

  private async generate(name: string, path: string, config: Config) {
    const templates = await readdir(join(__dirname, '/templates/'))
    const pathToComponent = join(process.cwd(), `${path}/${name}/`)
    return Promise.all(templates.map(async template => {
      try {
        const buffer = await readFile(join(__dirname, `/templates/${template}`))
        const compiled = compile(buffer.toString())
        const fileName = template.replace('fc', name).slice(0, -4)
        await writeFile(join(pathToComponent, fileName), compiled({name, directry: getLastDirectry(path)}))
        this.log(`${success()} created: ${pathToComponent}${fileName}`)
      } catch (error_) {
        this.log(error(), ': generate component :(\n', error_)
      }
    }))
  }
  
  private async readConfig() {
    try {
      const config = await readFile(join(process.cwd(), '.cpoorc'), 'utf-8')
      return Promise.resolve<Config>(JSON.parse(config))
    } catch {
      return Promise.resolve<Config>({
        extension: '',
        types: []
      })
    }
  }
}

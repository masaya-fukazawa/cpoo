import {Command, Flags} from '@oclif/core'
import {compile} from 'handlebars'
import {access, mkdir, readFile, readdir, writeFile} from 'fs/promises'
import {join} from 'path'
// eslint-disable-next-line node/no-missing-import
import {Config} from '../../config'
import {error, info, success} from '../../utils/prefix'
import {getLastDirectry} from '../../utils/string'

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
    excludeTest: Flags.boolean({default: false, description: 'exclude generating test file.'}),
    excludeStory: Flags.boolean({default: false, description: 'exclude generating storybook file.'}),
  }

  static args = [
    {name: 'componentName', description: 'component name', required: true},
    {name: 'path', description: 'path to component'},
  ]

  async run(): Promise<void> {
    const {args, flags} = await this.parse<{excludeTest: boolean, excludeStory: boolean}, {componentName: string, path: string}>(Generate)
    const {excludeTest, excludeStory} = flags
    const {componentName, path} = args
    const pathToComponent = join(process.cwd(), `${path}/${componentName}/`)
    await this.makeDir(pathToComponent)
    const config = await this.readConfig()
    await this.generate(componentName, path, config, excludeTest, excludeStory)
    this.log('\n', info(), ': completed to generate component :)')
  }

  private async makeDir(pathToComponent: string) {
    try {
      await access(pathToComponent)
      this.log(info(), ': existed such directory.\n')
    } catch {
      this.log(info(), ': No such directory, so make dir.\n')
      await mkdir(pathToComponent, {recursive: true})
      this.log(success(), ': completed to make directory :3\n')
    }
  }

  private async generate(name: string, path: string, config: Config, excludeTest: boolean, excludeStory: boolean) {
    const templates = await readdir(join(__dirname, '/templates/'))
    const pathToComponent = join(process.cwd(), `${path}/${name}/`)
    return Promise.all(templates
      .filter(t => this.isGenerate(t, config.types, excludeTest, excludeStory))
      .map(async template => {
        try {
          const buffer = await readFile(join(__dirname, `/templates/${template}`))
          const compiled = compile(buffer.toString())
          const ext = template.includes('index') ? config.extension.replace('x', '') : config.extension
          const fileName = template
            .slice(template.indexOf('.') + 1)
            .replace('{name}', name)
            .replace('{testMatch}', config.testMatch ?? 'test')
            .replace('{ext}', ext ?? 'js')
            .slice(0, -4)
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
        types: [],
        testMatch: '',
      })
    }
  }

  private isGenerate(templateName: string, fileTypes: string[], excludeTest: boolean, excludeStory: boolean): boolean {
    if (templateName.includes('component')) {
      return true
    }

    if (templateName.includes('test') && excludeTest) {
      return false
    }

    if (templateName.includes('storybook') && excludeStory) {
      return false
    }

    return fileTypes.some(t => templateName.includes(t))
  }
}

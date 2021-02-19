import {Command, flags} from '@oclif/command'
import {blue, red} from 'chalk'
import {generate} from '../generator'

const atomics = ['atoms', 'molecules', 'organisms', 'organizations', 'templates', 'pages']
const toPascalCase = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

export default class Generate extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
    directory: flags.string({char: 'd', description: 'path to component'}),
  }

  static args = [
    {name: 'file'},
    {name: 'directory'},
  ]

  async run() {
    const {args} = this.parse(Generate)
    if (!(args.file && args.directory)) {
      console.error(`${red('error')} required argv[0] && argv[1].
      Please specify the file name for argv[0].
      Please specify the directory name for argv[1].
      ex) atoms, molecules...`)
      this.exit(1)
    }

    if (!atomics.includes(args.directory)) {
      console.error(`${red('error')} Specify the module name of atomic design for the directory name.`)
      this.exit(1)
    }
    await generate(toPascalCase(args.file), args.directory)
    console.log('\n', blue('info'), 'completed to generate component :)')
  }
}

import {Command} from '@oclif/core'
import {stat, writeFile} from 'fs/promises'
import {join} from 'path'
import {info, success} from '../../utils/prefix'
import cli from 'cli-ux'
import {prompt} from 'inquirer'

export default class Init extends Command {
  static description = 'initialize "cpoo"'
  static examples = [`$ cpoo init
  `]

  async run(): Promise<void> {
    try {
      await this.existConfig()
    } catch(_) {
      await this.makeConfig()
    }
  }

  private async existConfig() {
    await stat(join(process.cwd(), '.cpoorc'))
    this.log('\n')
    this.log(info(), 'already exists config file.')
    this.log(info(), 'bye bye :3')
  }

  private async makeConfig() {
    this.log(info(), 'the config file does not exist, so create it.\n')
    const {fileExt} = await prompt([{
      name: 'fileExt',
      message: 'What file extensions do you use?',
      type: 'list',
      choices: [{name: 'tsx', checked: true}, {name: 'jsx'}, {name: 'ts'}, {name: 'js'}]
    }])
    const {fileTypes} = await prompt([{
      name: 'fileTypes',
      message: 'Which file types do you want to output? (default: component file only)',
      type: 'checkbox',
      choices: [{name: 'index', checked: true}, {name: 'storybook'}, {name: 'test'}]
    }])

    const json = {
      extension: fileExt,
      types: fileTypes,
    }
    await writeFile(join(process.cwd(), '.cpoorc'), JSON.stringify(json, null, 2))
    this.log(success(), 'initialize "cpoo" :)')
    this.log('\n')
    this.log(info(), 'next, you can use "cpoo generate"')
    this.log(info(), 'bye bye :3')
  }
}

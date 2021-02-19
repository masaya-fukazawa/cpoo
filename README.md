cpoo
====

simple react component generator

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cpoo.svg)](https://npmjs.org/package/cpoo)
[![Downloads/week](https://img.shields.io/npm/dw/cpoo.svg)](https://npmjs.org/package/cpoo)
[![License](https://img.shields.io/npm/l/cpoo.svg)](https://github.com/masaya-fukazawa/cpoo/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g cpoo
$ cpoo COMMAND
running command...
$ cpoo (-v|--version|version)
cpoo/1.0.0 darwin-x64 node-v14.15.1
$ cpoo --help [COMMAND]
USAGE
  $ cpoo COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cpoo generate [FILE] [DIRECTORY]`](#cpoo-generate-file-directory)
* [`cpoo hello [FILE]`](#cpoo-hello-file)
* [`cpoo help [COMMAND]`](#cpoo-help-command)

## `cpoo generate [FILE] [DIRECTORY]`

describe the command here

```
USAGE
  $ cpoo generate [FILE] [DIRECTORY]

OPTIONS
  -d, --directory=directory  path to component
  -f, --force
  -h, --help                 show CLI help
  -n, --name=name            name to print
```

_See code: [src/commands/generate.ts](https://github.com/masaya-fukazawa/cpoo/blob/v1.0.0/src/commands/generate.ts)_

## `cpoo hello [FILE]`

describe the command here

```
USAGE
  $ cpoo hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ cpoo hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/masaya-fukazawa/cpoo/blob/v1.0.0/src/commands/hello.ts)_

## `cpoo help [COMMAND]`

display help for cpoo

```
USAGE
  $ cpoo help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_
<!-- commandsstop -->

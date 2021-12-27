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
$ cpoo (--version)
cpoo/1.0.9 darwin-x64 node-v14.18.2
$ cpoo --help [COMMAND]
USAGE
  $ cpoo COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cpoo help [COMMAND]`](#cpoo-help-command)
* [`cpoo plugins`](#cpoo-plugins)
* [`cpoo plugins:inspect PLUGIN...`](#cpoo-pluginsinspect-plugin)
* [`cpoo plugins:install PLUGIN...`](#cpoo-pluginsinstall-plugin)
* [`cpoo plugins:link PLUGIN`](#cpoo-pluginslink-plugin)
* [`cpoo plugins:uninstall PLUGIN...`](#cpoo-pluginsuninstall-plugin)
* [`cpoo plugins:update`](#cpoo-pluginsupdate)

## `cpoo help [COMMAND]`

Display help for cpoo.

```
USAGE
  $ cpoo help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for cpoo.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.9/src/commands/help.ts)_

## `cpoo plugins`

List installed plugins.

```
USAGE
  $ cpoo plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ cpoo plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `cpoo plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ cpoo plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ cpoo plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/inspect.ts)_

## `cpoo plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ cpoo plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ cpoo plugins:add

EXAMPLES
  $ cpoo plugins:install myplugin 

  $ cpoo plugins:install https://github.com/someuser/someplugin

  $ cpoo plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/install.ts)_

## `cpoo plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ cpoo plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ cpoo plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/link.ts)_

## `cpoo plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ cpoo plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ cpoo plugins:unlink
  $ cpoo plugins:remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/uninstall.ts)_

## `cpoo plugins:update`

Update installed plugins.

```
USAGE
  $ cpoo plugins:update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/update.ts)_
<!-- commandsstop -->

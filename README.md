ipdid
=====

The IPDID ecosystem

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/ipdid.svg)](https://npmjs.org/package/ipdid)
[![Downloads/week](https://img.shields.io/npm/dw/ipdid.svg)](https://npmjs.org/package/ipdid)
[![License](https://img.shields.io/npm/l/ipdid.svg)](https://github.com/mingderwang/ipdid/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g ipdid
$ ipdid COMMAND
running command...
$ ipdid (-v|--version|version)
ipdid/0.0.2 darwin-arm64 node-v16.0.0
$ ipdid --help [COMMAND]
USAGE
  $ ipdid COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`ipdid daemon`](#ipdid-daemon)
* [`ipdid help [COMMAND]`](#ipdid-help-command)
* [`ipdid id`](#ipdid-id)
* [`ipdid init`](#ipdid-init)
* [`ipdid key`](#ipdid-key)

## `ipdid daemon`

start a IPDID node as daemon

```
USAGE
  $ ipdid daemon

OPTIONS
  -l, --log=log  show logs

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/daemon.js](https://github.com/mingderwang/ipdid/blob/v0.0.2/src/commands/daemon.js)_

## `ipdid help [COMMAND]`

display help for ipdid

```
USAGE
  $ ipdid help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `ipdid id`

show your DID

```
USAGE
  $ ipdid id

OPTIONS
  -d, --dir=dir  [default: /Users/mingderwang/src/20210426-ipdid]
  --help         show CLI help
  --version      show CLI version

DESCRIPTION
  ...
  show your DID in details
```

_See code: [src/commands/id.js](https://github.com/mingderwang/ipdid/blob/v0.0.2/src/commands/id.js)_

## `ipdid init`

create a new IPDID ipfs

```
USAGE
  $ ipdid init

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/init.js](https://github.com/mingderwang/ipdid/blob/v0.0.2/src/commands/init.js)_

## `ipdid key`

show your DID key pair

```
USAGE
  $ ipdid key

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  --long format
```

_See code: [src/commands/key.js](https://github.com/mingderwang/ipdid/blob/v0.0.2/src/commands/key.js)_
<!-- commandsstop -->

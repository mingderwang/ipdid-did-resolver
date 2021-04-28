const {Command, flags} = require('@oclif/command')
const PeerId = require('peer-id')

class IdCommand extends Command {
  async run() {
    const id = await PeerId.create({ bits: 1024, keyType: 'RSA' })
console.log(JSON.stringify(id.toJSON(), null, 2))
    const {flags} = this.parse(IdCommand)
    const name = flags.name || 'world'
    this.log(`show DID ${name} from ./src/commands/id.js`)
  }
}

IdCommand.description = `show your DID
...
show your DID in details
`

IdCommand.flags = {
  version: flags.version(),
  help: flags.help(),
  // run with --dir= or -d=
  dir: flags.string({
    char: 'd',
    default: process.cwd(),
  }),
}

module.exports = IdCommand

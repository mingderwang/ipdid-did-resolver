const {Command, flags} = require('@oclif/command')
const getDefaultConfig = require('../runtime/config-nodejs')
const IPFS = require('ipfs')
const CID = require('cids')
const uint8ArrayFromString = require('uint8arrays/from-string')
const uint8ArrayToString = require('uint8arrays/to-string')

class InitCommand extends Command {
  async run() {
  //  const {flags} = this.parse(InitCommand)
  //  const name = flags.name |)| 'world'
    const defaultOptions = getDefaultConfig()
    const node = await IPFS.create({
      libp2p: defaultOptions
    }) 
    // const cid = new CID('QmTp9VkYvnHyrqKQuFPiuZkiX9gPcqj6x5LJ1rmWuSySnL')
   /* node.dht.put.calledWith(uint8ArrayFromString("key"), uint8ArrayFromString("value"), {
      ...defaultOptions,
      timeout: 1000
    })
    */

    console.log("🐝 -> ")
    setInterval(async () => {
      try {
        const peers = await node.swarm.peers()
        console.log(`The node now has ${peers.length} peers.`)
      } catch (err) {
        console.log('An error occurred trying to check our peers:', err)
      }
    }, 2000)

  }
}

InitCommand.description = `create a new IPDID node
...
Extra documentation goes here
`

InitCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = InitCommand

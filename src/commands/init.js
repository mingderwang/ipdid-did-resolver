const {Command, flags} = require('@oclif/command')
const getDefaultConfig = require('../runtime/config-nodejs')
const IPFS = require('ipfs')
const CID = require('cids')
const uint8ArrayFromString = require('uint8arrays/from-string')
const uint8ArrayToString = require('uint8arrays/to-string')
const Block = require('@ipld/block/defaults')
const { encode, decode } = require('@ipld/dag-cbor')

class InitCommand extends Command {
  async run() {
  //  const {flags} = this.parse(InitCommand)
  //  const name = flags.name |)| 'world'
    const defaultOptions = getDefaultConfig()
    const ipfs = await IPFS.create({
      libp2p: defaultOptions
    }) 
    // const cid = new CID('QmTp9VkYvnHyrqKQuFPiuZkiX9gPcqj6x5LJ1rmWuSySnL')
   /* ipfs.dht.put.calledWith(uint8ArrayFromString("key"), uint8ArrayFromString("value"), {
      ...defaultOptions,
      timeout: 1000
    })
    */
    const fileAdded = await ipfs.add({
      path: 'hello.txtix',
      content: 'Hello World 102'
    })
  
    console.log('Added file:', fileAdded.path, fileAdded.cid)

    console.log("🐝 -> ")
    setInterval(async () => {
      try {
        const peers = await ipfs.swarm.peers()
        console.log(`The ipfs now has ${peers.length} peers.`)
      } catch (err) {
        console.log('An error occurred trying to check our peers:', err)
      }
    }, 2000)

const get = async obj => {
  const cid = new CID(obj)
  const block = await ipfs.block.get(cid)
  const data = decode(block.data)
  return data
}

const save = async obj => {
  const block = Block.encoder(obj, 'dag-cbor')
  const data = block.encode()
  const cid = await block.cid()

  // js-ipfs uses an older CID value type so we must convert to string
  await ipfs.block.put(data, { cid: cid.toString() })
  return cid
}

const skating = await save('skating')
const rowing = await save('rowing')
const running = await save('running')

const mikeal = await save({ name: 'Mikeal', interests: [ skating ] })
const robert = await save({ name: 'Robert', interests: [ rowing, running ]})
const steve = await save({ name: 'Steve', interests: [ running, skating ] })

console.log('Seeding Mikeal as ', mikeal.toString())
console.log('Seeding Robert as ', robert.toString())
console.log('Seeding Steve as ', steve.toString())
console.log(await get(steve.toString()))
  }
}

InitCommand.description = `create a new IPDID ipfs
...
Extra documentation goes here
`

InitCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = InitCommand

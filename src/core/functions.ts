import {
  DIDResolutionResult,
  DIDDocument,
  ParsedDID
} from 'did-resolver'
//const Block = require('@ipld/block/defaults')
//const uint8ArrayToString = require('uint8arrays/to-string')
//const uint8ArrayFromString = require('uint8arrays/from-string')
const IPFS = require('ipfs')
const CID = require('cids')
const { decode } = require('@ipld/dag-cbor')
import { getDefaultConfig } from "../utils"
const defaultOptions = getDefaultConfig()
//const MountStore = require('datastore-core').MountDatastore
//const { Key, MemoryDatastore } = require('interface-datastore')
//const mds = new MemoryDatastore()
/*
const m = new MountStore([{
      datastore: mds,
      prefix: new Key('cool')
    }])
*/

/*
const diddoc = 
`
	  {
    "@context": [
      "https://www.w3.org/ns/did/v1",
      {
        "@base": "did:key:zJss7x7sfKdbFk4racv8zTnMSyQb2mYsKTHXRxfLKaQCd9DxxwjmTdTBjoPr6yhQM5ZU4rLUFyFkHV2u7mYs6tTxDuPd51Qx7NwzwXWYST5mYBybEXhVGLvj58M3n27CVPd3uhqb5QYLigR4CAsaR5FCSyjGYJpRBQfHKk4MDwMbTa4F5bDF8o1V4"
      }
    ],
    "id": "did:key:zJss7x7sfKdbFk4racv8zTnMSyQb2mYsKTHXRxfLKaQCd9DxxwjmTdTBjoPr6yhQM5ZU4rLUFyFkHV2u7mYs6tTxDuPd51Qx7NwzwXWYST5mYBybEXhVGLvj58M3n27CVPd3uhqb5QYLigR4CAsaR5FCSyjGYJpRBQfHKk4MDwMbTa4F5bDF8o1V4",
    "verificationMethod": [
      {
        "id": "#zJss7x7sfKdbFk4racv8zTnMSyQb2mYsKTHXRxfLKaQCd9DxxwjmTdTBjoPr6yhQM5ZU4rLUFyFkHV2u7mYs6tTxDuPd51Qx7NwzwXWYST5mYBybEXhVGLvj58M3n27CVPd3uhqb5QYLigR4CAsaR5FCSyjGYJpRBQfHKk4MDwMbTa4F5bDF8o1V4",
        "type": "JsonWebKey2020",
        "controller": "did:key:zJss7x7sfKdbFk4racv8zTnMSyQb2mYsKTHXRxfLKaQCd9DxxwjmTdTBjoPr6yhQM5ZU4rLUFyFkHV2u7mYs6tTxDuPd51Qx7NwzwXWYST5mYBybEXhVGLvj58M3n27CVPd3uhqb5QYLigR4CAsaR5FCSyjGYJpRBQfHKk4MDwMbTa4F5bDF8o1V4",
        "publicKeyJwk": {
          "kty": "EC",
          "crv": "P-521",
          "x": "AM69gt-ljp0G2BAwA2MIwxdIIeXFobPbeyYhn1A7hSD5QJzDy1Mo3mlkIe28ITqbofXpWb8X717ZvVDXv_nz9SaK",
          "y": "AMelyc6QcN3u5iSRA41GIWtzGg6HDGtVUDCPqT5WPtvqQNLiilt8_Bv6beOeJVf4YX2wZeu6R3Ch5IrCkooRpje7"
        }
      }
    ],
    "authentication": [
      "#zJss7x7sfKdbFk4racv8zTnMSyQb2mYsKTHXRxfLKaQCd9DxxwjmTdTBjoPr6yhQM5ZU4rLUFyFkHV2u7mYs6tTxDuPd51Qx7NwzwXWYST5mYBybEXhVGLvj58M3n27CVPd3uhqb5QYLigR4CAsaR5FCSyjGYJpRBQfHKk4MDwMbTa4F5bDF8o1V4"
    ],
    "assertionMethod": [
      "#zJss7x7sfKdbFk4racv8zTnMSyQb2mYsKTHXRxfLKaQCd9DxxwjmTdTBjoPr6yhQM5ZU4rLUFyFkHV2u7mYs6tTxDuPd51Qx7NwzwXWYST5mYBybEXhVGLvj58M3n27CVPd3uhqb5QYLigR4CAsaR5FCSyjGYJpRBQfHKk4MDwMbTa4F5bDF8o1V4"
    ],
    "capabilityInvocation": [
      "#zJss7x7sfKdbFk4racv8zTnMSyQb2mYsKTHXRxfLKaQCd9DxxwjmTdTBjoPr6yhQM5ZU4rLUFyFkHV2u7mYs6tTxDuPd51Qx7NwzwXWYST5mYBybEXhVGLvj58M3n27CVPd3uhqb5QYLigR4CAsaR5FCSyjGYJpRBQfHKk4MDwMbTa4F5bDF8o1V4"
    ],
    "capabilityDelegation": [
      "#zJss7x7sfKdbFk4racv8zTnMSyQb2mYsKTHXRxfLKaQCd9DxxwjmTdTBjoPr6yhQM5ZU4rLUFyFkHV2u7mYs6tTxDuPd51Qx7NwzwXWYST5mYBybEXhVGLvj58M3n27CVPd3uhqb5QYLigR4CAsaR5FCSyjGYJpRBQfHKk4MDwMbTa4F5bDF8o1V4"
    ],
    "keyAgreement": [
      "#zJss7x7sfKdbFk4racv8zTnMSyQb2mYsKTHXRxfLKaQCd9DxxwjmTdTBjoPr6yhQM5ZU4rLUFyFkHV2u7mYs6tTxDuPd51Qx7NwzwXWYST5mYBybEXhVGLvj58M3n27CVPd3uhqb5QYLigR4CAsaR5FCSyjGYJpRBQfHKk4MDwMbTa4F5bDF8o1V4"
    ]
  } ` 
*/

export function getResolver() {

  async function resolve(
    did: string,
    parsed: ParsedDID,
  ): Promise<DIDResolutionResult> {
  let ipfs: any
  if (ipfs === undefined) {
    ipfs = await IPFS.create({
      libp2p: defaultOptions
    }) 
  } else {
    if (!ipfs.is_online) {
      console.log('🦊 ipfs is starting')
      ipfs.start()
    }
  }

/*
const save = async (obj: any) => {
  const block = Block.encoder(obj, 'dag-cbor')
  const data = block.encode()
  const cid = await block.cid()

  // js-ipfs uses an older CID value type so we must convert to string
  await ipfs.block.put(data, { cid: cid.toString() })
  return cid
}
*/

const get = async (obj: any) => {
  try {
  const cid = new CID(obj)
  const block = await ipfs.block.get(cid)
  const data = decode(block.data)
  console.log('🦊 ipfs is stop')
    ipfs.stop()
  return data
  } catch (err) {
    console.log(`The ipfs get block fail.`)
    ipfs.stop()
  }
}

/*
setInterval(async () => {
  try {
    const peers = await ipfs.swarm.peers()
    console.log(`The ipfs now has ${peers.length} peers.`)
  } catch (err) {
    console.log('An error occurred trying to check our peers:', err)
  }
}, 2000)
*/

    console.log('parsed: '+ parsed)
// console.log("🐝 block id -> ")

  //  const diddoc2 = await save(diddoc)
    // {method: 'mymethod', id: 'abcdefg', did: 'did:mymethod:abcdefg/some/path#fragment=123', path: '/some/path', fragment: 'fragment=123'}
    //const val = uint8ArrayFromString(diddoc)
   // console.log(diddoc2.toString())
const block_id = did.split(':')[2]
const didDoc = await get(block_id)
//console.log(didDoc)
console.log("🐝 did document -> ")

const didDocumentMetadata = {}
    let didDocument: DIDDocument | null = null
    didDocument = JSON.parse(didDoc)
// await m.put(new Key('/cool/did:ipdid:QmaYBs1gdu2Q6DAcfHVVq4NqysfbrHjnTzhUdajWyrDYxq'), val)
    //const didDoc = await mds.get(new Key('did:ipdid:QmaYBs1gdu2Q6DAcfHVVq4NqysfbrHjnTzhUdajWyrDYxq'))
    // If you need to lookup another did as part of resolving this did document, the primary DIDResolver object is passed in as well
    // const parentDID = await didResolver.resolve(did)
    // Return the DIDResolutionResult object
    console.log(didDocument)
    return {
      didResolutionMetadata: { contentType: 'application/did+ld+json' },
      didDocument,
      didDocumentMetadata
    }
  }

  return { ipdid: resolve }
}

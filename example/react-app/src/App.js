import './App.css'
import { useState } from 'react'
import { Resolver } from 'did-resolver'
import { getResolver } from 'ipdid-did-resolver'

const webDidResolver = getResolver()
console.log(webDidResolver)
const didResolver = new Resolver(webDidResolver)
function App() {
  const [did, setDid] = useState('did:ipdid:bafyreicwxnezzqppzskolg6pvwu2ri5pnepjvbsvgzpb4nn7devfxpskrm')
  const [resolved, setResolved] = useState()
  const [diddoc, setDIDDocument] = useState('')
  return (
    <div className="App">
      <label>DID:</label>
      <input
        type="text"
        value={did}
        onChange={(event) => {
          setDid(event.target.value)
        }}
      />
      <button
        className="App-button"
        type="submit"
        onClick={() => {
          didResolver
            .resolve(did)
            .then((res) => {
              console.log('resolved data', res)
              setDIDDocument(JSON.stringify(res, null, 2))
              setResolved(true)
            })
            .catch((err) => {
              console.error('failed to resolve', err)
              setResolved(false)
            })
        }}
      >
        resolve
      </button>
      <p>
        {resolved === true && `resolved ${did}`}
        {resolved === false && `failed to resolve ${did}`}
        {resolved === true && `<h5>${diddoc.didDocument}</h5>` }
      </p>
    </div>
  )
}

export default App

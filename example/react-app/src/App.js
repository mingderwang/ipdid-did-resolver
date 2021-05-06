import './App.css'
import { useState } from 'react'
import { Resolver } from 'did-resolver'
import { getResolver } from 'ipdid-did-resolver'

const webDidResolver = getResolver()
const didResolver = new Resolver(webDidResolver)
function App() {
  const [did, setDid] = useState('did:ipdid:bafyreicsxjumhqp2fi66ju4eqo5v53eghf4vlt4smlnzt6hcwmwigksiny')
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
              setResolved(true)
              setDIDDocument(JSON.stringify(res.didDocument))
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
      </p>
      <p>
        {resolved === true && `${diddoc}`}
      </p>
    </div>
  )
}

export default App

const IPFS = require("ipfs-api")
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const { create } = require('ipfs-http-client')

// connect to the default API address http://localhost:5001
export const client = create()

// connect to a different API
// const client = create('http://127.0.0.1:5002')

// // connect using a URL
// const client = create(new URL('http://127.0.0.1:5002'))

export default ipfs;
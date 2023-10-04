export const spokePoolAbi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "originChainId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "destinationChainId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "int64",
        "name": "relayerFeePct",
        "type": "int64"
      },
      {
        "indexed": true,
        "internalType": "uint32",
        "name": "depositId",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "quoteTimestamp",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "originToken",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "depositor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "message",
        "type": "bytes"
      }
    ],
    "name": "FundsDeposited",
    "type": "event"
  }
] as const;

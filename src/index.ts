import { createPublicClient, getAddress, webSocket } from 'viem';
import { mainnet, optimism, polygon, base, arbitrum } from 'viem/chains';

import { spokePoolAbi } from './spabi';

export const SPOKE_ADDRESS = getAddress('0x6f26Bf09B1C792e3228e5467807a900A503c0281');

export const WS_RPC_URLS = {
    // "alchemy_free": '',
    // "alchemy_paid": '',
    "llama_free": 'wss://optimism.llamarpc.com',
    // "llama_paid": ''
    // "local": 'localhost:8545'
} as const;

export const listeners = {
    "alchemy_free": createPublicClient({ chain: optimism, transport: webSocket(WS_RPC_URLS["alchemy_free"]) }),
    // "alchemy_paid": createPublicClient({ chain: optimism, transport: webSocket(WS_RPC_URLS["alchemy_paid"]) }),
    "llama_free": createPublicClient({ chain: optimism, transport: webSocket(WS_RPC_URLS["llama_free"]) }),
    // "llama_paid": createPublicClient({ chain: optimism, transport: webSocket(WS_RPC_URLS["llama_paid"]) }),
    // "local": createPublicClient({ chain: optimism, transport: webSocket(WS_RPC_URLS["local"]) }),
} as const;
type keys = keyof typeof listeners;


async function main() {

    for (let node of Object.keys(listeners)) {
        // Block listeners
        listeners[node as keys].watchBlocks({
            onBlock: async block => {
                let blockNum = block.number!;
                let blockTs = block.timestamp!;
                let obsTs = new Date().valueOf();
                console.log(`${node} saw ${blockNum} (${blockTs}) at ${obsTs / 1000}`);
            }
        });

        // Deposit listeners
        listeners[node as keys].watchContractEvent({
            address: SPOKE_ADDRESS,
            abi: spokePoolAbi,
            eventName: 'FundsDeposited',
            onLogs: async logs => {
                let obsTs = new Date().valueOf();
    
                for (let log of logs) {
                    const _originChainId = log.args.originChainId!;
                    const _destinationChainId = log.args.destinationChainId!;
                    console.log(`Deposit ${_originChainId}-${_destinationChainId} appeared on ${node} at ${obsTs / 1000}`);
                }
            }
        });

    }

}

main();

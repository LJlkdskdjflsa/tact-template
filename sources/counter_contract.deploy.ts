import base64url from 'base64url';
import qs from 'qs';
import {Address, beginCell, storeStateInit, toNano} from 'ton';
import { Counter } from './output/sample_Counter';
import {contractAddress} from "ton-core";

async function deploy() {
// Forming an init package
    let owner = Address.parse('EQBC5qMiBmSw3xmOU2aPtMOamnl5nEBNW0NhSpVfiBk_ILmV');
// @ts-ignore
    let init = await Counter.init(owner);
    let testnet = true;

// Contract address
    let address = contractAddress(0, init);

// Amount of TONs to attach to a deployment message
    let deployAmount = toNano('0.5');

// Create string representation of an init package
    let initStr = base64url(beginCell()
        .store(storeStateInit(init))
        .endCell()
        .toBoc({idx: false}));

// Create a deploy link
    console.log(`ton://transfer/` + address.toString({testOnly: testnet}) + "?" + qs.stringify({
        text: 'Deploy',
        amount: deployAmount.toString(10),
        init: initStr
    }));
}

deploy().then(r => {console.log("Done")}).catch(e => {console.log(e)});
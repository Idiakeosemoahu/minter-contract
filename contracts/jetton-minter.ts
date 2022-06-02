import BN from "bn.js";
import { Cell, beginCell, Address, BitString } from "ton";

const OFFCHAIN_CONTENT_PREFIX = 0x01;
// export const JETTON_WALLET_CODE_HEX = 'B5EE9C7241021101000319000114FF00F4A413F4BCF2C80B0102016202030202CC0405001BA0F605DA89A1F401F481F481A8610201D40607020148080900BB0831C02497C138007434C0C05C6C2544D7C0FC02F83E903E900C7E800C5C75C87E800C7E800C00B4C7E08403E29FA954882EA54C4D167C0238208405E3514654882EA58C4CD00CFC02780D60841657C1EF2EA4D67C02B817C12103FCBC2000113E910C1C2EBCB853600201200A0B0201200F1001F500F4CFFE803E90087C007B51343E803E903E90350C144DA8548AB1C17CB8B04A30BFFCB8B0950D109C150804D50500F214013E809633C58073C5B33248B232C044BD003D0032C032483E401C1D3232C0B281F2FFF274013E903D010C7E801DE0063232C1540233C59C3E8085F2DAC4F3208405E351467232C7C6600C02F13B51343E803E903E90350C01F4CFFE80145468017E903E9014D6B1C1551CDB1C150804D50500F214013E809633C58073C5B33248B232C044BD003D0032C0327E401C1D3232C0B281F2FFF274140331C146EC7CB8B0C27E8020822625A020822625A02806A8486544124E17C138C34975C2C070C00930802C200D0E008ECB3F5007FA0222CF165006CF1625FA025003CF16C95005CC07AA0013A08208989680AA008208989680A0A014BCF2E2C504C98040FB001023C85004FA0258CF1601CF16CCC9ED54006C5219A018A182107362D09CC8CB1F5240CB3F5003FA0201CF165007CF16C9718018C8CB0525CF165007FA0216CB6A15CCC971FB00103400828E2A820898968072FB028210D53276DB708010C8CB055008CF165005FA0216CB6A13CB1F13CB3FC972FB0058926C33E25502C85004FA0258CF1601CF16CCC9ED5400DB3B51343E803E903E90350C01F4CFFE803E900C145468549271C17CB8B049F0BFFCB8B0A0822625A02A8005A805AF3CB8B0E0841EF765F7B232C7C572CFD400FE8088B3C58073C5B25C60043232C14933C59C3E80B2DAB33260103EC01004F214013E809633C58073C5B3327B55200083200835C87B51343E803E903E90350C0134C7E08405E3514654882EA0841EF765F784EE84AC7CB8B174CFCC7E800C04E81408F214013E809633C58073C5B3327B55204F664B79';

// encode contract storage according to save_data() contract method
const serializeUri = (uri: string) => {
  return new TextEncoder().encode(encodeURI(uri));
};

const createOffchainUriCell = (uri: string) => {
  const cell = new Cell();
  cell.bits.writeUint(OFFCHAIN_CONTENT_PREFIX, 8);
  serializeUri(uri).forEach((u) => cell.bits.writeUint8(u));
  return cell;
};

export function data(params: { totalSupply: BN; adminAddress: Address; offchainUri: string; jettonWalletCode: Cell }): Cell {
  return beginCell()
    .storeCoins(params.totalSupply)
    .storeAddress(params.adminAddress)
    .storeRef(createOffchainUriCell(params.offchainUri))
    .storeRef(params.jettonWalletCode)
    .endCell();
}

// message encoders for all ops (see contracts/imports/constants.fc for consts)

// export function increment(): Cell {
//   return beginCell().storeUint(0x37491f2f, 32).storeUint(0, 64).endCell();
// }

// export function deposit(): Cell {
//   return beginCell().storeUint(0x47d54391, 32).storeUint(0, 64).endCell();
// }

// export function withdraw(params: { withdrawAmount: BN }): Cell {
//   return beginCell().storeUint(0x41836980, 32).storeUint(0, 64).storeCoins(params.withdrawAmount).endCell();
// }

// export function transferOwnership(params: { newOwnerAddress: Address }): Cell {
//   return beginCell().storeUint(0x2da38aaf, 32).storeUint(0, 64).storeAddress(params.newOwnerAddress).endCell();
// }

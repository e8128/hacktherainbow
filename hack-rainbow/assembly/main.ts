// @nearfile
import { context, storage, logging, PersistentMap } from "near-sdk-as";

// --- contract code goes below

const balances = new PersistentMap<string, u64>("b:");
const funds = new PersistentMap<string, Fund>("f:");

const TOTAL_SUPPLY: u64 = 1000000;
export function init(initialOwner: string): void {
  logging.log("initialOwner: " + initialOwner);
  assert(storage.get<string>("init") == null, "Already initialized token supply");
  balances.set(initialOwner, TOTAL_SUPPLY);
  storage.set("init", "done");
}

export function totalSupply(): string {
  return TOTAL_SUPPLY.toString();
}

export function balanceOf(tokenOwner: string): u64 {
  logging.log("balanceOf: " + tokenOwner);
  if (!balances.contains(tokenOwner)) {
    return 0;
  }
  const result = balances.getSome(tokenOwner);
  return result;
}

export function transfer(to: string, tokens: u64): boolean {
  logging.log("transfer from: " + context.sender + " to: " + to + " tokens: " + tokens.toString());
  const fromAmount = getBalance(context.sender);
  assert(fromAmount >= tokens, "not enough tokens on account");
  assert(getBalance(to) <= getBalance(to) + tokens,"overflow at the receiver side");
  balances.set(context.sender, fromAmount - tokens);
  balances.set(to, getBalance(to) + tokens);
  return true;
}

export function transferFrom(from: string, to: string, tokens: u64): boolean {
  const fromAmount = getBalance(from);
  assert(fromAmount >= tokens, "not enough tokens on account");
  assert(getBalance(to) <= getBalance(to) + tokens,"overflow at the receiver side");
  balances.set(from, fromAmount - tokens);
  balances.set(to, getBalance(to) + tokens);
  return true;
}

function getBalance(owner: string): u64 {
  return balances.contains(owner) ? balances.getSome(owner) : 0;
}

export function getFund(fundId: string): Fund {
  return funds.getSome(fundId);
}

// export function getFundTokens(fundId: string): u64 {
//   assert(funds.contains(fundId), "fund does not exist");
//   return (funds.contains(fundId) ? funds.getSome(fundId).tokens : 0);
// }

// eventually make from just context.sender
export function donate(from: string, fundId: string, tokens: u64) : boolean {
  logging.log("donation from: " + from + " to: " + fundId + " tokens: " + tokens.toString());
  assert(funds.contains(fundId), "fund does not exist");
  const fromAmount = getBalance(from);
  assert(fromAmount >= tokens, "not enough tokens on account");
  balances.set(from, fromAmount - tokens);
  let fund: Fund = funds.getSome(fundId);
  funds.set(fundId, new Fund(fundId, fund.tokens + tokens, fund.manager, fund.description));
  return true;
}

// eventually make manager just context.sender
export function createFund(fundId: string, manager: string, description: string): boolean {
  let fund: Fund = new Fund(fundId, 0, manager, description);
  funds.set(fundId, fund);
  return true;
}

export class Fund {
  fundId: string;
  tokens: u64;
  manager: string;
  description: string;

  constructor(fundId: string, tokens: u64, manager: string, description: string) {
    this.fundId = fundId;
    this.tokens = tokens;
    this.manager = manager;
    this.description = description;
  }
}
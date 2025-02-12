import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(8);
    let _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(32);
    let _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type Deposit = {
    $$type: 'Deposit';
    amount: bigint;
    to: Address;
}

export function storeDeposit(src: Deposit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2699315230, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.to);
    };
}

export function loadDeposit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2699315230) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    let _to = sc_0.loadAddress();
    return { $$type: 'Deposit' as const, amount: _amount, to: _to };
}

function loadTupleDeposit(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: 'Deposit' as const, amount: _amount, to: _to };
}

function loadGetterTupleDeposit(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: 'Deposit' as const, amount: _amount, to: _to };
}

function storeTupleDeposit(source: Deposit) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.to);
    return builder.build();
}

function dictValueParserDeposit(): DictionaryValue<Deposit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeposit(src)).endCell());
        },
        parse: (src) => {
            return loadDeposit(src.loadRef().beginParse());
        }
    }
}

export type Treasury$Data = {
    $$type: 'Treasury$Data';
    deployer: Address;
    totalSupply: bigint;
}

export function storeTreasury$Data(src: Treasury$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.deployer);
        b_0.storeInt(src.totalSupply, 257);
    };
}

export function loadTreasury$Data(slice: Slice) {
    let sc_0 = slice;
    let _deployer = sc_0.loadAddress();
    let _totalSupply = sc_0.loadIntBig(257);
    return { $$type: 'Treasury$Data' as const, deployer: _deployer, totalSupply: _totalSupply };
}

function loadTupleTreasury$Data(source: TupleReader) {
    let _deployer = source.readAddress();
    let _totalSupply = source.readBigNumber();
    return { $$type: 'Treasury$Data' as const, deployer: _deployer, totalSupply: _totalSupply };
}

function loadGetterTupleTreasury$Data(source: TupleReader) {
    let _deployer = source.readAddress();
    let _totalSupply = source.readBigNumber();
    return { $$type: 'Treasury$Data' as const, deployer: _deployer, totalSupply: _totalSupply };
}

function storeTupleTreasury$Data(source: Treasury$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.deployer);
    builder.writeNumber(source.totalSupply);
    return builder.build();
}

function dictValueParserTreasury$Data(): DictionaryValue<Treasury$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTreasury$Data(src)).endCell());
        },
        parse: (src) => {
            return loadTreasury$Data(src.loadRef().beginParse());
        }
    }
}

export type InternalAddTokens = {
    $$type: 'InternalAddTokens';
    amount: bigint;
    origin: Address;
}

export function storeInternalAddTokens(src: InternalAddTokens) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3781127134, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.origin);
    };
}

export function loadInternalAddTokens(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3781127134) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    let _origin = sc_0.loadAddress();
    return { $$type: 'InternalAddTokens' as const, amount: _amount, origin: _origin };
}

function loadTupleInternalAddTokens(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _origin = source.readAddress();
    return { $$type: 'InternalAddTokens' as const, amount: _amount, origin: _origin };
}

function loadGetterTupleInternalAddTokens(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _origin = source.readAddress();
    return { $$type: 'InternalAddTokens' as const, amount: _amount, origin: _origin };
}

function storeTupleInternalAddTokens(source: InternalAddTokens) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.origin);
    return builder.build();
}

function dictValueParserInternalAddTokens(): DictionaryValue<InternalAddTokens> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInternalAddTokens(src)).endCell());
        },
        parse: (src) => {
            return loadInternalAddTokens(src.loadRef().beginParse());
        }
    }
}

export type Box$Data = {
    $$type: 'Box$Data';
    treasury: Address;
    owner: Address;
    balance: bigint;
}

export function storeBox$Data(src: Box$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.treasury);
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.balance, 257);
    };
}

export function loadBox$Data(slice: Slice) {
    let sc_0 = slice;
    let _treasury = sc_0.loadAddress();
    let _owner = sc_0.loadAddress();
    let _balance = sc_0.loadIntBig(257);
    return { $$type: 'Box$Data' as const, treasury: _treasury, owner: _owner, balance: _balance };
}

function loadTupleBox$Data(source: TupleReader) {
    let _treasury = source.readAddress();
    let _owner = source.readAddress();
    let _balance = source.readBigNumber();
    return { $$type: 'Box$Data' as const, treasury: _treasury, owner: _owner, balance: _balance };
}

function loadGetterTupleBox$Data(source: TupleReader) {
    let _treasury = source.readAddress();
    let _owner = source.readAddress();
    let _balance = source.readBigNumber();
    return { $$type: 'Box$Data' as const, treasury: _treasury, owner: _owner, balance: _balance };
}

function storeTupleBox$Data(source: Box$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.treasury);
    builder.writeAddress(source.owner);
    builder.writeNumber(source.balance);
    return builder.build();
}

function dictValueParserBox$Data(): DictionaryValue<Box$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBox$Data(src)).endCell());
        },
        parse: (src) => {
            return loadBox$Data(src.loadRef().beginParse());
        }
    }
}

 type Box_init_args = {
    $$type: 'Box_init_args';
    treasury: Address;
    owner: Address;
}

function initBox_init_args(src: Box_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.treasury);
        b_0.storeAddress(src.owner);
    };
}

async function Box_init(treasury: Address, owner: Address) {
    const __code = Cell.fromBase64('te6ccgECFQEAA8gAART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVEts88uCCEQQFAgEgCwwC9O2i7fsBkjB/4HAh10nCH5UwINcLH94gghDhX2veuo5IMNMfAYIQ4V9r3rry4IGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBJSQMcFm4FEAfhCUlDHBfL03qB/4CCCEJRqmLa64wLAAJEw4w1wBgcAosj4QwHMfwHKAFUgWiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAMntVAFQMNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8fwgBiPkBgvBQkrXc4HFaV92Wn1+1pvkwJaCwLqsylHDKKzZcoNfpOrqOnIFtEfhCUjDHBfL0IX9wgQCCECNtbW3bPDB/2zHgCQE8bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwwCQHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wgKAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAhG8nQbZ5tnjYYwRDQIBIA8QAQ74J28Qeds8DgDaIMEBIcJNsfLQhsgiwQCYgC0BywcCowLef3BvAASOGwR6qQwgwABSMLCzm3AzpjAUb4wEpAQDkTDiBOQBs5cCgC5vjAKk3o4QA3qpDKYwE2+MA6QiwAAQNOYzIqUDmlMSb4EBywcCpQLkbCHJ0AIRuWwNs82zxsMYERIAEbgr7tRNDSAAGAHC7UTQ1AH4Y9IAAY5J+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAVSBsE+D4KNcLCoMJuvLgiRMAAiABivpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBIC0QHbPBQAAnA=');
    const __system = Cell.fromBase64('te6cckECFwEAA9IAAQHAAQEFoS6NAgEU/wD0pBP0vPLICwMCAWIEDAN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRLbPPLgghIFCwL07aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEOFfa966jkgw0x8BghDhX2veuvLggYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsElJAxwWbgUQB+EJSUMcF8vTeoH/gIIIQlGqYtrrjAsAAkTDjDXAGCAFQMNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8fwcBPG1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8MAkBiPkBgvBQkrXc4HFaV92Wn1+1pvkwJaCwLqsylHDKKzZcoNfpOrqOnIFtEfhCUjDHBfL0IX9wgQCCECNtbW3bPDB/2zHgCQHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wgKAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAKLI+EMBzH8BygBVIFog10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwDJ7VQCASANEAIRvJ0G2ebZ42GMEg4BDvgnbxB52zwPANogwQEhwk2x8tCGyCLBAJiALQHLBwKjAt5/cG8ABI4bBHqpDCDAAFIwsLObcDOmMBRvjASkBAORMOIE5AGzlwKALm+MAqTejhADeqkMpjATb4wDpCLAABA05jMipQOaUxJvgQHLBwKlAuRsIcnQAgEgERYCEblsDbPNs8bDGBIVAcLtRNDUAfhj0gABjkn6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBVIGwT4Pgo1wsKgwm68uCJEwGK+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEgLRAds8FAACcAACIAARuCvu1E0NIAAYevKQ3A==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initBox_init_args({ $$type: 'Box_init_args', treasury, owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Box_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    15509: { message: `Only deployer is allowed to withdraw` },
    17409: { message: `treasury only` },
    27921: { message: `Only owner is allowed to withdraw` },
}

const Box_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Deposit","header":2699315230,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Treasury$Data","header":null,"fields":[{"name":"deployer","type":{"kind":"simple","type":"address","optional":false}},{"name":"totalSupply","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"InternalAddTokens","header":3781127134,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"origin","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Box$Data","header":null,"fields":[{"name":"treasury","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const Box_getters: ABIGetter[] = [
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getTON","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
]

export const Box_getterMapping: { [key: string]: string } = {
    'balance': 'getBalance',
    'getTON': 'getGetTon',
}

const Box_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"InternalAddTokens"}},
    {"receiver":"internal","message":{"kind":"text","text":"withdraw all"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Box implements Contract {
    
    static async init(treasury: Address, owner: Address) {
        return await Box_init(treasury, owner);
    }
    
    static async fromInit(treasury: Address, owner: Address) {
        const init = await Box_init(treasury, owner);
        const address = contractAddress(0, init);
        return new Box(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Box(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Box_types,
        getters: Box_getters,
        receivers: Box_receivers,
        errors: Box_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: InternalAddTokens | 'withdraw all' | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InternalAddTokens') {
            body = beginCell().store(storeInternalAddTokens(message)).endCell();
        }
        if (message === 'withdraw all') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('balance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetTon(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getTON', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
}
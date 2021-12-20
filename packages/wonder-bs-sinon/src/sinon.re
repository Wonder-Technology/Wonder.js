open Wonder_jest;

/* type sandboxT = ref (Js.t {..}); */
[@bs.scope "sandbox"] [@bs.module "sinon"]
external createSandbox : unit => Js.t({..}) = "create";

type sandbox;

external refJsObjToSandbox : Js.t({..}) => sandbox = "%identity";

/* external refJsObjToSandbox : ( Js.t {..} ) => sandbox = "%identity"; */
let getSandboxDefaultVal = () => ref({"stub": 1});

/* let restoreSandbox sandbox => sandbox##restore(); */
let restoreSandbox: sandbox => unit = [%bs.raw
  {| function(sandbox) {
    sandbox.restore();
}
|}
];

let createEmptyStub: sandbox => 'emptyStub = [%bs.raw
  {| function(sandbox) {
    return sandbox.stub();
}
|}
];

let createEmptyStubWithJsObjSandbox = sandbox =>
  createEmptyStub(refJsObjToSandbox(sandbox^));

[@bs.scope "match"] [@bs.module "sinon"] external matchAny : 'any = "any";

type obj;

type call;

type stub;

external jsObjToObj : Js.t({..}) => obj = "%identity";

external stubToJsObj : stub => Js.t({..}) = "%identity";

external jsObjToStub : Js.t({..}) => stub = "%identity";

external callToJsObj : call => Js.t({..}) = "%identity";

external jsObjToCall : Js.t({..}) => call = "%identity";

let createMethodStub = [%bs.raw
  {| function(sandbox, obj, method) {
    sandbox.stub(obj, method);

    /* obj[method] =  sandbox.stub(); */

    return obj[method];
}
|}
];

let createMethodStubWithJsObjSandbox = (sandbox, obj, methodName) =>
  createMethodStub(refJsObjToSandbox(sandbox^), obj, methodName);

let returns = (returnVal, stub: stub) : stub =>
  stubToJsObj(stub)##returns(returnVal);

let withOneArg = (arg, stub: stub) : stub =>
  stubToJsObj(stub)##withArgs(arg);

let withTwoArgs = (arg1, arg2, stub: stub) : stub =>
  stubToJsObj(stub)##withArgs(arg1, arg2);

let withThreeArgs = (arg1, arg2, arg3, stub: stub) : stub =>
  stubToJsObj(stub)##withArgs(arg1, arg2, arg3);

let withFourArgs = (arg1, arg2, arg3, arg4, stub: stub) : stub =>
  stubToJsObj(stub)##withArgs(arg1, arg2, arg3, arg4);

let getCall = (index: int, stub: stub) => stubToJsObj(stub)##getCall(index);

let onCall = (index: int, stub: stub) : stub =>
  stubToJsObj(stub)##onCall(index);

let getArgsFromEmptyStub = (call: Js.t({..})) => {
  let args = call##args;
  Array.to_list(args);
};

let getArgs = (call: Js.t({..})) => Array.to_list(call##args);

let getSpecificArg = (index: int, call: Js.t({..})) => {
  let args = call##args;
  Array.to_list(args[index]);
};

let getCallCount = (stub: stub) : int => stubToJsObj(stub)##callCount;

let calledBefore = (actual: stub, expected: stub) =>
  stubToJsObj(actual)##calledBefore(stubToJsObj(expected));

let calledAfter = (actual: stub, expected: stub) =>
  stubToJsObj(actual)##calledAfter(stubToJsObj(expected));

let toCalledWith = (expectedArg: array('a), expect) =>
  ExpectSinon.toCalledWith(expectedArg) @@ Obj.magic(expect);

let toCalledBefore = (expectedArg: 'b, expect) =>
  ExpectSinon.toCalledBefore(expectedArg) @@ expect;

let toCalledAfter = (expectedArg: 'b, expect) =>
  ExpectSinon.toCalledAfter(expectedArg) @@ expect;

let toCalled = (expect) =>
  ExpectSinon.toCalled @@ expect;

let toCalledOnce = (expect) =>
  ExpectSinon.toCalledOnce @@ expect;

let toCalledTwice = (expect) =>
  ExpectSinon.toCalledTwice @@ expect;

let toCalledThrice = (expect) =>
  ExpectSinon.toCalledThrice @@ expect;
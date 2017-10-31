open Jest;

/* type sandboxT = ref (Js.t {..}); */
[@bs.scope "sandbox"] [@bs.module "sinon"] external createSandbox : unit => Js.t({..}) = "create";

type sandbox;

external refJsObjToSandbox : Js.t({..}) => sandbox = "%identity";

/* external refJsObjToSandbox : ( Js.t {..} ) => sandbox = "%identity"; */
let getSandboxDefaultVal = () => ref({"stub": 1});

/* let restoreSandbox sandbox => sandbox##restore(); */
let restoreSandbox: sandbox => unit = [%bs.raw {| function(sandbox) {
    sandbox.restore();
}
|}];

let createEmptyStub: sandbox => 'emptyStub = [%bs.raw
  {| function(sandbox) {
    return sandbox.stub();
}
|}
];

[@bs.scope "match"] [@bs.module "sinon"] external matchAny : 'any = "any";

type obj;

type call;

type stub;

external jsObjToObj : Js.t({..}) => obj = "%identity";

external stubToJsObj : stub => Js.t({..}) = "%identity";

external jsObjToStub : Js.t({..}) => stub = "%identity";

external callToJsObj : call => Js.t({..}) = "%identity";

external jsObjToCall : Js.t({..}) => call = "%identity";

let createMethodStub: (sandbox, obj, string) => stub = [%bs.raw
  {| function(sandbox, obj, method) {
    sandbox.stub(obj, method);

    /* obj[method] =  sandbox.stub(); */

    return obj[method];
}
|}
];

let setReturn = (stub: stub, ~returnVal) : stub => stubToJsObj(stub)##returns(returnVal);

let withOneArg = (stub: stub, ~arg) : stub => stubToJsObj(stub)##withArgs(arg);

let getCall = (stub: stub, index: int) => stubToJsObj(stub)##getCall(index);

let getArgsFromEmptyStub = (call: Js.t({..})) => {
  let args = call##args;
  Array.to_list(args[0])
};

let getArgs = (call: Js.t({..})) => Array.to_list(call##args);

let getCallCount = (stub: stub) : int => stubToJsObj(stub)##callCount;

let toCalledWith = (expectedArg: list('a), expect: Expect.partial('a)) =>
  ExpectSinon.toCalledWith(Array.of_list(expectedArg)) @@ expect;

let toCalledBefore = (expectedArg: 'b, expect: Expect.partial('a)) =>
  ExpectSinon.toCalledBefore(expectedArg) @@ expect;

let toCalledAfter = (expectedArg: 'b, expect: Expect.partial('a)) =>
  ExpectSinon.toCalledAfter(expectedArg) @@ expect;

let toCalled = (expect: Expect.partial('a)) => ExpectSinon.toCalled @@ expect;

let toCalledOnce = (expect: Expect.partial('a)) => ExpectSinon.toCalledOnce @@ expect;

let toCalledTwice = (expect: Expect.partial('a)) => ExpectSinon.toCalledTwice @@ expect;

let toCalledThrice = (expect: Expect.partial('a)) => ExpectSinon.toCalledThrice @@ expect;

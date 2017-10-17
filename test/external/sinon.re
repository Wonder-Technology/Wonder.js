open Jest;

/* type sandboxT = ref (Js.t {..}); */
external createSandbox : unit => Js.t {..} = "create" [@@bs.scope "sandbox"] [@@bs.module "sinon"];

type sandbox;

external refJsObjToSandbox : Js.t {..} => sandbox = "%identity";

/* external refJsObjToSandbox : ( Js.t {..} ) => sandbox = "%identity"; */
let getSandboxDefaultVal () => ref {"stub": 1};

/* let restoreSandbox sandbox => sandbox##restore(); */
let restoreSandbox: sandbox => unit = [%bs.raw {| function(sandbox) {
    sandbox.restore();
}
|}];

/* let createEmptyStub (sandbox:(Js.t {..})) => sandbox##stub (); */
/* let createEmptyStub (sandbox:(Js.t {..})) => sandbox##stub (); */
let createEmptyStub = [%bs.raw {| function(sandbox) {
    return sandbox.stub();
}
|}];

let createMethodStub = [%bs.raw
  {| function(sandbox, obj, method) {
    sandbox.stub(obj, method);

    /* obj[method] =  sandbox.stub(); */

    return obj[method];
}
|}
];

let setReturn stub ::returnVal => stub##returns returnVal;

let withOneArg stub ::arg => stub##withArgs arg;

let getCall stub (index: int) => stub##getCall index;

let getArgsFromEmptyStub call => {
  let args = call##args;
  Array.to_list args.(0)
};

let getArgs call => Array.to_list call##args;

let getCallCount stub => stub##callCount;

let toCalledWith (expectedArg: list 'a) (expect: Expect.partial 'a) =>
  ExpectSinon.toCalledWith (Array.of_list expectedArg) @@ expect;

let toCalledBefore (expectedArg: 'b) (expect: Expect.partial 'a) =>
  ExpectSinon.toCalledBefore expectedArg @@ expect;

let toCalledAfter (expectedArg: 'b) (expect: Expect.partial 'a) =>
  ExpectSinon.toCalledAfter expectedArg @@ expect;

let toCalled (expect: Expect.partial 'a) => ExpectSinon.toCalled @@ expect;

let toCalledOnce (expect: Expect.partial 'a) => ExpectSinon.toCalledOnce @@ expect;

let toCalledTwice (expect: Expect.partial 'a) => ExpectSinon.toCalledTwice @@ expect;

let toCalledThrice (expect: Expect.partial 'a) => ExpectSinon.toCalledThrice @@ expect;
let returns = (stub, value) => stub->Sinon.returns(value, _)->Obj.magic;

// let createEmptyStub: Sinon.sandbox => 'emptyStub = [%bs.raw
//   {| function(sandbox) {
// //      return ((arg1, arg2) =>   {
// // return  sandbox.stub.apply(sandbox, Array.prototype.slice.call(arguments) );

// //           })()

//     let stub = sandbox.stub();
//     stub.length = 0;

//     return stub;
// }
// |}
// ];

// let createTwoArgsEmptyStub = (sandbox) =>{
//     (arg1, arg2) =>{
// Sinon.createEmptyStub(Sinon.refJsObjToSandbox(sandbox^))
//     }
// }

// let createEmptyStub: Sinon.sandbox => 'emptyStub = [%bs.raw
//   {| function(sandbox) {
//      return ((arg1, arg2) =>   {
// return  sandbox.stub.apply(sandbox, Array.prototype.slice.call(arguments) );

//           })
// }
// |}
// ];

let createTwoArgsEmptyStubData = [%bs.raw
  {| function(stub) {
     return [stub, (a,b) =>   {
//return  stub.apply(null, Array.prototype.slice.call(arguments));
return  stub(a, b);
          }];
}
|}
];

let getStub = ((stub, _)) => stub;

let getDpFunc = ((_, dpFunc)) => dpFunc;

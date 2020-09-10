let returns = (stub, value) => stub->Sinon.returns(value, _)->Obj.magic;

let getStub = ((stub, _)) => stub;

let getDpFunc = ((_, dpFunc)) => dpFunc;

let createTwoArgsEmptyStubData = [%bs.raw
  {| function(stub) {
     return [stub, (a,b) =>   {
return  stub(a, b);
          }];
}
|}
];

let createThreeArgsEmptyStubData = [%bs.raw
  {| function(stub) {
     return [stub, (a,b, c) =>   {
return  stub(a, b, c);
          }];
}
|}
];

let createFourArgsEmptyStubData = [%bs.raw
  {| function(stub) {
     return [stub, (a,b, c, d) =>   {
return  stub(a, b, c, d);
          }];
}
|}
];

let createFiveArgsEmptyStubData = [%bs.raw
  {| function(stub) {
     return [stub, (a,b, c, d, e) =>   {
return  stub(a, b, c, d, e);
          }];
}
|}
];

let createSixArgsEmptyStubData = [%bs.raw
  {| function(stub) {
     return [stub, (a,b, c, d, e, f) =>   {
return  stub(a, b, c, d, e, f);
          }];
}
|}
];

let createSevenArgsEmptyStubData = [%bs.raw
  {| function(stub) {
     return [stub, (a,b, c,d,e,f,g) =>   {
return  stub(a,b, c,d,e,f,g);
          }];
}
|}
];

let toCalledWith = (expect, expectedArg) =>
  Wonder_jest.ExpectSinon.toCalledWith(expectedArg->Obj.magic) @@
  Obj.magic(expect);

let calledWithArg2 = (stub, arg1, arg2) => stub##calledWith(arg1, arg2);

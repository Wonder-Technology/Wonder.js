open Sinon;

let _defer = [%bs.raw
  {|
   function(timeout, returnedData) {
     return new Promise((resolve, reject)=>{
     setTimeout(function(){
       resolve(returnedData)
     }, timeout)
     });
   }
    |}
];

/* TODO move to wonder-bs-sinon */
let calledWith = (stub, arg) => stub##calledWith(arg);

let calledWithArg2 = (stub, arg1, arg2) => stub##calledWith(arg1, arg2);

let calledWithArg3 = (stub, arg1, arg2, arg3) =>
  stub##calledWith(arg1, arg2, arg3);

let calledWithArg4 = (stub, arg1, arg2, arg3, arg4) =>
  stub##calledWith(arg1, arg2, arg3, arg4);

let calledWithArg5 = (stub, arg1, arg2, arg3, arg4, arg5) =>
  stub##calledWith(arg1, arg2, arg3, arg4, arg5);

let calledWithArg6 = (stub, arg1, arg2, arg3, arg4, arg5, arg6) =>
  stub##calledWith(arg1, arg2, arg3, arg4, arg5, arg6);

let deferReturns = (timeout, returnedData, stub) =>
  stub |> returns(_defer(timeout, returnedData));

let returnDifferentOnEachCall = stub =>
  ArrayService.range(0, 100)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. stub, i) => stub |> onCall(i) |> returns(i |> Obj.magic),
       stub,
     );
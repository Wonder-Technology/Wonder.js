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
let calledWith = (stub, arg) => stub##calledWith(arg) |> Js.to_bool;

let deferReturns = (timeout, returnedData, stub) => stub |> returns(_defer(timeout, returnedData));

let returnDifferentOnEachCall = (stub) =>
  ArrayService.range(0, 100)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs] ((stub, i) => stub |> onCall(i) |> returns(i |> Obj.magic)),
       stub
     );
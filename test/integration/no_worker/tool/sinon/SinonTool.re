/* TODO move to wonder-bs-sinon */
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

let deferReturns = (timeout, returnedData, stub) => stub |> returns(_defer(timeout, returnedData));

let returnDifferentOnEachCall = (stub) =>
  ArrayService.range(0, 100)
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs] ((stub, i) => stub |> onCall(i) |> returns(i |> Obj.magic)),
       stub
     );
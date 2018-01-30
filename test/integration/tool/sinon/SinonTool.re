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
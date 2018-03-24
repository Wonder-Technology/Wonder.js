let createWorker = [%bs.raw
  {|
   function() {
       var div = document.createElement("div");

div.postMessage = function(){};

return div;
   }
    |}
];

let stubPostMessage = (sandbox, worker) =>
  Sinon.createMethodStubWithJsObjSandbox(sandbox, worker, "postMessage");
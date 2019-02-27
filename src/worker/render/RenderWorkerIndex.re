open RenderWorkerSystem;

/* TODO refactor: not invoke RenderWorkerSystem$Wonderjs! */

let useThisToImportRenderWorkerSystem = RenderWorkerSystem.onerrorHandler;

let defineOnError: unit => unit = [%bs.raw
  {|
       function(param) {
           onerror = (msg, fileName, lineno) => {
RenderWorkerSystem$Wonderjs.onerrorHandler(msg, fileName, lineno);
           }
       }
        |}
];

/* let defineOnMessage: unit => unit = [%bs.raw
  {|
       function(param) {
           onmessage = (e) => {
RenderWorkerSystem$Wonderjs.onmessage(e);
           }
       }
        |}
]; */

defineOnError();

/* defineOnMessage(); */
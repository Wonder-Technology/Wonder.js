open Sinon

let _defer = %raw(`
   function(timeout, returnedData) {
     return new Promise((resolve, reject)=>{
     setTimeout(function(){
       resolve(returnedData)
     }, timeout)
     });
   }
    `)

/* TODO move to wonder-bs-sinon */
let calledWith = (stub, arg) => stub["calledWith"](. arg)

let calledWithArg2 = (stub, arg1, arg2) => stub["calledWith"](. arg1, arg2)

let calledWithArg3 = (stub, arg1, arg2, arg3) => stub["calledWith"](. arg1, arg2, arg3)

let calledWithArg4 = (stub, arg1, arg2, arg3, arg4) => stub["calledWith"](. arg1, arg2, arg3, arg4)

let calledWithArg5 = (stub, arg1, arg2, arg3, arg4, arg5) =>
  stub["calledWith"](. arg1, arg2, arg3, arg4, arg5)

let calledWithArg6 = (stub, arg1, arg2, arg3, arg4, arg5, arg6) =>
  stub["calledWith"](. arg1, arg2, arg3, arg4, arg5, arg6)

let deferReturns = (timeout, returnedData, stub) => stub->returns(_defer(timeout, returnedData), _)

let createMethodStub = %raw(` function(sandbox, obj, method) {
    /* sandbox.stub(obj, method); */

    obj[method] =  sandbox.stub();

    return obj[method];
}
`)

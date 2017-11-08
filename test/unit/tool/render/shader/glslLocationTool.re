let _getLocation = (~pos=10, sandbox, name: string) => {
  let stub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  stub |> Sinon.withTwoArgs(Sinon.matchAny, name) |> Sinon.setReturn(pos) |> ignore;
  stub
};

let getAttribLocation = _getLocation;

let getUniformLocation = _getLocation;
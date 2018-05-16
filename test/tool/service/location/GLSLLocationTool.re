open StateDataMainType;

let getGLSLLocationRecord = (state) => state.glslLocationRecord;

let stubLocation = (stub, pos, sandbox, name: string) => {
  stub |> Sinon.withTwoArgs(Sinon.matchAny, name) |> Sinon.returns(pos) |> ignore;
  stub
};

let _getLocation = (~pos=10, sandbox, name: string) =>
  stubLocation(Sinon.createEmptyStubWithJsObjSandbox(sandbox), pos, sandbox, name);

let getAttribLocation = _getLocation;

let getUniformLocation = _getLocation;

let getUniformLocationWithNameArr = (sandbox, stub, nameArr, posArr) =>
  nameArr
  |> Js.Array.reducei(
       (stub, name, index) => {
         stub |> Sinon.withTwoArgs(Sinon.matchAny, name) |> Sinon.returns(posArr[index]) |> ignore;
         stub
       },
       stub
     );

let getUniformLocationWithPosArr = (sandbox, posArr, nameArr) => {
  let stub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  posArr
  |> Js.Array.forEachi(
       (pos, i) =>
         stub |> Sinon.withTwoArgs(Sinon.matchAny, nameArr[i]) |> Sinon.returns(pos) |> ignore
     );
  stub
};
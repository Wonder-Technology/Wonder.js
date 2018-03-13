open StateDataType;

let getGLSLLocationRecord = (state) => state.glslLocationRecord;

let _getLocation = (~pos=10, sandbox, name: string) => {
  let stub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  stub |> Sinon.withTwoArgs(Sinon.matchAny, name) |> Sinon.returns(pos) |> ignore;
  stub
};

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
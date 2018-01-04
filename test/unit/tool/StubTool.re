let buildStubWhichReturnDifferentValue = (sandbox) => {
  open Sinon;
  let stub = createEmptyStubWithJsObjSandbox(sandbox);
  for (i in 0 to 100) {
    stub |> onCall(i) |> returns(Obj.magic(RandomTool.getRandomFloat(1000.))) |> ignore
  };
  stub
};
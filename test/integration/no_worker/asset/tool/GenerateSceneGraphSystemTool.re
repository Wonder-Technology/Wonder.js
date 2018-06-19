open Js.Promise;

open Sinon;

let _emptyBufferUriData = jsonStr =>
  jsonStr
  |> Js.String.replaceByRe(
       [%re {|/"buffers"\:\[\{"byteLength"\:(\d+),\"uri"\:".+?"/img|}],
       {|"buffers":[{"byteLength":$1,"uri":""|},
     );

let _contain = (targetJsonStr: string, wdJson: Js.Json.t) =>
  Wonder_jest.(
    Expect.(
      Expect.Operators.(
        wdJson
        |> Js.Json.stringify
        |> _emptyBufferUriData
        |> expect
        |> toContainString(
             targetJsonStr |> Js.String.replaceByRe([%re {|/\s/img|}], ""),
           )
      )
    )
  );
/* Wonder_jest.(
   Expect.(
     Expect.Operators.( */
/* targetJsonStr
   |> Js.String.trim
   |> Js.Json.parseExn
   |> expect == (wdJson |> Obj.magic) */

/* wdJson |> Js.Json.stringify
   /* |> Js.Json.parseExn */
   |> expect |> toContainString (
   targetJsonStr
   |> Js.String.replaceByRe([%re {|/\s/img|}], "") */

/* )

       )
     )
   ); */

let testResult = (gltfJson, testFunc, state) =>
  ConvertGLTFTool.testResult(gltfJson, data =>
    testFunc(AssembleWDSystem.assemble(data, state))
  );

let testGLTFResultByGLTF = (gltfJson, targetJson, state) => {
  open Js.Promise;

  let result = ref(Obj.magic(1));

  ConvertGLTFTool.buildFakeLoadImage();

  ConvertGLTFSystem.convert(gltfJson)
  |. AssembleWDSystem.assemble(state^)
  |> Most.forEach(data => result := data)
  |> then_(() => {
       let (state, sceneGameObject) = result^;

       GenerateSceneGraphSystem.generateEmbededGLTF(
         sceneGameObject,
         WonderCommonlib.SparseMapService.createEmpty(),
         state,
       )
       |> _contain(targetJson)
       |> resolve;
     });
};

let testGLTFResultByGameObject = (sceneGameObject, targetJson, state) =>
  GenerateSceneGraphSystem.generateEmbededGLTF(
    sceneGameObject,
    WonderCommonlib.SparseMapService.createEmpty(),
    state,
  )
  |> _contain(targetJson);

let testGLTFResultByGameObjectWithImageBase64Map =
    (sceneGameObject, targetJson, imageBase64Map, state) =>
  GenerateSceneGraphSystem.generateEmbededGLTF(
    sceneGameObject,
    imageBase64Map,
    state,
  )
  |> _contain(targetJson);

let testAssembleResultByGLTF = (gltfJson, testFunc, state) => {
  open Js.Promise;

  let result = ref(Obj.magic(1));

  ConvertGLTFTool.buildFakeLoadImage();

  ConvertGLTFSystem.convert(gltfJson)
  |. AssembleWDSystem.assemble(state^)
  |> Most.forEach(data => result := data)
  |> then_(() => {
       let (state, sceneGameObject) = result^;

       GenerateSceneGraphSystem.generateEmbededWD(
         sceneGameObject,
         WonderCommonlib.SparseMapService.createEmpty(),
         state,
       )
       |> resolve;
     })
  |> then_(((state, data)) =>
       AssembleWDSystem.assemble(data, state)
       |> Most.forEach(data => result := data)
       |> then_(() => testFunc(result^) |> resolve)
     );
};

let testAssembleResultByGameObject = (sceneGameObject, testFunc, state) => {
  open Js.Promise;

  let result = ref(Obj.magic(1));

  let (state, data) =
    GenerateSceneGraphSystem.generateEmbededWD(
      sceneGameObject,
      WonderCommonlib.SparseMapService.createEmpty(),
      state,
    );

  AssembleWDSystem.assemble(data, state)
  |> Most.forEach(data => result := data)
  |> then_(() => testFunc(result^) |> resolve);
};

let _buildFakeContext = sandbox => {
  "drawImage": createEmptyStubWithJsObjSandbox(sandbox),
};

let _buildFakeCanvas = (sandbox, context, (base64Str1, base64Str2)) =>
  {
    let toDataURL =
      createEmptyStubWithJsObjSandbox(sandbox)
      |> onCall(0)
      |> returns(base64Str1)
      |> onCall(1)
      |> returns(base64Str2);

    {
      "width": 0.,
      "height": 0.,
      "style": {
        "left": "",
        "top": "",
        "width": "",
        "height": "",
        "position": "static",
      },
      "getContext":
        createEmptyStubWithJsObjSandbox(sandbox) |> returns(context),
      "toDataURL": toDataURL,
    };
  }
  |> SettingWorkerTool.addTransferControlToOffscreen;

let prepareCanvas = sandbox => {
  let context = _buildFakeContext(sandbox);

  let base64Str1 = "data:aaa";
  let base64Str2 = "data:bbb";

  let canvas =
    SettingWorkerTool.buildFakeCanvasForNotPassCanvasIdWithCanvas(
      sandbox,
      _buildFakeCanvas(sandbox, context, (base64Str1, base64Str2)),
    );

  (canvas, context, (base64Str1, base64Str2));
};
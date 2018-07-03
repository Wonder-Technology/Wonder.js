open Js.Promise;

open Sinon;

let _emptyBufferUriData = jsonStr =>
  jsonStr
  |> Js.String.replaceByRe(
       [%re {|/"buffers"\:\[\{"byteLength"\:(\d+),\"uri"\:".+?"/img|}],
       {|"buffers":[{"byteLength":$1,"uri":""|},
     );

let contain = (targetJsonStr: string, json: Js.Json.t) =>
  Wonder_jest.(
    Expect.(
      Expect.Operators.(
        json
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

let testGLTFResultByGLB = (sandbox, glbFilePath, testFunc, state) => {
  open Js.Promise;

  let result = ref(Obj.magic(1));

  let buffer = NodeExtend.readFileBufferSync(glbFilePath);

  GLBTool.prepare(sandbox);

  AssembleWDBAPI.assembleGLB(buffer##buffer, state^)
  |> Most.forEach(data => result := data)
  |> then_(() => {
       let (state, sceneGameObject) = result^;

       let (gltf, binBuffer) =
         GenerateSceneGraphAPI.generateGLBData(
           sceneGameObject,
           WonderCommonlib.SparseMapService.createEmpty(),
           state,
         );

       /* testFunc((ConvertGLTFJsonToRecordSystem.convert(gltf), binBuffer)) */
       testFunc((gltf, binBuffer)) |> resolve;
       /* |> _contain(targetJson)
          |> resolve; */
     });
};

let testAssembleResultByGLB = (sandbox, glbFilePath, testFunc, state) => {
  open Js.Promise;

  let result = ref(Obj.magic(1));

  GLBTool.prepare(sandbox);

  let buffer = NodeExtend.readFileBufferSync(glbFilePath);

  AssembleWDBAPI.assembleGLB(buffer##buffer, state^)
  |> Most.forEach(data => result := data)
  |> then_(() => {
       let (state, sceneGameObject) = result^;

       GenerateSceneGraphAPI.generateWDB(
         sceneGameObject,
         WonderCommonlib.SparseMapService.createEmpty(),
         state,
       )
       |> resolve;
     })
  |> then_(((state, data)) =>
       AssembleWDBSystem.assemble(data, state)
       |> Most.forEach(data => result := data)
       |> then_(() => testFunc(result^) |> resolve)
     );
};

let _buildBinBuffer = () => {
  let buffer = NodeExtend.readFileBufferSync(
          ConvertGLBTool.buildGLBFilePath("BoxTextured.glb")
);

  let (_, binBuffer) = BinaryUtils.decode(buffer##buffer, ConvertGLTFSystem._checkGLB);

binBuffer;
};

/* let testAssembleResultByGLTF = (
 ~sandbox, 
 ~embeddedGLTFJson,
~testFunc,
~state,
~binBuffer = _buildBinBuffer(),
()
) => {
  open Js.Promise;

  let result = ref(Obj.magic(1));

  GLBTool.prepare(sandbox);

  /* let buffer = NodeExtend.readFileBufferSync(glbFilePath); */

ConvertGLTFSystem.convertGLBData((embeddedGLTFJson, binBuffer))
|.
  AssembleWDBSystem.assemble(state)
  |> Most.forEach(data => result := data)
  |> then_(() => {
       let (state, sceneGameObject) = result^;

       GenerateSceneGraphAPI.generateWDB(
         sceneGameObject,
         WonderCommonlib.SparseMapService.createEmpty(),
         state,
       )
       |> resolve;
     })
  |> then_(((state, data)) =>
       AssembleWDBSystem.assemble(data, state)
       |> Most.forEach(data => result := data)
       |> then_(() => testFunc(result^) |> resolve)
     );
}; */



let testGLTFResultByGLTF = ( ~sandbox, 
 ~embeddedGLTFJsonStr,
~targetJsonStr,
~state,
~binBuffer = _buildBinBuffer(),
()
) => {
  open Js.Promise;

  let result = ref(Obj.magic(1));

  GLBTool.prepare(sandbox);


ConvertGLTFSystem.convertGLBData((embeddedGLTFJsonStr |> Js.Json.parseExn, binBuffer))
|.
  AssembleWDBSystem.assemble(state^)
  |> Most.forEach(data => result := data)
  |> then_(() => {
       let (state, sceneGameObject) = result^;

       let (gltf, binBuffer) =
         GenerateSceneGraphAPI.generateGLBData(
           sceneGameObject,
           WonderCommonlib.SparseMapService.createEmpty(),
           state,
         );

       /* testFunc((ConvertGLTFJsonToRecordSystem.convert(gltf), binBuffer)) */
       /* testFunc((gltf, binBuffer)) |> resolve; */
gltf |>
contain(targetJsonStr)
|> resolve


       /* |> _contain(targetJson)
          |> resolve; */
     });
};








/* let testResult = (gltfJson, testFunc, state) =>
     ConvertGLTFTool.testResult(gltfJson, data =>
       testFunc(AssembleWDBSystem.assemble(data, state))
     );

   let testGLTFResultByGLTF = (gltfJson, targetJson, state) => {
     open Js.Promise;

     let result = ref(Obj.magic(1));

     ConvertTool.buildFakeLoadImage();

     AssembleWDBAPI.assembleGLTF(gltfJson, state^)
     |> Most.forEach(data => result := data)
     |> then_(() => {
          let (state, sceneGameObject) = result^;

          GenerateSceneGraphAPI.generateGLBData(
            sceneGameObject,
            WonderCommonlib.SparseMapService.createEmpty(),
            state,
          )
          |> _contain(targetJson)
          |> resolve;
        });
   };

   let testGLTFResultByGameObject = (sceneGameObject, targetJson, state) =>
     GenerateSceneGraphAPI.generateGLBData(
       sceneGameObject,
       WonderCommonlib.SparseMapService.createEmpty(),
       state,
     )
     |> _contain(targetJson);

   let testGLTFResultByGameObjectWithImageBase64Map =
       (sceneGameObject, targetJson, imageBase64Map, state) =>
     GenerateSceneGraphSystem.generateGLBData(
       sceneGameObject,
       imageBase64Map,
       state,
     )
     |> _contain(targetJson);

   let testAssembleResultByGLTF = (gltfJson, testFunc, state) => {
     open Js.Promise;

     let result = ref(Obj.magic(1));

     ConvertTool.buildFakeLoadImage();

     AssembleWDBAPI.assembleGLTF(gltfJson, state^)
     |> Most.forEach(data => result := data)
     |> then_(() => {
          let (state, sceneGameObject) = result^;

          GenerateSceneGraphAPI.generateWDB(
            sceneGameObject,
            WonderCommonlib.SparseMapService.createEmpty(),
            state,
          )
          |> resolve;
        })
     |> then_(((state, data)) =>
          AssembleWDBSystem.assemble(data, state)
          |> Most.forEach(data => result := data)
          |> then_(() => testFunc(result^) |> resolve)
        );
   };

   let testAssembleResultByGameObject = (sceneGameObject, testFunc, state) => {
     open Js.Promise;

     let result = ref(Obj.magic(1));

     let (state, data) =
       GenerateSceneGraphAPI.generateWDB(
         sceneGameObject,
         WonderCommonlib.SparseMapService.createEmpty(),
         state,
       );

     AssembleWDBSystem.assemble(data, state)
     |> Most.forEach(data => result := data)
     |> then_(() => testFunc(result^) |> resolve);
   }; */

/* let testGLTFResultByGLB = (glb, targetJson, state) => {
     open Js.Promise;

     let result = ref(Obj.magic(1));

     ConvertTool.buildFakeLoadImage();

     AssembleWDBAPI.assembleGLB(glb, state^)
     |> Most.forEach(data => result := data)
     |> then_(() => {
          let (state, sceneGameObject) = result^;

          GenerateSceneGraphAPI.generateGLBData(
            sceneGameObject,
            WonderCommonlib.SparseMapService.createEmpty(),
            state,
          )
          |> _contain(targetJson)
          |> resolve;
        });
   }; */

let _buildFakeContext = sandbox => {
  "drawImage": createEmptyStubWithJsObjSandbox(sandbox),
};

let _buildFakeCanvas = (sandbox, context, (base64Str1, base64Str2)) => {
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
};
/* |> SettingWorkerTool.addTransferControlToOffscreen; */

let prepareCanvas = sandbox => {
  let context = _buildFakeContext(sandbox);

  let base64Str1 = "data:image/png;base64,aaa";
  let base64Str2 = "data:image/jpeg;base64,bbb";

  let canvas =
    SettingTool.buildFakeCanvasForNotPassCanvasIdWithCanvas(
      sandbox,
      _buildFakeCanvas(sandbox, context, (base64Str1, base64Str2)),
    );

  (canvas, context, (base64Str1, base64Str2));
};
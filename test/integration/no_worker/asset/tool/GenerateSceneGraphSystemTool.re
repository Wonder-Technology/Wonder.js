open Js.Promise;

open Sinon;

let _emptyBufferUriData = jsonStr =>
  jsonStr
  |> Js.String.replaceByRe(
       [%re {|/"buffers"\:\[\{"byteLength"\:(\d+),\"uri"\:".+?"/img|}],
       {|"buffers":[{"byteLength":$1,"uri":""|},
     );

let _removeSpaces = str =>
  str |> Js.String.replaceByRe([%re {|/\s/img|}], "");

let contain = (targetJsonStr: string, json: Js.Json.t) =>
  Wonder_jest.(
    Expect.(
      Expect.Operators.(
        json
        |> Js.Json.stringify
        |> _emptyBufferUriData
        |> _removeSpaces
        |> expect
        |> toContainString(targetJsonStr |> _removeSpaces)
      )
    )
  );

let testGLTFResultByGLB = (sandbox, glbFilePath, testFunc, state) => {
  open Js.Promise;

  let result = ref(Obj.magic(1));

  let buffer = NodeExtend.readFileBufferSync(glbFilePath);

  GLBTool.prepare(sandbox);

  AssembleWholeWDBAPI.assembleWholeGLB(
    buffer##buffer,
    true,
    true,
    true,
    true,
    true,
    state^,
  )
  |> WonderBsMost.Most.forEach(data => result := data)
  |> then_(() => {
       let (state, _, (rootGameObject, _)) = result^;

       let (gltf, imageResultUint8ArrayMap, binBuffer) =
         GenerateSceneGraphAPI.generateGLBData(
           rootGameObject,
           Js.Nullable.return(
             WonderCommonlib.MutableSparseMapService.createEmpty(),
           ),
           state,
         );

       testFunc((gltf, imageResultUint8ArrayMap, binBuffer)) |> resolve;
     });
};

let testAssembleResultByGLB = (sandbox, glbFilePath, testFunc, state) => {
  open Js.Promise;

  let result = ref(Obj.magic(1));

  GLBTool.prepare(sandbox);

  let buffer = NodeExtend.readFileBufferSync(glbFilePath);

  AssembleWholeWDBAPI.assembleWholeGLB(
    buffer##buffer,
    true,
    true,
    true,
    true,
    true,
    state^,
  )
  |> WonderBsMost.Most.forEach(data => result := data)
  |> then_(() => {
       let (state, _, (rootGameObject, _)) = result^;

       GenerateSceneGraphAPI.generateWDB(
         rootGameObject,
         Js.Nullable.return(
           WonderCommonlib.MutableSparseMapService.createEmpty(),
         ),
         state,
       )
       |> resolve;
     })
  |> then_(((state, _, data)) =>
       AssembleWholeWDBSystem.assemble(
         data,
         (true, true, true, true, true),
         state,
       )
       |> WonderBsMost.Most.forEach(data => result := data)
       |> then_(() => testFunc(result^) |> resolve)
     );
};

/* let _buildBinBuffer = () => {
     let buffer =
       NodeExtend.readFileBufferSync(
         GLBTool.buildGLBFilePath("BoxTextured.glb"),
       );

     let (_, binBuffer) =
       BufferUtils.decode(buffer##buffer, ConvertGLBSystem._checkGLB);

     binBuffer;
   }; */

let testGLTFResultByGLTF =
    (
      ~sandbox,
      ~embeddedGLTFJsonStr,
      ~targetJsonStr,
      ~state,
      ~binBuffer=GLBTool.buildBinBuffer(),
      (),
    ) => {
  open Js.Promise;

  let result = ref(Obj.magic(1));

  GLBTool.prepare(sandbox);

  ConvertGLBSystem.convertGLBData(
    embeddedGLTFJsonStr |> Js.Json.parseExn,
    binBuffer,
  )
  ->(AssembleWholeWDBSystem.assemble((true, true, true, true, true), state^))
  |> WonderBsMost.Most.forEach(data => result := data)
  |> then_(() => {
       let (state, _, (rootGameObject, _)) = result^;

       let (gltf, _, binBuffer) =
         GenerateSceneGraphAPI.generateGLBData(
           rootGameObject,
           Js.Nullable.return(
             WonderCommonlib.MutableSparseMapService.createEmpty(),
           ),
           state,
         );

       gltf |> contain(targetJsonStr) |> resolve;
     });
};

let testGLTFResultByGameObject = (rootGameObject, targetJsonStr, state) => {
  let (gltf, _, binBuffer) =
    GenerateSceneGraphAPI.generateGLBData(
      rootGameObject,
      Js.Nullable.return(
        WonderCommonlib.MutableSparseMapService.createEmpty(),
      ),
      state,
    );

  gltf |> contain(targetJsonStr);
};

let testGLTFResultByGameObjectWithImageUint8ArrayDataMap =
    (rootGameObject, targetJsonStr, imageUint8ArrayDataMap, state) => {
  let (gltf, _, binBuffer) =
    GenerateSceneGraphAPI.generateGLBData(
      rootGameObject,
      imageUint8ArrayDataMap,
      state,
    );

  gltf |> contain(targetJsonStr);
};

let testAssembleResultByGameObject =
    (sandbox, rootGameObject, testFunc, state) => {
  open Js.Promise;

  GLBTool.prepare(sandbox);

  let result = ref(Obj.magic(1));

  let (state, _, data) =
    GenerateSceneGraphAPI.generateWDB(
      rootGameObject,
      Js.Nullable.return(
        WonderCommonlib.MutableSparseMapService.createEmpty(),
      ),
      state,
    );

  AssembleWholeWDBSystem.assemble(
    data,
    (true, true, true, true, true),
    state,
  )
  |> WonderBsMost.Most.forEach(data => result := data)
  |> then_(() => testFunc(result^) |> resolve);
};

let _buildFakeContext = sandbox => {
  "drawImage": createEmptyStubWithJsObjSandbox(sandbox),
};

let _buildToDataURL = (sandbox, (base64Str1, base64Str2)) =>
  createEmptyStubWithJsObjSandbox(sandbox)
  |> onCall(0)
  |> returns(base64Str1)
  |> onCall(1)
  |> returns(base64Str2);

let _buildToDataURLForCubemapTexture =
    (
      sandbox,
      (
        base64Str1,
        base64Str2,
        base64Str3,
        base64Str4,
        base64Str5,
        base64Str6,
        base64Str7,
      ),
    ) =>
  createEmptyStubWithJsObjSandbox(sandbox)
  |> onCall(0)
  |> returns(base64Str1)
  |> onCall(1)
  |> returns(base64Str2)
  |> onCall(2)
  |> returns(base64Str3)
  |> onCall(3)
  |> returns(base64Str4)
  |> onCall(4)
  |> returns(base64Str5)
  |> onCall(5)
  |> returns(base64Str6)
  |> onCall(6)
  |> returns(base64Str7);

let _buildFakeCanvas = (sandbox, context, toDataURL) => {
  "width": 0.,
  "height": 0.,
  "style": {
    "left": "",
    "top": "",
    "width": "",
    "height": "",
    "position": "static",
  },
  "getContext": createEmptyStubWithJsObjSandbox(sandbox) |> returns(context),
  "toDataURL": toDataURL,
};

let buildBase64Str1 = () => "data:image/png;base64,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

let buildBase64Str2 = () => "data:image/png;base64,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

let buildBase64Str3 = () => "data:image/png;base64,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

let buildBase64Str4 = () => "data:image/png;base64,cccccccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

let buildBase64Str5 = () => "data:image/png;base64,cccccccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacccccccccccccccccaaaaaaa";

let buildBase64Str6 = () => "data:image/jpeg;base64,cccccccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacccccccccdd";

let buildBase64Str7 = () => "data:image/png;base64,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacccccccccdd";

let prepareCanvas = sandbox => {
  let context = _buildFakeContext(sandbox);

  let base64Str1 = buildBase64Str1();
  let base64Str2 = buildBase64Str2();

  let canvas =
    SettingTool.buildFakeCanvasForNotPassCanvasIdWithCanvas(
      sandbox,
      _buildFakeCanvas(
        sandbox,
        context,
        _buildToDataURL(sandbox, (base64Str1, base64Str2)),
      ),
    );

  (canvas, context, (base64Str1, base64Str2));
};

let prepareCanvasForCubemapTexture = sandbox => {
  let context = _buildFakeContext(sandbox);

  let base64Str1 = buildBase64Str1();
  let base64Str2 = buildBase64Str2();
  let base64Str3 = buildBase64Str3();
  let base64Str4 = buildBase64Str4();
  let base64Str5 = buildBase64Str5();
  let base64Str6 = buildBase64Str6();
  let base64Str7 = buildBase64Str7();

  let canvas =
    SettingTool.buildFakeCanvasForNotPassCanvasIdWithCanvas(
      sandbox,
      _buildFakeCanvas(
        sandbox,
        context,
        _buildToDataURLForCubemapTexture(
          sandbox,
          (
            base64Str1,
            base64Str2,
            base64Str3,
            base64Str4,
            base64Str5,
            base64Str6,
            base64Str7,
          ),
        ),
      ),
    );

  (
    canvas,
    context,
    (
      base64Str1,
      base64Str2,
      base64Str3,
      base64Str4,
      base64Str5,
      base64Str6,
      base64Str7,
    ),
  );
};
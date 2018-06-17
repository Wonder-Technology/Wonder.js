open Js.Promise;

let _emptyUriData = jsonStr =>
  jsonStr |> Js.String.replaceByRe([%re {|/"uri"\:".+?"/img|}], {|"uri":""|});

let _contain = (targetJsonStr: string, wdJson: Js.Json.t) =>
  Wonder_jest.(
    Expect.(
      Expect.Operators.(
        wdJson
        |> Js.Json.stringify
        |> _emptyUriData
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
  let data = ref(Obj.magic(1));
  ConvertGLTFTool.buildFakeLoadImage();
  ConvertGLTFSystem.convert(gltfJson)
  |> Most.forEach(((wdRecord, imageArr, bufferArr)) => {
       data := (wdRecord, imageArr, bufferArr);
       ();
     })
  |> then_(() => AssembleWDSystem.assemble(data^, state^) |> resolve)
  |> then_(((state, sceneGameObject)) =>
       GenerateSceneGraphSystem.generateEmbededGLTF(sceneGameObject, state)
       |> _contain(targetJson)
       |> resolve
     );
  /* |> then_(wdJson => wdJson |> _contain(targetJson) |> resolve); */
};

let testGLTFResultByGameObject = (sceneGameObject, targetJson, state) =>
  GenerateSceneGraphSystem.generateEmbededGLTF(sceneGameObject, state)
  |> _contain(targetJson);

let testAssembleResultByGLTF = (gltfJson, testFunc, state) => {
  open Js.Promise;
  let data = ref(Obj.magic(1));
  ConvertGLTFTool.buildFakeLoadImage();
  ConvertGLTFSystem.convert(gltfJson)
  |> Most.forEach(((wdRecord, imageArr, bufferArr)) => {
       data := (wdRecord, imageArr, bufferArr);
       ();
     })
  |> then_(() => AssembleWDSystem.assemble(data^, state^) |> resolve)
  |> then_(((state, sceneGameObject)) =>
       GenerateSceneGraphSystem.generateEmbededWD(sceneGameObject, state)
     )
  |> then_(((state, data)) =>
       testFunc(AssembleWDSystem.assemble(data, state)) |> resolve
     );
};

let testAssembleResultByGameObject = (sceneGameObject, testFunc, state) =>
  Js.Promise.
    (
      GenerateSceneGraphSystem.generateEmbededWD(sceneGameObject, state)
      |> then_(((state, data)) =>
           testFunc(AssembleWDSystem.assemble(data, state)) |> resolve
         )
    );
let testResult = (sandbox, glbFilePath, testFunc) => {
  GLBTool.prepare(sandbox);

  let buffer = NodeExtend.readFileBufferSync(glbFilePath);

  let wdb = ConverterAPI.convertGLBToWDB(buffer##buffer);

  let (wdFileContent, binBuffer) =
    BinaryUtils.decode(wdb, AssembleWDBSystem._checkWDB);

  testFunc((wdFileContent |> Js.Json.parseExn |> Obj.magic, binBuffer));
};

let testGLTFResultByGLTF =
    (
      ~sandbox,
      ~embeddedGLTFJsonStr,
      ~testFunc,
      ~state,
      ~binBuffer=GLBTool.buildBinBuffer(),
      (),
    ) => {
  open Js.Promise;

  let result = ref(Obj.magic(1));

  GLBTool.prepare(sandbox);

  let wdb =
    ConvertGLTFSystem.convertGLBData((
      embeddedGLTFJsonStr |> Js.Json.parseExn,
      binBuffer,
    ));

  let (wdFileContent, binBuffer) =
    BinaryUtils.decode(wdb, AssembleWDBSystem._checkWDB);

  testFunc(wdFileContent |> Js.Json.parseExn |> Obj.magic);
};
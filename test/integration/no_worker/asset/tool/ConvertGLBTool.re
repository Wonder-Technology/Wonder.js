let buildGLBFilePath = glbFileName =>
  Node.Path.join([|Node.Process.cwd(), "./test/res/", glbFileName|]);

let testResult = (sandbox, glbFilePath, testFunc) => {
  GLBTool.prepare(sandbox);

  let buffer = NodeExtend.readFileBufferSync(glbFilePath);

  let wdb = ConverterAPI.convertGLBToWDB(buffer##buffer);

  let (wdFileContent, binBuffer) =
    BinaryUtils.decode(wdb, AssembleWDBSystem._checkWDB);

  testFunc((wdFileContent |> Js.Json.parseExn |> Obj.magic, binBuffer));
};
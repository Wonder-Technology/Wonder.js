let buildWDBPath = wdbName =>
  Node.Path.join([|
    Node.Process.cwd(),
    "./test/res/",
    {j|wdb/$wdbName.wdb|j},
  |]);

let buildGLBPath = wdbName =>
  Node.Path.join([|Node.Process.cwd(), "./test/res/", {j|$wdbName.glb|j}|]);

let convertGLBToWDB = glbName => {
  /*! fix fs.readFileSync returns corrupt ArrayBuffer (fs.readFile works as expected):
    https://github.com/nodejs/node/issues/11132 */
  let buffer = NodeExtend.readFileBufferSync(buildGLBPath(glbName));

  GLBTool.buildFakeTextDecoder(GLBTool.convertUint8ArrayToBuffer);
  GLBTool.buildFakeTextEncoder(.);

  buffer##buffer |> ConverterAPI.convertGLBToWDB;
};
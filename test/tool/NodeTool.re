let buildWDBPath = wdbName =>
  Node.Path.join([|
    Node.Process.cwd(),
    "./test/res/",
    {j|wdb/$wdbName.wdb|j},
  |]);

let getWDBArrayBuffer = wdbName => {
  /*! fix fs.readFileSync returns corrupt ArrayBuffer (fs.readFile works as expected):
    https://github.com/nodejs/node/issues/11132 */
  let uint8TypeArray = NodeExtend.readFileBufferSync(buildWDBPath(wdbName));

  Js.Typed_array.Uint8Array.fromBuffer(uint8TypeArray)
  |> Js.Typed_array.Uint8Array.buffer;
};
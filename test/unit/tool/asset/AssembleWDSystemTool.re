let buildGLTFJsonOfMultiSceneGameObjects = () =>
  ConvertGLTFTool.buildGLTFJson(
    ~scenes={|
        [
            {
                "nodes": [0,1]
            }
        ]
        |},
    ~nodes={|
    [
{
},
{
}
    ]
    |},
    ()
  );

let testResult = (gltfJson, testFunc, state) =>
  ConvertGLTFTool.testResult(gltfJson, (data) => testFunc(AssembleWDSystem.assemble(data, state)));
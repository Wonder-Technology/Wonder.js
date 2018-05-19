open StateDataRenderWorkerType;

open RenderWorkerBasicSourceTextureType;

let unsafeGetSource = (texture, state) => {
  let {sourceMap} = RecordBasicSourceTextureRenderWorkerService.getRecord(state);
  TextureSourceMapService.unsafeGetSource(texture, sourceMap)
};

let buildFakeCreateImageBitmapFunc = [%bs.raw
  {|
  function(){
    window.createImageBitmap = function(imageData, config){

    return new Promise(function(resolve, reject){
      resolve([imageData.uint8ClampedArray.arrayBuffer, imageData.width, imageData.height, config ]);
    }) ;
  }


window.ImageData = function(uint8ClampedArray, width, height){
  this.uint8ClampedArray = uint8ClampedArray;
  this.width = width;
  this.height = height;
}


window.Uint8ClampedArray = function(arrayBuffer){
  this.arrayBuffer = arrayBuffer;
}

  }
  |}
];

let clearFakeCreateImageBitmapFunc = [%bs.raw
  {|
  function(){
    window.createImageBitmap = undefined;
  }
  |}
];

let prepareStateAndCreateTwoMaps = (sandbox) => {
  let imageDataArrayBuffer1 = Obj.magic(11);
  let imageDataArrayBuffer2 = Obj.magic(12);
  let (state, context) =
    InitTextureRenderWorkerTool.prepareState(
      sandbox,
      imageDataArrayBuffer1,
      imageDataArrayBuffer2
    );
  let (state, map1) = BasicSourceTextureAPI.createBasicSourceTexture(state);
  let (state, map2) = BasicSourceTextureAPI.createBasicSourceTexture(state);
  let source1 = BasicSourceTextureTool.buildSource(100, 200);
  let source2 = BasicSourceTextureTool.buildSource(110, 210);
  let state = state |> BasicSourceTextureAPI.setBasicSourceTextureSource(map1, source1);
  let state = state |> BasicSourceTextureAPI.setBasicSourceTextureSource(map2, source2);
  (
    state,
    context,
    (imageDataArrayBuffer1, imageDataArrayBuffer2),
    (map1, map2),
    (source1, source2)
  )
};

let prepareStateAndCreateTwoGameObjects = (sandbox) => {
  let imageDataArrayBuffer1 = Obj.magic(11);
  let imageDataArrayBuffer2 = Obj.magic(12);
  let (state, context) =
    InitTextureRenderWorkerTool.prepareState(
      sandbox,
      imageDataArrayBuffer1,
      imageDataArrayBuffer2
    );
  /* let (state, gameObject1, (_, map1)) = BasicMaterialTool.createGameObjectWithMap(state);
  let (state, gameObject2, (_, map2)) = BasicMaterialTool.createGameObjectWithMap(state); */


                    let (state, gameObject1, _, _, _, map1) =
                      RenderBasicJobTool.prepareGameObjectWithCreatedMap(sandbox, state);
                    let (state, gameObject2, _, _, _, map2) =
                      RenderBasicJobTool.prepareGameObjectWithCreatedMap(sandbox, state);

  let source1 = BasicSourceTextureTool.buildSource(100, 200);
  let source2 = BasicSourceTextureTool.buildSource(110, 210);
  let state = state |> BasicSourceTextureAPI.setBasicSourceTextureSource(map1, source1);
  let state = state |> BasicSourceTextureAPI.setBasicSourceTextureSource(map2, source2);



                    let state = WorkerWorkerTool.setFakeWorkersAndSetState(state);
                    let (state, _, _, _) = CameraTool.createCameraGameObject(state);



  (
    state,
    context,
    (imageDataArrayBuffer1, imageDataArrayBuffer2),
    (gameObject1, gameObject2),
    (map1, map2),
    (source1, source2)
  )
};
open StateDataRenderWorkerType;

open RenderWorkerBasicSourceTextureType;

let unsafeGetSource = (texture, state) => {
  let {sourceMap} =
    RecordBasicSourceTextureRenderWorkerService.getRecord(state);
  TextureSourceMapService.unsafeGetSource(texture, sourceMap);
};

let buildFakeCreateImageBitmapFunc = [%bs.raw
  {|
  function(param){
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
  function(param){
    window.createImageBitmap = undefined;
  }
  |}
];

let createTwoMaps = state => {
  let (state, map1) = BasicSourceTextureAPI.createBasicSourceTexture(state);
  let (state, map2) = BasicSourceTextureAPI.createBasicSourceTexture(state);
  let source1 = BasicSourceTextureTool.buildSource(100, 200);
  let source2 = BasicSourceTextureTool.buildSource(110, 210);
  let state =
    state |> BasicSourceTextureAPI.setBasicSourceTextureSource(map1, source1);
  let state =
    state |> BasicSourceTextureAPI.setBasicSourceTextureSource(map2, source2);
  (state, (map1, map2), (source1, source2));
};

let prepareStateAndCreateTwoMaps = sandbox => {
  let imageDataArrayBuffer1 = Obj.magic(11);
  let imageDataArrayBuffer2 = Obj.magic(12);
  let imageDataArrayBuffer3 = Obj.magic(13);
  let imageDataArrayBuffer4 = Obj.magic(14);
  let (state, context) =
    InitBasicSourceTextureRenderWorkerTool.prepareState(
      sandbox,
      (
        imageDataArrayBuffer1,
        imageDataArrayBuffer2,
        imageDataArrayBuffer3,
        imageDataArrayBuffer4,
      ),
    );
  let (state, (map1, map2), (source1, source2)) = createTwoMaps(state);
  (
    state,
    context,
    (
      imageDataArrayBuffer1,
      imageDataArrayBuffer2,
      imageDataArrayBuffer3,
      imageDataArrayBuffer4,
    ),
    (map1, map2),
    (source1, source2),
  );
};

let prepareStateAndCreateTwoGameObjects = sandbox => {
  let imageDataArrayBuffer1 = Obj.magic(11);
  let imageDataArrayBuffer2 = Obj.magic(12);
  let imageDataArrayBuffer3 = Obj.magic(13);
  let imageDataArrayBuffer4 = Obj.magic(14);
  let (state, context) =
    InitBasicSourceTextureRenderWorkerTool.prepareState(
      sandbox,
      (
        imageDataArrayBuffer1,
        imageDataArrayBuffer2,
        imageDataArrayBuffer3,
        imageDataArrayBuffer4,
      ),
    );
  let (state, (map1, map2), (source1, source2)) = createTwoMaps(state);
  let (state, gameObject1, _, _, _, map1) =
    FrontRenderLightJobTool.prepareGameObjectWithDiffuseMap(
      sandbox,
      map1,
      state,
    );
  let (state, gameObject2, _, _, _, map2) =
    FrontRenderLightJobTool.prepareGameObjectWithDiffuseMap(
      sandbox,
      map2,
      state,
    );
  let state = WorkerWorkerTool.setFakeWorkersAndSetState(state);
  let (state, _, _, _) = CameraTool.createCameraGameObject(state);
  (
    state,
    context,
    (
      imageDataArrayBuffer1,
      imageDataArrayBuffer2,
      imageDataArrayBuffer3,
      imageDataArrayBuffer4,
    ),
    (gameObject1, gameObject2),
    (map1, map2),
    (source1, source2),
  );
};

let getTexture = (texture, state) =>
  OperateGlTextureMapService.getTexture(
    texture,
    RecordBasicSourceTextureRenderWorkerService.getRecord(state).glTextureMap,
  );

let setGlTexture = (texture, glTexture, state) => {
  OperateGlTextureMapService.setTexture(
    texture,
    glTexture,
    RecordBasicSourceTextureRenderWorkerService.getRecord(state).glTextureMap,
  );

  state;
};
open StateDataRenderWorkerType;

open RenderWorkerTextureType;

let unsafeGetSource = (texture, state) => {
  let {sourceMap} = RecordTextureRenderWorkerService.getRecord(state);
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
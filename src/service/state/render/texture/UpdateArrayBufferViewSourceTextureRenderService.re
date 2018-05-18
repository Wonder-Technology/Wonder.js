/* TODO duplicate */
open StateRenderType;

open RenderArrayBufferViewSourceTextureType;

open BrowserDetectType;

let _isPowerOfTwo = (value) => value land (value - 1) === 0 && value !== 0;

let _isSourcePowerOfTwo = (width, height) => _isPowerOfTwo(width) && _isPowerOfTwo(height);

let _filterFallback = (filter, gl) =>
  if (filter === TextureFilterService.getNearest()
      || filter === TextureFilterService.getNearestMipmapNearest()
      || filter === TextureFilterService.getNearestMipmapLinear()) {
    Gl.getNearest(gl)
  } else {
    Gl.getLinear(gl)
  };

let _setTextureParameters =
    (gl, target, isSourcePowerOfTwo, (glWrapS, glWrapT, magFilter, minFilter)) =>
  isSourcePowerOfTwo ?
    {
      gl |> Gl.texParameteri(target, gl |> Gl.getTextureWrapS, glWrapS);
      gl |> Gl.texParameteri(target, gl |> Gl.getTextureWrapT, glWrapT);
      gl
      |> Gl.texParameteri(
           target,
           gl |> Gl.getTextureMagFilter,
           magFilter |> TextureFilterService.getGlFilter(gl)
         );
      gl
      |> Gl.texParameteri(
           target,
           gl |> Gl.getTextureMinFilter,
           minFilter |> TextureFilterService.getGlFilter(gl)
         )
    } :
    {
      gl |> Gl.texParameteri(target, gl |> Gl.getTextureWrapS, gl |> Gl.getClampToEdge);
      gl |> Gl.texParameteri(target, gl |> Gl.getTextureWrapT, gl |> Gl.getClampToEdge);
      gl |> Gl.texParameteri(target, gl |> Gl.getTextureMagFilter, _filterFallback(magFilter, gl));
      gl |> Gl.texParameteri(target, gl |> Gl.getTextureMinFilter, _filterFallback(minFilter, gl))
    };

let _drawTexture = (gl, (target, index, source, glFormat, glType), (width, height)) => {
  WonderLog.Contract.requireCheck(
    () =>
      /* TODO test check */
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|width/height shouldn't be 0|j},
                ~actual={j|width is $width; height is $height|j}
              ),
              () => {
                width <>= 0;
                height <>= 0
              }
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  gl
  |> Gl.texImage2DWithArrayBufferView(
       target,
       index,
       glFormat,
       width,
       height,
       0,
       glFormat,
       glType,
       source
     )
};

let _drawNoMipmapTwoDTexture = (gl, (target, glFormat, glType), sizeTuple, source) =>
  _drawTexture(gl, (target, 0, source, glFormat, glType), sizeTuple);

let _allocateSourceToTexture = (gl, paramTuple, sizeTuple, source) =>
  _drawNoMipmapTwoDTexture(gl, paramTuple, sizeTuple, source);

let update = (gl, textureInTypeArray, (arrayBufferViewSourceTextureRecord, browserDetectRecord)) => {
  let {
    sourceMap,
    wrapSs,
    wrapTs,
    magFilters,
    minFilters,
    formats,
    types,
    isNeedUpdates,
    widths,
    heights,
    setFlipYFunc
  } = arrayBufferViewSourceTextureRecord;
  switch (TextureSourceMapService.getSource(textureInTypeArray, sourceMap)) {
  | None => (arrayBufferViewSourceTextureRecord, browserDetectRecord)
  | Some(source) =>
    let width =
      OperateTypeArrayArrayBufferViewSourceTextureService.getWidth(textureInTypeArray, widths);
    let height =
      OperateTypeArrayArrayBufferViewSourceTextureService.getHeight(textureInTypeArray, heights);
    let glWrapS =
      OperateTypeArrayArrayBufferViewSourceTextureService.getWrapS(textureInTypeArray, wrapSs)
      |> TextureWrapService.getGlWrap(gl);
    let glWrapT =
      OperateTypeArrayArrayBufferViewSourceTextureService.getWrapT(textureInTypeArray, wrapTs)
      |> TextureWrapService.getGlWrap(gl);
    let magFilter =
      OperateTypeArrayArrayBufferViewSourceTextureService.getMagFilter(
        textureInTypeArray,
        magFilters
      );
    let minFilter =
      OperateTypeArrayArrayBufferViewSourceTextureService.getMinFilter(
        textureInTypeArray,
        minFilters
      );
    let glFormat =
      OperateTypeArrayArrayBufferViewSourceTextureService.getFormat(textureInTypeArray, formats)
      |> TextureFormatService.getGlFormat(gl);
    let glType =
      OperateTypeArrayArrayBufferViewSourceTextureService.getType(textureInTypeArray, types)
      |> TextureTypeService.getGlType(gl);
    let flipY = OperateTypeArrayArrayBufferViewSourceTextureService.getFlipY();
    let target = Gl.getTexture2D(gl);
    let isSourcePowerOfTwo = _isSourcePowerOfTwo(width, height);
    setFlipYFunc(gl, flipY, browserDetectRecord);
    /* TODO handle _needClampMaxSize
       if(_needClampMaxSize(source, width, height)){
           this.clampToMaxSize();

           isSourcePowerOfTwo = this.isSourcePowerOfTwo();

           if(!isSourcePowerOfTwo){
               Log.warn("textureInTypeArray size is not power of two after clampToMaxSize()");
           }
       } */
    _setTextureParameters(
      gl,
      target,
      isSourcePowerOfTwo,
      (glWrapS, glWrapT, magFilter, minFilter)
    );
    _allocateSourceToTexture(gl, (target, glFormat, glType), (width, height), source);
    /* TODO generateMipmaps
       if (this.generateMipmaps && isSourcePowerOfTwo) {
           gl.generateMipmap(gl[this.target]);
       } */
    OperateTypeArrayArrayBufferViewSourceTextureService.setIsNeedUpdate(
      textureInTypeArray,
      BufferArrayBufferViewSourceTextureService.getNotNeedUpdate(),
      isNeedUpdates
    )
    |> ignore;
    (arrayBufferViewSourceTextureRecord, browserDetectRecord)
  }
};

let isNeedUpdate = (textureInTypeArray, arrayBufferViewSourceTextureRecord) =>
  OperateTypeArrayArrayBufferViewSourceTextureService.getIsNeedUpdate(
    textureInTypeArray,
    arrayBufferViewSourceTextureRecord.isNeedUpdates
  )
  === BufferArrayBufferViewSourceTextureService.getDefaultIsNeedUpdate();
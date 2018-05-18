open StateRenderType;

open RenderBasicSourceTextureType;

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

let _drawTexture = (gl, (target, index, source, glFormat, glType)) =>
  gl
  |> Gl.texImage2D(
       target,
       index,
       glFormat,
       glFormat,
       glType,
       source |> Gl.imageElementToTextureSource
     );

let _drawNoMipmapTwoDTexture = (gl, (target, glFormat, glType), source) =>
  _drawTexture(gl, (target, 0, source, glFormat, glType));

let _allocateSourceToTexture = (gl, paramTuple, source) =>
  _drawNoMipmapTwoDTexture(gl, paramTuple, source);

let update = (gl, textureInTypeArray, (basicSourceTextureRecord, browserDetectRecord)) => {
  let {
    sourceMap,
    wrapSs,
    wrapTs,
    magFilters,
    minFilters,
    formats,
    types,
    isNeedUpdates,
    setFlipYFunc
  } = basicSourceTextureRecord;
  switch (TextureSourceMapService.getSource(textureInTypeArray, sourceMap)) {
  | None => (basicSourceTextureRecord, browserDetectRecord)
  | Some(source) =>
    let width = TextureSizeService.getWidth(source);
    let height = TextureSizeService.getHeight(source);
    let glWrapS =
      OperateTypeArrayBasicSourceTextureService.getWrapS(textureInTypeArray, wrapSs)
      |> TextureWrapService.getGlWrap(gl);
    let glWrapT =
      OperateTypeArrayBasicSourceTextureService.getWrapT(textureInTypeArray, wrapTs)
      |> TextureWrapService.getGlWrap(gl);
    let magFilter =
      OperateTypeArrayBasicSourceTextureService.getMagFilter(textureInTypeArray, magFilters);
    let minFilter =
      OperateTypeArrayBasicSourceTextureService.getMinFilter(textureInTypeArray, minFilters);
    let glFormat =
      OperateTypeArrayBasicSourceTextureService.getFormat(textureInTypeArray, formats)
      |> TextureFormatService.getGlFormat(gl);
    let glType =
      OperateTypeArrayBasicSourceTextureService.getType(textureInTypeArray, types)
      |> TextureTypeService.getGlType(gl);
    let flipY = OperateTypeArrayBasicSourceTextureService.getFlipY();
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
    _allocateSourceToTexture(gl, (target, glFormat, glType), source);
    /* TODO generateMipmaps
       if (this.generateMipmaps && isSourcePowerOfTwo) {
           gl.generateMipmap(gl[this.target]);
       } */
    OperateTypeArrayBasicSourceTextureService.setIsNeedUpdate(
      textureInTypeArray,
      BufferBasicSourceTextureService.getNotNeedUpdate(),
      isNeedUpdates
    )
    |> ignore;
    (basicSourceTextureRecord, browserDetectRecord)
  }
};

let isNeedUpdate = (textureInTypeArray, basicSourceTextureRecord) =>
  OperateTypeArrayBasicSourceTextureService.getIsNeedUpdate(
    textureInTypeArray,
    basicSourceTextureRecord.isNeedUpdates
  )
  === BufferBasicSourceTextureService.getDefaultIsNeedUpdate();
open StateRenderType;

open BrowserDetectType;

let _isPowerOfTwo = value =>
  value land (value - 1) === 0 && value !== 0 && value !== 1;

let _isSourcePowerOfTwo = (width, height) =>
  _isPowerOfTwo(width) && _isPowerOfTwo(height);

let _filterFallback = (filter, gl) =>
  switch (filter) {
  | SourceTextureType.NEAREST
  | SourceTextureType.NEAREST_MIPMAP_NEAREST
  | SourceTextureType.NEAREST_MIPMAP_LINEAR => Gl.getNearest(gl)
  | _ => Gl.getLinear(gl)
  };

let _setTextureParameters =
    (
      gl,
      target,
      isSourcePowerOfTwo,
      (glWrapS, glWrapT, magFilter, minFilter),
    ) =>
  isSourcePowerOfTwo ?
    {
      gl |> Gl.texParameteri(target, gl |> Gl.getTextureWrapS, glWrapS);
      gl |> Gl.texParameteri(target, gl |> Gl.getTextureWrapT, glWrapT);
      gl
      |> Gl.texParameteri(
           target,
           gl |> Gl.getTextureMagFilter,
           magFilter |> TextureFilterService.getGlFilter(gl),
         );
      gl
      |> Gl.texParameteri(
           target,
           gl |> Gl.getTextureMinFilter,
           minFilter |> TextureFilterService.getGlFilter(gl),
         );
    } :
    {
      gl
      |> Gl.texParameteri(
           target,
           gl |> Gl.getTextureWrapS,
           gl |> Gl.getClampToEdge,
         );
      gl
      |> Gl.texParameteri(
           target,
           gl |> Gl.getTextureWrapT,
           gl |> Gl.getClampToEdge,
         );
      gl
      |> Gl.texParameteri(
           target,
           gl |> Gl.getTextureMagFilter,
           _filterFallback(magFilter, gl),
         );
      gl
      |> Gl.texParameteri(
           target,
           gl |> Gl.getTextureMinFilter,
           _filterFallback(minFilter, gl),
         );
    };

let _isFilterMipmaps = filter =>
  switch (filter) {
  | SourceTextureType.NEAREST_MIPMAP_NEAREST
  | SourceTextureType.NEAREST_MIPMAP_LINEAR
  | SourceTextureType.LINEAR_MIPMAP_NEAREST
  | SourceTextureType.LINEAR_MIPMAP_LINEAR => true
  | _ => false
  };

let update =
    (
      (gl, textureInTypeArray, source),
      (
        width,
        height,
        glWrapS,
        glWrapT,
        magFilter,
        minFilter,
        glFormat,
        glType,
        flipY,
        target,
      ),
      (isNeedUpdates, browserDetectRecord),
      (allocateSourceToTextureFunc, setFlipYFunc),
    ) => {
  let isSourcePowerOfTwo = _isSourcePowerOfTwo(width, height);
  setFlipYFunc(gl, flipY, browserDetectRecord);

  gl
  |> Gl.pixelStoreiEnum(Gl.getUnpackColorspaceCoersionWebgl(gl), Gl.getNone(gl));

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
    (glWrapS, glWrapT, magFilter, minFilter),
  );
  allocateSourceToTextureFunc(gl, (target, glFormat, glType), source);

  isSourcePowerOfTwo
  && (_isFilterMipmaps(magFilter) || _isFilterMipmaps(minFilter)) ?
    gl |> Gl.generateMipmap(target) : ();

  OperateTypeArraySourceTextureService.setIsNeedUpdate(
    textureInTypeArray,
    BufferSourceTextureService.getNotNeedUpdate(),
    isNeedUpdates,
  )
  |> ignore;
};

let isNeedUpdate =
    (
      textureInTypeArray,
      defaultIsNeedUpdate,
      isNeedUpdates,
      getIsNeedUpdateFunc,
    ) =>
  getIsNeedUpdateFunc(. textureInTypeArray, isNeedUpdates)
  === BufferSourceTextureService.getDefaultIsNeedUpdate();
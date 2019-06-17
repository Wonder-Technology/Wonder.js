open StateRenderType;

open AllBrowserDetectType;

let _isPowerOfTwo = value =>
  value land (value - 1) === 0 && value !== 0 && value !== 1;

let _isSourcePowerOfTwo = (width, height) =>
  _isPowerOfTwo(width) && _isPowerOfTwo(height);

let _filterFallback = (filter, gl) =>
  switch (filter) {
  | SourceTextureType.Nearest
  | SourceTextureType.Nearest_mipmap_nearest
  | SourceTextureType.Nearest_mipmap_linear => WonderWebgl.Gl.getNearest(gl)
  | _ => WonderWebgl.Gl.getLinear(gl)
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
      gl
      |> WonderWebgl.Gl.texParameteri(
           target,
           gl |> WonderWebgl.Gl.getTextureWrapS,
           glWrapS,
         );
      gl
      |> WonderWebgl.Gl.texParameteri(
           target,
           gl |> WonderWebgl.Gl.getTextureWrapT,
           glWrapT,
         );
      gl
      |> WonderWebgl.Gl.texParameteri(
           target,
           gl |> WonderWebgl.Gl.getTextureMagFilter,
           magFilter |> TextureFilterService.getGlFilter(gl),
         );
      gl
      |> WonderWebgl.Gl.texParameteri(
           target,
           gl |> WonderWebgl.Gl.getTextureMinFilter,
           minFilter |> TextureFilterService.getGlFilter(gl),
         );
    } :
    {
      gl
      |> WonderWebgl.Gl.texParameteri(
           target,
           gl |> WonderWebgl.Gl.getTextureWrapS,
           gl |> WonderWebgl.Gl.getClampToEdge,
         );
      gl
      |> WonderWebgl.Gl.texParameteri(
           target,
           gl |> WonderWebgl.Gl.getTextureWrapT,
           gl |> WonderWebgl.Gl.getClampToEdge,
         );
      gl
      |> WonderWebgl.Gl.texParameteri(
           target,
           gl |> WonderWebgl.Gl.getTextureMagFilter,
           _filterFallback(magFilter, gl),
         );
      gl
      |> WonderWebgl.Gl.texParameteri(
           target,
           gl |> WonderWebgl.Gl.getTextureMinFilter,
           _filterFallback(minFilter, gl),
         );
    };

let _isFilterMipmaps = filter =>
  switch (filter) {
  | SourceTextureType.Nearest_mipmap_nearest
  | SourceTextureType.Nearest_mipmap_linear
  | SourceTextureType.Linear_mipmap_nearest
  | SourceTextureType.Linear_mipmap_linear => true
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
  |> WonderWebgl.Gl.pixelStoreiEnum(
       WonderWebgl.Gl.getUnpackColorspaceCoersionWebgl(gl),
       WonderWebgl.Gl.getNone(gl),
     );

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
    gl |> WonderWebgl.Gl.generateMipmap(target) : ();

  OperateTypeArrayAllSourceTextureService.setIsNeedUpdate(
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
  === BufferSourceTextureService.getNeedUpdate();
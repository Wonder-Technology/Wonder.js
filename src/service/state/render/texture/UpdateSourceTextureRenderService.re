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

let update =
    (
      (gl, textureInTypeArray, source),
      (width, height, glWrapS, glWrapT, magFilter, minFilter, glFormat, glType, flipY, target),
      (isNeedUpdates, browserDetectRecord),
      (allocateSourceToTextureFunc, setFlipYFunc)
    ) => {
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
  _setTextureParameters(gl, target, isSourcePowerOfTwo, (glWrapS, glWrapT, magFilter, minFilter));
  allocateSourceToTextureFunc(gl, (target, glFormat, glType), source);
  /* TODO generateMipmaps
     if (this.generateMipmaps && isSourcePowerOfTwo) {
         gl.generateMipmap(gl[this.target]);
     } */
  OperateTypeArrayBasicSourceTextureService.setIsNeedUpdate(
    textureInTypeArray,
    BufferBasicSourceTextureService.getNotNeedUpdate(),
    isNeedUpdates
  )
  |> ignore
};

let isNeedUpdate = (textureInTypeArray, defaultIsNeedUpdate, isNeedUpdates, getIsNeedUpdateFunc) =>
  [@bs] getIsNeedUpdateFunc(textureInTypeArray, isNeedUpdates)
  === BufferBasicSourceTextureService.getDefaultIsNeedUpdate();
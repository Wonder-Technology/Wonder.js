open StateRenderType;

open RenderTextureType;

let _setFlipY = (gl, flipY) => gl |> Gl.pixelStorei(Gl.getUnpackFlipYWebgl, flipY);

let _isPowerOfTwo = (value) => value land (value - 1) === 0 && value !== 0;

let _isSourcePowerOfTwo = (width, height) => _isPowerOfTwo(width) && _isPowerOfTwo(height);

/* export const needUpdate = (textureIndex: number, TextureDataFromSystem: any) => {
       return getIsNeedUpdate(textureIndex, TextureDataFromSystem) === 0;
   }

   export const markNeedUpdate = (textureIndex, value: boolean, TextureDataFromSystem) => {
       if (value === false) {
           setIsNeedUpdate(textureIndex, 1, TextureDataFromSystem);
       }
       else {
           setIsNeedUpdate(textureIndex, 0, TextureDataFromSystem);
       }
   } */
let _filterFallback = (filter, gl) =>
  if (filter === Gl.getNearest(gl)
      || filter === Gl.getNearestMipmapNearest(gl)
      || filter === Gl.getNearestMipmapLinear(gl)) {
    Gl.getNearest(gl)
  } else {
    Gl.getLinear(gl)
  };

let _setTextureParameters = (gl, target, isSourcePowerOfTwo, (wrapS, wrapT, magFilter, minFilter)) =>
  isSourcePowerOfTwo ?
    {
      gl |> Gl.texParameteri(target, gl |> Gl.getTextureWrapS, wrapS);
      gl |> Gl.texParameteri(target, gl |> Gl.getTextureWrapS, wrapS);
      gl |> Gl.texParameteri(target, gl |> Gl.getTextureMagFilter, magFilter);
      gl |> Gl.texParameteri(target, gl |> Gl.getTextureMinFilter, minFilter)
    } :
    {
      gl |> Gl.texParameteri(target, gl |> Gl.getTextureWrapS, gl |> Gl.getClampToEdge);
      gl |> Gl.texParameteri(target, gl |> Gl.getTextureWrapT, gl |> Gl.getClampToEdge);
      gl |> Gl.texParameteri(target, gl |> Gl.getTextureMagFilter, _filterFallback(magFilter, gl));
      gl |> Gl.texParameteri(target, gl |> Gl.getTextureMinFilter, _filterFallback(minFilter, gl))
    };

let _allocateSourceToTexture = (gl, paramTuple, source) =>
  _drawNoMipmapTwoDTexture(gl, paramTuple, source);

let _drawNoMipmapTwoDTexture = (gl, (target, format, type_), source) =>
  _drawTexture(gl, (target, 0, source, format, type_));

let _drawTexture = (gl, (target, index, source, format, type_)) =>
  gl
  |> Gl.texImage2D(target, index, format, format, type_, source |> Gl.imageElementToTextureSource);

let update = (gl, texture, {textureRecord} as state) => {
  let {sourceMap, widths, heights, isNeedUpdates} = textureRecord;
  switch (TextureSourceMapService.getSourceMap(texture, sourceMap)) {
  | None => state
  | Some(source) =>
    let width = OperateTypeArrayTextureService.getWidth(texture, widths);
    let height = OperateTypeArrayTextureService.getHeight(texture, heights);
    let wrapS = OperateTypeArrayTextureService.getWrapS(gl);
    let wrapT = OperateTypeArrayTextureService.getWrapT(gl);
    let magFilter = OperateTypeArrayTextureService.getMagFilter(gl);
    let minFilter = OperateTypeArrayTextureService.getMinFilter(gl);
    let format = OperateTypeArrayTextureService.getFormat(gl);
    let type_ = OperateTypeArrayTextureService.getType(gl);
    let flipY = OperateTypeArrayTextureService.getFlipY();
    let target = Gl.getTexture2D(gl);
    let isSourcePowerOfTwo = _isSourcePowerOfTwo(width, height);
    _setFlipY(gl, flipY);
    /* TODO handle _needClampMaxSize
       if(_needClampMaxSize(source, width, height)){
           this.clampToMaxSize();

           isSourcePowerOfTwo = this.isSourcePowerOfTwo();

           if(!isSourcePowerOfTwo){
               Log.warn("texture size is not power of two after clampToMaxSize()");
           }
       } */
    _setTextureParameters(gl, target, isSourcePowerOfTwo, (wrapS, wrapT, magFilter, minFilter));
    _allocateSourceToTexture(gl, (target, format, type_), source);
    /* TODO generateMipmaps
       if (this.generateMipmaps && isSourcePowerOfTwo) {
           gl.generateMipmap(gl[this.target]);
       } */
    OperateTypeArrayTextureService.setIsNeedUpdate(
      texture,
      BufferTextureService.getNotNeedUpdate(),
      isNeedUpdates
    )
    |> ignore;
    state
  }
};

let isNeedUpdate = (texture, {textureRecord}) =>
  OperateTypeArrayTextureService.getIsNeedUpdate(texture, textureRecord.isNeedUpdates);
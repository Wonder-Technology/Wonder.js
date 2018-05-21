open StateRenderType;

open RenderBasicSourceTextureType;

open BrowserDetectType;

let _drawTexture = (gl, (target, index, source, glFormat, glType)) =>
  gl
  |> Gl.texImage2D(
       target,
       index,
       glFormat,
       glFormat,
       glType,
       source |> GlType.imageElementToTextureSource
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
    UpdateSourceTextureRenderService.update(
      (gl, textureInTypeArray, source),
      (width, height, glWrapS, glWrapT, magFilter, minFilter, glFormat, glType, flipY, target),
      (isNeedUpdates, browserDetectRecord),
      (_allocateSourceToTexture, setFlipYFunc)
    );
    (basicSourceTextureRecord, browserDetectRecord)
  }
};

let isNeedUpdate = (textureInTypeArray, basicSourceTextureRecord) =>
  UpdateSourceTextureRenderService.isNeedUpdate(
    textureInTypeArray,
    BufferBasicSourceTextureService.getDefaultIsNeedUpdate(),
    basicSourceTextureRecord.isNeedUpdates,
    OperateTypeArrayBasicSourceTextureService.getIsNeedUpdate
  );
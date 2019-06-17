open StateRenderType;

open RenderBasicSourceTextureType;

open AllBrowserDetectType;

let _drawTexture = (gl, (target, index, source, glFormat, glType)) =>
  gl
  |> WonderWebgl.Gl.texImage2D(
       target,
       index,
       glFormat,
       glFormat,
       glType,
       source |> WonderWebgl.GlType.imageElementToTextureSource,
     );

let _drawTwoDTexture = (gl, (target, glFormat, glType), source) =>
  _drawTexture(gl, (target, 0, source, glFormat, glType));

let _allocateSourceToTexture = (gl, paramTuple, source) =>
  _drawTwoDTexture(gl, paramTuple, source);

let update =
    (gl, textureInTypeArray, (basicSourceTextureRecord, browserDetectRecord)) => {
  let {
    sourceMap,
    wrapSs,
    wrapTs,
    magFilters,
    minFilters,
    formats,
    types,
    isNeedUpdates,
    flipYs,
    setFlipYFunc,
  } = basicSourceTextureRecord;
  switch (TextureSourceMapService.getSource(textureInTypeArray, sourceMap)) {
  | None => (basicSourceTextureRecord, browserDetectRecord)
  | Some(source) =>
    let width = TextureSizeService.getWidth(source);
    let height = TextureSizeService.getHeight(source);
    let glWrapS =
      OperateTypeArrayAllBasicSourceTextureService.getWrapS(
        textureInTypeArray,
        wrapSs,
      )
      |> SourceTextureType.uint8ToWrap
      |> TextureWrapService.getGlWrap(gl);
    let glWrapT =
      OperateTypeArrayAllBasicSourceTextureService.getWrapT(
        textureInTypeArray,
        wrapTs,
      )
      |> SourceTextureType.uint8ToWrap
      |> TextureWrapService.getGlWrap(gl);
    let magFilter =
      OperateTypeArrayAllBasicSourceTextureService.getMagFilter(
        textureInTypeArray,
        magFilters,
      )
      |> SourceTextureType.uint8ToFilter;
    let minFilter =
      OperateTypeArrayAllBasicSourceTextureService.getMinFilter(
        textureInTypeArray,
        minFilters,
      )
      |> SourceTextureType.uint8ToFilter;
    let glFormat =
      OperateTypeArrayAllBasicSourceTextureService.getFormat(
        textureInTypeArray,
        formats,
      )
      |> SourceTextureType.uint8ToFormat
      |> TextureFormatService.getGlFormat(gl);
    let glType =
      OperateTypeArrayAllBasicSourceTextureService.getType(
        textureInTypeArray,
        types,
      )
      |> TextureTypeService.getGlType(gl);
    let flipY =
      OperateTypeArrayAllBasicSourceTextureService.isFlipY(
        textureInTypeArray,
        flipYs,
      );
    let target = WonderWebgl.Gl.getTexture2D(gl);
    UpdateSourceTextureRenderService.update(
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
      (_allocateSourceToTexture, setFlipYFunc),
    );
    (basicSourceTextureRecord, browserDetectRecord);
  };
};

let isNeedUpdate = (textureInTypeArray, basicSourceTextureRecord) =>
  UpdateSourceTextureRenderService.isNeedUpdate(
    textureInTypeArray,
    BufferBasicSourceTextureService.getDefaultIsNeedUpdate(),
    basicSourceTextureRecord.isNeedUpdates,
    OperateTypeArrayAllBasicSourceTextureService.getIsNeedUpdate,
  );
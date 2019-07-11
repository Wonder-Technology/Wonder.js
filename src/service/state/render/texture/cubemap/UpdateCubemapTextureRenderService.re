open StateRenderType;

open RenderCubemapTextureType;

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

let _allocateSourceToTexture =
    (gl, (targetArr, glFormatArr, glTypeArr), sourceArr) =>
  sourceArr
  |> WonderCommonlib.ArrayService.forEachi((. source, index) =>
       _drawTwoDTexture(
         gl,
         (
           Array.unsafe_get(targetArr, index),
           Array.unsafe_get(glFormatArr, index),
           Array.unsafe_get(glTypeArr, index),
         ),
         source,
       )
     );

let _getAllSources =
    (
      texture,
      (
        pxSourceMap,
        nxSourceMap,
        pySourceMap,
        nySourceMap,
        pzSourceMap,
        nzSourceMap,
      ),
    ) =>
  switch (
    TextureSourceMapService.getSource(texture, pxSourceMap),
    TextureSourceMapService.getSource(texture, nxSourceMap),
    TextureSourceMapService.getSource(texture, pySourceMap),
    TextureSourceMapService.getSource(texture, nySourceMap),
    TextureSourceMapService.getSource(texture, pzSourceMap),
    TextureSourceMapService.getSource(texture, nzSourceMap),
  ) {
  | (
      Some(pxSource),
      Some(nxSource),
      Some(pySource),
      Some(nySource),
      Some(pzSource),
      Some(nzSource),
    ) =>
    Some((pxSource, nxSource, pySource, nySource, pzSource, nzSource))
  | _ => None
  };

let _getSourceSize = sourceArr => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;

      test(
        Log.buildAssertMessage(
          ~expect={j|all sources' size equal|j},
          ~actual={j|not|j},
        ),
        () => {
          sourceArr
          |> Js.Array.map(source => source |> TextureSizeService.getWidth)
          |> WonderCommonlib.ArrayService.removeDuplicateItems
          |> Js.Array.length == 1;

          sourceArr
          |> Js.Array.map(source => source |> TextureSizeService.getHeight)
          |> WonderCommonlib.ArrayService.removeDuplicateItems
          |> Js.Array.length == 1;
        },
      );
      test(
        Log.buildAssertMessage(
          ~expect={j|source' width and height equal|j},
          ~actual={j|not|j},
        ),
        () =>
        sourceArr
        |> Js.Array.map(source => source |> TextureSizeService.getWidth)
        |> WonderCommonlib.ArrayService.removeDuplicateItems
        |> ArrayService.unsafeGetFirst
        == (
             sourceArr
             |> Js.Array.map(source => source |> TextureSizeService.getHeight)
             |> WonderCommonlib.ArrayService.removeDuplicateItems
             |> ArrayService.unsafeGetFirst
           )
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let pxSource = ArrayService.unsafeGetFirst(sourceArr);

  (
    TextureSizeService.getWidth(pxSource),
    TextureSizeService.getHeight(pxSource),
  );
};

let _getFormat = (gl, texture, formats) =>
  OperateTypeArrayAllCubemapTextureService.getFormat(texture, formats)
  |> TextureType.uint8ToFormat
  |> TextureFormatService.getGlFormat(gl);

let _getType = (gl, texture, types) =>
  OperateTypeArrayAllCubemapTextureService.getType(texture, types)
  |> TextureTypeService.getGlType(gl);

let update = (gl, texture, (cubemapTextureRecord, browserDetectRecord)) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|has all sources|j},
                ~actual={j|not|j},
              ),
              () => {
                let {
                  pxSourceMap,
                  nxSourceMap,
                  pySourceMap,
                  nySourceMap,
                  pzSourceMap,
                  nzSourceMap,
                } = cubemapTextureRecord;

                _getAllSources(
                  texture,
                  (
                    pxSourceMap,
                    nxSourceMap,
                    pySourceMap,
                    nySourceMap,
                    pzSourceMap,
                    nzSourceMap,
                  ),
                )
                |> Js.Option.isSome
                |> assertTrue;
              },
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let {
    pxSourceMap,
    nxSourceMap,
    pySourceMap,
    nySourceMap,
    pzSourceMap,
    nzSourceMap,
    wrapSs,
    wrapTs,
    magFilters,
    minFilters,
    pxFormats,
    nxFormats,
    pyFormats,
    nyFormats,
    pzFormats,
    nzFormats,
    pxTypes,
    nxTypes,
    pyTypes,
    nyTypes,
    pzTypes,
    nzTypes,
    isNeedUpdates,
    flipYs,
    setFlipYFunc,
  } = cubemapTextureRecord;

  switch (
    _getAllSources(
      texture,
      (
        pxSourceMap,
        nxSourceMap,
        pySourceMap,
        nySourceMap,
        pzSourceMap,
        nzSourceMap,
      ),
    )
  ) {
  | None => (cubemapTextureRecord, browserDetectRecord)
  | Some((pxSource, nxSource, pySource, nySource, pzSource, nzSource)) =>
    let (width, height) =
      _getSourceSize([|
        pxSource,
        nxSource,
        pySource,
        nySource,
        pzSource,
        nzSource,
      |]);

    let glWrapS =
      OperateTypeArrayAllCubemapTextureService.getWrapS(texture, wrapSs)
      |> TextureType.uint8ToWrap
      |> TextureWrapService.getGlWrap(gl);
    let glWrapT =
      OperateTypeArrayAllCubemapTextureService.getWrapT(texture, wrapTs)
      |> TextureType.uint8ToWrap
      |> TextureWrapService.getGlWrap(gl);
    let magFilter =
      OperateTypeArrayAllCubemapTextureService.getMagFilter(
        texture,
        magFilters,
      )
      |> TextureType.uint8ToFilter;
    let minFilter =
      OperateTypeArrayAllCubemapTextureService.getMinFilter(
        texture,
        minFilters,
      )
      |> TextureType.uint8ToFilter;

    let flipY =
      OperateTypeArrayAllCubemapTextureService.isFlipY(texture, flipYs);
    /* let target = WonderWebgl.Gl.getTextureCubeMap(gl); */

    UpdateGLTextureRenderService.update(
      (
        gl,
        texture,
        [|pxSource, nxSource, pySource, nySource, pzSource, nzSource|],
      ),
      (
        width,
        height,
        glWrapS,
        glWrapT,
        magFilter,
        minFilter,
        [|
          _getFormat(gl, texture, pxFormats),
          _getFormat(gl, texture, nxFormats),
          _getFormat(gl, texture, pyFormats),
          _getFormat(gl, texture, nyFormats),
          _getFormat(gl, texture, pzFormats),
          _getFormat(gl, texture, nzFormats),
        |],
        [|
          _getType(gl, texture, pxTypes),
          _getType(gl, texture, nxTypes),
          _getType(gl, texture, pyTypes),
          _getType(gl, texture, nyTypes),
          _getType(gl, texture, pzTypes),
          _getType(gl, texture, nzTypes),
        |],
        flipY,
        gl |> WonderWebgl.Gl.getTextureCubeMap,
        [|
          gl |> WonderWebgl.Gl.getTextureCubeMapPositiveX,
          gl |> WonderWebgl.Gl.getTextureCubeMapNegativeX,
          gl |> WonderWebgl.Gl.getTextureCubeMapPositiveY,
          gl |> WonderWebgl.Gl.getTextureCubeMapNegativeY,
          gl |> WonderWebgl.Gl.getTextureCubeMapPositiveZ,
          gl |> WonderWebgl.Gl.getTextureCubeMapNegativeZ,
        |],
      ),
      (isNeedUpdates, browserDetectRecord),
      (_allocateSourceToTexture, setFlipYFunc),
    );
    (cubemapTextureRecord, browserDetectRecord);
  };
};

let isNeedUpdate = (texture, cubemapTextureRecord) =>
  UpdateTextureRenderService.isNeedUpdate(
    texture,
    BufferCubemapTextureService.getDefaultIsNeedUpdate(),
    cubemapTextureRecord.isNeedUpdates,
    OperateTypeArrayAllCubemapTextureService.getIsNeedUpdate,
  );
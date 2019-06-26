open StateDataMainType;

open CubemapTextureType;

let getRecord = state => state.cubemapTextureRecord |> OptionService.unsafeGet;

let isNeedUpdate = (texture, state) =>
  OperateTypeArrayAllCubemapTextureService.getIsNeedUpdate(.
    texture,
    getRecord(state).isNeedUpdates,
  )
  === BufferTextureService.getNeedUpdate();

let getTexture = (texture, state) =>
  OperateGlTextureMapService.getTexture(
    texture,
    getRecord(state).glTextureMap,
  );

let unsafeGetTexture = (texture, state) =>
  OperateGlTextureMapService.unsafeGetTexture(
    texture,
    getRecord(state).glTextureMap,
  );

let setGlTexture = (texture, glTexture, state) => {
  OperateGlTextureMapService.setTexture(
    texture,
    glTexture,
    getRecord(state).glTextureMap,
  );

  state;
};

let setIsNeedUpdate = (texture, isNeedUpdate, state) =>
  OperateCubemapTextureMainService.setIsNeedUpdate(
    texture,
    isNeedUpdate ?
      BufferTextureService.getNeedUpdate() :
      BufferTextureService.getNotNeedUpdate(),
    state,
  );

let getDefaultWrapS = () => BufferCubemapTextureService.getDefaultWrapS();

let getDefaultWrapT = () => BufferCubemapTextureService.getDefaultWrapT();

let getDefaultMagFilter = () =>
  BufferCubemapTextureService.getDefaultMagFilter();

let getDefaultMinFilter = () =>
  BufferCubemapTextureService.getDefaultMinFilter();

let getDefaultFormat = () => BufferCubemapTextureService.getDefaultFormat();

let getDefaultType = () => BufferCubemapTextureService.getDefaultType();

let getDefaultIsNeedUpdate = () =>
  BufferTextureService.getDefaultIsNeedUpdate();

let getDefaultFlipY = () => BufferCubemapTextureService.getDefaultFlipY();

let buildSource = (~width=2, ~height=4, ~src="", ~name="source", ()) =>
  {"width": width, "height": height, "src": src, "name": name} |> Obj.magic;

let getCubemapTexturePXSource = (texture, state) => {
  let {pxSourceMap} = RecordCubemapTextureMainService.getRecord(state);

  TextureSourceMapService.getSource(texture, pxSourceMap);
};

let getCubemapTextureNZSource = (texture, state) => {
  let {nzSourceMap} = RecordCubemapTextureMainService.getRecord(state);

  TextureSourceMapService.getSource(texture, nzSourceMap);
};

let getAllSources = (texture, state) => {
  let {
        pxSourceMap,
        nxSourceMap,
        pySourceMap,
        nySourceMap,
        pzSourceMap,
        nzSourceMap,
      } as cubemapTextureRecord =
    RecordCubemapTextureMainService.getRecord(state);

  UpdateCubemapTextureRenderService._getAllSources(
    texture,
    (
      pxSourceMap,
      nxSourceMap,
      pySourceMap,
      nySourceMap,
      pzSourceMap,
      nzSourceMap,
    ),
  );
};

let unsafeGetAllSources = (texture, state) =>
  getAllSources(texture, state) |> OptionService.unsafeGet;

let setAllSources =
    (
      ~state,
      ~texture,
      ~width=2,
      ~height=4,
      ~image1Name="i1",
      ~image2Name="i2",
      ~image3Name="i3",
      ~image4Name="i4",
      ~image5Name="i5",
      ~image6Name="i6",
      (),
    ) => {
  let source1 = buildSource(~width, ~height, ~src="px", ~name=image1Name, ());
  let source2 = buildSource(~width, ~height, ~src="nx", ~name=image2Name, ());
  let source3 = buildSource(~width, ~height, ~src="py", ~name=image3Name, ());
  let source4 = buildSource(~width, ~height, ~src="ny", ~name=image4Name, ());
  let source5 = buildSource(~width, ~height, ~src="pz", ~name=image5Name, ());
  let source6 = buildSource(~width, ~height, ~src="nz", ~name=image6Name, ());

  let state =
    state
    |> CubemapTextureAPI.setCubemapTexturePXSource(texture, source1)
    |> CubemapTextureAPI.setCubemapTextureNXSource(texture, source2)
    |> CubemapTextureAPI.setCubemapTexturePYSource(texture, source3)
    |> CubemapTextureAPI.setCubemapTextureNYSource(texture, source4)
    |> CubemapTextureAPI.setCubemapTexturePZSource(texture, source5)
    |> CubemapTextureAPI.setCubemapTextureNZSource(texture, source6);

  state;
};

let getIsNeedUpdate = (texture, state) =>
  OperateCubemapTextureMainService.getIsNeedUpdate(texture, state)
  === BufferTextureService.getNeedUpdate();

let setIsNeedUpdate = (texture, isNeedUpdate, state) =>
  OperateCubemapTextureMainService.setIsNeedUpdate(
    texture,
    isNeedUpdate ?
      BufferTextureService.getNeedUpdate() :
      BufferTextureService.getNotNeedUpdate(),
    state,
  );

let getDefaultIsNeedUpdateBool = () =>
  BufferTextureService.getDefaultIsNeedUpdate()
  === BufferTextureService.getNeedUpdate();

let getNeedAddedAllSourceArray = state => {
  let {
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
        pxSourceMap,
        nxSourceMap,
        pySourceMap,
        nySourceMap,
        pzSourceMap,
        nzSourceMap,
        needAddedPXSourceArray,
        needAddedNXSourceArray,
        needAddedPYSourceArray,
        needAddedNYSourceArray,
        needAddedPZSourceArray,
        needAddedNZSourceArray,
        needInitedTextureIndexArray,
        nameMap,
      } as cubemapTextureRecord =
    RecordCubemapTextureMainService.getRecord(state);

  [|
    needAddedPXSourceArray,
    needAddedNXSourceArray,
    needAddedPYSourceArray,
    needAddedNYSourceArray,
    needAddedPZSourceArray,
    needAddedNZSourceArray,
  |];
};

let getNeedInitedTextureIndexArray = state =>
  RecordCubemapTextureMainService.getRecord(state).
    needInitedTextureIndexArray;

let getDefaultFlipYBool = () => false;
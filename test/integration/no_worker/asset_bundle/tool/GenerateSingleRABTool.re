open RABType;

open Js.Typed_array;

let prepare = sandbox => PrepareABTool.prepare(sandbox);

let getDefaultShininess = () => 32.0;

module ResourceAssetBundleContent = {
  let getResourceAssetBundleContent = rab => {
    let dataView = DataViewCommon.create(rab);

    let (byteOffset, jsonByteLength, bufferByteLength) =
      GenerateABUtils.readHeader(dataView);

    let jsonStr = GenerateABUtils.getJsonStr(jsonByteLength, rab);
    let buffer = GenerateABUtils.getBuffer(jsonByteLength, rab);

    let resourceAssetBundleContent: RABType.resourceAssetBundleContent =
      jsonStr |> Js.Json.parseExn |> Obj.magic;

    resourceAssetBundleContent;
  };

  let buildImageData = (~name, ~mimeType="image/png", ~bufferView=0, ()) => {
    name,
    mimeType,
    bufferView,
  };

  let buildTextureData =
      (
        ~name,
        ~source=0,
        ~magFilter=BasicSourceTextureTool.getDefaultMagFilter()
                   |> TextureType.filterToUint8,
        ~minFilter=BasicSourceTextureTool.getDefaultMinFilter()
                   |> TextureType.filterToUint8,
        ~wrapS=BasicSourceTextureTool.getDefaultWrapS()
               |> TextureType.wrapToUint8,
        ~wrapT=BasicSourceTextureTool.getDefaultWrapT()
               |> TextureType.wrapToUint8,
        ~format=BasicSourceTextureTool.getDefaultFormat()
                |> TextureType.formatToUint8,
        ~type_=BasicSourceTextureTool.getDefaultType(),
        ~flipY=BufferTextureService.getDefaultFlipY()
               |> BufferTextureService.getFlipYFromTypeArrayValue,
        (),
      ) => {
    name,
    source,
    magFilter,
    minFilter,
    wrapS,
    wrapT,
    format,
    type_,
    flipY,
  };

  let buildLightMaterialData =
      (
        ~name,
        ~diffuseMap: option(RABType.textureIndex)=None,
        ~diffuseColor=ConvertGLBTool.getDefaultDiffuseColor(),
        ~shininess=getDefaultShininess(),
        (),
      ) => {
    name,
    diffuseMap:
      OptionService.isJsonSerializedValueNone(diffuseMap) ?
        ConvertTool.getJsonSerializedNone() :
        OptionService.unsafeGetJsonSerializedValue(diffuseMap) |> Obj.magic,
    diffuseColor,
    shininess,
  };

  let buildGeometryData =
      (
        ~name,
        ~indexDataType=RABType.Index16,
        ~vertexBufferView=0,
        ~normalBufferView=ABBufferViewUtils.buildNoneBufferViewIndex(),
        ~texCoordBufferView=ABBufferViewUtils.buildNoneBufferViewIndex(),
        ~indexBufferView=1,
        (),
      ) => {
    name,
    indexDataType,
    vertexBufferView,
    normalBufferView,
    texCoordBufferView,
    indexBufferView,
  };
};

module ResourceData = {
  let buildTextureResourceData = (textureComponent, imageDataIndex) => {
    textureComponent,
    imageDataIndex,
  };

  let buildImageData =
      (
        ~uint8Array=Uint8Array.make([|1, 2, 3|]),
        ~name="image1",
        ~mimeType="image/png",
        (),
      ) => {
    uint8Array,
    name,
    mimeType,
  };

  let createTextureResourceData =
      (
        ~state,
        ~name="texture1",
        ~magFilter=BasicSourceTextureTool.getDefaultMagFilter()
                   |> TextureType.filterToUint8,
        ~minFilter=BasicSourceTextureTool.getDefaultMinFilter()
                   |> TextureType.filterToUint8,
        ~wrapS=BasicSourceTextureTool.getDefaultWrapS()
               |> TextureType.wrapToUint8,
        ~wrapT=BasicSourceTextureTool.getDefaultWrapT()
               |> TextureType.wrapToUint8,
        ~format=BasicSourceTextureTool.getDefaultFormat()
                |> TextureType.formatToUint8,
        ~type_=BasicSourceTextureTool.getDefaultType(),
        ~flipY=BufferTextureService.getDefaultFlipY()
               |> BufferTextureService.getFlipYFromTypeArrayValue,
        ~imageDataIndex=0,
        (),
      ) => {
    let (state, texture) =
      BasicSourceTextureAPI.createBasicSourceTexture(state);
    /* let state =
       state |>
         BasicSourceTextureAPI.setBasicSourceTextureName(texture, name)
         |>
         Basic */
    let state =
      state
      |> OperateBasicSourceTextureMainService.setWrapS(texture, wrapS)
      |> OperateBasicSourceTextureMainService.setWrapT(texture, wrapT)
      |> OperateBasicSourceTextureMainService.setMagFilter(
           texture,
           magFilter,
         )
      |> OperateBasicSourceTextureMainService.setMinFilter(
           texture,
           minFilter,
         )
      |> OperateBasicSourceTextureMainService.setFormat(texture, format)
      |> OperateBasicSourceTextureMainService.setType(texture, type_)
      |> OperateBasicSourceTextureMainService.setFlipY(texture, flipY)
      |> NameBasicSourceTextureMainService.setName(texture, name);
    /* |> OperateBasicSourceTextureMainService.setSource(
         texture,
         imageMapByIndex
         |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(source),
       ); */

    /*
     let resourceData =
       buildResourceData(
         ~textures=[|buildTextureResourceData(texture, 0)|],
         ~imageDataMap,
         (),
       ); */

    (state, {textureComponent: texture, imageDataIndex});
  };

  let createBasicMaterialResourceData =
      (
        ~state,
        ~color=BasicMaterialTool.getDefaultColor(state),
        ~name="basicMaterial1",
        (),
      ) => {
    let (state, material) = BasicMaterialAPI.createBasicMaterial(state);

    let state =
      state
      |> BasicMaterialAPI.setBasicMaterialName(material, name)
      |> BasicMaterialAPI.setBasicMaterialColor(material, color);

    (state, material);
  };

  let createLightMaterialResourceData =
      (
        ~state,
        ~diffuseMap=None,
        ~diffuseColor=ConvertGLBTool.getDefaultDiffuseColor(),
        ~shininess=getDefaultShininess(),
        ~name="lightMaterial1",
        (),
      ) => {
    let (state, material) = LightMaterialAPI.createLightMaterial(state);

    let state =
      (
        switch (diffuseMap) {
        | Some(diffuseMap) =>
          state
          |> LightMaterialAPI.setLightMaterialDiffuseMap(material, diffuseMap)
        | None => state
        }
      )
      |> LightMaterialAPI.setLightMaterialName(material, name)
      |> LightMaterialAPI.setLightMaterialDiffuseColor(
           material,
           diffuseColor,
         )
      |> LightMaterialAPI.setLightMaterialShininess(material, shininess);

    (state, material);
  };

  let createGeometryResourceData =
      (
        ~state,
        ~name="geometry1",
        ~vertices=Float32Array.make([|10., 5., 3.|]),
        ~normals=None,
        ~texCoords=None,
        ~indices16=Some(Uint16Array.make([|0|])),
        ~indices32=None,
        (),
      ) => {
    let (state, geometry) = GeometryAPI.createGeometry(state);
    let (state, gameObject) = GameObjectAPI.createGameObject(state);
    let state =
      state
      |> GeometryAPI.setGeometryName(geometry, name)
      |> GameObjectAPI.addGameObjectGeometryComponent(gameObject, geometry);
    /* let vertices1 = Float32Array.make([|10.|]);
       let texCoords1 = Float32Array.make([|0.5|]);
       let normals1 = Float32Array.make([|1.|]);
       let indices1 = Uint16Array.make([|2|]); */

    let normals =
      normals |> Js.Option.getWithDefault(Float32Array.make([||]));

    let texCoords =
      texCoords |> Js.Option.getWithDefault(Float32Array.make([||]));

    let state =
      state
      |> GeometryAPI.setGeometryVertices(geometry, vertices)
      |> GeometryAPI.setGeometryTexCoords(geometry, texCoords)
      |> GeometryAPI.setGeometryNormals(geometry, normals)
      /* |> (
         state =>
           (
             switch (texCoords) {
             | Some(texCoords) =>
               GeometryAPI.setGeometryTexCoords(geometry, texCoords, state)
             | None => state
             }
           )
           |> (
             state =>
               (
                 switch (normals) {
                 | Some(normals) =>
                   GeometryAPI.setGeometryNormals(geometry, normals, state)
                 | None => state
                 }
               ) */
      |> (
        state =>
          (
            switch (indices16) {
            | Some(indices16) =>
              GeometryAPI.setGeometryIndices16(geometry, indices16, state)
            | None => state
            }
          )
          |> (
            state =>
              switch (indices32) {
              | Some(indices32) =>
                GeometryAPI.setGeometryIndices32(geometry, indices32, state)
              | None => state
              }
          )
      );
    /* ) */
    /* ); */

    (
      state,
      gameObject,
      geometry,
      name,
      (
        GeometryAPI.getGeometryVertices(geometry, state)
        |> CopyTypeArrayService.copyFloat32Array,
        GeometryAPI.getGeometryTexCoords(geometry, state)
        |> CopyTypeArrayService.copyFloat32Array,
        GeometryAPI.getGeometryNormals(geometry, state)
        |> CopyTypeArrayService.copyFloat32Array,
        GeometryAPI.getGeometryIndices16(geometry, state)
        |> CopyTypeArrayService.copyUint16Array,
        GeometryAPI.getGeometryIndices32(geometry, state)
        |> CopyTypeArrayService.copyUint32Array,
      ),
    );
    /* (
         state,
         gameObject,
         geometry,
         name,
         (
           GeometryAPI.getGeometryVertices(geometry, state),
           /* |> CopyTypeArrayService.copyFloat32Array, */
           GeometryAPI.getGeometryTexCoords(geometry, state),
           GeometryAPI.getGeometryNormals(geometry, state),
           GeometryAPI.getGeometryIndices16(geometry, state),
           /* , */
           GeometryAPI.getGeometryIndices32(geometry, state),
         ),
       ); */
  };

  let createScriptEventFunctionDataResourceData =
      (
        ~state,
        ~name="scriptEventFunctionData1",
        ~initFunc=ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildInitEventFunc(),
        ~updateFunc=ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildUpdateEventFunc(),
        ~disposeFunc=ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildSetLocalPositionEventFunc(),
        (),
      ) => (
    state,
    {
      name,
      eventFunctionData:
        ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptEventFunctionData(
          ~initFunc=Some(initFunc),
          ~updateFunc=Some(updateFunc),
          ~disposeFunc=Some(disposeFunc),
        ),
    },
  );

  let createScriptAttributeResourceData =
      (~state, ~name="scriptAttribute1", ()) => (
    state,
    {
      name,
      attribute:
        ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptAttribute(
          name,
        ),
    },
  );

  let buildResourceData =
      (
        ~basicMaterials=[||],
        ~lightMaterials=[||],
        ~textures=[||],
        ~geometrys=[||],
        ~scriptEventFunctionDataArr=[||],
        ~scriptAttributeDataArr=[||],
        ~imageDataMap=WonderCommonlib.ImmutableSparseMapService.createEmpty(),
        (),
      ) => {
    basicMaterials,
    lightMaterials,
    textures,
    geometrys,
    scriptEventFunctionDataArr,
    scriptAttributeDataArr,
    imageDataMap,
  };
};

let generateOneRAB = state => {
  let image1 = ResourceData.buildImageData();

  let imageDataMap =
    WonderCommonlib.ImmutableSparseMapService.createEmpty()
    |> WonderCommonlib.ImmutableSparseMapService.set(0, image1);

  let (state, textureResourceData1) =
    ResourceData.createTextureResourceData(~state, ~imageDataIndex=0, ());

  let resourceData1 =
    ResourceData.buildResourceData(
      ~textures=[|textureResourceData1|],
      ~imageDataMap,
      (),
    );

  GenerateSingleRABSystem.generateSingleRAB(resourceData1, state);
};
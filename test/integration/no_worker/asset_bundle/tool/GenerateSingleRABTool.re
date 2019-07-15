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

  let buildBasicSourceTextureData =
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
        ~flipY=BasicSourceTextureTool.getDefaultFlipYBool(),
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

  let buildCubemapTextureData =
      (
        ~name,
        ~magFilter=CubemapTextureTool.getDefaultMagFilter()
                   |> TextureType.filterToUint8,
        ~minFilter=CubemapTextureTool.getDefaultMinFilter()
                   |> TextureType.filterToUint8,
        ~wrapS=CubemapTextureTool.getDefaultWrapS() |> TextureType.wrapToUint8,
        ~wrapT=CubemapTextureTool.getDefaultWrapT() |> TextureType.wrapToUint8,
        ~pxFormat=CubemapTextureTool.getDefaultFormat()
                  |> TextureType.formatToUint8,
        ~nxFormat=CubemapTextureTool.getDefaultFormat()
                  |> TextureType.formatToUint8,
        ~pyFormat=CubemapTextureTool.getDefaultFormat()
                  |> TextureType.formatToUint8,
        ~nyFormat=CubemapTextureTool.getDefaultFormat()
                  |> TextureType.formatToUint8,
        ~pzFormat=CubemapTextureTool.getDefaultFormat()
                  |> TextureType.formatToUint8,
        ~nzFormat=CubemapTextureTool.getDefaultFormat()
                  |> TextureType.formatToUint8,
        ~pxType=CubemapTextureTool.getDefaultType(),
        ~nxType=CubemapTextureTool.getDefaultType(),
        ~pyType=CubemapTextureTool.getDefaultType(),
        ~nyType=CubemapTextureTool.getDefaultType(),
        ~pzType=CubemapTextureTool.getDefaultType(),
        ~nzType=CubemapTextureTool.getDefaultType(),
        ~pxSource=Some(0),
        ~nxSource=Some(1),
        ~pySource=Some(2),
        ~nySource=Some(3),
        ~pzSource=Some(4),
        ~nzSource=Some(5),
        ~flipY=CubemapTextureTool.getDefaultFlipYBool(),
        (),
      ) => {
    name,
    pxSource,
    nxSource,
    pySource,
    nySource,
    pzSource,
    nzSource,
    magFilter,
    minFilter,
    wrapS,
    wrapT,
    pxFormat,
    nxFormat,
    pyFormat,
    nyFormat,
    pzFormat,
    nzFormat,
    pxType,
    nxType,
    pyType,
    nyType,
    pzType,
    nzType,
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
  open ResourceData;

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

  let createBasicSourceTextureResourceData =
      (
        ~state,
        ~name="basicSourceTexture1",
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
        ~flipY=BasicSourceTextureTool.getDefaultFlipYBool(),
        ~imageDataIndex=0,
        (),
      ) => {
    let (state, texture) =
      BasicSourceTextureAPI.createBasicSourceTexture(state);

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

    (
      state,
      {textureComponent: texture, imageDataIndex}: ResourceData.basicSourceTextureData,
    );
  };

  let createCubemapTextureResourceData =
      (
        ~state,
        ~name="cubemapTexture1",
        ~magFilter=CubemapTextureTool.getDefaultMagFilter()
                   |> TextureType.filterToUint8,
        ~minFilter=CubemapTextureTool.getDefaultMinFilter()
                   |> TextureType.filterToUint8,
        ~wrapS=CubemapTextureTool.getDefaultWrapS() |> TextureType.wrapToUint8,
        ~wrapT=CubemapTextureTool.getDefaultWrapT() |> TextureType.wrapToUint8,
        ~pxFormat=CubemapTextureTool.getDefaultFormat()
                  |> TextureType.formatToUint8,
        ~nxFormat=CubemapTextureTool.getDefaultFormat()
                  |> TextureType.formatToUint8,
        ~pyFormat=CubemapTextureTool.getDefaultFormat()
                  |> TextureType.formatToUint8,
        ~nyFormat=CubemapTextureTool.getDefaultFormat()
                  |> TextureType.formatToUint8,
        ~pzFormat=CubemapTextureTool.getDefaultFormat()
                  |> TextureType.formatToUint8,
        ~nzFormat=CubemapTextureTool.getDefaultFormat()
                  |> TextureType.formatToUint8,
        ~pxType=CubemapTextureTool.getDefaultType(),
        ~nxType=CubemapTextureTool.getDefaultType(),
        ~pyType=CubemapTextureTool.getDefaultType(),
        ~nyType=CubemapTextureTool.getDefaultType(),
        ~pzType=CubemapTextureTool.getDefaultType(),
        ~nzType=CubemapTextureTool.getDefaultType(),
        ~flipY=CubemapTextureTool.getDefaultFlipYBool(),
        ~imageDataIndex=0,
        (),
      ) => {
    let (state, texture) = CubemapTextureAPI.createCubemapTexture(state);

    let state =
      state
      |> OperateCubemapTextureMainService.setWrapS(texture, wrapS)
      |> OperateCubemapTextureMainService.setWrapT(texture, wrapT)
      |> OperateCubemapTextureMainService.setMagFilter(texture, magFilter)
      |> OperateCubemapTextureMainService.setMinFilter(texture, minFilter)
      |> OperateCubemapTextureMainService.setPXFormat(texture, pxFormat)
      |> OperateCubemapTextureMainService.setNXFormat(texture, nxFormat)
      |> OperateCubemapTextureMainService.setPYFormat(texture, pyFormat)
      |> OperateCubemapTextureMainService.setNYFormat(texture, nyFormat)
      |> OperateCubemapTextureMainService.setPZFormat(texture, pzFormat)
      |> OperateCubemapTextureMainService.setNZFormat(texture, nzFormat)
      |> OperateCubemapTextureMainService.setPXType(texture, pxType)
      |> OperateCubemapTextureMainService.setNXType(texture, nxType)
      |> OperateCubemapTextureMainService.setPYType(texture, pyType)
      |> OperateCubemapTextureMainService.setNYType(texture, nyType)
      |> OperateCubemapTextureMainService.setPZType(texture, pzType)
      |> OperateCubemapTextureMainService.setNZType(texture, nzType)
      |> OperateCubemapTextureMainService.setFlipY(texture, flipY)
      |> NameCubemapTextureMainService.setName(texture, name);

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
        ~basicSourceTextures=[||],
        ~cubemapTextures=[||],
        ~geometrys=[||],
        ~scriptEventFunctionDataArr=[||],
        ~scriptAttributeDataArr=[||],
        ~basicSourceTextureImageDataMap=WonderCommonlib.ImmutableSparseMapService.createEmpty(),
        ~cubemapTextureImageDataMap=WonderCommonlib.ImmutableSparseMapService.createEmpty(),
        (),
      ) => {
    basicMaterials,
    lightMaterials,
    basicSourceTextures,
    cubemapTextures,
    geometrys,
    scriptEventFunctionDataArr,
    scriptAttributeDataArr,
    basicSourceTextureImageDataMap,
    cubemapTextureImageDataMap,
  };
};

module Test = {
  let prepareCubemapTextureResourceData =
      (
        ~image1Name="i1",
        ~image2Name="i2",
        ~image3Name="i3",
        ~image4Name="i4",
        ~image5Name="i5",
        ~image6Name="i6",
        ~image1MimeType="image/png",
        ~image2MimeType="image/png",
        ~image3MimeType="image/png",
        ~image4MimeType="image/png",
        ~image5MimeType="image/png",
        ~image6MimeType="image/png",
        (),
      ) => {
    let image1 =
      ResourceData.buildImageData(
        ~name=image1Name,
        ~mimeType=image1MimeType,
        (),
      );
    let image2 =
      ResourceData.buildImageData(
        ~name=image2Name,
        ~mimeType=image2MimeType,
        (),
      );
    let image3 =
      ResourceData.buildImageData(
        ~name=image3Name,
        ~mimeType=image3MimeType,
        (),
      );
    let image4 =
      ResourceData.buildImageData(
        ~name=image4Name,
        ~mimeType=image4MimeType,
        (),
      );
    let image5 =
      ResourceData.buildImageData(
        ~name=image5Name,
        ~mimeType=image5MimeType,
        (),
      );
    let image6 =
      ResourceData.buildImageData(
        ~name=image6Name,
        ~mimeType=image6MimeType,
        (),
      );

    let imageDataMap =
      WonderCommonlib.ImmutableSparseMapService.createEmpty()
      |> WonderCommonlib.ImmutableSparseMapService.set(
           0,
           {
             pxImageData: Some(image1),
             nxImageData: Some(image2),
             pyImageData: Some(image3),
             nyImageData: Some(image4),
             pzImageData: Some(image5),
             nzImageData: Some(image6),
           }: RABType.ResourceData.cubemapTextureImageData,
         );

    let textureName = "cubemapTexture1";

    (
      textureName,
      (imageDataMap, (image1, image2, image3, image4, image5, image6)),
    );
  };

  let createCubemapTextureResourceData =
      (
        ~state,
        ~image1Name="i1",
        ~image2Name="i2",
        ~image3Name="i3",
        ~image4Name="i4",
        ~image5Name="i5",
        ~image6Name="i6",
        ~image1MimeType="image/png",
        ~image2MimeType="image/png",
        ~image3MimeType="image/png",
        ~image4MimeType="image/png",
        ~image5MimeType="image/png",
        ~image6MimeType="image/png",
        ~flipY=false,
        (),
      ) => {
    let (
      textureName,
      (imageDataMap, (image1, image2, image3, image4, image5, image6)),
    ) =
      prepareCubemapTextureResourceData(
        ~image1Name,
        ~image2Name,
        ~image3Name,
        ~image4Name,
        ~image5Name,
        ~image6Name,
        ~image1MimeType,
        ~image2MimeType,
        ~image3MimeType,
        ~image4MimeType,
        ~image5MimeType,
        ~image6MimeType,
        (),
      );

    let (state, textureResourceData) =
      ResourceData.createCubemapTextureResourceData(
        ~state,
        ~flipY,
        ~name=textureName,
        ~imageDataIndex=0,
        (),
      );

    (
      state,
      textureResourceData,
      textureName,
      (imageDataMap, (image1, image2, image3, image4, image5, image6)),
    );
  };
};

let generateOneRAB = state => {
  let image1 = ResourceData.buildImageData();

  let basicSourceTextureImageDataMap =
    WonderCommonlib.ImmutableSparseMapService.createEmpty()
    |> WonderCommonlib.ImmutableSparseMapService.set(0, image1);

  let (state, textureResourceData1) =
    ResourceData.createBasicSourceTextureResourceData(
      ~state,
      ~imageDataIndex=0,
      (),
    );

  let resourceData1 =
    ResourceData.buildResourceData(
      ~basicSourceTextures=[|textureResourceData1|],
      ~basicSourceTextureImageDataMap,
      (),
    );

  GenerateSingleRABSystem.generateSingleRAB(resourceData1, state);
};
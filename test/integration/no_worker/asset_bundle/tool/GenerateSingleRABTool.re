open RABType;

open Js.Typed_array;

let prepare = sandbox => PrepareABTool.prepare(sandbox);

let getDefaultShininess = () => 32.0;

module ResourceAssetBundleContent = {
  let getResourceAssetBundleContent = rab => {
    let dataView = DataViewCommon.create(rab);

    let (byteOffset, jsonByteLength, bufferByteLength) =
      DependencyDataUtils.All.readHeader(dataView);

    let jsonStr = DependencyDataUtils.All.getJsonStr(jsonByteLength, rab);
    let buffer = DependencyDataUtils.All.getBuffer(jsonByteLength, rab);

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
                   |> SourceTextureType.filterToUint8,
        ~minFilter=BasicSourceTextureTool.getDefaultMinFilter()
                   |> SourceTextureType.filterToUint8,
        ~wrapS=BasicSourceTextureTool.getDefaultWrapS()
               |> SourceTextureType.wrapToUint8,
        ~wrapT=BasicSourceTextureTool.getDefaultWrapT()
               |> SourceTextureType.wrapToUint8,
        ~format=BasicSourceTextureTool.getDefaultFormat()
                |> SourceTextureType.formatToUint8,
        ~type_=BasicSourceTextureTool.getDefaultType(),
        ~flipY=BufferSourceTextureService.getDefaultFlipY()
               |> BufferSourceTextureService.getFlipYFromTypeArrayValue,
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
      (~state, ~name="texture1", ~imageDataIndex=0, ()) => {
    let (state, texture) =
      BasicSourceTextureAPI.createBasicSourceTexture(state);
    let state =
      BasicSourceTextureAPI.setBasicSourceTextureName(texture, name, state);
    /*
     let resourceData =
       buildResourceData(
         ~textures=[|buildTextureResourceData(texture, 0)|],
         ~imageDataMap,
         (),
       ); */

    (state, {textureComponent: texture, imageDataIndex});
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
        ~vertices=Float32Array.make([|10.|]),
        ~normals=None,
        ~texCoords=None,
        ~indices16=Some(Uint16Array.make([|2|])),
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
    let state =
      state
      |> GeometryAPI.setGeometryVertices(geometry, vertices)
      |> (
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
              )
              |> (
                state =>
                  (
                    switch (indices16) {
                    | Some(indices16) =>
                      GeometryAPI.setGeometryIndices16(
                        geometry,
                        indices16,
                        state,
                      )
                    | None => state
                    }
                  )
                  |> (
                    state =>
                      switch (indices32) {
                      | Some(indices32) =>
                        GeometryAPI.setGeometryIndices32(
                          geometry,
                          indices32,
                          state,
                        )
                      | None => state
                      }
                  )
              )
          )
      );

    (
      state,
      gameObject,
      geometry,
      name,
      (vertices, texCoords, normals, indices16, indices32),
    );
  };

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
    ResourceData.createTextureResourceData(
      ~state,
      ~imageDataIndex=0,
      (),
    );

  let resourceData1 =
    ResourceData.buildResourceData(
      ~textures=[|textureResourceData1|],
      ~imageDataMap,
      (),
    );

  GenerateRABSystem.generateSingleRAB(resourceData1, state);
};
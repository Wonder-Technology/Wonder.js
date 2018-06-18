open Json;

open Encode;

open StateDataMainType;

open GenerateSceneGraphType;

let _encodeNodes = (nodeDataArr, state) => (
  "nodes",
  nodeDataArr
  |> Js.Array.map(
       (
         {
           gameObject,
           children,
           translation,
           rotation,
           scale,
           mesh,
           camera,
           extension,
         }: nodeData,
       ) => {
       let list = [];

       let list =
         switch (NameGameObjectMainService.getName(gameObject, state)) {
         | None => list
         | Some(name) => [("name", name |> string), ...list]
         };

       let list =
         switch (children) {
         | None => list
         | Some(children) => [("children", children |> intArray), ...list]
         };

       let list =
         switch (translation) {
         | None => list
         | Some(translation) => [
             (
               "translation",
               translation |> positionTupleToArray |> numberArray,
             ),
             ...list,
           ]
         };

       let list =
         switch (rotation) {
         | None => list
         | Some(rotation) => [
             ("rotation", rotation |> rotationTupleToArray |> numberArray),
             ...list,
           ]
         };

       let list =
         switch (scale) {
         | None => list
         | Some(scale) => [
             ("scale", scale |> scaleTupleToArray |> numberArray),
             ...list,
           ]
         };

       let list =
         switch (mesh) {
         | None => list
         | Some(mesh) => [("mesh", mesh |> int), ...list]
         };

       let list =
         switch (camera) {
         | None => list
         | Some(camera) => [("camera", camera |> int), ...list]
         };

       let list =
         switch (extension) {
         | None => list
         | Some(({material}: nodeExtension)) =>
           let extensionList = [];
           let extensionList =
             switch (material) {
             | None => extensionList
             | Some(material) => [
                 ("material", material |> int),
                 ...extensionList,
               ]
             };

           [("extension", extensionList |> object_), ...list];
         };

       list |> List.rev |> object_;
     })
  |> jsonArray,
);

let _encodeMaterials = (materialDataArr, state) => (
  "materials",
  materialDataArr
  |> Js.Array.map(({baseColorFactor, baseColorTexture, name}: materialData) => {
       let list = [];

       let list =
         switch (name) {
         | None => list
         | Some(name) => [("name", name |> string), ...list]
         };

       let pbrMetallicRoughnessList = [];

       let pbrMetallicRoughnessList =
         switch (baseColorFactor) {
         | None => pbrMetallicRoughnessList
         | Some(baseColorFactor) => [
             ("baseColorFactor", baseColorFactor |> numberArray),
             ...pbrMetallicRoughnessList,
           ]
         };

       let pbrMetallicRoughnessList =
         switch (baseColorTexture) {
         | None => pbrMetallicRoughnessList
         | Some(baseColorTexture) => [
             (
               "baseColorTexture",
               [("index", baseColorTexture |> int)] |> object_,
             ),
             ...pbrMetallicRoughnessList,
           ]
         };

       let list = [
         ("pbrMetallicRoughness", pbrMetallicRoughnessList |> object_),
         ...list,
       ];

       list |> List.rev |> object_;
     })
  |> jsonArray,
);

let _encodeTextures = (textureDataArr, state) => (
  "textures",
  textureDataArr
  |> Js.Array.map(({name, sampler, source}: textureData) => {
       let list = [];

       let list =
         switch (name) {
         | None => list
         | Some(name) => [("name", name |> string), ...list]
         };

       let list = [
         ("sampler", sampler |> int),
         ("source", source |> int),
         ...list,
       ];

       list |> object_;
     })
  |> jsonArray,
);

let _encodeSamplers = (samplerDataArr, state) => (
  "samplers",
  samplerDataArr
  |> Js.Array.map(({wrapS, wrapT, magFilter, minFilter}: samplerData) => {
       let list = [
         ("wrapS", wrapS |> int),
         ("wrapT", wrapT |> int),
         ("magFilter", magFilter |> int),
         ("minFilter", minFilter |> int),
       ];

       list |> object_;
     })
  |> jsonArray,
);

let _encodeImages = (imageBase64Arr, state) => (
  "images",
  imageBase64Arr
  |> Js.Array.map((base64Str: string) => {
       let list = [("uri", base64Str |> string)];

       list |> object_;
     })
  |> jsonArray,
);

let _encodeMeshes = (meshDataArr, state) => (
  "meshes",
  meshDataArr
  |> Js.Array.map(({primitives, name}: meshData) => {
       let {attributes, indices, material}: primitives = primitives;

       let {position, normal, texCoord_0}: attributes = attributes;

       let attributesList = [
         ("POSITION", position |> int),
         ("NORMAL", normal |> int),
       ];

       let attributesList =
         switch (texCoord_0) {
         | None => attributesList
         | Some(texCoord_0) =>
           attributesList |> List.append([("TEXCOORD_0", texCoord_0 |> int)])
         };

       let primitivesList = [
         ("attributes", attributesList |> object_),
         ("indices", indices |> int),
       ];

       let primitivesList =
         switch (material) {
         | None => primitivesList
         | Some(material) =>
           primitivesList |> List.append([("material", material |> int)])
         };

       let primitives = (
         "primitives",
         [|primitivesList |> object_|] |> jsonArray,
       );

       switch (name) {
       | None => [primitives] |> object_

       | Some(name) => [primitives, ("name", name |> string)] |> object_
       };
     })
  |> jsonArray,
);

let encode =
    (
      (buffer, totalByteLength),
      (
        nodeDataArr,
        bufferViewDataArr,
        accessorDataArr,
        meshDataArr,
        materialDataArr,
        textureDataArr,
        samplerDataArr,
        imageBase64Arr,
      ),
      state,
    ) =>
  [
    (
      "asset",
      [
        ("version", "2.0" |> string),
        ("generator", GLTFUtils.getGenerator() |> string),
      ]
      |> object_,
    ),
    ("scene", 0 |> int),
    (
      "scenes",
      [|[("nodes", [|0|] |> intArray)] |> object_|] |> jsonArray,
    ),
    _encodeNodes(nodeDataArr, state),
    _encodeMaterials(materialDataArr, state),
    _encodeTextures(textureDataArr, state),
    _encodeSamplers(samplerDataArr, state),
    _encodeImages(imageBase64Arr, state),
    (
      "buffers",
      [|
        [
          ("byteLength", totalByteLength |> int),
          ("uri", Base64ArrayBufferCommon.encode(buffer) |> string),
        ]
        |> object_,
      |]
      |> jsonArray,
    ),
    (
      "bufferViews",
      bufferViewDataArr
      |> Js.Array.map(({buffer, byteOffset, byteLength}: bufferViewData) =>
           [
             ("buffer", buffer |> int),
             ("byteOffset", byteOffset |> int),
             ("byteLength", byteLength |> int),
           ]
           |> object_
         )
      |> jsonArray,
    ),
    (
      "accessors",
      accessorDataArr
      |> Js.Array.map(
           ({bufferView, componentType, count, type_}: accessorData) =>
           [
             ("bufferView", bufferView |> int),
             ("componentType", componentType |> int),
             ("count", count |> int),
             ("type", type_ |> string),
           ]
           |> object_
         )
      |> jsonArray,
    ),
    _encodeMeshes(meshDataArr, state),
  ]
  |> object_;
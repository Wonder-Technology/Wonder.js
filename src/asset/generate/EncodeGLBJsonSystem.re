open Json;

open Encode;

open StateDataMainType;

open GenerateSceneGraphType;

let _encodeNodeTransform = ({translation, rotation, scale}: nodeData, list) => {
  let list =
    switch (translation) {
    | None => list
    | Some(translation) => [
        ("translation", translation |> positionTupleToArray |> numberArray),
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

  switch (scale) {
  | None => list
  | Some(scale) => [
      ("scale", scale |> scaleTupleToArray |> numberArray),
      ...list,
    ]
  };
};

let _encodeNodeComponents =
    ({mesh, camera, extras, extensions}: nodeData, list) => {
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
    switch (extras) {
    | None => list
    | Some(({material}: nodeExtras)) =>
      let extraList = [];
      let extraList =
        switch (material) {
        | None => extraList
        | Some(material) => [("material", material |> int), ...extraList]
        };

      [("extras", extraList |> object_), ...list];
    };

  switch (extensions) {
  | None => list
  | Some(({khr_lights}: nodeExtensions)) =>
    let extensionList = [];
    let extensionList =
      switch (khr_lights) {
      | None => extensionList
      | Some({light}) => [
          ("KHR_lights", [("light", light |> int)] |> object_),
          ...extensionList,
        ]
      };

    [("extensions", extensionList |> object_), ...list];
  };
};

let _encodeNodes = (nodeDataArr, state) => (
  "nodes",
  nodeDataArr
  |> Js.Array.map((({gameObject, children}: nodeData) as nodeData) => {
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
         list
         |> _encodeNodeTransform(nodeData)
         |> _encodeNodeComponents(nodeData);

       list |> List.rev |> object_;
     })
  |> jsonArray,
);

let _encodePerspectiveCamera = ({near, far, fovy, aspect}) => {
  let perspectiveList = [("znear", near |> float), ("yfov", fovy |> float)];

  let perspectiveList =
    switch (far) {
    | None => perspectiveList
    | Some(far) => [("zfar", far |> float), ...perspectiveList]
    };

  switch (aspect) {
  | None => perspectiveList
  | Some(aspect) => [("aspectRatio", aspect |> float), ...perspectiveList]
  };
};

let _encodeCameras = cameraDataArr => (
  "cameras",
  cameraDataArr
  |> Js.Array.map(({type_, perspective}: cameraData) =>
       [
         ("type", type_ |> string),
         ("perspective", _encodePerspectiveCamera(perspective) |> object_),
       ]
       |> object_
     )
  |> jsonArray,
);

let _encodeScenes = (extensionsUsedArr, lightDataArr, state) => {
  let sceneList = [("nodes", [|0|] |> intArray)];

  (
    "scenes",
    [|
      (
        extensionsUsedArr |> Js.Array.includes("KHR_lights") ?
          [
            (
              "extensions",
              [
                (
                  "KHR_lights",
                  [
                    (
                      "light",
                      BuildLightDataSystem.getAmbientLightIndex(lightDataArr)
                      |> int,
                    ),
                  ]
                  |> object_,
                ),
              ]
              |> object_,
            ),
            ...sceneList,
          ] :
          sceneList
      )
      |> object_,
    |]
    |> jsonArray,
  );
};

let _encodeMaterials = materialDataArr => (
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

let _encodeTextures = textureDataArr => (
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

let _encodeSamplers = samplerDataArr => (
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

let _encodeImages = imageUint8DataArr => (
  "images",
  imageUint8DataArr
  |> Js.Array.map(({bufferView, mimeType}) => {
       let list = [
         ("bufferView", bufferView |> int),
         ("mimeType", mimeType |> string),
       ];

       list |> object_;
     })
  |> jsonArray,
);

let _encodeAttributes = (position, normal, texCoord_0, indices) => {
  let attributesList = [("POSITION", position |> int)];

  let attributesList =
    switch (normal) {
    | None => attributesList
    | Some(normal) => [("NORMAL", normal |> int), ...attributesList]
    };

  let attributesList =
    switch (texCoord_0) {
    | None => attributesList
    | Some(texCoord_0) => [
        ("TEXCOORD_0", texCoord_0 |> int),
        ...attributesList,
      ]
    };

  [
    ("attributes", attributesList |> List.rev |> object_),
    ("indices", indices |> int),
  ];
};

let _encodeMeshes = meshDataArr => (
  "meshes",
  meshDataArr
  |> Js.Array.map(({primitives, name}: meshData) => {
       let {attributes, indices, material}: primitives = primitives;

       let {position, normal, texCoord_0}: attributes = attributes;

       let primitivesList =
         _encodeAttributes(position, normal, texCoord_0, indices);

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

let _encodeExtensionsUsed = extensionsUsedArr => (
  "extensionsUsedArr",
  extensionsUsedArr |> stringArray,
);

let _encodeLights =
    (
      {
        type_,
        color,
        intensity,
        constantAttenuation,
        linearAttenuation,
        quadraticAttenuation,
        range,
      }: lightData,
    ) => {
  let khrLightsExtensionList = [("type", type_ |> string)];

  let khrLightsExtensionList =
    switch (color) {
    | None => khrLightsExtensionList
    | Some(color) => [
        ("color", color |> numberArray),
        ...khrLightsExtensionList,
      ]
    };

  let khrLightsExtensionList =
    switch (intensity) {
    | None => khrLightsExtensionList
    | Some(intensity) => [
        ("intensity", intensity |> float),
        ...khrLightsExtensionList,
      ]
    };

  let khrLightsExtensionList =
    switch (constantAttenuation) {
    | None => khrLightsExtensionList
    | Some(constantAttenuation) => [
        ("constantAttenuation", constantAttenuation |> float),
        ...khrLightsExtensionList,
      ]
    };

  let khrLightsExtensionList =
    switch (linearAttenuation) {
    | None => khrLightsExtensionList
    | Some(linearAttenuation) => [
        ("linearAttenuation", linearAttenuation |> float),
        ...khrLightsExtensionList,
      ]
    };

  let khrLightsExtensionList =
    switch (quadraticAttenuation) {
    | None => khrLightsExtensionList
    | Some(quadraticAttenuation) => [
        ("quadraticAttenuation", quadraticAttenuation |> float),
        ...khrLightsExtensionList,
      ]
    };

  switch (range) {
  | None => khrLightsExtensionList
  | Some(range) => [("range", range |> float), ...khrLightsExtensionList]
  };
};

let _encodeExtensions = lightDataArr => (
  "extensions",
  [
    (
      "KHR_lights",
      [
        (
          "lights",
          lightDataArr
          |> Js.Array.map(lightData => _encodeLights(lightData) |> object_)
          |> jsonArray,
        ),
      ]
      |> object_,
    ),
  ]
  |> object_,
);

let _encodeBuffers = totalByteLength => (
  "buffers",
  [|[("byteLength", totalByteLength |> int)] |> object_|] |> jsonArray,
);

let _encodeBufferViews = bufferViewDataArr => (
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
);

let _encodeAccessors = accessorDataArr => (
  "accessors",
  accessorDataArr
  |> Js.Array.map(({bufferView, componentType, count, type_}: accessorData) =>
       [
         ("bufferView", bufferView |> int),
         ("componentType", componentType |> int),
         ("count", count |> int),
         ("type", type_ |> string),
       ]
       |> object_
     )
  |> jsonArray,
);

let _encodeAsset = () => (
  "asset",
  [
    ("version", "2.0" |> string),
    ("generator", GLTFUtils.getGenerator() |> string),
  ]
  |> object_,
);

let _hasExtensions = lightDataArr => lightDataArr |> Js.Array.length > 0;

let encode =
    (
      totalByteLength,
      (
        nodeDataArr,
        bufferViewDataArr,
        accessorDataArr,
        meshDataArr,
        materialDataArr,
        textureDataArr,
        samplerDataArr,
        imageUint8DataArr,
        cameraDataArr,
        lightDataArr,
        extensionsUsedArr,
      ),
      state,
    ) => {
  let list = [
    _encodeAsset(),
    ("scene", 0 |> int),
    _encodeScenes(extensionsUsedArr, lightDataArr, state),
    _encodeCameras(cameraDataArr),
    _encodeNodes(nodeDataArr, state),
    _encodeMaterials(materialDataArr),
    _encodeTextures(textureDataArr),
    _encodeSamplers(samplerDataArr),
    _encodeImages(imageUint8DataArr),
    _encodeBuffers(totalByteLength),
    _encodeBufferViews(bufferViewDataArr),
    _encodeAccessors(accessorDataArr),
    _encodeMeshes(meshDataArr),
  ];

  let list =
    extensionsUsedArr |> Js.Array.length > 0 ?
      [_encodeExtensionsUsed(extensionsUsedArr), ...list] : list;

  let list =
    _hasExtensions(lightDataArr) ?
      [_encodeExtensions(lightDataArr), ...list] : list;

  list |> object_;
};
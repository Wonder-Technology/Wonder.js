let convert = json : GLTFType.gltf =>
  GLTFType.(
    Json.(
      Decode.{
        asset:
          json
          |> field("asset", json =>
               {
                 version: json |> field("version", string),
                 generator: json |> optional(field("generator", string)),
               }
             ),
        scenes:
          json
          |> field(
               "scenes",
               array(json =>
                 {nodes: json |> optional(field("nodes", array(int)))}
               ),
             ),
        scene: json |> field("scene", int),
        images:
          json
          |> optional(
               field(
                 "images",
                 array(json =>
                   {uri: json |> optional(field("uri", string))}
                 ),
               ),
             ),
        textures:
          json
          |> optional(
               field(
                 "textures",
                 array(json =>
                   {
                     sampler: json |> optional(field("sampler", int)),
                     source: json |> optional(field("source", int)),
                   }
                 ),
               ),
             ),
        samplers:
          json
          |> optional(
               field(
                 "samplers",
                 array(json =>
                   {
                     magFilter: json |> optional(field("magFilter", int)),
                     minFilter: json |> optional(field("minFilter", int)),
                     wrapS: json |> optional(field("wrapS", int)),
                     wrapT: json |> optional(field("wrapT", int)),
                   }
                 ),
               ),
             ),
        buffers:
          json
          |> field(
               "buffers",
               array(json =>
                 {
                   uri: json |> optional(field("uri", string)),
                   byteLength: json |> field("byteLength", int),
                 }
               ),
             ),
        bufferViews:
          json
          |> field(
               "bufferViews",
               array(json =>
                 {
                   buffer: json |> field("buffer", int),
                   byteOffset: json |> optional(field("byteOffset", int)),
                   byteLength: json |> field("byteLength", int),
                   byteStride: json |> optional(field("byteStride", int)),
                   /* target: json |> optional(field("target", int)) */
                 }
               ),
             ),
        accessors:
          json
          |> field(
               "accessors",
               array(json =>
                 {
                   bufferView: json |> optional(field("bufferView", int)),
                   byteOffset: json |> optional(field("byteOffset", int)),
                   count: json |> field("count", int),
                   componentType: json |> field("componentType", int),
                   type_: json |> field("type", string),
                 }
               ),
             ),
        cameras:
          json
          |> optional(
               field(
                 "cameras",
                 array(json =>
                   {
                     type_: json |> field("type", string),
                     perspective:
                       json
                       |> optional(
                            field("perspective", json =>
                              {
                                aspectRatio:
                                  json
                                  |> optional(field("aspectRatio", float)),
                                yfov: json |> field("yfov", float),
                                zfar: json |> optional(field("zfar", float)),
                                znear: json |> field("znear", float),
                              }
                            ),
                          ),
                     orthographic:
                       json
                       |> optional(
                            field("orthographic", json =>
                              {
                                xmag: json |> field("xmag", float),
                                ymag: json |> field("ymag", float),
                                zfar: json |> field("zfar", float),
                                znear: json |> field("znear", float),
                              }
                            ),
                          ),
                   }
                 ),
               ),
             ),
        nodes:
          json
          |> field(
               "nodes",
               array(json =>
                 {
                   camera:
                     json |> optimizedOptional(optimizedField("camera", int)),
                   mesh:
                     json |> optimizedOptional(optimizedField("mesh", int)),
                   matrix:
                     json
                     |> optimizedOptional(
                          optimizedField("matrix", array(float)),
                        ),
                   translation:
                     json
                     |> optimizedOptional(
                          optimizedField("translation", array(float)),
                        ),
                   rotation:
                     json
                     |> optimizedOptional(
                          optimizedField("rotation", array(float)),
                        ),
                   scale:
                     json
                     |> optimizedOptional(
                          optimizedField("scale", array(float)),
                        ),
                   children:
                     json
                     |> optimizedOptional(
                          optimizedField("children", array(int)),
                        ),
                 }
               ),
             ),
        meshes:
          json
          |> field(
               "meshes",
               array(json =>
                 {
                   primitives:
                     json
                     |> field(
                          "primitives",
                          array(json =>
                            {
                              attributes:
                                json
                                |> field("attributes", json =>
                                     {
                                       position:
                                         json |> field("POSITION", int),
                                       normal:
                                         json
                                         |> optional(field("NORMAL", int)),
                                       texCoord_0:
                                         json
                                         |> optional(
                                              field("TEXCOORD_0", int),
                                            ),
                                       texCoord_1:
                                         json
                                         |> optional(
                                              field("TEXCOORD_1", int),
                                            ),
                                     }
                                   ),
                              indices:
                                json |> optional(field("indices", int)),
                              material:
                                json |> optional(field("material", int)),
                            }
                          ),
                        ),
                 }
               ),
             ),
        materials:
          json
          |> field(
               "materials",
               array(json =>
                 {
                   pbrMetallicRoughness:
                     json
                     |> optional(
                          field("pbrMetallicRoughness", json =>
                            {
                              baseColorFactor:
                                json
                                |> optional(
                                     field("baseColorFactor", array(float)),
                                   ),
                              baseColorTexture:
                                json
                                |> optional(
                                     field("baseColorTexture", json =>
                                       {
                                         index: json |> field("index", int),
                                         texCoord:
                                           json
                                           |> optional(
                                                field("texCoord", int),
                                              ),
                                       }
                                     ),
                                   ),
                              metallicFactor:
                                json
                                |> optional(field("metallicFactor", float)),
                              roughnessFactor:
                                json
                                |> optional(field("roughnessFactor", float)),
                              metallicRoughnessTexture:
                                json
                                |> optional(
                                     field("metallicRoughnessTexture", json =>
                                       {
                                         index: json |> field("index", int),
                                         texCoord:
                                           json
                                           |> optional(
                                                field("texCoord", int),
                                              ),
                                       }
                                     ),
                                   ),
                            }
                          ),
                        ),
                 }
               ),
             ),
      }
    )
  );
let _getArrayBuffer = (binBuffer, bufferView, {bufferViews}: GLTFType.gltf) => {
  let {byteOffset, byteLength}: GLTFType.bufferView =
    Array.unsafe_get(bufferViews, bufferView);

  let offset =
    switch (byteOffset) {
    | None => 0
    | Some(byteOffset) => byteOffset
    };

  binBuffer
  |> Js.Typed_array.ArrayBuffer.slice(
       ~start=offset,
       ~end_=offset + byteLength,
     );
};

let convertToUriImages =
    (({images}: GLTFType.gltf) as gltf)
    : array(WDType.uriImage) =>
  switch (images) {
  | None => [||]
  | Some(images) =>
    images
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. arr, {uri}: GLTFType.image) =>
           switch (uri) {
           | None => arr
           | Some(uri) =>
             arr |> ArrayService.push({uriBase64: uri}: WDType.uriImage)
           },
         [||],
       )
  };

let _getMimeType = mimeType =>
  switch (mimeType) {
  | "image/png" => WDType.PNG
  | "image/jpeg" => WDType.JPEG
  | _ => WDType.UNKNOWN
  };

/**
 * Uint16BE.
 */
let _u16 = [%raw
  (buf, o) => {|

      return buf[o] << 8 | buf[o + 1];
    |}
];

let _getJpgSize = [%raw
  (buf, len) => {|

    /**
     * Start of frame markers.
     */

    var sof = {
      0xc0: true,
      0xc1: true,
      0xc2: true,
      0xc3: true,
      0xc5: true,
      0xc6: true,
      0xc7: true,
      0xc9: true,
      0xca: true,
      0xcb: true,
      0xcd: true,
      0xce: true,
      0xcf: true
    };



    var o = 0;

    // magick
    var jpeg = 0xff == buf[0] && 0xd8 == buf[1];

    if (!jpeg) {
      throw new Error("should be jpeg");
    };

    o += 2;

    while (o < len) {
      // find next marker
      while (0xff != buf[o]) o++;

      // skip marker
      while (0xff == buf[o]) o++;

      // non-SOF jump to the next marker
      if (!sof[buf[o]]) {
        o += _u16(buf, ++o);
        continue;
      }

      var w = _u16(buf, o + 6);
      var h = _u16(buf, o + 4);

      return [w, h];
    }

    throw new Error("error");
    |}
];

let convertToUint8ArrayImages =
    (binBuffer, ({images}: GLTFType.gltf) as gltf)
    : array(WDType.uint8ArrayImage) =>
  switch (images) {
  | None => [||]
  | Some(images) =>
    images
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. arr, {bufferView, mimeType}: GLTFType.image) => {
           let mimeType = _getMimeType(mimeType |> OptionService.unsafeGet);
           let arrayBuffer =
             _getArrayBuffer(
               binBuffer,
               bufferView |> OptionService.unsafeGet,
               gltf,
             );
           let dataView = DataViewCommon.create(arrayBuffer);

           let (width, height) =
             /* TODO test */
             switch (mimeType) {
             | WDType.PNG =>
               let (width, _) = DataViewCommon.getInt32_1(. 16, dataView);
               let (height, _) = DataViewCommon.getInt32_1(. 20, dataView);

               (width, height);
             | WDType.JPEG =>
               _getJpgSize(
                 arrayBuffer,
                 arrayBuffer |> Js.Typed_array.ArrayBuffer.byteLength,
               )
             | _ =>
               WonderLog.Log.fatal(
                 WonderLog.Log.buildFatalMessage(
                   ~title="convertToUint8ArrayImages",
                   ~description={j|can't get width/height of unknown type|j},
                   ~reason="",
                   ~solution={j||j},
                   ~params={j||j},
                 ),
               )
             };

           arr
           |> ArrayService.push(
                {
                  uint8Array:
                    Js.Typed_array.Uint8Array.fromBuffer(arrayBuffer),
                  mimeType,
                  width,
                  height,
                }: WDType.uint8ArrayImage,
              );
         },
         [||],
       )
  };
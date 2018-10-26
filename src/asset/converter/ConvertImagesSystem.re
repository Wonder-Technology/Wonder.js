/* let _getArrayBuffer = (binBuffer, bufferView, {bufferViews}: GLTFType.gltf) => {
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

   /**
    * Uint16BE.
    */
   let _u16 = [%raw
     (buf, o) => {|

         return buf[o] << 8 | buf[o + 1];
       |}
   ];

   let _getJpgSize = [%raw
     buf => {|
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


         return [2048, 2048];

       var len = buf.length;

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

   let convertToBlobImages =
       (binBuffer, ({images}: GLTFType.gltf) as gltf)
       : array(WDType.blobImage) =>
     switch (images) {
     | None => [||]
     | Some(images) =>
       images
       |> WonderCommonlib.ArrayService.reduceOneParam(
            (. arr, {bufferView}: GLTFType.image) => {
              let arrayBuffer =
                _getArrayBuffer(
                  binBuffer,
                  bufferView |> OptionService.unsafeGet,
                  gltf,
                );

              arr
              |> ArrayService.push(
                   {
                     objectUrl:
                       Blob.newBlobFromArrayBuffer([|arrayBuffer|])
                       |> Blob.createObjectURL,
                   }: WDType.blobImage,
                 );
            },
            [||],
          )
     }; */

let _buildDefaultName = imageIndex =>
  ConvertCommon.buildDefaultName("image", imageIndex);

let convertToImages = (({images}: GLTFType.gltf) as gltf) =>
  switch (images) {
  | None => None
  | Some(images) =>
    images
    |> ArrayService.reduceOneParamValidi(
         (. arr, {bufferView, mimeType, name}: GLTFType.image, index) => {
           Array.unsafe_set(
             arr,
             index,
             {
               name:
                 switch (name) {
                 | Some(name) => name
                 | None => _buildDefaultName(index)
                 },
               bufferView: bufferView |> OptionService.unsafeGet,
               mimeType: mimeType |> OptionService.unsafeGet,
             }: WDType.image,
           );

           arr;
         },
         [||],
       )
    |. Some
  };
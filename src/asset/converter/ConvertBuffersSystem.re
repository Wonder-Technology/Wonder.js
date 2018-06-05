let _decodeArrayBuffer = (base64Str: string) => {
  open Js.Typed_array;
  let arr = base64Str |> Js.String.split(",");
  let base64 = arr |> Js.Array.length > 1 ? arr[1] : arr[0];
  let decodedString = File.atob(base64);
  let bufferLength = decodedString |> Js.String.length;
  let arrayBuffer = ArrayBuffer.make(bufferLength);
  let typeArr = Uint8Array.fromBuffer(arrayBuffer);
  let typeArr =
    ArrayService.range(0, bufferLength - 1)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. typeArr, i) => {
           Uint8Array.unsafe_set(
             typeArr,
             i,
             decodedString |> Js.String.charCodeAt(i) |> Obj.magic,
           );
           typeArr;
         },
         typeArr,
       );
  typeArr |> Uint8Array.buffer;
};

let buildBufferArray = ({buffers}: GLTFType.gltf) =>
  GLTFType.(
    buffers
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. arrayBufferArr, {uri}: buffer) =>
           switch (uri) {
           | None =>
             WonderLog.Log.fatal(
               WonderLog.Log.buildFatalMessage(
                 ~title="_loadBuffers",
                 ~description={j|buffer->uri should exist|j},
                 ~reason="",
                 ~solution={j||j},
                 ~params={j||j},
               ),
             )
           | Some(uri) =>
             switch (ConvertCommon.isBase64(uri)) {
             | false =>
               WonderLog.Log.fatal(
                 WonderLog.Log.buildFatalMessage(
                   ~title="_loadBuffers",
                   ~description={j|only support base64 uri|j},
                   ~reason="",
                   ~solution={j||j},
                   ~params={j||j},
                 ),
               )
             | true =>
               arrayBufferArr |> ArrayService.push(_decodeArrayBuffer(uri))
             }
           },
         [||],
       )
  );

let convertToBuffers = ({buffers}: GLTFType.gltf) : array(WDType.buffer) =>
  buffers
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. arr, {uri, byteLength}: GLTFType.buffer) =>
         switch (uri) {
         | None =>
           WonderLog.Log.fatal(
             WonderLog.Log.buildFatalMessage(
               ~title="_convertToBuffers",
               ~description={j|uri should exist|j},
               ~reason="",
               ~solution={j||j},
               ~params={j||j},
             ),
           )
         | Some(uri) =>
           arr |> ArrayService.push({uri, byteLength}: WDType.buffer)
         },
       [||],
     );

let convertToAccessors =
    ({accessors}: GLTFType.gltf)
    : array(WDType.accessor) =>
  accessors
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         arr,
         {bufferView, byteOffset, count, componentType, type_}: GLTFType.accessor,
       ) =>
         arr
         |> ArrayService.push(
              {
                bufferView:
                  switch (bufferView) {
                  | None =>
                    WonderLog.Log.fatal(
                      WonderLog.Log.buildFatalMessage(
                        ~title="_convertToAccessors",
                        ~description={j|bufferView should exist|j},
                        ~reason="",
                        ~solution={j||j},
                        ~params={j||j},
                      ),
                    )
                  | Some(bufferView) => bufferView
                  },
                byteOffset:
                  switch (byteOffset) {
                  | None => 0
                  | Some(byteOffset) => byteOffset
                  },
                count,
                componentType:
                  switch (componentType) {
                  | 5120 => WDType.BYTE
                  | 5121 => WDType.UNSIGNED_BYTE
                  | 5122 => WDType.SHORT
                  | 5123 => WDType.UNSIGNED_SHORT
                  | 5125 => WDType.UNSIGNED_INT
                  | 5126 => WDType.FLOAT
                  | componentType =>
                    WonderLog.Log.fatal(
                      WonderLog.Log.buildFatalMessage(
                        ~title="_convertToAccessors",
                        ~description=
                          {j|unknown componentType: $componentType|j},
                        ~reason="",
                        ~solution={j||j},
                        ~params={j||j},
                      ),
                    )
                  },
                type_:
                  switch (type_) {
                  | "SCALAR" => WDType.SCALAR
                  | "VEC2" => WDType.VEC2
                  | "VEC3" => WDType.VEC3
                  | "VEC4" => WDType.VEC4
                  | "MAT2" => WDType.MAT2
                  | "MAT3" => WDType.MAT3
                  | "MAT4" => WDType.MAT4
                  | type_ =>
                    WonderLog.Log.fatal(
                      WonderLog.Log.buildFatalMessage(
                        ~title="_convertToAccessors",
                        ~description={j|unknown type_:$type_|j},
                        ~reason="",
                        ~solution={j||j},
                        ~params={j||j},
                      ),
                    )
                  },
              }: WDType.accessor,
            ),
       [||],
     );

let convertToBufferViews =
    ({bufferViews}: GLTFType.gltf)
    : array(WDType.bufferView) =>
  bufferViews
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         arr,
         {buffer, byteOffset, byteLength, byteStride}: GLTFType.bufferView,
       ) =>
         arr
         |> ArrayService.push(
              {
                buffer,
                byteOffset:
                  switch (byteOffset) {
                  | None => 0
                  | Some(byteOffset) => byteOffset
                  },
                byteLength,
                byteStride,
                /* target:
                   switch (target |> OptionService.unsafeGet) {
                   | 34962 => WDType.ARRAY_BUFFER
                   | 34963 => WDType.ELEMENT_ARRAY_BUFFER
                   | target =>
                     WonderLog.Log.fatal(
                       WonderLog.Log.buildFatalMessage(
                         ~title="_convertToBufferViews",
                         ~description={j|unknown target: $target|j},
                         ~reason="",
                         ~solution={j||j},
                         ~params={j||j}
                       )
                     )
                   } */
              }: WDType.bufferView,
            ),
       [||],
     );
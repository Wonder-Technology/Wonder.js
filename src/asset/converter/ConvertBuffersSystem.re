let convertToBuffers = ({buffers}: GLTFType.gltf) : array(int) =>
  buffers
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. arr, {byteLength}: GLTFType.buffer) =>
         /* let buffer = byteLength; */
         arr |> ArrayService.push(byteLength),
       [||],
     );

let convertToAccessors =
    ({accessors}: GLTFType.gltf)
    : array(WDType.accessor) =>
  accessors
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         arr,
         (
           {bufferView, byteOffset, count, componentType, type_}: GLTFType.accessor
         ) as accessor,
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
                byteOffset: BufferUtils.unsafeGetAccessorByteOffset(accessor),
                count,
                componentType:
                  ConvertUtils.convertComponentType(componentType),
                type_: BufferUtils.convertType(type_),
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
         ({buffer, byteLength, byteStride}: GLTFType.bufferView) as bufferView,
       ) =>
         arr
         |> ArrayService.push(
              {
                buffer,
                byteOffset:
                  BufferUtils.unsafeGetBufferViewByteOffset(bufferView),
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
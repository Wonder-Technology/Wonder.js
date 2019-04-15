let checkShouldHasNoSlot = map =>
  WonderLog.(
    Contract.(
      Operators.(
        test(
          Log.buildAssertMessage(
            ~expect={j|map has no slot|j},
            ~actual={j|not|j},
          ),
          () =>
          map
          |> WonderCommonlib.MutableSparseMapService.getValidValues
          |> WonderCommonlib.MutableSparseMapService.length
          == (map |> WonderCommonlib.MutableSparseMapService.length)
        )
      )
    )
  );

let buildBufferViewData = (byteOffset, byteLength) => (
  0,
  byteOffset,
  byteLength,
  None,
);

let buildAccessorByteOffset = () => 0;
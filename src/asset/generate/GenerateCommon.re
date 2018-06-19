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
          |> SparseMapService.getValidValues
          |> SparseMapService.length == (map |> SparseMapService.length)
        )
      )
    )
  );
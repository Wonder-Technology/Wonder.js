let checkNotExceedMaxCountByIndex = (isDebug, index, maxCount) =>
  index->Contract.ensureCheck(index => {
    open Contract
    open Operators

    let maxIndex = maxCount - 1

    test(
      Log.buildAssertMessage(~expect=j`index: $index <= maxIndex: $maxIndex`, ~actual=j`not`),
      () => index <= maxIndex,
    )
  }, isDebug)

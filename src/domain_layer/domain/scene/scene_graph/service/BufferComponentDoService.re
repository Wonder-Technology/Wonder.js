let checkNotExceedMaxCountByIndex = (maxCount, index) =>
  SettingRepo.getIsDebug()
  ->Result.bind(isDebug => {
      index->Contract.ensureCheck(
        index => {
          open Contract;
          open Operators;

          let maxIndex = maxCount - 1;

          test(
            Log.buildAssertMessage(
              ~expect={j|index: $index <= maxIndex: $maxIndex|j},
              ~actual={j|not|j},
            ),
            () =>
            index <= maxIndex
          );
        },
        isDebug,
      )
    });

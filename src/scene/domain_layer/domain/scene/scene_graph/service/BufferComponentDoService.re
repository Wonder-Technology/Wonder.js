let checkNotExceedMaxCountByIndex = (index, maxCount) =>
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
    DpContainer.unsafeGetSettingConfigDp().getIsDebug(),
  );

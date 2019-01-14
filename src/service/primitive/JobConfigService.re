let unsafeFindFirst = ArrayService.unsafeFindFirst;

let findFirst = ArrayService.findFirst;

let filterTargetName = (name, targetName) => name == targetName;

let _throwJobFlagsShouldBeDefined = () =>
  WonderLog.Log.fatal(
    WonderLog.Log.buildFatalMessage(
      ~title="throwJobFlagsShouldBeDefined",
      ~description={j|jobFlags should be defined|j},
      ~reason="",
      ~solution={j||j},
      ~params={j||j},
    ),
  );

let unsafeGetFlags = flags =>
  switch (flags) {
  | None => _throwJobFlagsShouldBeDefined()
  | Some(flags) => flags
  };
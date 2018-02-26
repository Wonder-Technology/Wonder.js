open GameObjectType;

let unsafeFindFirst = JobConfigUtils.unsafeFindFirst;

let findFirst = JobConfigUtils.findFirst;

let filterTargetName = JobConfigUtils.filterTargetName;

let _throwJobFlagsShouldBeDefined = () =>
  WonderLog.Log.fatal(
    WonderLog.Log.buildFatalMessage(
      ~title="throwJobFlagsShouldBeDefined",
      ~description={j|jobFlags should be defined|j},
      ~reason="",
      ~solution={j||j},
      ~params={j||j}
    )
  );

/* TODO refactor: move out? */
let unsafeGetFlags = (flags) =>
  switch flags {
  | None => _throwJobFlagsShouldBeDefined()
  | Some(flags) => flags
  };
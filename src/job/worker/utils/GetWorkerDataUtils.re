let _createGetWorkerDataStream = (flags, target) =>
  MostUtils.fromWorkerEvent("message", target)
  |> Most.filter(
       (e) =>
         e##data##operateType === JobConfigUtils.getOperateType(flags) |> Js.Boolean.to_js_boolean
     );

let createGetMainWorkerDataStream = (flags, target) =>
  _createGetWorkerDataStream(flags, target)
  |> Most.map((e) => Some(e));
  /* |> Most.tap(
       (e) => WonderLog.Log.log({j|--in other worker-- get message from main worker: $flags|j})
     ); */

let createGetOtherWorkerDataStream = (flags, target) =>
  _createGetWorkerDataStream(flags, target)
  |> Most.take(1)
  |> Most.map((e) => None);
  /* |> Most.tap(
       (e) => WonderLog.Log.log({j|**in main worker** get message from other worker: $flags|j})
     ); */
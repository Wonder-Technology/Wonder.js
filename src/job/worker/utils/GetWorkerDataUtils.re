let _createGetWorkerDataStream = (flags, target) =>
  MostUtils.fromWorkerEvent("message", target)
  |> WonderBsMost.Most.filter(e =>
       e##data##operateType === JobConfigUtils.getOperateType(flags)
     );

let createGetMainWorkerDataStream = (flags, target) =>
  _createGetWorkerDataStream(flags, target) |> WonderBsMost.Most.map(e => Some(e));
/* |> WonderBsMost.Most.tap(
     (e) => WonderLog.Log.log({j|--in other worker-- get message from main worker: $flags|j})
   ); */

let createGetOtherWorkerDataStream = (flags, target) =>
  _createGetWorkerDataStream(flags, target)
  |> WonderBsMost.Most.take(1)
  |> WonderBsMost.Most.map(e => None);
/* |> WonderBsMost.Most.tap(
     (e) => WonderLog.Log.log({j|**in main worker** get message from other worker: $flags|j})
   ); */
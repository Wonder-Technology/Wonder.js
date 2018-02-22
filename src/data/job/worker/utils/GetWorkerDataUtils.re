let _createGetWorkerDataStream = (flags, target) =>
  MostUtils.fromWorkerEvent("message", target)
  |> Most.filter(
       (e) =>
         e##data##operateType === WorkerJobConfigSystem.unsafeGetFlags(flags)[0]
         |> Js.Boolean.to_js_boolean
     );

let createGetMainWorkerDataStream = (flags, target) => _createGetWorkerDataStream(flags, target) |> Most.map((e) => Some(e));

let createGetOtherWorkerDataStream = (flags, target) =>
  _createGetWorkerDataStream(flags, target) |> Most.map((e) => ());
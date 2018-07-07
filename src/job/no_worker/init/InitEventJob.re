open StateDataMainType;

open EventType;

/* TODO change job to stream job? */
let execJob = (_, state) => {
  let domEventStreamSubscription =
    InitEventJobUtils.fromDomEvent()
    |> Most.subscribe({
         "next": _ => (),
         "error": e => WonderLog.Log.log(e),
         "complete": () => (),
       });

  state
  |> ManageEventMainService.setDomEventStreamSubscription(
       domEventStreamSubscription,
     )
  |> InitEventJobUtils.bindDomEventToTriggerPointEvent;
};
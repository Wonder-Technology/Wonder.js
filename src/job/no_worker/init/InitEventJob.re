open StateDataMainType;

open EventType;

/* TODO change job to stream job? */
let execJob = (_, state) => {
  InitEventJobUtils.fromDomEvent() |> Most.drain |> ignore;

  InitEventJobUtils.bindDomEventToTriggerPointEvent(state);
};
open StateDataMainType;

open EventType;

/* TODO change job to stream job? */
let execJob = (_, state) => {
  let domEventStreamSubscription =
    InitEventJobUtils.fromDomEvent()
    |> Most.subscribe({
         "next": _ => (),
         "error": e => {
           let message = Obj.magic(e)##message;
           let stack = Obj.magic(e)##stack;

           WonderLog.Log.fatal(
             WonderLog.Log.buildFatalMessage(
               ~title="InitEventJob",
               ~description={j|from dom event stream error|j},
               ~reason="",
               ~solution={j||j},
               ~params={j|message:$message\nstack:$stack|j},
             ),
           );
         },
         "complete": () => (),
       });

  state
  |> ManageEventMainService.setDomEventStreamSubscription(
       domEventStreamSubscription,
     )
  |> InitEventJobUtils.bindDomEventToTriggerPointEvent;
};
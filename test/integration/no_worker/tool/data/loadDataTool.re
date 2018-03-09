open Js.Promise;

let load =
    (
      ~jsonPathArr,
      ~fetchFunc,
      /* ~nextFunc=(data) => () |> resolve,
         ~errorFunc=(e) => () |> resolve,
         ~completeFunc=() => () |> Obj.magic |> resolve, */
      /* dataDir: string,
         fetchFunc, */
      ~nextFunc=(data) => (),
      ()
    ) =>
  StateTool.getStateData()
  |> LoaderManagerSystem.load(jsonPathArr, fetchFunc)
  /* |> Most.subscribe({"next": (data) => {}, "error": (e) => {}, "complete": () => { */
  /* |> Most.subscribe({"next": nextFunc, "error": errorFunc, "complete": completeFunc}); */
  /* |> Most.forEach(nextFunc |> Obj.magic)
     |> then_(completeFunc |> Obj.magic)
     |> catch(errorFunc) */
  |> Most.forEach(nextFunc);
/* |> Most.forEach((data) => {

                     WonderLog.Log.error(WonderLog.Log.buildErrorMessage(~title="ccc", ~description={j||j}, ~reason="", ~solution={j||j}, ~params={j||j})) |> ignore;
                     resolve() |> Obj.magic
   }) */
/* |> Obj.magic; */
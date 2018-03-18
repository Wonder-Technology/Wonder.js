open Js.Promise;

let load =
    (
      ~jsonPathArr,
      ~fetchFunc,
      /* ~nextFunc=(record) => () |> resolve,
         ~errorFunc=(e) => () |> resolve,
         ~completeFunc=() => () |> Obj.magic |> resolve, */
      /* dataDir: string,
         fetchFunc, */
      ~nextFunc=(record) => (),
      ()
    ) =>
  MainStateTool.getStateData()
  |> LoaderManagerSystem.load(jsonPathArr, fetchFunc)
  /* |> Most.subscribe({"next": (record) => {}, "error": (e) => {}, "complete": () => { */
  /* |> Most.subscribe({"next": nextFunc, "error": errorFunc, "complete": completeFunc}); */
  /* |> Most.forEach(nextFunc |> Obj.magic)
     |> then_(completeFunc |> Obj.magic)
     |> catch(errorFunc) */
  |> Most.forEach(nextFunc);
/* |> Most.forEach((record) => {

                     WonderLog.Log.error(WonderLog.Log.buildErrorMessage(~title="ccc", ~description={j||j}, ~reason="", ~solution={j||j}, ~params={j||j})) |> ignore;
                     resolve() |> Obj.magic
   }) */
/* |> Obj.magic; */
open Js.Promise;

open WonderBsMost;

/* module WAB = {
   let load = (wabPath) => {

   };

   }; */

let load = abPath =>
  Fetch.fetch(abPath)
  |> then_(response =>
       !Fetch.Response.ok(response) ?
         {
           let status = Fetch.Response.status(response);
           let statusText = Fetch.Response.statusText(response);

           WonderLog.Log.fatal(
             WonderLog.Log.buildFatalMessage(
               ~title="LoadABSystem->load",
               ~description={j|$status $statusText|j},
               ~reason="",
               ~solution={j||j},
               ~params={j||j},
             ),
           );
         } :
         response |> Fetch.Response.arrayBuffer
     )
  |> then_(ab => ab |> LoadType.fetchArrayBufferToArrayBuffer |> resolve)
  |> Most.fromPromise;

let isAssetBundleArrayBufferCached = () => {};

let getAssetBundleArrayBufferCache = () => {};

let cacheAssetBundleArrayBuffer = () => {};
/* let cache = () => {};

   let getAllDependencies = () => {}; */

/* let loadAllDependencies = (abPath, wholeManifest) => {}; */

/* let loadFromCacheAndDownload = (abPath) => {

   }; */

/* usage:

    load(
   getAssetBundlePath() + "whole.wab"
    )
    |> Most.flatMap((wab) => {
   let manifest =  WAB.parseManifest(wab);

   let wholeDependencyRelationMap = getWholeDependencyRelationMap(manifest);

   findAllDependencyAbRelativePath(
   "sab/a.sab",
   wholeDependencyRelationMap
   )
   /* |> WonderCommonlib.ArrayService.reduceOneParam */
   |> Js.Array.map((abRelativePath) => {
   load(
   getAssetBundlePath() + abRelativePath
    )
    |> Most.map((ab) => {
   assemble(
     abRelativePath, ab
   )
    })

   })
   |> Most.mergeArray



    })
      */
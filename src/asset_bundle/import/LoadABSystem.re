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

/* TODO need rewrite by editor */
let isAssetBundleArrayBufferCached = (abRelativePath, hashId) => false;

let getAssetBundleArrayBufferCache = abRelativePath =>
  WonderLog.Log.fatal(
    WonderLog.Log.buildFatalMessage(
      ~title="getAssetBundleArrayBufferCache",
      ~description={j|need rewrite|j},
      ~reason="",
      ~solution={j||j},
      ~params={j||j},
    ),
  );

let cacheAssetBundleArrayBuffer = (abRelativePath, ab, hashId) => ab;
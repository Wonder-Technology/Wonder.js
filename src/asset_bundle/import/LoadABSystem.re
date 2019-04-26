open Js.Promise;

open WonderBsMost;

open Js.Typed_array;

let load = (abPath: string, fetchFunc) =>
  fetchFunc(. abPath)
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
let getAssetBundlePath = (.) => "";

let initAssetBundleArrayBufferCache = (.) => Most.empty();

let isAssetBundleArrayBufferCached =
  (. abRelativePath: string, hashId: string) => Most.just(false);

let getAssetBundleArrayBufferCache =
  (. abRelativePath: string) =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getAssetBundleArrayBufferCache",
        ~description={j|need rewrite|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    );

let cacheAssetBundleArrayBuffer =
  (. abRelativePath: string, ab: ArrayBuffer.t, hashId: string) =>
    Most.empty();
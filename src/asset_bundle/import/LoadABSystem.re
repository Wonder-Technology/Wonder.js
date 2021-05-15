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
  |> then_(ab => ab |> LoadExternalType.fetchArrayBufferToArrayBuffer |> resolve)
  |> Most.fromPromise;

let getAssetBundlePath = (.) => "";

let initAssetBundleArrayBufferCache =
  (.) =>
    Js.Promise.make((~resolve, ~reject) =>
      (PromiseType.convertResolveToUnit(resolve))(.)
    );

let isAssetBundleArrayBufferCached =
  (. abRelativePath: string, hashId: string) =>
    Js.Promise.make((~resolve, ~reject) => resolve(. false));

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
    Js.Promise.make((~resolve, ~reject) =>
      (PromiseType.convertResolveToUnit(resolve))(.)
    );
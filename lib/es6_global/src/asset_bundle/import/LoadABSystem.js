

import * as Most from "most";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";

function load(abPath, fetchFunc) {
  return Most.fromPromise(fetchFunc(abPath).then((function (response) {
                      var match = !response.ok;
                      if (match) {
                        var status = response.status;
                        var statusText = response.statusText;
                        return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("LoadABSystem->load", "" + (String(status) + (" " + (String(statusText) + ""))), "", "", ""));
                      } else {
                        return response.arrayBuffer();
                      }
                    })).then((function (ab) {
                    return Promise.resolve(ab);
                  })));
}

function getAssetBundlePath() {
  return "";
}

function initAssetBundleArrayBufferCache() {
  return new Promise((function (resolve, reject) {
                return resolve();
              }));
}

function isAssetBundleArrayBufferCached(abRelativePath, hashId) {
  return new Promise((function (resolve, reject) {
                return resolve(false);
              }));
}

function getAssetBundleArrayBufferCache(abRelativePath) {
  return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getAssetBundleArrayBufferCache", "need rewrite", "", "", ""));
}

function cacheAssetBundleArrayBuffer(abRelativePath, ab, hashId) {
  return new Promise((function (resolve, reject) {
                return resolve();
              }));
}

export {
  load ,
  getAssetBundlePath ,
  initAssetBundleArrayBufferCache ,
  isAssetBundleArrayBufferCached ,
  getAssetBundleArrayBufferCache ,
  cacheAssetBundleArrayBuffer ,
  
}
/* most Not a pure module */

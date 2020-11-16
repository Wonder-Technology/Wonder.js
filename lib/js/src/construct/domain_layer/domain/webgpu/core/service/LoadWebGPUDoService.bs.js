'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var DpContainer$Wonderjs = require("../../../../dependency/container/DpContainer.bs.js");

function load($$window) {
  var __x = Most.fromPromise(Curry._1(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).gpu.requestAdapter, {
            window: $$window,
            preferredBackend: "Vulkan"
          }));
  return Most.flatMap((function (adapter) {
                var __x = Most.fromPromise(Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).adapter.requestDevice, {
                          extensions: ["ray_tracing"]
                        }, adapter));
                return Most.flatMap((function (device) {
                              var context = Curry._1(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).window.getContext, $$window);
                              var queue = Curry._1(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).device.getQueue, device);
                              var __x = Most.fromPromise(Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).context.getSwapChainPreferredFormat, device, context));
                              return Most.map((function (swapChainFormat) {
                                            return [
                                                    $$window,
                                                    adapter,
                                                    device,
                                                    context,
                                                    queue,
                                                    swapChainFormat
                                                  ];
                                          }), __x);
                            }), __x);
              }), __x);
}

exports.load = load;
/* most Not a pure module */

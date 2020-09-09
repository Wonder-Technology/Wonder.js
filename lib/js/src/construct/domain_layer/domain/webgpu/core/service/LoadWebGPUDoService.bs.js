'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var DpContainer$Wonderjs = require("../../../../dependency/container/DpContainer.bs.js");

function load($$window) {
  return Most.flatMap((function (adapter) {
                return Most.flatMap((function (device) {
                              var context = Curry._1(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).window.getContext, $$window);
                              var queue = Curry._1(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).device.getQueue, device);
                              var __x = Most.fromPromise(Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).context.getSwapChainPreferredFormat, device, context));
                              return Most.map((function (swapChainFormat) {
                                            return [
                                                    adapter,
                                                    device,
                                                    context,
                                                    queue,
                                                    swapChainFormat
                                                  ];
                                          }), __x);
                            }), Most.fromPromise(Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).adapter.requestDevice, {
                                    extensions: ["ray_tracing"]
                                  }, adapter)));
              }), Most.fromPromise(Curry._1(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).gpu.requestAdapter, {
                      window: $$window,
                      preferredBackend: "Vulkan"
                    })));
}

exports.load = load;
/* most Not a pure module */

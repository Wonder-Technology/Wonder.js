'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");
var CPRepo$Wonderjs = require("./CPRepo.bs.js");

function getDevice(param) {
  return CPRepo$Wonderjs.getWebGPU(undefined).device;
}

function setDevice(device) {
  var init = CPRepo$Wonderjs.getWebGPU(undefined);
  return CPRepo$Wonderjs.setWebGPU({
              device: Caml_option.some(device),
              window: init.window,
              adapter: init.adapter,
              context: init.context,
              queue: init.queue,
              swapChainFormat: init.swapChainFormat,
              swapChain: init.swapChain
            });
}

function getWindow(param) {
  return CPRepo$Wonderjs.getWebGPU(undefined).window;
}

function setWindow($$window) {
  var init = CPRepo$Wonderjs.getWebGPU(undefined);
  return CPRepo$Wonderjs.setWebGPU({
              device: init.device,
              window: Caml_option.some($$window),
              adapter: init.adapter,
              context: init.context,
              queue: init.queue,
              swapChainFormat: init.swapChainFormat,
              swapChain: init.swapChain
            });
}

function getAdapter(param) {
  return CPRepo$Wonderjs.getWebGPU(undefined).adapter;
}

function setAdapter(adapter) {
  var init = CPRepo$Wonderjs.getWebGPU(undefined);
  return CPRepo$Wonderjs.setWebGPU({
              device: init.device,
              window: init.window,
              adapter: Caml_option.some(adapter),
              context: init.context,
              queue: init.queue,
              swapChainFormat: init.swapChainFormat,
              swapChain: init.swapChain
            });
}

function getContext(param) {
  return CPRepo$Wonderjs.getWebGPU(undefined).context;
}

function setContext(context) {
  var init = CPRepo$Wonderjs.getWebGPU(undefined);
  return CPRepo$Wonderjs.setWebGPU({
              device: init.device,
              window: init.window,
              adapter: init.adapter,
              context: Caml_option.some(context),
              queue: init.queue,
              swapChainFormat: init.swapChainFormat,
              swapChain: init.swapChain
            });
}

function getQueue(param) {
  return CPRepo$Wonderjs.getWebGPU(undefined).queue;
}

function setQueue(queue) {
  var init = CPRepo$Wonderjs.getWebGPU(undefined);
  return CPRepo$Wonderjs.setWebGPU({
              device: init.device,
              window: init.window,
              adapter: init.adapter,
              context: init.context,
              queue: Caml_option.some(queue),
              swapChainFormat: init.swapChainFormat,
              swapChain: init.swapChain
            });
}

function getSwapChainFormat(param) {
  return CPRepo$Wonderjs.getWebGPU(undefined).swapChainFormat;
}

function setSwapChainFormat(swapChainFormat) {
  var init = CPRepo$Wonderjs.getWebGPU(undefined);
  return CPRepo$Wonderjs.setWebGPU({
              device: init.device,
              window: init.window,
              adapter: init.adapter,
              context: init.context,
              queue: init.queue,
              swapChainFormat: swapChainFormat,
              swapChain: init.swapChain
            });
}

function getSwapChain(param) {
  return CPRepo$Wonderjs.getWebGPU(undefined).swapChain;
}

function setSwapChain(swapChain) {
  var init = CPRepo$Wonderjs.getWebGPU(undefined);
  return CPRepo$Wonderjs.setWebGPU({
              device: init.device,
              window: init.window,
              adapter: init.adapter,
              context: init.context,
              queue: init.queue,
              swapChainFormat: init.swapChainFormat,
              swapChain: Caml_option.some(swapChain)
            });
}

exports.getDevice = getDevice;
exports.setDevice = setDevice;
exports.getWindow = getWindow;
exports.setWindow = setWindow;
exports.getAdapter = getAdapter;
exports.setAdapter = setAdapter;
exports.getContext = getContext;
exports.setContext = setContext;
exports.getQueue = getQueue;
exports.setQueue = setQueue;
exports.getSwapChainFormat = getSwapChainFormat;
exports.setSwapChainFormat = setSwapChainFormat;
exports.getSwapChain = getSwapChain;
exports.setSwapChain = setSwapChain;
/* CPRepo-Wonderjs Not a pure module */

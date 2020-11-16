'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var DpContainer$Wonderjs = require("../../../../dependency/container/DpContainer.bs.js");

function create(value) {
  return /* StorageBuffer */{
          _0: value
        };
}

function value(buffer) {
  return buffer._0;
}

function createFromDevice(device, bufferSize, usageOpt, param) {
  var usage = usageOpt !== undefined ? usageOpt : DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).bufferUsage.storage;
  return /* StorageBuffer */{
          _0: Curry._2(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).device.createBuffer, {
                size: bufferSize,
                usage: usage
              }, device)
        };
}

exports.create = create;
exports.value = value;
exports.createFromDevice = createFromDevice;
/* No side effect */

'use strict';

var Fs = require("fs");
var Path = require("path");
var Curry = require("bs-platform/lib/js/curry.js");
var Process = require("process");
var BufferUtils$Wonderjs = require("../../../../../src/asset/utils/BufferUtils.js");
var ConvertTool$Wonderjs = require("./ConvertTool.js");
var ConvertGLBSystem$Wonderjs = require("../../../../../src/asset/converter/ConvertGLBSystem.js");

var convertUint8ArrayToBuffer = function (uint8Array){
      {
           var buf = new Buffer(uint8Array.byteLength);

           for (var i = 0; i < buf.length; ++i) {
               buf[i] = uint8Array[i];
           }

           return buf;
       }
      };

var buildFakeTextDecoder = function (convertUint8ArrayToBufferFunc){
        var TextDecoder = function(utfLabel){
        };

        TextDecoder.prototype.decode = (uint8Array) => {
          var buffer = convertUint8ArrayToBufferFunc(uint8Array);

          return buffer.toString("utf8");
        };

        window.TextDecoder = TextDecoder;
    };

var buildFakeTextEncoder = function (){
        var TextEncoder = function(){
        };

        TextEncoder.prototype.encode = (str) => {
          var buffer = Buffer.from(str, "utf8");

          return buffer;
        };

        window.TextEncoder = TextEncoder;
    };

function _createFakeImage(src) {
  return {
          src: src,
          name: ""
        };
}

var buildFakeURL = function (sandbox){
        var URL = {
          createObjectURL: sandbox.stub(),
          revokeObjectURL: sandbox.stub()
        };

        URL.createObjectURL.onCall(0).returns(_createFakeImage("object_url0"));
        URL.createObjectURL.onCall(1).returns(_createFakeImage("object_url1"));
        URL.createObjectURL.onCall(2).returns(_createFakeImage("object_url2"));
        URL.createObjectURL.onCall(3).returns(_createFakeImage("object_url3"));
        URL.createObjectURL.onCall(4).returns(_createFakeImage("object_url4"));
        URL.createObjectURL.onCall(5).returns(_createFakeImage("object_url5"));

        window.URL = URL;
    };

var getURL = function (){
  return window.URL;
  };

function prepare(sandbox) {
  Curry._1(ConvertTool$Wonderjs.buildFakeLoadImage, /* () */0);
  buildFakeTextDecoder(convertUint8ArrayToBuffer);
  buildFakeTextEncoder();
  return buildFakeURL(sandbox);
}

function buildGLBFilePath(glbFileName) {
  return Path.join(Process.cwd(), "./test/res/", glbFileName);
}

function buildBinBuffer() {
  buildFakeTextDecoder(convertUint8ArrayToBuffer);
  var buffer = Fs.readFileSync(buildGLBFilePath("BoxTextured.glb"));
  return BufferUtils$Wonderjs.decodeGLB(buffer.buffer, ConvertGLBSystem$Wonderjs._checkGLB)[1];
}

exports.convertUint8ArrayToBuffer = convertUint8ArrayToBuffer;
exports.buildFakeTextDecoder = buildFakeTextDecoder;
exports.buildFakeTextEncoder = buildFakeTextEncoder;
exports._createFakeImage = _createFakeImage;
exports.buildFakeURL = buildFakeURL;
exports.getURL = getURL;
exports.prepare = prepare;
exports.buildGLBFilePath = buildGLBFilePath;
exports.buildBinBuffer = buildBinBuffer;
/* fs Not a pure module */

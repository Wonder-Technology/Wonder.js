

import * as Fs from "fs";
import * as Path from "path";
import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Process from "process";
import * as BufferUtils$Wonderjs from "../../../../../src/asset/utils/BufferUtils.js";
import * as ConvertTool$Wonderjs from "./ConvertTool.js";
import * as ConvertGLBSystem$Wonderjs from "../../../../../src/asset/converter/ConvertGLBSystem.js";

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

export {
  convertUint8ArrayToBuffer ,
  buildFakeTextDecoder ,
  buildFakeTextEncoder ,
  _createFakeImage ,
  buildFakeURL ,
  getURL ,
  prepare ,
  buildGLBFilePath ,
  buildBinBuffer ,
  
}
/* fs Not a pure module */

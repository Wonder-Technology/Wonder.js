

import * as Fs from "fs";
import * as Path from "path";
import * as Process from "process";
import * as BufferUtils$Wonderjs from "../../../../../src/asset/utils/BufferUtils.js";
import * as ConvertTool$Wonderjs from "./ConvertTool.js";
import * as ConvertGLBSystem$Wonderjs from "../../../../../src/asset/converter/ConvertGLBSystem.js";

function convertUint8ArrayToBuffer (uint8Array){
      {
           var buf = new Buffer(uint8Array.byteLength);

           for (var i = 0; i < buf.length; ++i) {
               buf[i] = uint8Array[i];
           }

           return buf;
       }
      };

function buildFakeTextDecoder (convertUint8ArrayToBufferFunc){
        var TextDecoder = function(utfLabel){
        };

        TextDecoder.prototype.decode = (uint8Array) => {
          var buffer = convertUint8ArrayToBufferFunc(uint8Array);

          return buffer.toString("utf8");
        };

        window.TextDecoder = TextDecoder;
    };

function buildFakeTextEncoder (){
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
          name: "",
          width: 4,
          height: 4
        };
}

function createFakeImage($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var name = $staropt$star !== undefined ? $staropt$star : "";
  var src = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  var width = $staropt$star$2 !== undefined ? $staropt$star$2 : 4;
  var height = $staropt$star$3 !== undefined ? $staropt$star$3 : 4;
  return {
          src: src,
          name: name,
          width: width,
          height: height
        };
}

function buildFakeURL (sandbox){
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
        URL.createObjectURL.onCall(6).returns(_createFakeImage("object_url6"));

        window.URL = URL;
    };

function getURL (){
  return window.URL;
  };

function prepare(sandbox) {
  ConvertTool$Wonderjs.buildFakeLoadImage();
  buildFakeTextDecoder(convertUint8ArrayToBuffer);
  buildFakeTextEncoder();
  return buildFakeURL(sandbox);
}

function buildGLBFilePath(glbFileName) {
  return Path.join(Process.cwd(), "./test/res/", glbFileName);
}

function buildBinBuffer(param) {
  buildFakeTextDecoder(convertUint8ArrayToBuffer);
  var buffer = Fs.readFileSync(buildGLBFilePath("BoxTextured.glb"));
  return BufferUtils$Wonderjs.decodeGLB(buffer.buffer, ConvertGLBSystem$Wonderjs._checkGLB)[1];
}

export {
  convertUint8ArrayToBuffer ,
  buildFakeTextDecoder ,
  buildFakeTextEncoder ,
  _createFakeImage ,
  createFakeImage ,
  buildFakeURL ,
  getURL ,
  prepare ,
  buildGLBFilePath ,
  buildBinBuffer ,
  
}
/* fs Not a pure module */

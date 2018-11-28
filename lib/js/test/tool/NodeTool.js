'use strict';

var Fs = require("fs");
var Path = require("path");
var Process = require("process");
var GLBTool$Wonderjs = require("../integration/no_worker/asset/tool/GLBTool.js");
var ConverterAPI$Wonderjs = require("../../src/api/asset/ConverterAPI.js");

function buildWDBPath(wdbName) {
  return Path.join(Process.cwd(), "./test/res/", "wdb/" + (String(wdbName) + ".wdb"));
}

function buildGLBPath(glbName) {
  return Path.join(Process.cwd(), "./test/res/", "" + (String(glbName) + ".glb"));
}

function convertGLBToWDB(glbName) {
  var buffer = Fs.readFileSync(buildGLBPath(glbName));
  GLBTool$Wonderjs.buildFakeTextDecoder(GLBTool$Wonderjs.convertUint8ArrayToBuffer);
  GLBTool$Wonderjs.buildFakeTextEncoder();
  return ConverterAPI$Wonderjs.convertGLBToWDB(buffer.buffer);
}

exports.buildWDBPath = buildWDBPath;
exports.buildGLBPath = buildGLBPath;
exports.convertGLBToWDB = convertGLBToWDB;
/* fs Not a pure module */

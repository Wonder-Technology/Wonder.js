

import * as Fs from "fs";
import * as Path from "path";
import * as Process from "process";
import * as GLBTool$Wonderjs from "../integration/no_worker/asset/tool/GLBTool.js";
import * as ConverterAPI$Wonderjs from "../../src/api/asset/ConverterAPI.js";

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

export {
  buildWDBPath ,
  buildGLBPath ,
  convertGLBToWDB ,
  
}
/* fs Not a pure module */

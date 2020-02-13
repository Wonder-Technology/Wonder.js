'use strict';

var MostUtils$Wonderjs = require("../../../../../src/asset/utils/MostUtils.js");
var AssembleABSystem$Wonderjs = require("../../../../../src/asset_bundle/import/assemble/AssembleABSystem.js");
var GenerateAllABTool$Wonderjs = require("./GenerateAllABTool.js");

function assemble(data) {
  var newRab1 = GenerateAllABTool$Wonderjs.TestWithOneRAB[/* getNewRab */5](data);
  var rab1RelativePath = GenerateAllABTool$Wonderjs.TestWithOneRAB[/* getRabRelativePath */1](/* () */0);
  var wholeDependencyRelationMap = GenerateAllABTool$Wonderjs.TestWithOneRAB[/* getWholeDependencyRelationMap */0](/* () */0);
  return AssembleABSystem$Wonderjs.RAB[/* assemble */16](rab1RelativePath, newRab1, wholeDependencyRelationMap);
}

var TestWithOneRAB = /* module */[/* assemble */assemble];

function assemble$1(data) {
  var match = GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* getNewRabs */3](data);
  var newRab2 = match[1];
  var newRab1 = match[0];
  var match$1 = GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* getRabRelativePaths */1](/* () */0);
  var rab2RelativePath = match$1[1];
  var rab1RelativePath = match$1[0];
  var wholeDependencyRelationMap = GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* getWholeDependencyRelationMap */0](rab1RelativePath, rab2RelativePath);
  return MostUtils$Wonderjs.concatExecStreamArr(/* array */[
              (function () {
                  return AssembleABSystem$Wonderjs.RAB[/* assemble */16](rab1RelativePath, newRab1, wholeDependencyRelationMap);
                }),
              (function () {
                  return AssembleABSystem$Wonderjs.RAB[/* assemble */16](rab2RelativePath, newRab2, wholeDependencyRelationMap);
                })
            ]);
}

var TestWithTwoRABs = /* module */[/* assemble */assemble$1];

exports.TestWithOneRAB = TestWithOneRAB;
exports.TestWithTwoRABs = TestWithTwoRABs;
/* MostUtils-Wonderjs Not a pure module */

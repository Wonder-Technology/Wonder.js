'use strict';

var MostUtils$Wonderjs = require("../../../../../src/asset/utils/MostUtils.js");
var AssembleABSystem$Wonderjs = require("../../../../../src/asset_bundle/import/assemble/AssembleABSystem.js");
var GenerateAllABTool$Wonderjs = require("./GenerateAllABTool.js");

function assemble(data) {
  var newSab1 = GenerateAllABTool$Wonderjs.TestWithOneSAB[/* getNewSAB */3](data);
  var sab1RelativePath = GenerateAllABTool$Wonderjs.TestWithOneSAB[/* getSABRelativePath */1](/* () */0);
  var wholeDependencyRelationMap = GenerateAllABTool$Wonderjs.TestWithOneSAB[/* getWholeDependencyRelationMap */0](sab1RelativePath);
  return AssembleABSystem$Wonderjs.SAB[/* assemble */7](sab1RelativePath, newSab1, wholeDependencyRelationMap);
}

var TestWithOneSAB = /* module */[/* assemble */assemble];

function assemble$1(data) {
  var match = GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* getNewABs */3](data);
  var newSab1 = match[1];
  var newRab1 = match[0];
  var match$1 = GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* getABRelativePaths */1](/* () */0);
  var sab1RelativePath = match$1[1];
  var rab1RelativePath = match$1[0];
  var wholeDependencyRelationMap = GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* getWholeDependencyRelationMap */0](rab1RelativePath, sab1RelativePath);
  return MostUtils$Wonderjs.concatExecStreamArr(/* array */[
              (function () {
                  return AssembleABSystem$Wonderjs.RAB[/* assemble */16](rab1RelativePath, newRab1, wholeDependencyRelationMap);
                }),
              (function () {
                  return AssembleABSystem$Wonderjs.SAB[/* assemble */7](sab1RelativePath, newSab1, wholeDependencyRelationMap);
                })
            ]);
}

var TestWithOneSABAndOneRAB = /* module */[/* assemble */assemble$1];

exports.TestWithOneSAB = TestWithOneSAB;
exports.TestWithOneSABAndOneRAB = TestWithOneSABAndOneRAB;
/* MostUtils-Wonderjs Not a pure module */

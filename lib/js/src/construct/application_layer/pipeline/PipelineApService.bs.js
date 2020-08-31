'use strict';

var JobDoService$Wonderjs = require("../../domain_layer/domain/pipeline/pipeline/service/JobDoService.bs.js");
var PipelineManagerRoot$Wonderjs = require("../../domain_layer/domain/pipeline/pipeline/entity/PipelineManagerRoot.bs.js");
var ParseDataPipelineDoService$Wonderjs = require("../../domain_layer/domain/pipeline/pipeline/service/ParseDataPipelineDoService.bs.js");

var parsePipelineData = ParseDataPipelineDoService$Wonderjs.parse;

var registerJob = JobDoService$Wonderjs.register;

var getPipelineStream = PipelineManagerRoot$Wonderjs.getPipelineStream;

var setPipelineStream = PipelineManagerRoot$Wonderjs.setPipelineStream;

exports.parsePipelineData = parsePipelineData;
exports.registerJob = registerJob;
exports.getPipelineStream = getPipelineStream;
exports.setPipelineStream = setPipelineStream;
/* ParseDataPipelineDoService-Wonderjs Not a pure module */

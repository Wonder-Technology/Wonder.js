'use strict';

var ImmutableHashMap$Wonderjs = require("../../../construct/domain_layer/library/structure/hash_map/ImmutableHashMap.bs.js");

function create(param) {
  return {
          pipeline: {
            initPipeline: "init",
            initPipelineData: {
              name: "init",
              groups: {
                hd: {
                  name: "frame",
                  link: /* Concat */1,
                  elements: {
                    hd: {
                      name: "start_time",
                      type_: /* Job */0
                    },
                    tl: /* [] */0
                  }
                },
                tl: /* [] */0
              },
              firstGroup: "frame"
            },
            pipelineStreamMap: ImmutableHashMap$Wonderjs.createEmpty(undefined, undefined),
            jobExecFuncMap: ImmutableHashMap$Wonderjs.createEmpty(undefined, undefined)
          },
          time: {
            startTime: undefined,
            elapsed: 0
          },
          picture: {
            size: undefined
          }
        };
}

exports.create = create;
/* No side effect */

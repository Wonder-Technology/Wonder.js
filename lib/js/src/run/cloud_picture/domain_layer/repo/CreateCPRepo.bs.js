'use strict';

var ImmutableHashMap$Wonderjs = require("../../../../construct/domain_layer/library/structure/hash_map/ImmutableHashMap.bs.js");
var ImmutableSparseMap$Wonderjs = require("../../../../construct/domain_layer/library/structure/sparse_map/ImmutableSparseMap.bs.js");

function create(param) {
  return {
          pipeline: {
            initPipeline: "init",
            runPipeline: "run",
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
            runPipelineData: {
              name: "run",
              groups: {
                hd: {
                  name: "frame",
                  link: /* Concat */1,
                  elements: {
                    hd: {
                      name: "update_transform",
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
          scene: {
            sceneGameObject: null
          },
          gameObject: {
            maxUID: 0,
            transformMap: ImmutableSparseMap$Wonderjs.createEmpty(undefined, undefined)
          },
          transform: undefined,
          poConfig: {
            transformCount: 10000
          },
          globalTemp: {
            float16Array1: new Float32Array(16)
          },
          time: {
            startTime: null,
            elapsed: 0
          }
        };
}

exports.create = create;
/* No side effect */

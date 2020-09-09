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
            transformMap: ImmutableSparseMap$Wonderjs.createEmpty(undefined, undefined),
            pbrMaterialMap: ImmutableSparseMap$Wonderjs.createEmpty(undefined, undefined),
            geometryMap: ImmutableSparseMap$Wonderjs.createEmpty(undefined, undefined),
            directionLightMap: ImmutableSparseMap$Wonderjs.createEmpty(undefined, undefined),
            basicCameraViewMap: ImmutableSparseMap$Wonderjs.createEmpty(undefined, undefined),
            perspectiveCameraProjectionMap: ImmutableSparseMap$Wonderjs.createEmpty(undefined, undefined)
          },
          transform: undefined,
          pbrMaterial: undefined,
          geometry: undefined,
          basicCameraView: {
            maxIndex: 0,
            isActiveMap: ImmutableSparseMap$Wonderjs.createEmpty(undefined, undefined),
            gameObjectMap: ImmutableSparseMap$Wonderjs.createEmpty(undefined, undefined)
          },
          perspectiveCameraProjection: {
            maxIndex: 0,
            dirtyList: /* [] */0,
            pMatrixMap: ImmutableSparseMap$Wonderjs.createEmpty(undefined, undefined),
            nearMap: ImmutableSparseMap$Wonderjs.createEmpty(undefined, undefined),
            farMap: ImmutableSparseMap$Wonderjs.createEmpty(undefined, undefined),
            fovyMap: ImmutableSparseMap$Wonderjs.createEmpty(undefined, undefined),
            aspectMap: ImmutableSparseMap$Wonderjs.createEmpty(undefined, undefined),
            gameObjectMap: ImmutableSparseMap$Wonderjs.createEmpty(undefined, undefined)
          },
          directionLight: undefined,
          poConfig: {
            transformCount: 10000,
            geometryPointCount: 2000000,
            geometryCount: 10000,
            pbrMaterialCount: 10000,
            directionLightCount: 4
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

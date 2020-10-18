'use strict';

var ImmutableHashMap$Wonderjs = require("../../../../construct/domain_layer/library/structure/hash_map/ImmutableHashMap.bs.js");
var ImmutableSparseMap$Wonderjs = require("../../../../construct/domain_layer/library/structure/sparse_map/ImmutableSparseMap.bs.js");

function create(param) {
  return {
          pipeline: {
            initPipeline: "init",
            updatePipeline: "update",
            renderPipeline: "render",
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
                    tl: {
                      hd: {
                        name: "init_webgpu",
                        type_: /* Job */0
                      },
                      tl: {
                        hd: {
                          name: "init_camera",
                          type_: /* Job */0
                        },
                        tl: {
                          hd: {
                            name: "init_pass",
                            type_: /* Job */0
                          },
                          tl: {
                            hd: {
                              name: "init_pathTracing",
                              type_: /* Job */0
                            },
                            tl: {
                              hd: {
                                name: "init_accumulation",
                                type_: /* Job */0
                              },
                              tl: /* [] */0
                            }
                          }
                        }
                      }
                    }
                  }
                },
                tl: /* [] */0
              },
              firstGroup: "frame"
            },
            updatePipelineData: {
              name: "update",
              groups: {
                hd: {
                  name: "frame",
                  link: /* Concat */1,
                  elements: {
                    hd: {
                      name: "update_transform",
                      type_: /* Job */0
                    },
                    tl: {
                      hd: {
                        name: "update_camera",
                        type_: /* Job */0
                      },
                      tl: {
                        hd: {
                          name: "update_textureArray",
                          type_: /* Job */0
                        },
                        tl: {
                          hd: {
                            name: "update_pathTracing",
                            type_: /* Job */0
                          },
                          tl: {
                            hd: {
                              name: "update_pass",
                              type_: /* Job */0
                            },
                            tl: /* [] */0
                          }
                        }
                      }
                    }
                  }
                },
                tl: /* [] */0
              },
              firstGroup: "frame"
            },
            renderPipelineData: {
              name: "render",
              groups: {
                hd: {
                  name: "frame",
                  link: /* Concat */1,
                  elements: {
                    hd: {
                      name: "render_pathTracing",
                      type_: /* Job */0
                    },
                    tl: {
                      hd: {
                        name: "update_accumulation",
                        type_: /* Job */0
                      },
                      tl: {
                        hd: {
                          name: "update_pass_for_render",
                          type_: /* Job */0
                        },
                        tl: {
                          hd: {
                            name: "render_accumulation",
                            type_: /* Job */0
                          },
                          tl: {
                            hd: {
                              name: "end_render",
                              type_: /* Job */0
                            },
                            tl: /* [] */0
                          }
                        }
                      }
                    }
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
            sceneGameObject: undefined
          },
          gameObject: {
            maxUID: 0,
            transformMap: ImmutableSparseMap$Wonderjs.createEmpty(undefined, undefined),
            bsdfMaterialMap: ImmutableSparseMap$Wonderjs.createEmpty(undefined, undefined),
            geometryMap: ImmutableSparseMap$Wonderjs.createEmpty(undefined, undefined),
            directionLightMap: ImmutableSparseMap$Wonderjs.createEmpty(undefined, undefined),
            basicCameraViewMap: ImmutableSparseMap$Wonderjs.createEmpty(undefined, undefined),
            perspectiveCameraProjectionMap: ImmutableSparseMap$Wonderjs.createEmpty(undefined, undefined)
          },
          transform: undefined,
          bsdfMaterial: undefined,
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
          globalTemp: {
            float16Array1: new Float32Array(16),
            float9Array: new Float32Array(9)
          },
          time: {
            startTime: undefined,
            elapsed: 0
          },
          picture: {
            size: undefined
          },
          webgpu: {
            device: undefined,
            window: undefined,
            adapter: undefined,
            context: undefined,
            queue: undefined,
            swapChainFormat: undefined,
            swapChain: undefined,
            textureArray: {
              layerIndexMap: ImmutableHashMap$Wonderjs.createEmpty(undefined, undefined),
              textureArrayView: undefined,
              textureSampler: undefined
            }
          },
          camera: {
            cameraBufferData: undefined
          },
          pass: {
            sampleCount: 1,
            totalSampleCount: 0,
            commonBufferData: undefined,
            resolutionBufferData: undefined,
            pixelBufferData: undefined
          },
          pathTracingPass: {
            sceneDescBufferData: undefined,
            pointIndexBufferData: undefined,
            vertexBufferData: undefined,
            indexBufferData: undefined,
            bsdfMaterialBufferData: undefined,
            shaderBindingTable: undefined,
            staticBindGroupDataList: /* [] */0,
            pipeline: undefined,
            cameraBindGroupLayout: undefined,
            directionLightBindGroupLayout: undefined
          },
          accumulationPass: {
            accumulationPixelBufferData: undefined,
            staticBindGroupData: undefined,
            pipeline: undefined
          },
          image: {
            dataMap: ImmutableHashMap$Wonderjs.createEmpty(undefined, undefined)
          }
        };
}

exports.create = create;
/* No side effect */

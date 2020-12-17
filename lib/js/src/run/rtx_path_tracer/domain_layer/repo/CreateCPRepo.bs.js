'use strict';

var ImmutableHashMap$Wonderjs = require("../../../../construct/domain_layer/library/structure/hash_map/ImmutableHashMap.bs.js");

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
              textureSampler: undefined,
              layerSize: [
                2048,
                2048
              ]
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
          }
        };
}

exports.create = create;
/* No side effect */

open Wonder_jest;

let _ =
  describe(
    "Job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := SimpleBasicRenderPipelineTool.initWithRenderConfig(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test operate custom job",
        () => {
          describe(
            "test operate logic job",
            () => {
              describe(
                "test operate logic init job",
                () => {
                  let _prepare = (state) => {
                    let (state, _, _, _) =
                      InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
                    state |> JobTool.init
                  };
                  describe(
                    "addLogicInitJob",
                    () =>
                      describe(
                        "add job to logic init pipeline",
                        () => {
                          beforeEach(() => state := DirectorTool.prepare(state^));
                          describe(
                            "test add job after target job",
                            () =>
                              test(
                                "test add two job",
                                () => {
                                  let state = _prepare(state);
                                  let customData = [||];
                                  let state =
                                    state
                                    |> Job.addLogicInitJob(
                                         "customJob1",
                                         "start_time",
                                         (state) => {
                                           customData |> ArraySystem.push(1) |> ignore;
                                           state
                                         }
                                       )
                                    |> Job.addLogicInitJob(
                                         "customJob2",
                                         "customJob1",
                                         (state) => {
                                           customData |> ArraySystem.push(2) |> ignore;
                                           state
                                         }
                                       );
                                  let state = state |> JobTool.execLogicInitJobs;
                                  customData |> expect == [|1, 2|]
                                }
                              )
                          );
                          test(
                            "test add job to head",
                            () => {
                              let state = _prepare(state);
                              let customData = [||];
                              let state =
                                state
                                |> Job.addLogicInitJob(
                                     "customJob1",
                                     "",
                                     (state) => {
                                       customData |> ArraySystem.push(1) |> ignore;
                                       state
                                     }
                                   )
                                |> Job.addLogicInitJob(
                                     "customJob2",
                                     "start_time",
                                     (state) => {
                                       customData |> ArraySystem.push(2) |> ignore;
                                       state
                                     }
                                   );
                              let state = state |> JobTool.execLogicInitJobs;
                              customData |> expect == [|1, 2|]
                            }
                          )
                        }
                      )
                  );
                  describe(
                    "removeLogicInitJob",
                    () => {
                      test(
                        "test remove custom added job",
                        () => {
                          let state = _prepare(state);
                          let customData = [||];
                          let state =
                            state
                            |> Job.addLogicInitJob(
                                 "customJob",
                                 "start_time",
                                 (state) => {
                                   customData |> ArraySystem.push(1) |> ignore;
                                   state
                                 }
                               )
                            |> Job.removeLogicInitJob("customJob");
                          let state = state |> JobTool.execLogicInitJobs;
                          customData |> expect == [||]
                        }
                      );
                      test(
                        "test remove default job",
                        () => {
                          let state = _prepare(state);
                          let state = state |> Job.removeLogicInitJob("start_time");
                          state
                          |> JobTool.getLogicInitJobList
                          |> JobTool.isJobExistInJobList("start_time")
                          |> expect == false
                        }
                      )
                    }
                  )
                }
              );
              describe(
                "test operate logic logic job",
                () => {
                  let _prepare = (state) => {
                    let (state, _, _, _) =
                      InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
                    state |> JobTool.init
                  };
                  describe(
                    "addLogicUpdateJob",
                    () =>
                      describe(
                        "add job to logic update pipeline",
                        () =>
                          describe(
                            "test add job after target job",
                            () =>
                              test(
                                "test add one job",
                                () => {
                                  let state = _prepare(state);
                                  let customData = [||];
                                  let state =
                                    state
                                    |> Job.addLogicUpdateJob(
                                         "customJob",
                                         "tick",
                                         (elapsed, state) => {
                                           customData |> ArraySystem.push(elapsed) |> ignore;
                                           state
                                         }
                                       );
                                  let elapsed = 100.1;
                                  let state = state |> JobTool.execLogicUpdateJobs(elapsed);
                                  customData |> expect == [|elapsed|]
                                }
                              )
                          )
                      )
                  );
                  describe(
                    "removeLogicUpdateJob",
                    () =>
                      test(
                        "test remove custom added job",
                        () => {
                          let state = _prepare(state);
                          let customData = [||];
                          let state =
                            state
                            |> Job.addLogicUpdateJob(
                                 "customJob",
                                 "tick",
                                 (elapsed, state) => {
                                   customData |> ArraySystem.push(elapsed) |> ignore;
                                   state
                                 }
                               )
                            |> Job.removeLogicUpdateJob("customJob");
                          let elapsed = 100.1;
                          let state = state |> JobTool.execLogicUpdateJobs(elapsed);
                          customData |> expect == [||]
                        }
                      )
                  )
                }
              )
            }
          );
          describe(
            "test operate render job",
            () => {
              describe(
                "test operate render init job",
                () => {
                  let _prepare = (state) => {
                    let (state, _, _, _) =
                      InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
                    let gl = FakeGlTool.buildFakeGl(~sandbox, ());
                    let state = state |> FakeGlTool.setFakeGl(gl);
                    let state = state |> JobTool.init;
                    (state, gl)
                  };
                  describe(
                    "addRenderInitJob",
                    () =>
                      describe(
                        "add job to render init pipeline",
                        () => {
                          describe(
                            "test add job after target job",
                            () => {
                              test(
                                "test add one job",
                                () => {
                                  let (state, gl) = _prepare(state);
                                  let customData = [||];
                                  let state =
                                    state
                                    |> Job.addRenderInitJob(
                                         "customJob",
                                         "preget_glslData",
                                         (gl, state) => {
                                           customData |> ArraySystem.push(gl) |> ignore;
                                           state
                                         }
                                       );
                                  let state = state |> WebGLRenderTool.init;
                                  customData |> expect == [|gl|]
                                }
                              );
                              test(
                                "test add two jobs",
                                () => {
                                  let (state, gl) = _prepare(state);
                                  let customData = [||];
                                  let state =
                                    state
                                    |> Job.addRenderInitJob(
                                         "customJob1",
                                         "preget_glslData",
                                         (gl, state) => {
                                           customData |> ArraySystem.push(gl) |> ignore;
                                           state
                                         }
                                       )
                                    |> Job.addRenderInitJob(
                                         "customJob2",
                                         "customJob1",
                                         (gl, state) => {
                                           customData |> ArraySystem.push(gl) |> ignore;
                                           state
                                         }
                                       );
                                  let state = state |> WebGLRenderTool.init;
                                  customData |> expect == [|gl, gl|]
                                }
                              )
                            }
                          );
                          test(
                            "test add job to head",
                            () => {
                              let (state, gl) = _prepare(state);
                              let customData = [||];
                              let state =
                                state
                                |> Job.addRenderInitJob(
                                     "customJob1",
                                     "",
                                     (gl, state) => {
                                       customData |> ArraySystem.push(1) |> ignore;
                                       state
                                     }
                                   )
                                |> Job.addRenderInitJob(
                                     "customJob2",
                                     "preget_glslData",
                                     (gl, state) => {
                                       customData |> ArraySystem.push(2) |> ignore;
                                       state
                                     }
                                   );
                              let state = state |> WebGLRenderTool.init;
                              customData |> expect == [|1, 2|]
                            }
                          )
                        }
                      )
                  );
                  describe(
                    "removeRenderInitJob",
                    () => {
                      test(
                        "test remove custom added job",
                        () => {
                          let (state, gl) = _prepare(state);
                          let customData = [||];
                          let state =
                            state
                            |> Job.addRenderInitJob(
                                 "customJob",
                                 "preget_glslData",
                                 (gl, state) => {
                                   customData |> ArraySystem.push(gl) |> ignore;
                                   state
                                 }
                               )
                            |> Job.removeRenderInitJob("customJob");
                          let state = state |> WebGLRenderTool.init;
                          customData |> expect == [||]
                        }
                      );
                      test(
                        "test remove default job",
                        () => {
                          let (state, _) = _prepare(state);
                          let state = state |> Job.removeRenderInitJob("preget_glslData");
                          state
                          |> JobTool.getRenderInitJobList
                          |> JobTool.isJobExistInJobList("preget_glslData")
                          |> expect == false
                        }
                      )
                    }
                  )
                }
              );
              describe(
                "test operate render render job",
                () => {
                  let _prepare = (state) => {
                    let (state, _, _, _) =
                      InitBasicMaterialJobTool.prepareGameObject(sandbox, state^);
                    let (state, _, _, _) = CameraControllerTool.createCameraGameObject(state);
                    let gl = FakeGlTool.buildFakeGl(~sandbox, ());
                    let state = state |> FakeGlTool.setFakeGl(gl);
                    let state = state |> JobTool.init;
                    (state, gl)
                  };
                  describe(
                    "addRenderRenderJob",
                    () =>
                      describe(
                        "add job to render render pipeline",
                        () =>
                          describe(
                            "test add job after target job",
                            () =>
                              test(
                                "test add one job",
                                () => {
                                  let (state, gl) = _prepare(state);
                                  let customData = [||];
                                  let state =
                                    state
                                    |> Job.addRenderRenderJob(
                                         "customJob",
                                         "get_render_array",
                                         (gl, state) => {
                                           customData |> ArraySystem.push(gl) |> ignore;
                                           state
                                         }
                                       );
                                  let state = state |> WebGLRenderTool.render;
                                  customData |> expect == [|gl|]
                                }
                              )
                          )
                      )
                  );
                  describe(
                    "removeRenderRenderJob",
                    () =>
                      test(
                        "test remove custom added job",
                        () => {
                          let (state, gl) = _prepare(state);
                          let customData = [||];
                          let state =
                            state
                            |> Job.addRenderRenderJob(
                                 "customJob",
                                 "get_render_array",
                                 (gl, state) => {
                                   customData |> ArraySystem.push(gl) |> ignore;
                                   state
                                 }
                               )
                            |> Job.removeRenderRenderJob("customJob");
                          let state = state |> WebGLRenderTool.render;
                          customData |> expect == [||]
                        }
                      )
                  )
                }
              )
            }
          )
        }
      )
    }
  );
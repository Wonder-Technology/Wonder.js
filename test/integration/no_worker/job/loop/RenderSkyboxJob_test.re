open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("test render skybox job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state := SkyboxTool.initWithJobConfig(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test skybox shader", () => {
      describe("test get attribute location", () =>
        describe("test get a_position location", () =>
          test("test get location once", () => {
            let state = state^;
            let getAttribLocation =
              GLSLLocationTool.getAttribLocation(sandbox, "a_position");
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(~sandbox, ~getAttribLocation, ()),
                 );

            let state = state |> DirectorTool.init;

            getAttribLocation
            |> withTwoArgs(matchAny, "a_position")
            |> expect
            |> toCalledOnce;
          })
        )
      );

      describe("test get uniform location", () => {
        describe("test get no_material_shader uniform location", () => {
          test("test get u_skyboxVMatrix location once", () =>
            RenderInJobTool.testGetLocation(
              sandbox,
              "u_skyboxVMatrix",
              1,
              DirectorTool.init,
              state,
            )
          );
          test("test u_skyboxCubeMapSampler u_skyboxVMatrix location once", () =>
            RenderInJobTool.testGetLocation(
              sandbox,
              "u_skyboxCubeMapSampler",
              1,
              DirectorTool.init,
              state,
            )
          );
        });

        describe("test not get model uniform location", () =>
          test("test not get u_mMatrix location", () =>
            RenderInJobTool.testGetLocation(
              sandbox,
              "u_mMatrix",
              0,
              DirectorTool.init,
              state,
            )
          )
        );
      });

      describe("test glsl", () => {
        test("test vs", () => {
          let (state, shaderSource) =
            RenderInJobTool.prepareForJudgeGLSLNotExec(sandbox, state^);

          let state = state |> DirectorTool.init;

          GLSLTool.containMultiline(
            GLSLTool.getVsSourceByCount(shaderSource, 0),
            [
              {|attribute vec3 a_position;|},
              {|uniform mat4 u_skyboxVMatrix;|},
              {|uniform mat4 u_pMatrix;|},
              {|v_texCoord = a_position;|},
              {|vec4 pos = u_pMatrix * u_skyboxVMatrix * vec4(a_position, 1.0);|},
              {|gl_Position = pos.xyww;|},
            ],
          )
          |> expect == true;
        });
        test("test fs", () => {
          let (state, shaderSource) =
            RenderInJobTool.prepareForJudgeGLSLNotExec(sandbox, state^);

          let state = state |> DirectorTool.init;

          GLSLTool.containMultiline(
            GLSLTool.getFsSourceByCount(shaderSource, 0),
            [
              {|gl_FragColor = textureCube(u_skyboxCubeMapSampler, vec3(-v_texCoord.x, v_texCoord.y, v_texCoord.z));|},
            ],
          )
          |> expect == true;
        });
      });
    });

    describe("if skybox has no cubemap texture", () =>
      test("not draw", () => {
        let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
        let state =
          state^
          |> FakeGlTool.setFakeGl(
               FakeGlTool.buildFakeGl(~sandbox, ~drawElements, ()),
             );

        let state =
          state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

        drawElements |> expect |> not_ |> toCalled;
      })
    );

    describe("else", () => {
      let cubemapTextureRef = ref(-1);
      let cameraTransformRef = ref(-1);

      beforeEach(() => {
        let (s, map) = SkyboxTool.prepareCubemapTexture(state^);
        let (s, cameraTransform, _) = SkyboxTool.prepareGameObject(s);

        state := s;
        cubemapTextureRef := map;
        cameraTransformRef := cameraTransform;
      });

      describe("bind cubemap", () => {
        test("if not has map, not bind", () => {
          let state = SceneAPI.removeCubemapTexture(state^);
          let bindTexture = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(~sandbox, ~bindTexture, ()),
               );

          let state =
            state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

          bindTexture |> expect |> not_ |> toCalled;
        });

        describe("else", () => {
          let _prepare = state => {
            let textureUnit0 = 10;
            let textureCubemap = Obj.magic(8);
            let glTexture1 = Obj.magic(11);
            let createTexture = createEmptyStubWithJsObjSandbox(sandbox);
            createTexture |> onCall(0) |> returns(glTexture1);
            let activeTexture = createEmptyStubWithJsObjSandbox(sandbox);
            let bindTexture = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~textureUnit0,
                     ~textureCubemap,
                     ~createTexture,
                     ~activeTexture,
                     ~bindTexture,
                     (),
                   ),
                 );

            (
              state,
              (textureCubemap, glTexture1, textureUnit0),
              (activeTexture, bindTexture),
            );
          };

          test("active texture unit", () => {
            let (
              state,
              (textureCubemap, glTexture1, textureUnit0),
              (activeTexture, bindTexture),
            ) =
              _prepare(state^);

            let state =
              state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

            activeTexture
            |> withOneArg(textureUnit0)
            |> expect
            |> toCalledOnce;
          });
          test("bind gl texture to TEXTURE_CUBE_MAP target", () => {
            let (
              state,
              (textureCubemap, glTexture1, textureUnit0),
              (activeTexture, bindTexture),
            ) =
              _prepare(state^);

            let state =
              state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

            bindTexture
            |> withTwoArgs(textureCubemap, glTexture1)
            |> expect
            |> toCalledOnce;
          });
        });
      });

      describe("update cubemap", () => {
        let _prepare = (~state, ~width=2, ~height=4, ()) => {
          let state =
            CubemapTextureTool.setAllSources(
              ~state,
              ~texture=cubemapTextureRef^,
              ~width,
              ~height,
              (),
            );

          (state, cubemapTextureRef^);
        };

        test("if is updated before, not update", () => {
          let (state, _) = _prepare(~state=state^, ());
          let unpackFlipYWebgl = Obj.magic(2);
          let pixelStorei = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(
                   ~sandbox,
                   ~unpackFlipYWebgl,
                   ~pixelStorei,
                   (),
                 ),
               );

          let state =
            state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

          let pixelStoreiCallCount =
            pixelStorei |> withOneArg(unpackFlipYWebgl) |> getCallCount;

          let state = state |> DirectorTool.runWithDefaultTime;
          let state = state |> DirectorTool.runWithDefaultTime;

          pixelStorei
          |> withOneArg(unpackFlipYWebgl)
          |> getCallCount
          |> expect == pixelStoreiCallCount;
        });
        test("if source not exist, not update", () => {
          let unpackFlipYWebgl = Obj.magic(2);
          let pixelStorei = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state^
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(
                   ~sandbox,
                   ~unpackFlipYWebgl,
                   ~pixelStorei,
                   (),
                 ),
               );

          let state =
            state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

          pixelStorei
          |> withOneArg(unpackFlipYWebgl)
          |> expect
          |> not_
          |> toCalled;
        });

        describe("else", () => {
          describe("contract check", () =>
            test("all sources' size should equal", () => {
              let (state, map) = _prepare(~state=state^, ());
              let state =
                state
                |> CubemapTextureAPI.setCubemapTextureNYSource(
                     map,
                     CubemapTextureTool.buildSource(
                       ~width=100,
                       ~height=50,
                       (),
                     ),
                   );
              let state =
                state
                |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

              expect(() =>
                state |> DirectorTool.init |> DirectorTool.runWithDefaultTime
              )
              |> toThrowMessage("expect all sources' size equal");
            })
          );

          test("set flipY", () => {
            let (state, map) = _prepare(~state=state^, ());
            let state =
              state |> CubemapTextureAPI.setCubemapTextureFlipY(map, true);
            let unpackFlipYWebgl = Obj.magic(2);
            let pixelStorei = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~unpackFlipYWebgl,
                     ~pixelStorei,
                     (),
                   ),
                 );

            let state =
              state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

            pixelStorei
            |> withTwoArgs(unpackFlipYWebgl, true)
            |> expect
            |> toCalledOnce;
          });

          describe("set texture parameters", () =>
            test("set it only once", () => {
              let (state, map) = _prepare(~state=state^, ());
              let textureCubemap = Obj.magic(1);
              let textureWrapS = Obj.magic(2);
              let clampToEdge = Obj.magic(4);
              let texParameteri = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~textureCubemap,
                       ~textureWrapS,
                       ~clampToEdge,
                       ~texParameteri,
                       (),
                     ),
                   );

              let state =
                state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

              texParameteri
              |> withThreeArgs(textureCubemap, textureWrapS, clampToEdge)
              |> getCallCount
              |> expect == 1;
            })
          );

          describe("allocate source to texture", () =>
            describe("draw no mipmap twoD texture", () => {
              test("should draw 6 times", () => {
                let (state, map) = _prepare(~state=state^, ());
                let texImage2D = createEmptyStubWithJsObjSandbox(sandbox);
                let state =
                  state
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(~sandbox, ~texImage2D, ()),
                     );

                let state =
                  state
                  |> RenderJobsTool.init
                  |> DirectorTool.runWithDefaultTime;

                texImage2D |> getCallCount |> expect == 6;
              });
              test("test draw with source, format, type", () => {
                let (state, map) = _prepare(~state=state^, ());
                let (
                  pxSource,
                  nxSource,
                  pySource,
                  nySource,
                  pzSource,
                  nzSource,
                ) = (
                  CubemapTextureAPI.unsafeGetCubemapTexturePXSource(
                    map,
                    state,
                  ),
                  CubemapTextureAPI.unsafeGetCubemapTextureNXSource(
                    map,
                    state,
                  ),
                  CubemapTextureAPI.unsafeGetCubemapTexturePYSource(
                    map,
                    state,
                  ),
                  CubemapTextureAPI.unsafeGetCubemapTextureNYSource(
                    map,
                    state,
                  ),
                  CubemapTextureAPI.unsafeGetCubemapTexturePZSource(
                    map,
                    state,
                  ),
                  CubemapTextureAPI.unsafeGetCubemapTextureNZSource(
                    map,
                    state,
                  ),
                );
                let state =
                  state
                  |> CubemapTextureAPI.setCubemapTexturePXFormat(
                       map,
                       TextureType.Rgbas3tcdxt1,
                     )
                  |> CubemapTextureAPI.setCubemapTextureNXFormat(
                       map,
                       TextureType.Rgbs3tcdxt1,
                     )
                  |> CubemapTextureAPI.setCubemapTexturePZFormat(
                       map,
                       TextureType.Rgba,
                     );
                let state =
                  state
                  |> CubemapTextureAPI.setCubemapTexturePXType(map, 1)
                  |> CubemapTextureAPI.setCubemapTextureNXType(map, 2)
                  |> CubemapTextureAPI.setCubemapTexturePZType(map, 2);
                let textureCubemap = Obj.magic(1);
                let rgb = Obj.magic(2);
                let rgba = Obj.magic(3);
                let rgbS3tcDxt1 = Obj.magic(4);
                let rgbaS3tcDxt1 = Obj.magic(5);
                let unsignedByte = Obj.magic(3);
                let unsignedShort565 = Obj.magic(4);
                let unsignedShort4444 = Obj.magic(5);
                let texImage2D = createEmptyStubWithJsObjSandbox(sandbox);
                let state =
                  state
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(
                         ~sandbox,
                         ~textureCubemap,
                         ~rgb,
                         ~rgba,
                         ~rgbS3tcDxt1,
                         ~rgbaS3tcDxt1,
                         ~unsignedShort565,
                         ~unsignedShort4444,
                         ~unsignedByte,
                         ~texImage2D,
                         (),
                       ),
                     );

                let state =
                  state
                  |> RenderJobsTool.init
                  |> DirectorTool.runWithDefaultTime;

                (
                  SinonTool.calledWithArg6(
                    texImage2D,
                    textureCubemap,
                    0,
                    rgbaS3tcDxt1,
                    rgbaS3tcDxt1,
                    unsignedShort565,
                    pxSource,
                  ),
                  SinonTool.calledWithArg6(
                    texImage2D,
                    textureCubemap,
                    0,
                    rgbS3tcDxt1,
                    rgbS3tcDxt1,
                    unsignedShort4444,
                    nxSource,
                  ),
                  SinonTool.calledWithArg6(
                    texImage2D,
                    textureCubemap,
                    0,
                    rgb,
                    rgb,
                    unsignedByte,
                    pySource,
                  ),
                  SinonTool.calledWithArg6(
                    texImage2D,
                    textureCubemap,
                    0,
                    rgb,
                    rgb,
                    unsignedByte,
                    nySource,
                  ),
                  SinonTool.calledWithArg6(
                    texImage2D,
                    textureCubemap,
                    0,
                    rgba,
                    rgba,
                    unsignedShort4444,
                    pzSource,
                  ),
                  SinonTool.calledWithArg6(
                    texImage2D,
                    textureCubemap,
                    0,
                    rgb,
                    rgb,
                    unsignedByte,
                    nzSource,
                  ),
                )
                |> expect == (true, true, true, true, true, true);
              });
            })
          );

          describe("generate mipmap", () => {
            let _exec = state => {
              let textureCubemap = Obj.magic(1);
              let generateMipmap = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~textureCubemap,
                       ~generateMipmap,
                       (),
                     ),
                   );
              let state =
                state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;

              (state, textureCubemap, generateMipmap);
            };

            test(
              "if filter is mipmap and is source power of two, generate", () => {
              let (state, map) =
                _prepare(~state=state^, ~width=2, ~height=4, ());
              let state =
                state
                |> CubemapTextureAPI.setCubemapTextureMagFilter(
                     map,
                     TextureTool.getNearestMipmapNearest(),
                   );

              let (state, textureCubemap, generateMipmap) = _exec(state);

              generateMipmap |> expect |> toCalledWith([|textureCubemap|]);
            });

            describe("else, not generate", () => {
              test("test filter isn't mipmap", () => {
                let (state, map) =
                  _prepare(~state=state^, ~width=2, ~height=4, ());

                let state =
                  state
                  |> CubemapTextureAPI.setCubemapTextureMagFilter(
                       map,
                       TextureTool.getNearest(),
                     )
                  |> CubemapTextureAPI.setCubemapTextureMinFilter(
                       map,
                       TextureTool.getNearest(),
                     );

                let (state, textureCubemap, generateMipmap) = _exec(state);

                generateMipmap |> expect |> not_ |> toCalled;
              });
              test("test source isn't power of two", () => {
                let (state, map) =
                  _prepare(~state=state^, ~width=1, ~height=4, ());
                let state =
                  state
                  |> CubemapTextureAPI.setCubemapTextureMagFilter(
                       map,
                       TextureTool.getLinearMipmapLinear(),
                     )
                  |> CubemapTextureAPI.setCubemapTextureMinFilter(
                       map,
                       TextureTool.getNearest(),
                     );

                let (state, textureCubemap, generateMipmap) = _exec(state);

                generateMipmap |> expect |> not_ |> toCalled;
              });
            });
          });
        });
      });

      describe("prepare gl state", () => {
        test("set depth func to LEqual", () => {
          let depthFunc = createEmptyStubWithJsObjSandbox(sandbox);
          let lEqual = 1;
          let state =
            state^
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(~sandbox, ~depthFunc, ~lEqual, ()),
               );

          let state =
            state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

          depthFunc |> expect |> toCalledWith([|lEqual|]);
        });
        test("set side to back", () => {
          let cullFace = createEmptyStubWithJsObjSandbox(sandbox);
          let front = 1;
          let state =
            state^
            |> FakeGlTool.setFakeGl(
                 FakeGlTool.buildFakeGl(~sandbox, ~cullFace, ~front, ()),
               );

          let state =
            state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

          cullFace |> SinonTool.calledWith(_, front) |> expect == true;
        });
      });

      describe("use skybox program", () =>
        test("test", () => {
          let (state, useProgram, shaderIndex) =
            RenderInJobTool.TestUseProgram.prepareAndExec(
              sandbox,
              state,
              "skybox",
            );

          useProgram
          |> getCall(0)
          |> SinonTool.calledWith(
               _,
               ProgramTool.unsafeGetProgram(shaderIndex, state),
             )
          |> expect == true;
        })
      );

      describe("draw skybox gameObject", () => {
        describe("send box geometry's attribute data", () => {
          describe("init vertex buffer", () =>
            test("bufferData", () => {
              let array_buffer = 1;
              let static_draw = 2;
              let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state^
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~array_buffer,
                       ~static_draw,
                       ~bufferData,
                       (),
                     ),
                   );

              let state =
                state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

              bufferData
              |> withThreeArgs(
                   array_buffer,
                   BoxGeometryTool.getBoxGeometryVertices(state),
                   static_draw,
                 )
              |> getCallCount
              |> expect == 1;
            })
          );

          describe("init index buffer", () =>
            test("bufferData", () => {
              let element_array_buffer = 1;
              let static_draw = 2;
              let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
              let state =
                state^
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~element_array_buffer,
                       ~static_draw,
                       ~bufferData,
                       (),
                     ),
                   );

              let state =
                state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

              bufferData
              |> withThreeArgs(
                   element_array_buffer,
                   BoxGeometryTool.getBoxGeometryIndices(state),
                   static_draw,
                 )
              |> getCallCount
              |> expect == 1;
            })
          );
        });

        describe("send uniform data", () => {
          describe("test send data per shader", () =>
            test("send u_pMatrix", () => {
              let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
              let name = "u_pMatrix";
              let pos = 0;
              let getUniformLocation =
                GLSLLocationTool.getUniformLocation(~pos, sandbox, name);
              let state =
                state^
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~uniformMatrix4fv,
                       ~getUniformLocation,
                       (),
                     ),
                   );

              let state =
                state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

              uniformMatrix4fv
              |> withThreeArgs(
                   pos,
                   Obj.magic(false),
                   Obj.magic(
                     PerspectiveCameraProjectionTool.getPMatrixOfCreateBasicCameraViewPerspectiveCamera(),
                   ),
                 )
              |> expect
              |> toCalledOnce;
            })
          );

          describe("send u_skyboxVMatrix", () =>
            test("send camera's vMatrix which not translate", () => {
              let state =
                state^
                |> TransformAPI.setTransformLocalPosition(
                     cameraTransformRef^,
                     (10., 2., 3.),
                   )
                |> TransformAPI.setTransformLocalEulerAngles(
                     cameraTransformRef^,
                     (1., 3., 3.5),
                   );

              let uniformMatrix4fv = createEmptyStubWithJsObjSandbox(sandbox);
              let name = "u_skyboxVMatrix";
              let pos = 0;
              let getUniformLocation =
                GLSLLocationTool.getUniformLocation(~pos, sandbox, name);
              let state =
                state
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~uniformMatrix4fv,
                       ~getUniformLocation,
                       (),
                     ),
                   );

              let state =
                state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

              uniformMatrix4fv
              |> withThreeArgs(
                   pos,
                   Obj.magic(false),
                   Obj.magic(
                     Float32Array.make([|
                       0.9967669248580933,
                       (-0.060127560049295425),
                       0.05329582467675209,
                       0.,
                       0.06096487492322922,
                       0.9980385303497314,
                       (-0.014225305989384651),
                       0.,
                       (-0.0523359552025795),
                       0.017428487539291382,
                       0.9984773993492126,
                       (-0.),
                       0.,
                       0.,
                       0.,
                       1.,
                     |]),
                   ),
                 )
              |> expect
              |> toCalledOnce;
            })
          );

          describe("send u_skyboxCubeMapSampler", () =>
            test("send skybox cubemap unit which should be 0", () => {
              let uniform1i = createEmptyStubWithJsObjSandbox(sandbox);
              let name = "u_skyboxCubeMapSampler";
              let pos = 0;
              let getUniformLocation =
                GLSLLocationTool.getUniformLocation(~pos, sandbox, name);
              let state =
                state^
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(
                       ~sandbox,
                       ~uniform1i,
                       ~getUniformLocation,
                       (),
                     ),
                   );

              let state =
                state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

              uniform1i |> withTwoArgs(pos, 0) |> expect |> toCalledOnce;
            })
          );
        });

        describe("draw", () =>
          test("test drawElements", () => {
            let triangles = 1;
            let unsigned_short = 2;
            let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
            let state =
              state^
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(
                     ~sandbox,
                     ~triangles,
                     ~unsigned_short,
                     ~drawElements,
                     (),
                   ),
                 );

            let state =
              state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

            drawElements
            |> withFourArgs(
                 triangles,
                 BoxGeometryTool.getBoxGeometryIndices(state)
                 |> Uint16Array.length,
                 unsigned_short,
                 0,
               )
            |> getCallCount
            |> expect == 1;
          })
        );

        describe("restore gl state", () => {
          test("set depth func to LESS", () => {
            let depthFunc = createEmptyStubWithJsObjSandbox(sandbox);
            let less = 1;
            let state =
              state^
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(~sandbox, ~depthFunc, ~less, ()),
                 );

            let state =
              state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

            depthFunc |> expect |> toCalledWith([|less|]);
          });
          test("set side to front", () => {
            let cullFace = createEmptyStubWithJsObjSandbox(sandbox);
            let back = 1;
            let state =
              state^
              |> FakeGlTool.setFakeGl(
                   FakeGlTool.buildFakeGl(~sandbox, ~cullFace, ~back, ()),
                 );

            let state =
              state |> DirectorTool.init |> DirectorTool.runWithDefaultTime;

            cullFace |> SinonTool.calledWith(_, back) |> expect == true;
          });
        });
      });
    });
  });
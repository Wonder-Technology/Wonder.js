open Wonder_jest;

let _ =
  describe("test update_camera job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      TestCPTool.init(
        ~sandbox,
        ~updatePipelineData={
          name: "update",
          firstGroup: "frame",
          groups: [
            {
              name: "frame",
              link: Concat,
              elements: [{name: "update_camera", type_: Job}],
            },
          ],
        },
        (),
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("update all dirty perspectiveCameraProjections", () => {
      describe("test update one perspectiveCameraProjection", () => {
        testPromise("set pMatrix based on aspect, fovy, near, far", () => {
          let perspectiveCameraProjection =
            PerspectiveCameraProjectionRunAPI.create();
          PerspectiveCameraProjectionRunAPI.setNear(
            perspectiveCameraProjection,
            0.2->NearVO.create,
          );
          PerspectiveCameraProjectionRunAPI.setFar(
            perspectiveCameraProjection,
            1000.->FarVO.create,
          );
          PerspectiveCameraProjectionRunAPI.setFovy(
            perspectiveCameraProjection,
            60.->FovyVO.create,
          );
          PerspectiveCameraProjectionRunAPI.setAspect(
            perspectiveCameraProjection,
            1.->AspectVO.create,
          );

          DirectorCPTool.initAndUpdate(
            ~handleSuccessFunc=
              () => {
                PerspectiveCameraProjectionRunAPI.getPMatrix(
                  perspectiveCameraProjection,
                )
                ->OptionSt.getExn
                ->ProjectionMatrixVO.value
                ->expect
                == Js.Typed_array.Float32Array.make([|
                     1.7320508075688776,
                     0.,
                     0.,
                     0.,
                     0.,
                     1.7320508075688776,
                     0.,
                     0.,
                     0.,
                     0.,
                     (-1.0004000800160033),
                     (-1.),
                     0.,
                     0.,
                     (-0.40008001600320064),
                     0.,
                   |])
              },
            (),
          );
        });
        testPromise("if not set aspect, compute it", () => {
          let perspectiveCameraProjection =
            PerspectiveCameraProjectionRunAPI.create();
          PerspectiveCameraProjectionRunAPI.setNear(
            perspectiveCameraProjection,
            0.2->NearVO.create,
          );
          PerspectiveCameraProjectionRunAPI.setFar(
            perspectiveCameraProjection,
            1000.->FarVO.create,
          );
          PerspectiveCameraProjectionRunAPI.setFovy(
            perspectiveCameraProjection,
            60.->FovyVO.create,
          );
          DirectorCPTool.prepare(~pictureSize=(20, 20), ());

          DirectorCPTool.initAndUpdate(
            ~handleSuccessFunc=
              () => {
                PerspectiveCameraProjectionRunAPI.getPMatrix(
                  perspectiveCameraProjection,
                )
                ->OptionSt.getExn
                ->ProjectionMatrixVO.value
                ->expect
                == Js.Typed_array.Float32Array.make([|
                     1.7320508075688776,
                     0.,
                     0.,
                     0.,
                     0.,
                     1.7320508075688776,
                     0.,
                     0.,
                     0.,
                     0.,
                     (-1.0004000800160033),
                     (-1.),
                     0.,
                     0.,
                     (-0.40008001600320064),
                     0.,
                   |])
              },
            (),
          );
        });
        testPromise("if not set near, fail", () => {
          let perspectiveCameraProjection =
            PerspectiveCameraProjectionRunAPI.create();
          PerspectiveCameraProjectionRunAPI.setFar(
            perspectiveCameraProjection,
            1000.->FarVO.create,
          );
          PerspectiveCameraProjectionRunAPI.setFovy(
            perspectiveCameraProjection,
            60.->FovyVO.create,
          );
          PerspectiveCameraProjectionRunAPI.setAspect(
            perspectiveCameraProjection,
            1.->AspectVO.create,
          );

          ExpectStreamTool.toFail(
            ~execFunc=
              DirectorCPTool.initAndUpdate(~handleAfterInitFunc=() => ()),
            ~message={j|fovy,near,far should all exist|j},
          );
        });
      });

      describe("test update multiple perspectiveCameraProjections", () => {
        testPromise(
          {j|create perspectiveCameraProjection;
            update;
            set perspectiveCameraProjection's far;
            update

            perspectiveCameraProjection's pMatrix should be updated with new far;
        |j},
          () => {
            let perspectiveCameraProjection =
              PerspectiveCameraProjectionRunAPI.create();
            PerspectiveCameraProjectionRunAPI.setNear(
              perspectiveCameraProjection,
              0.2->NearVO.create,
            );
            PerspectiveCameraProjectionRunAPI.setFar(
              perspectiveCameraProjection,
              1000.->FarVO.create,
            );
            PerspectiveCameraProjectionRunAPI.setFovy(
              perspectiveCameraProjection,
              60.->FovyVO.create,
            );
            PerspectiveCameraProjectionRunAPI.setAspect(
              perspectiveCameraProjection,
              1.->AspectVO.create,
            );

            DirectorCPTool.initAndUpdateAndUpdate(
              ~handleSuccessAfterUpdate1Func=
                () => {
                  PerspectiveCameraProjectionRunAPI.setFar(
                    perspectiveCameraProjection,
                    2000.->FarVO.create,
                  )
                },
              ~handleSuccessAfterUpdate2Func=
                () => {
                  PerspectiveCameraProjectionRunAPI.getPMatrix(
                    perspectiveCameraProjection,
                  )
                  ->OptionSt.getExn
                  ->ProjectionMatrixVO.value
                  ->expect
                  == Js.Typed_array.Float32Array.make([|
                       1.7320508075688776,
                       0.,
                       0.,
                       0.,
                       0.,
                       1.7320508075688776,
                       0.,
                       0.,
                       0.,
                       0.,
                       (-1.0002000331878662),
                       (-1.),
                       0.,
                       0.,
                       (-0.40004000067710876),
                       0.,
                     |])
                },
              (),
            );
          },
        )
      });
    });

    describe("update camera buffer data", () => {
      describe(
        "set active camera's viewInverse, projectionInverse, near, far to camera buffer data",
        () => {
        testPromise("test", () => {
          let (_, transform, (cameraView, cameraProjection)) =
            CameraTool.createCameraGameObject();
          let pos = (1., 2., 3.)->PositionTool.create;
          TransformRunAPI.setLocalPosition(transform, pos)
          ->ResultTool.getExnSuccessValue;
          BasicCameraViewRunAPI.active(cameraView);
          WebGPUDependencyTool.build(~sandbox, ())->WebGPUDependencyTool.set;
          CameraCPTool.buildAndSetAllBufferData(
            WebGPUDependencyTool.createDeviceObject(),
          );

          DirectorCPTool.initAndUpdate(
            ~handleSuccessFunc=
              () => {
                let (_, typeArr) =
                  CameraCPTool.getCameraBufferData()->OptionSt.getExn;

                typeArr->expect
                == Js.Typed_array.Float32Array.make([|
                     1.,
                     0.,
                     0.,
                     0.,
                     0.,
                     1.,
                     0.,
                     0.,
                     0.,
                     0.,
                     1.,
                     0.,
                     0.,
                     0.,
                     0.,
                     1.,
                     0.5773502588272095,
                     (-0.),
                     (-0.),
                     (-0.),
                     (-0.),
                     0.5773502588272095,
                     0.,
                     (-0.),
                     (-0.),
                     (-0.),
                     (-0.),
                     (-4.999500274658203),
                     (-0.),
                     (-0.),
                     (-1.),
                     5.000500202178955,
                     0.10000000149011612,
                     1000.,
                   |]);
              },
            (),
          );
        })
      });

      testPromise("set camera buffer's data", () => {
        let (_, transform, (cameraView, cameraProjection)) =
          CameraTool.createCameraGameObject();
        BasicCameraViewRunAPI.active(cameraView);
        let setSubFloat32DataStubData =
          createEmptyStub(refJsObjToSandbox(sandbox^))
          ->SinonCPTool.createThreeArgsEmptyStubData;
        WebGPUDependencyTool.build(
          ~sandbox,
          ~setSubFloat32Data=setSubFloat32DataStubData->SinonCPTool.getDpFunc,
          (),
        )
        ->WebGPUDependencyTool.set;
        CameraCPTool.buildAndSetAllBufferData(
          WebGPUDependencyTool.createDeviceObject(),
        );

        DirectorCPTool.initAndUpdate(
          ~handleSuccessFunc=
            () => {
              let (cameraBuffer, typeArr) =
                CameraCPTool.getCameraBufferData()->OptionSt.getExn;

              setSubFloat32DataStubData
              ->SinonCPTool.getStub
              ->expect
              ->SinonCPTool.toCalledWith((
                  0,
                  typeArr,
                  cameraBuffer->UniformBufferVO.value,
                ));
            },
          (),
        );
      });
    });
  });

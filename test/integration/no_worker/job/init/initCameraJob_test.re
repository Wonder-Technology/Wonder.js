open Wonder_jest;

open BasicCameraViewAPI;

let _ =
  describe(
    "test init basicCameraView job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let _buildNoWorkerJobConfig = () =>
        NoWorkerJobConfigTool.buildNoWorkerJobConfig(
          ~initPipelines={|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "init_camera"
        }
      ]
    }
  ]
        |},
          ~initJobs={|
[
        {
          "name": "init_camera"
        }
]
        |},
          ()
        );
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

      CameraTool.testBuildPMatrix(
        () =>
          TestTool.initWithJobConfigWithoutBuildFakeDom(
            ~sandbox,
            ~noWorkerJobRecord=_buildNoWorkerJobConfig(),
            ()
          ),
        (state) => state |> DirectorTool.init
      );

      describe
      ("init arcballCameraController",
      (
      () => {
describe
("test init one arcballCameraController",
(
() => {
describe
("bind event",
(
() => {
describe
("bind point drag event",
(
() => {

describe
("change orbit",
(
() => {

  test(
  "set phi",
  (
  () => {
  
  })
  );


     /* test(
     "set theta",
     (
     () => {
     

     })
     );  */



})
);


})
);





})
);

/* describe
("add event handleFunc to state",
(
() => {
TODO test unbind
})
); */




})
);


/* describe
("test init two arcballCameraControllers",
(
() => {

})
); */


      })
      );
    }
  );
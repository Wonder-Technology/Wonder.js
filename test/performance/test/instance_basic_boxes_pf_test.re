open Wonder_jest;

open WonderBenchmark;

open Benchmark;

open WonderCommonlib;

let _ =
  describe(
    "instance + basic boxes",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      open Puppeteer;
      open Js.Promise;
      open Node;
      let sandbox = getSandboxDefaultVal();
      let state = ref(createEmptyState());
      let browser = ref(None);
      let page = ref(None);
      beforeAllPromise(
        () => BenchmarkTool.prepareForNoHeadless("instance_basic_boxes.json", browser, page, state)
      );
      afterAllPromise(() => BenchmarkTool.handleAfterAll(browser^, state^));
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test static",
        () => {
          describe(
            "test hardware instance",
            () =>
              testPromise(
                "create 100k boxes",
                () => {
                  let body = [%bs.raw
                    {| function() {
                var state = wd.setMainConfig({
                    isTest: false
                });

                return initSample(state);



                function initSample(state) {
var n1 = performance.now();

                var data = InstanceBasicBoxesTool.createBoxes(1, 60000, true, state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.setPosition(boxes, state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.createCamera(state);
                    var state = data[0];

var n2 = performance.now();

                    var state = wd.initDirector(state);



                    /* var state = wd.setState(state); */


var n3 = performance.now();
                    var state = wd.loopBody(100.0, state);




var n4 = performance.now();


                    /* return state; */




return {"errorRate": 10, "textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4] }
                }
}
|}
                  ];
                  state^
                  |> addScriptList(["./test/performance/js/InstanceBasicBoxesTool.js"])
                  |> exec("create_100k_boxes_hardware", [@bs] body)
                  |> compare((expect, toBe))
                }
              )
          );
          describe(
            "test batch instance",
            () =>
              testPromise(
                "create 2k boxes",
                () => {
                  let body = [%bs.raw
                    {| function() {
                var state = wd.setMainConfig({
                    isTest: false,
                    gpuConfig: {
useHardwareInstance:false
                    }
                });

                return initSample(state);



                function initSample(state) {
var n1 = performance.now();

                var data = InstanceBasicBoxesTool.createBoxes(1, 2000, true, state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.setPosition(boxes, state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.createCamera(state);
                    var state = data[0];

var n2 = performance.now();

                    var state = wd.initDirector(state);



var n3 = performance.now();
                    var state = wd.loopBody(100.0, state);




var n4 = performance.now();


return {"errorRate": 10, "textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4] }
                }
}
|}
                  ];
                  state^
                  |> addScriptList(["./test/performance/js/InstanceBasicBoxesTool.js"])
                  |> exec("create_2k_boxes_batch", [@bs] body)
                  |> compare((expect, toBe))
                }
              )
          )
        }
      );
      describe(
        "test dynamic",
        () => {
          testPromise(
            "create 10k boxes+transform",
            () => {
              let body = [%bs.raw
                {| function() {
                var state = wd.setMainConfig({
                    isTest: false
                });

                return initSample(state);



                function initSample(state) {
var n1 = performance.now();

                var data = InstanceBasicBoxesTool.createBoxes(1, 10000, false, state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.setPosition(boxes, state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.createCamera(state);
                    var state = data[0];



                    var state = InstanceBasicBoxesTool.setData(boxes, state);


var n2 = performance.now();

                    var state = wd.initDirector(state);





var n3 = performance.now();
                    var state = wd.loopBody(100.0, state);




var n4 = performance.now();





return {"errorRate": 10, "textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4] }
                }
}
|}
              ];
              state^
              |> addScriptList(["./test/performance/js/InstanceBasicBoxesTool.js"])
              |> exec("create_10k_boxes+transform", [@bs] body)
              |> compare((expect, toBe))
            }
          );
          testPromise(
            "create 10k boxes+transform+set parent",
            () => {
              let body = [%bs.raw
                {| function() {
                var state = wd.setMainConfig({
                    isTest: false
                });

                return initSample(state);



                function initSample(state) {
var n1 = performance.now();

                var data = InstanceBasicBoxesTool.createBoxesWithHierachy(5000, false, state);

                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.setPosition(boxes, state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.createCamera(state);
                    var state = data[0];



                    var state = InstanceBasicBoxesTool.setData(boxes, state);


var n2 = performance.now();

                    var state = wd.initDirector(state);





var n3 = performance.now();
                    var state = wd.loopBody(100.0, state);




var n4 = performance.now();





return {"errorRate": 10, "textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4] }
                }
}
|}
              ];
              state^
              |> addScriptList(["./test/performance/js/InstanceBasicBoxesTool.js"])
              |> exec("create_10k_boxes+transform+set_parent", [@bs] body)
              |> compare((expect, toBe))
            }
          );
          testPromise(
            "create and dispose 200(sourceInstance box)*5(objectInstance box)",
            () => {
              let body = [%bs.raw
                {| function() {
                var state = wd.setMainConfig({
                    isTest: false
                });

                return initSample(state);



                function initSample(state) {
var n1 = performance.now();

                var data = InstanceBasicBoxesTool.createBoxes(1, 1, false, state);

                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.setPosition(boxes, state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.createCamera(state);
                    var state = data[0];



                var state = InstanceBasicBoxesTool.createAndDisposeSourceInstanceGameObjects(boxes, state);


var n2 = performance.now();

                    var state = wd.initDirector(state);





var n3 = performance.now();
                    var state = wd.loopBody(100.0, state);

var n4 = performance.now();
                    var state = wd.loopBody(200.0, state);



var n5 = performance.now();





return {"errorRate": 10, "textArray": ["prepare", "init", "loopBody1", "loopBody2"], "timeArray": [n1, n2, n3, n4, n5] }
                }
}
|}
              ];
              state^
              |> addScriptList(["./test/performance/js/InstanceBasicBoxesTool.js"])
              |> exec("createAndDispose_200_5_boxes", [@bs] body)
              |> compare((expect, toBe))
            }
          );
          testPromise(
            "create and dispose 1(sourceInstance box)*2k(objectInstance box)",
            () => {
              let body = [%bs.raw
                {| function() {
                var state = wd.setMainConfig({
                    isTest: false
                });

                return initSample(state);



                function initSample(state) {
var n1 = performance.now();

                var data = InstanceBasicBoxesTool.createBoxes(1, 1, false, state);

                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.setPosition(boxes, state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.createCamera(state);
                    var state = data[0];



                var state = InstanceBasicBoxesTool.createAndDisposeObjectInstanceGameObjects(boxes, state);


var n2 = performance.now();

                    var state = wd.initDirector(state);





var n3 = performance.now();
                    var state = wd.loopBody(100.0, state);

var n4 = performance.now();
                    var state = wd.loopBody(200.0, state);



var n5 = performance.now();





return {"errorRate": 10, "textArray": ["prepare", "init", "loopBody1", "loopBody2"], "timeArray": [n1, n2, n3, n4, n5] }
                }
}
|}
              ];
              state^
              |> addScriptList(["./test/performance/js/InstanceBasicBoxesTool.js"])
              |> exec("createAndDispose_1_2k_boxes", [@bs] body)
              |> compare((expect, toBe))
            }
          )
        }
      )
    }
  );
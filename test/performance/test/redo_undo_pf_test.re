open Wonder_jest;

open WonderBenchmark;

open Benchmark;

open WonderCommonlib;

let _ =
  describe(
    "redo undo",
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
        () => BenchmarkTool.prepareForNoHeadless(~scriptFilePathList=["./test/performance/js/RedoUndoTool.js", "./test/performance/js/BasicBoxesTool.js", "./test/performance/js/InstanceBasicBoxesTool.js", "./test/performance/js/CameraTool.js"], "redo_undo.json", browser, page, state)
      );
      afterAllPromise(() => BenchmarkTool.handleAfterAll(browser^, state^));
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
          testPromise(
            "copy 1k boxes(objectInstance)+restore from 1k boxes and 1k boxes(objectInstance)",
            () => {
              let body = [%bs.raw
                {| function() {
                var state = wd.setMainConfig({
                    isTest: false
                });

                return initSample(state);



                function initSample(state) {
var n1 = performance.now();


                var data = RedoUndoTool.createBoxesByInstance(1000, state);
                    var state = data[0];
                    var box = data[1];

                    var data = RedoUndoTool.setPosition([box], state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = RedoUndoTool.createCamera(state);
                    var state = data[0];



                    var state = RedoUndoTool.redoUndoShader(state);


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
              |> exec("copy_1k_boxes(objectInstance)+restore_from_1k_boxes_and_1k_boxes(objectInstance)", [@bs] body)
              |> compare((expect, toBe))
            }
          );
    }
  );
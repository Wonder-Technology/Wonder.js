open Wonder_jest;

open WonderBenchmark;

open Benchmark;

open WonderCommonlib;

let _ =
  describe(
    "basic boxes",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      open Puppeteer;
      open Js.Promise;
      let sandbox = getSandboxDefaultVal();
      let state = ref(createEmptyState());
      let browser = ref(None);
      let page = ref(None);
      beforeAllPromise(
        () =>
          launch(

            ~options={
              "ignoreHTTPSErrors": Js.Nullable.empty,
              "executablePath": Js.Nullable.empty,
              "slowMo": Js.Nullable.empty,
              "args": Js.Nullable.empty,
              /* "args": Js.Nullable.return([|"--headless", "--hide-scrollbars", "--mute-audio"|]), */
              "handleSIGINT": Js.Nullable.empty,
              "timeout": Js.Nullable.empty,
              "dumpio": Js.Nullable.empty,
              "userDataDir": Js.Nullable.empty,
              "headless": Js.Nullable.return(Js.false_)
            },
            ()
          )
          |> then_(
               (b) => {
                 browser := Some(b);
                 b |> Browser.newPage
               }
             )
          |> then_(
               (p) => {
                 page := Some(p);
                 state :=
                   createState(p, browser^ |> Js.Option.getExn, "./dist/wd.js", "basic_boxes.json");
                 p |> resolve
               }
             )
      );
      afterAllPromise(() => browser^ |> Js.Option.getExn |> Browser.close);
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test time",
        () =>
          testPromiseWithTimeout(
            "create 20k boxes",
            () => {
              let body = [%bs.raw
                {| function() {
                var state = wd.setMainConfig({
                    isTest: false
                });

                return initSample(state);


                function createBoxes(count, state) {
                    var boxes = [];

                    var data = createBox(state);
                    var state = data[0];
                    var box = data[1];


                    var data = wd.cloneGameObject(box, count, true, state);
                    var state = data[0];
                    var newBoxes = data[1];


                    let flatten = (arr) => {
                        return arr.reduce((a, b) => {
                            let arr = a.concat(b);
                            return arr;
                        }, []);
                    };
                    newBoxes = flatten(newBoxes);

                    return [state, newBoxes];

                }


                function createBoxesWithoutClone(count, state) {
                    var boxes = [];
                    // var state$ = state;

                    // var [state, box] = wd.createBox(state);



                    for (let i = 0; i < count; i++) {
                        var [state, box] = wd.createBox(state);


                        // var [state, newBoxes] = cloneGameObject(box, 2000, state);

                        boxes.push(box);
                    }

                    return [state, boxes];
                }



                function setPosition(boxes, state) {
                    var playgroundSize = 500;

                    for (let i = 0, len = boxes.length; i < len; i++) {
                        let box = boxes[i];
                        // state = initGameObject(box, state);


                        var transform = wd.getGameObjectTransformComponent(box, state);


                        // var pos = wd.getTransformPosition(transform, state);
                        var localPos = wd.getTransformLocalPosition(transform, state);

                        state = wd.setTransformLocalPosition(transform, [Math.random() * 2 * playgroundSize - playgroundSize, Math.random() * 2 * playgroundSize - playgroundSize, Math.random() * 2 * playgroundSize - playgroundSize], state);


                        // console.log(wd.getTransformLocalPosition(transform, state));
                    }

                    return [state, boxes];
                }


                function initSample(state) {
var n1 = performance.now();
                    var data = createBoxes(2000, state);

                    var state = data[0];
                    var boxes = data[1];

                    var data = setPosition(boxes, state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = createCamera(state);
                    var state = data[0];

var n2 = performance.now();

                    var state = wd.initDirector(state);



                    /* var state = wd.initDirector(state); */
                    /* var state = wd.setState(state); */

var n3 = performance.now();
                    var state = wd.loopBody(100.0, state);




                    /* var state = wd.loopBody(200.0, state); */
                    /* var state = wd.loopBody(300.0, state); */


var n4 = performance.now();


                    /* return state; */




return [n1, n2, n3, n4]
                }

                let _getRandom = function (num) {
                    return Math.floor(Math.random() * num);
                }

                let _setData = (boxes, state) => {
                    boxes.forEach(function (box) {
                        var transform = wd.getGameObjectTransformComponent(box, state);


                        var pos = wd.getTransformPosition(transform, state);
                        var localPos = wd.getTransformLocalPosition(transform, state);

                        if (pos[0] >= 500) {
                            state = wd.setTransformLocalPosition(transform, [100, localPos[1], localPos[2]], state);

                        }
                        else if (pos[0] < 500) {
                            state = wd.setTransformPosition(transform, [pos[0] + 10, pos[1], pos[2]], state);
                        }
                    });

                    return state;
                };

                function setData(boxes, state) {
                    return scheduleLoop((elapsed, state) => _setData(boxes, state), state)
                };

                function getRandomParentIndex(num) {
                    return Math.floor(Math.random() * num);
                }


                function setParent(boxes, state) {
                    for (var i = 1, len = 10; i < len; i++) {
                        var box = boxes[i];

                        state = wd.setTransformParent(boxes[i - 1], box, state)
                    }

                    return scheduleLoop((elapsed, state) => {
                        var box = boxes[i];

                        state = wd.setTransformParent(boxes[wd.getRandomParentIndex(10)], box, state);

                        return _setData(boxes, state);
                    }, state)
                }

                window.newBoxes$ = null;

                function createAndDisposeGameObjects(boxes, state) {
                    window.sourceBox = boxes[0];
                    window.boxes = [];


                    return scheduleLoop((elapsed, state) => {
                        // for(let i = 0, len = window.boxes.length; i < len; i++){
                        //     let box = window.boxes[i];
                        //     state = disposeGameObject(box, state);
                        // }

                        var state = wd.batchDisposeGameObject(window.boxes, state);


                        // var [state, newBoxes] = wd.createBoxesWithoutClone(2000, state);

                        var [state, newBoxes] = wd.cloneGameObject(window.sourceBox, 5000, true, state);
                        let flatten = (arr) => {
                            return arr.reduce((a, b) => {
                                let arr = a.concat(b);
                                return arr;
                            }, []);
                        };
                        newBoxes = flatten(newBoxes);


                        var [state, newBoxes] = wd.setPosition(newBoxes, state);



                        window.boxes = newBoxes;



                        for (let i = 0, len = newBoxes.length; i < len; i++) {
                            let box = newBoxes[i];
                            state = wd.initGameObject(box, state);
                        }

                        return state;

                    }, state)
                }

                function createBox(state) {
                    var data = wd.createBasicMaterial(state);
                    var state = data[0];
                    var material = data[1];

                    state = wd.setMaterialColor(material, [0.0, 0.5, 0.2], state);

                    var data = wd.createMeshRenderer(state);
                    var state = data[0];
                    var meshRenderer = data[1];

                    var data = wd.createGameObject(state);
                    var state = data[0];
                    var obj = data[1];

                    state = wd.addGameObjectMaterialComponent(obj, material, state);
                    state = wd.addGameObjectMeshRendererComponent(obj, meshRenderer, state);


                    var data = wd.createBoxGeometry(state);
                    var state = data[0];
                    var geometry = data[1];

                    state = wd.setBoxGeometryConfigData(geometry, {
                        width: 5,
                        height: 5,
                        depth: 5
                    }, state);




                    state = wd.addGameObjectGeometryComponent(obj, geometry, state);

                    return [state, obj];

                }

                function createCamera(state) {

                    var data = wd.createCameraController(state);
                    var state = data[0];
                    var cameraController = data[1];

                    state = wd.setPerspectiveCameraNear(cameraController, 0.1, state);
                    state = wd.setPerspectiveCameraFar(cameraController, 2000, state);
                    state = wd.setPerspectiveCameraFovy(cameraController, 60, state);
                    state = wd.setPerspectiveCameraAspect(cameraController, 1.0, state);


                    state = wd.setCameraControllerPerspectiveCamera(cameraController, state);



                    var data = wd.createGameObject(state);
                    var state = data[0];
                    var obj = data[1];

                    state = wd.addGameObjectCameraControllerComponent(obj, cameraController, state);

                    var transform = wd.getGameObjectTransformComponent(obj, state);

                    state = wd.setTransformLocalPosition(transform, [0, 0, 1500], state);

                    return [state, obj];
                }






}
|}
              ];
              state^ |> exec("create_20k_boxes", [@bs] body) |> compare((expect, toBe))
            },
            1600000
          )
      )
    }
  );
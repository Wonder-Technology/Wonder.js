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
                    function test(){
                        var arr = [];
                        for(var i = 0; i <= 100000; i++){
                        arr[i] = wd.add(1, 2);
                        }
                    }
var n1 = performance.now();
test();

var n2 = performance.now();

test();


var n3 = performance.now();


test();
test();


var n4 = performance.now();


return [n1, n2, n3, n4]
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
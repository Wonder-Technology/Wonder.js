open Node;

open WonderBenchmark;

open BenchmarkType;

let setTimeout = [%bs.raw
  {|
               function(timeout) {

                jest.setTimeout(timeout);
               }
                |}
];

let _prepare =
    (
      launchPromise,
      config,
      scriptFilePathList,
      fileName,
      browser,
      page,
      state
    ) => {
  setTimeout(500000) |> ignore;
  Js.Promise.(
    WonderBenchmark.(
      Benchmark.(
        Puppeteer.(
          launchPromise
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
                   createState(
                     ~config,
                     p,
                     browser^ |> Js.Option.getExn,
                     ["./dist/wd.js", ...scriptFilePathList],
                     fileName
                   )
                   |> Benchmark.prepareBeforeAll;
                 p |> resolve
               }
             )
        )
      )
    )
  )
};

let prepareForHeadless =
    (
      ~config={isClosePage: true, execCount: 20, extremeCount: 5, isGenerateDataFile: true},
      ~scriptFilePathList=[],
      fileName,
      browser,
      page,
      state
    ) => {
    WonderBenchmark.(
      Benchmark.(
        Puppeteer.(
        _prepare(

          launch(
            ~options={
              "ignoreHTTPSErrors": Js.Nullable.empty,
              "executablePath": Js.Nullable.empty,
              "slowMo": Js.Nullable.empty,
              /* "args": Js.Nullable.empty, */
              "args": Js.Nullable.return([|"--headless", "--hide-scrollbars", "--mute-audio"|]),
              "handleSIGINT": Js.Nullable.empty,
              "timeout": Js.Nullable.empty,
              "dumpio": Js.Nullable.empty,
              "userDataDir": Js.Nullable.empty,
              "headless": Js.Nullable.return(Js.false_)
            },
            ()
          ), config, scriptFilePathList, fileName, browser, page, state

        )
        )
      )
    )
};

let prepareForNoHeadless =
    (
      ~config={isClosePage: true, execCount: 20, extremeCount: 5, isGenerateDataFile: true},
      ~scriptFilePathList=[],
      fileName,
      browser,
      page,
      state
    ) => {
    WonderBenchmark.(
      Benchmark.(
        Puppeteer.(
        _prepare(
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
          ), config, scriptFilePathList, fileName, browser, page, state
          )
        )
      )
  )
};

let handleAfterAll = (browser, state) =>
  Js.Promise.(
    browser
    |> Js.Option.getExn
    |> Browser.close
    |> then_(
         (_) =>
           (Benchmark.needGenerateData(state) ? Benchmark.generateDataFile(state) : state)
           |> resolve
       )
  );
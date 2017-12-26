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

let getDataJsonFileName = (defaultFileName, ciFileName) => {
  open Json;
  open Decode;
  let json =
    Fs.readFileAsUtf8Sync(Path.join([|Process.cwd(), "test/ci/config.json"|])) |> Js.Json.parseExn;
  switch (json |> field("env", string)) {
  | "ci" => ciFileName
  | _ => defaultFileName
  }
};

let getConfig = (defaultConfig, ciConfig) => {
  open Json;
  open Decode;
  let json =
    Fs.readFileAsUtf8Sync(Path.join([|Process.cwd(), "test/ci/config.json"|])) |> Js.Json.parseExn;
  switch (json |> field("env", string)) {
  | "ci" => ciConfig
  | _ => defaultConfig
  }
};

let prepareForNoHeadless =
    (
      ~defaultConfig={
                       isClosePage: true,
                       execCount: 20,
                       extremeCount: 5,
                       generateDataFilePath: None
                     },
      ~ciConfig={isClosePage: true, execCount: 20, extremeCount: 5, generateDataFilePath: None},
      defaultFileName,
      ciFileName,
      browser,
      page,
      state
    ) => {
  setTimeout(100000) |> ignore;
  Js.Promise.(
    WonderBenchmark.(
      Benchmark.(
        Puppeteer.(
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
                   createState(
                     ~config=getConfig(defaultConfig, ciConfig),
                     p,
                     browser^ |> Js.Option.getExn,
                     "./dist/wd.js",
                     getDataJsonFileName(defaultFileName, ciFileName)
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
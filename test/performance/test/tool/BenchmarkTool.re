open Node;

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

let prepareForNoHeadless = (defaultFileName, ciFileName, browser, page, state) =>
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
                     p,
                     browser^ |> Js.Option.getExn,
                     "./dist/wd.js",
                     getDataJsonFileName(defaultFileName, ciFileName)
                   );
                 p |> resolve
               }
             )
        )
      )
    )
  );
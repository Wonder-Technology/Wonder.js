open WonderRenderTest;

open RenderTestData;

open Js.Promise;

let generateCorrectImage = () =>
  PuppeteerUtils.launchHeadlessBrowser()
  |> then_((browser) => GenerateCorrectImage.generate(browser, renderTestData));

let generateReport = (reportFilePath, compareResultData) =>
  /* PuppeteerUtils.launchHeadlessBrowser()
     |> then_((browser) => Comparer.compare(browser, renderTestData))
     |> then_(
          (compareResultData) => */
  GenerateReport.generateHtmlFile(reportFilePath, compareResultData)
  |> then_(
       (htmlStr) => {
         GenerateDebug.generateHtmlFiles(reportFilePath, compareResultData);
         reportFilePath |> resolve
       }
     );

/* ); */
let runTest = (browserArr) =>
  (
    switch (browserArr |> Js.Array.length) {
    | 0 => PuppeteerUtils.launchHeadlessBrowser()
    | _ => browserArr[0] |> resolve
    }
  )
  |> then_(
       (browser) =>
         Comparer.compare(browser, renderTestData)
         |> then_((data) => PuppeteerUtils.closeBrowser(browser) |> then_((_) => data |> resolve))
         |> then_(
              ((_, list) as compareResultData) =>
                ! Comparer.isPass(list) ?
                  (Comparer.getFailText(list), compareResultData) |> Obj.magic |> reject :
                  compareResultData |> resolve
            )
     );
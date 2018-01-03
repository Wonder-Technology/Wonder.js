/* open WonderRenderTest; */

open RenderTestData;

open Js.Promise;

let generateCorrectImage = () => GenerateCorrectImage.generate(renderTestData);

let runTest = (browser) =>
  Comparer.compare(browser, renderTestData)
  |> then_(
       ((_, list)) =>
         ! Comparer.isPass(list) ?
           Comparer.getFailText(list) |> Obj.magic |> reject : () |> resolve
     );
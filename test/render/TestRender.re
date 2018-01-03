open WonderRenderTest;

open RenderTestData;

open Js.Promise;

let generate = () => GenerateCorrectImage.generate(renderTestData);

let runTest = () =>
  Comparer.compare(renderTestData)
  |> then_(
       ((_, list)) =>
         ! Comparer.isPass(list) ?
           Comparer.getFailText(list) |> Obj.magic |> reject : () |> resolve
     );
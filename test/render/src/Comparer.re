open RenderTestDataType;

open Contract;

open Js.Promise;

/* let _isPass = (pixelCount, correctRate, hitCount) =>
   hitCount >= ((pixelCount / 4 |> Number.intToFloat) *. correctRate |> Js.Math.floor); */
/* let _getTargetDistance = (distance) =>
   switch distance {
   | None => 0.15
   | Some(d) => d
   }; */
let _getTargetDiffPercent = (percent) =>
  switch percent {
  | None => 0.15
  | Some(p) => p
  };

let _getTargetThreshold = (threshold) =>
  switch threshold {
  | None => 0.1
  | Some(t) => t
  };

let _getCaseText = (imagePath) => Node.Path.basename_ext(imagePath, ".png");

let compare = (browser, renderTestData) => {
  WonderCommonlib.DebugUtils.log("begin compare") |> ignore;
  GenerateCurrentImage.generate(browser, renderTestData)
  /* GenerateCorrectImage.generate(renderTestData) */
  |> then_(
       (_) => {
         WonderCommonlib.DebugUtils.log("000") |> ignore;
         (
           GenerateCurrentImage.getAllImagePathDataList(renderTestData),
           GenerateCorrectImage.getAllImagePathDataList(renderTestData)
         )
         |> resolve
       }
     )
  |> then_(
       (data) => {
         WonderCommonlib.DebugUtils.log("aaa") |> ignore;
         WonderCommonlib.DebugUtils.log(data) |> ignore;
         data |> resolve
       }
     )
  |> then_(
       ((currentImagePathDataList, correctImagePathDataList)) =>
         List.fold_left2(
           (
             promise,
             (currentImagePath, currentTestDataItem),
             (correctImagePath, correctTestDataItem)
           ) =>
             promise
             |> then_(
                  (resultList) => {
                    WonderCommonlib.DebugUtils.log("bbb") |> ignore;
                    Jimp.read(currentImagePath)
                    |> then_(
                         (currentImage) =>
                           Jimp.read(correctImagePath)
                           |> then_(
                                (correctImage) => {
                                  WonderCommonlib.DebugUtils.log("ccc") |> ignore;
                                  /* let actualDistance = Jimp.distance(currentImage, correctImage); */
                                  let diff =
                                    Jimp.diff(
                                      currentImage,
                                      correctImage,
                                      _getTargetThreshold(currentTestDataItem.threshold)
                                    );
                                  WonderCommonlib.DebugUtils.log("ddd") |> ignore;
                                  /* if (actualDistance >= _getTargetDistance(distance)
                                     && diff##percent >= _getTargetDiffPercent(diffPercent)) { */
                                  if (diff##percent
                                      >= _getTargetDiffPercent(currentTestDataItem.diffPercent)) {
                                    [
                                      (
                                        _getCaseText(correctImagePath),
                                        currentImagePath,
                                        correctImagePath,
                                        diff##image,
                                        currentTestDataItem
                                      ),
                                      ...resultList
                                    ]
                                    |> resolve
                                  } else {
                                    resultList |> resolve
                                  }
                                }
                              )
                       )
                  }
                ),
           [] |> resolve,
           currentImagePathDataList,
           correctImagePathDataList
         )
     )
  |> then_((compareResultList) => (renderTestData, compareResultList) |> resolve)
};

let isPass = (compareResultList) => compareResultList |> List.length === 0;

let getFailText = (compareResultList) =>
  "fail cases:\n"
  ++ (
    compareResultList
    |> List.fold_left(
         (arr, (caseText, _, _, _, _)) => {
           arr |> Js.Array.push(caseText) |> ignore;
           arr
         },
         [||]
       )
    |> Js.Array.joinWith(",")
  );
let create = (x, y) => (x, y)

let collectOption = (optionData1, optionData2) =>
  switch optionData1 {
  | None => OptionSt.buildFailResult()
  | Some(data1) =>
    switch optionData2 {
    | None => OptionSt.buildFailResult()
    | Some(data2) => (data1, data2)->Result.succeed
    }
  }

let collectResult = (resultData1, resultData2) =>
  resultData1->Result.bind(data1 => resultData2->Result.mapSuccess(data2 => (data1, data2)))

let getFirst = ((x, y)) => x

let getLast = ((x, y)) => y

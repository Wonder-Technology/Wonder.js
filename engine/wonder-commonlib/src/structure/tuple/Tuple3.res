let map = ((x, y, z), func) => (x->func, y->func, z->func)

let collectOption = (optionData1, optionData2, optionData3) =>
  switch optionData1 {
  | None => OptionSt.buildFailResult()
  | Some(data1) =>
    switch optionData2 {
    | None => OptionSt.buildFailResult()
    | Some(data2) =>
      switch optionData3 {
      | None => OptionSt.buildFailResult()
      | Some(data3) => (data1, data2, data3)->Result.succeed
      }
    }
  }

let collectResult = (resultData1, resultData2, resultData3) =>
  resultData1->Result.bind(data1 =>
    resultData2->Result.bind(data2 =>
      resultData3->Result.mapSuccess(data3 => (data1, data2, data3))
    )
  )

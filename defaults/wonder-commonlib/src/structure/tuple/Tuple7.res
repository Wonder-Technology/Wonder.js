let collectOption = (
  optionData1,
  optionData2,
  optionData3,
  optionData4,
  optionData5,
  optionData6,
  optionData7,
) =>
  switch optionData1 {
  | None => OptionSt.buildFailResult()
  | Some(data1) =>
    switch optionData2 {
    | None => OptionSt.buildFailResult()
    | Some(data2) =>
      switch optionData3 {
      | None => OptionSt.buildFailResult()
      | Some(data3) =>
        switch optionData4 {
        | None => OptionSt.buildFailResult()
        | Some(data4) =>
          switch optionData5 {
          | None => OptionSt.buildFailResult()
          | Some(data5) =>
            switch optionData6 {
            | None => OptionSt.buildFailResult()
            | Some(data6) =>
              switch optionData7 {
              | None => OptionSt.buildFailResult()
              | Some(data7) => (data1, data2, data3, data4, data5, data6, data7)->Result.succeed
              }
            }
          }
        }
      }
    }
  }

let collectResult = (
  resultData1,
  resultData2,
  resultData3,
  resultData4,
  resultData5,
  resultData6,
  resultData7,
) =>
  resultData1->Result.bind(data1 =>
    resultData2->Result.bind(data2 =>
      resultData3->Result.bind(data3 =>
        resultData4->Result.bind(data4 =>
          resultData5->Result.bind(data5 =>
            resultData6->Result.bind(data6 =>
              resultData7->Result.mapSuccess(data7 => (
                data1,
                data2,
                data3,
                data4,
                data5,
                data6,
                data7,
              ))
            )
          )
        )
      )
    )
  )

let collectOption =
    (
      optionData1,
      optionData2,
      optionData3,
      optionData4,
      optionData5,
      optionData6,
      optionData7,
    ) => {
  switch (optionData1) {
  | None => OptionSt.buildFailResult()
  | Some(data1) =>
    switch (optionData2) {
    | None => OptionSt.buildFailResult()
    | Some(data2) =>
      switch (optionData3) {
      | None => OptionSt.buildFailResult()
      | Some(data3) =>
        switch (optionData4) {
        | None => OptionSt.buildFailResult()
        | Some(data4) =>
          switch (optionData5) {
          | None => OptionSt.buildFailResult()
          | Some(data5) =>
            switch (optionData6) {
            | None => OptionSt.buildFailResult()
            | Some(data6) =>
              switch (optionData7) {
              | None => OptionSt.buildFailResult()
              | Some(data7) =>
                (data1, data2, data3, data4, data5, data6, data7)
                ->Result.succeed
              }
            }
          }
        }
      }
    }
  };
};

let getData = (e) => e##data;

let getRecord = (e) => OptionService.unsafeGet(e) |> getData;
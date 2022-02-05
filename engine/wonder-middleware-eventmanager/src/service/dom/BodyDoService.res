open POType

let getBodyExn = po => {
  po.body->WonderCommonlib.OptionSt.getExn
}

let setBody = (po, body) => {
  {
    ...po,
    body: Some(body),
  }
}

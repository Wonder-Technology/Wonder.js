let unsafeGet = Belt.Option.getUnsafe

let _getExn = %bs.raw(`
(nullableData) => {
  if (nullableData !== undefined) {
    return nullableData;
  }

  throw new Error("Not_found")
}
`)

// let getExn = Belt.Option.getExn
let getExn = (optionData:option<'a>):'a =>{
  optionData -> unsafeGet -> _getExn
}

let buildFailResult = () => Result.failWith(`data not exist in option data`)

let get = optionData =>
  switch optionData {
  | None => buildFailResult()
  | Some(data) => Result.succeed(data)
  }

let getWithDefault = Belt.Option.getWithDefault

let isSome = Belt.Option.isSome

let map = Belt.Option.map

let bind = Belt.Option.flatMap

let fromNullable = optionData => Js.Nullable.toOption(optionData)

let toNullable = optionData => Js.Nullable.from_opt(optionData)

let forEachResult = (optionData, func) =>
  switch optionData {
  | None => ()->Result.succeed
  | Some(data) => func(data)
  }

let rec sequenceResultM = optionData =>
  switch optionData {
  | None => None->Result.succeed
  | Some(result) => result->Result.mapSuccess(value => value->Some)
  }

let open_ = optionOptionData =>
  switch optionOptionData {
  | None => None
  | Some(optionData) => optionData
  }

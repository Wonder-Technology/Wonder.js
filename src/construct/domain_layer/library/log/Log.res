@bs.val @bs.scope("console") external trace: unit => unit = ""

let printForDebug = value => {
  Js.log(value)
  value
}

let printListForDebug = list => {
  Js.log(list->ListSt.toArray)
  list
}

let logForDebug = value => {
  Js.log(value)

  trace()
}

let getJsonStr = json => Js.Json.stringify(json->Obj.magic)

let buildDebugMessage = (~description, ~params, ()) =>
  j`
  Debug:

  description
  $description

  params
  $params

  `

let buildDebugJsonMessage = (~description, ~var, ()) => {
  let varStr = Js.Json.stringify(var->Obj.magic)
  j`
  DebugJson:

  description
  $description

  variable value
  $varStr
  `
}

let buildFatalMessage = (~title, ~description, ~reason, ~solution, ~params) =>
  j`
  Fatal:

  title
  $title

  description
  $description

  reason
  $reason

  solution
  $solution

  params
  $params

   `

let buildErrorMessage = (~title, ~description, ~reason, ~solution, ~params) =>
  j`
  Error:

  title
  $title

  description
  $description

  reason
  $reason

  solution
  $solution

  params
  $params

   `

let buildAssertMessage = (~expect, ~actual) => j`expect $expect, but actual $actual`

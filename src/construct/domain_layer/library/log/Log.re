let getJsonStr = json => Js.Json.stringify(json->Obj.magic);

let buildDebugMessage = (~description, ~params, ()) => {j|
  Debug:

  description
  $description

  params
  $params

  |j};

let buildDebugJsonMessage = (~description, ~var, ()) => {
  let varStr = Js.Json.stringify(var->Obj.magic);
  {j|
  DebugJson:

  description
  $description

  variable value
  $varStr
  |j};
};

let buildFatalMessage = (~title, ~description, ~reason, ~solution, ~params) => {j|
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

   |j};

let buildErrorMessage = (~title, ~description, ~reason, ~solution, ~params) => {j|
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

   |j};

let buildAssertMessage = (~expect, ~actual) => {j|expect $expect, but actual $actual|j};

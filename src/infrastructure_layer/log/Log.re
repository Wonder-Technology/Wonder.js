open Console;

/* let _isInBrowser = () => {}; */
/* let _isInNodejs = [%bs.raw
     {|
   function(){
   return ((typeof global != "undefined" && global.module) || (typeof module != "undefined")) && typeof module.exports != "undefined";
   }
       |}
   ];

   let _handleDifferentEnv = (handleInNodeJs, handleInOther) =>
     _isInNodejs() ? handleInNodeJs() : handleInOther(); */

let _log = msg => {
  log1(msg);
};

let _info = msg => {
  info1(msg);
};

let _warn = msg => {
  warn1(msg);
};

let _debug = msg => {
  log1(msg);
};

let _error = msg => {
  error1(msg);
};

let _trace = func => {
  trace();

  ();
};

let getJsonStr = json => Js.Json.stringify(json |> Obj.magic);

let print = value => {
  _log(value);
  value;
};

let printJson = value => {
  _log(getJsonStr(value));
  value;
};

let logVar = _log;

let logJson = var => Js.Json.stringify(var |> Obj.magic) |> _log;

let log = msg => _log({j|$msg|j});

let info = msg => _info({j|$msg|j});

let warn = msg => _warn({j|$msg|j});

let group = group;

let groupCollapsed = groupCollapsed;

let groupEnd = groupEnd;

let buildDebugMessage = (~description, ~params, ()) => {j|
  Debug:

  description
  $description

  params
  $params

  |j};

let debugWithFunc = (func, isTest: bool) => isTest ? func() : ();

let rec debug = (buildMessageFunc, isTest: bool) =>
  isTest
    ? {
      _debug(buildMessageFunc());
      _trace(debug);
    }
    : ();

let buildDebugJsonMessage = (~description, ~var, ()) => {
  let varStr = Js.Json.stringify(var |> Obj.magic);
  {j|
  DebugJson:

  description
  $description

  variable value
  $varStr
  |j};
};

let rec debugJson = (buildMessageFunc, isTest: bool) =>
  isTest
    ? {
      _debug(buildMessageFunc());
      _trace(debugJson);
    }
    : ();

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

// let fatal = (msg: Js.Exn.t) => {
//   Js.Exn.isCamlExceptionOrOpenVariant(msg)
//     ? {
//       switch (Js.Exn.stack(msg)) {
//       | Some(stack) => log(stack)
//       };

//       Exception.throw(
//         Js.Exn.message(msg)
//         |> Js.Option.getWithDefault("default fatal message"),
//       );
//     }
//     : {
//       Exception.throw(Obj.magic(msg));
//     };
// };

// let fatal = [%bs.raw
//   msg => {|
// if(!!msg.stack && !!msg.message){
//   console.log(msg.stack);
//   throw new Error(msg.message);
// }

// throw new Error(msg);
// |}
// ];

let fatal = [%bs.raw
  {|
  (msg) =>{
if(!!msg.stack && !!msg.message){
  console.log(msg.stack);
  throw new Error(msg.message);
}

throw new Error(msg);
  }
|}
];

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

let rec error = msg => {
  _error(msg);
  _trace(error);
};

let buildAssertMessage = (~expect, ~actual) => {j|expect $expect, but actual $actual|j};




function create(param) {
  return /* record */[
          /* gl */undefined,
          /* colorWrite */undefined,
          /* depthWrite */undefined,
          /* clearColor */undefined,
          /* side */undefined,
          /* depthTest */undefined,
          /* scissorTest */undefined,
          /* scissor */undefined,
          /* viewport */undefined
        ];
}

function deepCopyForRestore(param) {
  return /* record */[
          /* gl */param[/* gl */0],
          /* colorWrite */param[/* colorWrite */1],
          /* depthWrite */param[/* depthWrite */2],
          /* clearColor */param[/* clearColor */3],
          /* side */param[/* side */4],
          /* depthTest */param[/* depthTest */5],
          /* scissorTest */param[/* scissorTest */6],
          /* scissor */param[/* scissor */7],
          /* viewport */param[/* viewport */8]
        ];
}

export {
  create ,
  deepCopyForRestore ,
  
}
/* No side effect */




function create() {
  return /* record */[
          /* gl */undefined,
          /* colorWrite */undefined,
          /* clearColor */undefined,
          /* side */undefined,
          /* depthTest */undefined,
          /* viewport */undefined
        ];
}

function deepCopyForRestore(param) {
  return /* record */[
          /* gl */undefined,
          /* colorWrite */param[/* colorWrite */1],
          /* clearColor */param[/* clearColor */2],
          /* side */param[/* side */3],
          /* depthTest */param[/* depthTest */4],
          /* viewport */param[/* viewport */5]
        ];
}

export {
  create ,
  deepCopyForRestore ,
  
}
/* No side effect */

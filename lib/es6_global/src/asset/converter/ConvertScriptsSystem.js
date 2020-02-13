


function convertToScripts(param) {
  var extras = param[/* extras */15];
  if (extras !== undefined) {
    var scripts = extras[/* scripts */4];
    if (scripts !== undefined) {
      return scripts;
    } else {
      return /* array */[];
    }
  } else {
    return /* array */[];
  }
}

export {
  convertToScripts ,
  
}
/* No side effect */

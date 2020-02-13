


function getScriptAttributeName(param) {
  return "scriptAttribute";
}

function getScriptAttributeFieldName(param) {
  return "a";
}

function buildEventFunc(param) {
  return (function (script, api, state) {
      var scriptAttributeName = "scriptAttribute";
      var unsafeGetScriptAttribute = api.unsafeGetScriptAttribute;
      var scriptAttribute = unsafeGetScriptAttribute(script, scriptAttributeName, state);
      var unsafeGetScriptAttributeFieldValue = api.unsafeGetScriptAttributeFieldValue;
      var setScriptAttributeFieldValue = api.setScriptAttributeFieldValue;
      return setScriptAttributeFieldValue(script, /* tuple */[
                  scriptAttributeName,
                  "a",
                  unsafeGetScriptAttributeFieldValue("a", scriptAttribute) + 1 | 0
                ], state);
    });
}

function getAttributeFieldAValueAfterExecEventeFunc(param) {
  return 2;
}

export {
  getScriptAttributeName ,
  getScriptAttributeFieldName ,
  buildEventFunc ,
  getAttributeFieldAValueAfterExecEventeFunc ,
  
}
/* No side effect */

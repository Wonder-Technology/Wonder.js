

import * as GenerateAllABSystem$Wonderjs from "../../asset_bundle/all/generate/GenerateAllABSystem.js";

function generateAllABs(dependencyRelation, param) {
  return GenerateAllABSystem$Wonderjs.generate(dependencyRelation, /* tuple */[
              param[0],
              param[1]
            ]);
}

var buildDependencyRelation = GenerateAllABSystem$Wonderjs.buildDependencyRelation;

export {
  generateAllABs ,
  buildDependencyRelation ,
  
}
/* GenerateAllABSystem-Wonderjs Not a pure module */

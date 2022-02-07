'use strict';

var CreateGameObjectUtils$WonderGameobjectDataoriented = require("./CreateGameObjectUtils.bs.js");
var GetAllGameObjectUtils$WonderGameobjectDataoriented = require("./GetAllGameObjectUtils.bs.js");

function getData(param) {
  return {
          createStateFunc: (function (param) {
              return {
                      maxUID: 0
                    };
            }),
          createGameObjectFunc: CreateGameObjectUtils$WonderGameobjectDataoriented.create,
          getAllGameObjectsFunc: GetAllGameObjectUtils$WonderGameobjectDataoriented.getAll
        };
}

exports.getData = getData;
/* No side effect */

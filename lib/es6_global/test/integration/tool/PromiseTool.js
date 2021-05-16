

import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";

function judgeErrorMessage(targetMessage, promise) {
  return promise.catch((function (e) {
                var message = e.message;
                return Promise.resolve(Wonder_jest.Expect[/* toContainString */11](targetMessage, Wonder_jest.Expect[/* expect */0](message)));
              }));
}

export {
  judgeErrorMessage ,
  
}
/* Wonder_jest Not a pure module */

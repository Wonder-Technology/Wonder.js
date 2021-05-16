'use strict';

var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");

function judgeErrorMessage(targetMessage, promise) {
  return promise.catch((function (e) {
                var message = e.message;
                return Promise.resolve(Wonder_jest.Expect[/* toContainString */11](targetMessage, Wonder_jest.Expect[/* expect */0](message)));
              }));
}

exports.judgeErrorMessage = judgeErrorMessage;
/* Wonder_jest Not a pure module */

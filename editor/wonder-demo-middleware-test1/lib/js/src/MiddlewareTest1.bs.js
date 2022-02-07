'use strict';


function getData(param) {
  return {
          func1: (function (str) {
              console.log(str);
              
            })
        };
}

exports.getData = getData;
/* No side effect */

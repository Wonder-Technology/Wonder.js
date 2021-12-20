'use strict';


function create(eventName, userData) {
  return {
          name: eventName,
          isStopPropagation: false,
          phase: undefined,
          userData: userData
        };
}

exports.create = create;
/* No side effect */

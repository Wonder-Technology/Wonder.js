'use strict';


var preventDefault = (function(event){
    if (event.cancelable) {
      if (!event.defaultPrevented) {
          event.preventDefault();
      }
  }

  event.stopPropagation();
  });

exports.preventDefault = preventDefault;
/* No side effect */

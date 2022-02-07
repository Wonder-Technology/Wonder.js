'use strict';


function getAddMenuItemEventName(param) {
  return "wd_addMenuItem";
}

function getRegisterEventHandlerSubmitEventName(param) {
  return "wd_registerEventHandler_submit";
}

function getRegisterMiddlewareSubmitEventName(param) {
  return "wd_registerMiddleware_submit";
}

exports.getAddMenuItemEventName = getAddMenuItemEventName;
exports.getRegisterEventHandlerSubmitEventName = getRegisterEventHandlerSubmitEventName;
exports.getRegisterMiddlewareSubmitEventName = getRegisterMiddlewareSubmitEventName;
/* No side effect */

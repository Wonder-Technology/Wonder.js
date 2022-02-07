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

function getRegisterWorkPluginSubmitEventName(param) {
  return "wd_registerWorkPlugin_submit";
}

exports.getAddMenuItemEventName = getAddMenuItemEventName;
exports.getRegisterEventHandlerSubmitEventName = getRegisterEventHandlerSubmitEventName;
exports.getRegisterMiddlewareSubmitEventName = getRegisterMiddlewareSubmitEventName;
exports.getRegisterWorkPluginSubmitEventName = getRegisterWorkPluginSubmitEventName;
/* No side effect */

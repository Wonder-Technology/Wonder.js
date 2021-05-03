

import * as ManageEventMainService$Wonderjs from "../../../../../src/service/state/main/event/ManageEventMainService.js";

function _isHostMethod (object_,property){
                     var type = typeof object_[property];

                    return type === "function" ||
                        (type === "object" && !!object_[property]) ||
                        type === "unknown";
    };

function _extend (destination,source){
                var property = "";

                for (property in source) {
                    destination[property] = source[property];
                }
                return destination;
    };

function getBody(state) {
  return document.body;
}

function getPointEventBindedDom(state) {
  return document.body;
}

function getKeyboardEventBindedDom(state) {
  return document.body;
}

function triggerDomEvent (eventName,oTarget,event){
                    var evObj = null,
                    dom = null;

                if (_isHostMethod(document, "createEvent")) {
                    /* 判断事件类型
                     switch (type) {
                     case 'abort':
                     case 'blur':
                     case 'change':
                     case 'error':
                     case 'focus':
                     case 'load':
                     case 'reset':
                     case 'resize':
                     case 'scroll':
                     case 'select':
                     case 'submit':
                     case 'unload':
                     evObj = document.createEvent('HTMLEvents');
                     evObj.initEvent(type, false, true);
                     break;
                     case 'DOMActivate':
                     case 'DOMFocusIn':
                     case 'DOMFocusOut':
                     case 'keydown':
                     case 'keypress':
                     case 'keyup':
                     evObj = document.createEvent('UIEevents');
                     evObj.initUIEvent(type, false, true);     //出错：参数过少
                     break;
                     case 'click':
                     case 'mousedown':
                     case 'mousemove':
                     case 'mouseout':
                     case 'mouseover':
                     case 'mouseup':
                     evObj = document.createEvent('MouseEvents');
                     evObj.initMouseEvent(type, false, true);  //出错：参数过少
                     break;
                     case 'DOMAttrModified':
                     case 'DOMNodeInserted':
                     case 'DOMNodeRemoved':
                     case 'DOMCharacterDataModified':
                     case 'DOMNodeInsertedIntoDocument':
                     case 'DOMNodeRemovedFromDocument':
                     case 'DOMSubtreeModified':
                     evObj = document.createEvent('MutationEvents');
                     evObj.initMutationEvent(type, false, true);   //出错：参数过少
                     break;
                     default:
                     throw new Error("超出范围！");
                     break;

                     }
                     */

                    //此处使用通用事件
                    evObj = document.createEvent('Events');
                    evObj.initEvent(eventName, false, true);

                    if(!!event){
                        _extend(evObj, event);
                    }

                    dom = oTarget;
                    dom.dispatchEvent(evObj);
                }
                /* else if (isHostMethod(document, "createEventObject")) {
                        dom = oTarget;
                        dom.fireEvent('on' + eventName);
                } */
                else{
                    throw new Error("trigger dom event error");
                }
    };

function buildFakeCanvas (offsetData){
var [ offsetLeft, offsetTop, offsetParent ] = offsetData;

    function _getOrCreateEventQueue(type){
        if(window.eventQueueMap === undefined){
window.eventQueueMap = {};
        }
        if(window.eventQueueMap[type] === undefined){
window.eventQueueMap[type] = [];
        }

        return window.eventQueueMap[type];
    }

return {
     nodeType: 1,
     style: {
       "left": "",
       "top": "",
       "width": "",
       "height": "",
       "position": "static",
     },
     width: 0.,
     height: 0.,
     offsetLeft: offsetLeft,
     offsetTop: offsetTop,
     offsetParent: offsetParent,



     addEventListener: (eventName, func, isCapture) => {
var queue = _getOrCreateEventQueue(eventName);

queue.push(func);
        },

        removeEventListener: (eventName, func, isCapture) => {
var queue = _getOrCreateEventQueue(eventName);

var index = queue.indexOf(func);

if(index === -1){
    return;
}

queue.splice(
    index, 1
);
        },

        dispatchEvent: (event) => {
var queue = _getOrCreateEventQueue(event.type);


queue.forEach((func) => {
    func(event)
});
        }

         }
    };

function _clearEventQueueMap (){
    window.eventQueueMap = {};
    };

function restore(state) {
  _clearEventQueueMap();
  return ManageEventMainService$Wonderjs.unsubscribeDomEventStream(state);
}

function triggerFirstMouseDragOverEvent(mouseEvent, state) {
  triggerDomEvent("mousemove", document.body, mouseEvent);
  triggerDomEvent("mousemove", document.body, mouseEvent);
  return triggerDomEvent("mousemove", document.body, mouseEvent);
}

export {
  _isHostMethod ,
  _extend ,
  getBody ,
  getPointEventBindedDom ,
  getKeyboardEventBindedDom ,
  triggerDomEvent ,
  buildFakeCanvas ,
  _clearEventQueueMap ,
  restore ,
  triggerFirstMouseDragOverEvent ,
  
}
/* ManageEventMainService-Wonderjs Not a pure module */

let _isHostMethod = %raw(`
  function(object_, property) {
                     var type = typeof object_[property];

                    return type === "function" ||
                        (type === "object" && !!object_[property]) ||
                        type === "unknown";
                        }
    `)

let _extend = %raw(`
  function(destination, source){
                var property = "";

                for (property in source) {
                    destination[property] = source[property];
                }
                return destination;
                }
    `)

let getBody = po => BodyDoService.getBodyExn(po)

let getPointEventBindedDom = () => ContainerManager.getPO()->getBody

let getKeyboardEventBindedDom = () => ContainerManager.getPO()->getBody

let triggerDomEvent = %raw(`
  function(eventName, oTarget, event){
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
                }
    `)

let buildFakeCanvas = %raw(`
  function(offsetData) {
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
         }
    `)

let _clearEventQueueMap = %raw(`
function(){
    window.eventQueueMap = {};
    }
    `)

let restore = () => {
  _clearEventQueueMap(.)

  ContainerManager.getPO()->ManageEventDoService.unsubscribeDomEventStream->ContainerManager.setPO
}

let triggerFirstMouseDragOverEvent = mouseEvent => {
  triggerDomEvent("mousemove", getPointEventBindedDom(), mouseEvent)
  triggerDomEvent("mousemove", getPointEventBindedDom(), mouseEvent)
  triggerDomEvent("mousemove", getPointEventBindedDom(), mouseEvent)
}

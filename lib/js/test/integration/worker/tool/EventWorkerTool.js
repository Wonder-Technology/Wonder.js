'use strict';


var triggerWorkerEvent = (


    function (oTarget, type, eventData) {
             function extend (destination, source) {
                var property = "";

                for (property in source) {
                    destination[property] = source[property];
                }
                return destination;
            };

                function isHostMethod(object, property) {
                    var type = typeof object[property];

                    return type === "function" ||
                        (type === "object" && !!object[property]) ||
                        type === "unknown";
                };


                var evObj = null,
                    dom = null;

                if (isHostMethod(document, "createEvent")) {
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
                    evObj.initEvent(type, false, true);

                    if(!!eventData){
                        extend(evObj, eventData);
                    }

                    /* if (Tool.judge.isjQuery(oTarget)) {
                        oTarget.each(function () {
                            dom = this;
                            dom.dispatchEvent(evObj);
                        });
                    }
                    else { */
                        dom = oTarget;
                        dom.dispatchEvent(evObj);
                    /* } */
                }
                else if (isHostMethod(document, "createEventObject")) {
                    /* if (Tool.judge.isjQuery(oTarget)) {
                        oTarget.each(function () {
                            dom = this;
                            dom.fireEvent('on' + type);
                        });
                    }
                    else { */
                        dom = oTarget;
                        dom.fireEvent('on' + type);
                    /* } */
                }
            }
    );

exports.triggerWorkerEvent = triggerWorkerEvent;
/* triggerWorkerEvent Not a pure module */

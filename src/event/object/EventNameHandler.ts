/// <reference path="../../filePath.d.ts"/>
module wd{
    enum BrowserIdentifier{
        FALLBACK = <any>"fallback",
        FIREFOX = <any>"firefox",
        CHROME = <any>"chrome"
    }

    export enum EventName{
        CLICK = <any>"click",
        MOUSEOVER = <any>"mouseover",
        MOUSEUP = <any>"mouseup",
        MOUSEOUT = <any>"mouseout",
        MOUSEMOVE = <any>"mousemove",
        MOUSEDOWN = <any>"mousedown",
        MOUSEWHEEL = <any>`mousewheel|DOMMouseScroll*${BrowserIdentifier.FIREFOX}`,

        KEYDOWN = <any>"keydown",
        KEYUP = <any>"keyup",
        KEYPRESS = <any>"keypress"
    }

    export class EventNameHandler{
        public static handleEventName(domEventName:EventName){
            var eventName:string = <any>domEventName,
                fallbackEventName = null,
                specifyBrowserEventNameArr = [],
                result:string = null;

            for (let name of eventName.split('|')){

                if(this._isFallbackEventName(name)){
                    fallbackEventName = name;
                }
                else{
                    specifyBrowserEventNameArr.push(name);
                }
            }

            result = this._getSpecifyBrowserEventName(specifyBrowserEventNameArr);

            return result !== null ? result : fallbackEventName;
        }

        private static _isFallbackEventName(eventName:string){
            return eventName.split('*').length === 1;
        }

        private static _getSpecifyBrowserEventName(specifyBrowserEventNameArr:Array<string>){
            var result = null;

            for(let eventName of specifyBrowserEventNameArr){
                let [domEventName, browserIdentifier] = eventName.split('*');

                switch (<any>browserIdentifier){
                    case BrowserIdentifier.CHROME:
                        if(bowser.chrome){
                            result = domEventName;
                        }
                        break;
                    case BrowserIdentifier.FIREFOX:
                        if(bowser.firefox){
                            result = domEventName;
                        }
                        break;
                    default:
                        //todo judge IE
                        break;
                }

                if(result){
                    break;
                }
            }

            return result;
        }
    }
}


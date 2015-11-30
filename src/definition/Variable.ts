/// <reference path="../filePath.d.ts"/>
module wd{
    declare var global:any,window:any;

    export var root:any;
    Object.defineProperty(wd, "root", {
        get: function() {
            if(JudgeUtils.isNodeJs()){
                return global;
            }

            return window;
        }
    });

    export var document:any;
    Object.defineProperty(wd, "document", {
        get: function() {
            if(JudgeUtils.isNodeJs()){
                return {};
            }

            return window.document;
        }
    });
}

/// <reference path="../filePath.d.ts"/>
module wd{
    export var root:any;
}

declare var global:any,window:Window;

Object.defineProperty(wd, "root", {
    get: function() {
        if(wd.JudgeUtils.isNodeJs()){
            return global;
        }

        return window;
    }
});

/// <reference path="../filePath.d.ts"/>
module dy{
    declare var global:any,window:any;

    export var root:any;
    Object.defineProperty(dy, "root", {
        get: function() {
            if(JudgeUtils.isNodeJs()){
                return global;
            }

            return window;
        }
    });
}

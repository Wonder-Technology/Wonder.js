/// <reference path="../../../filePath.d.ts"/>
module dy {
    export function script(scriptName:string) {
        return function (target) {
            Script.addScript(scriptName, target);
        }
    }
}

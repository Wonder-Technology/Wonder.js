module wd {
    export function script(scriptName:string) {
        return function (target) {
            Script.addScript(scriptName, target);
        }
    }
}

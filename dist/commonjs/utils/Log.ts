// import { registerClass } from "../definition/typescript/decorator/registerClass";
import { Log as Log$ } from "wonder-commonlib/dist/commonjs/Log";

// @registerClass("Log")
export class Log extends Log$ {
}


export var error = (cond: boolean, ...messages): void => {
    if (cond) {
        /*!
         console.error will not interrupt, it will throw error and continue exec the left statements

         but here need interrupt! so not use it here.
         */
        //if (!this._exec("error", arguments, 1)) {
        throw new Error(messages.join("\n"));
        //}
    }
}

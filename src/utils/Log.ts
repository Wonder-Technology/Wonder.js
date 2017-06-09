// import { registerClass } from "../definition/typescript/decorator/registerClass";
import { Log as Log$ } from "wonder-commonlib/dist/es2015/Log";

// @registerClass("Log")
export class Log extends Log$ {
}


export var error = Log$.error;

export var info = Log$.info;

export var log = Log$.log;

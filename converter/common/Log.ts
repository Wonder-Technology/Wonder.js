/// <reference path="../../node_modules/dycb/dist/dyCb.node.d.ts"/>
import dyCb = require("dycb");

export = class Log extends dyCb.Log{
    public static log(...messages) {
        console.log.apply(console, messages);
    }
}


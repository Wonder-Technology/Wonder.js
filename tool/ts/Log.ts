import wdCb = require("wonder-commonlib");

export = class Log extends wdCb.Log{
    public static log(...messages) {
        console.log.apply(console, messages);
    }
}


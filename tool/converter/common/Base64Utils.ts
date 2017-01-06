import fs = require("fs");

declare var Buffer:any;

export = class Base64Utils{
    public static encode(url:string, prefix:string = "") {
        var file = fs.readFileSync(url);

        return `${prefix}${new Buffer(file).toString("base64")}`;
    }

    public static decode(base64str:string) {
        return new Buffer(base64str, "base64");
    }
}


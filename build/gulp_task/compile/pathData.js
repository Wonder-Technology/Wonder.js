var path = require("path");

module.exports = {
    core:path.join(process.cwd(), "src/tsconfig.json"),
    extension: path.join(process.cwd(), "extension/tsconfig.json"),
    lite:path.join(process.cwd(), "src/tsconfigLite.json"),
    custom:path.join(process.cwd(), "src/tsconfigCustom.json")
};



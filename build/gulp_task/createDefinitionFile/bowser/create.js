var gulp = require("gulp");
var path = require("path");
var fs = require("fs");

function _getProperty(allUserAgents){
    var i = null,
        j = null,
        property = null,
        result = {};

    for(i in allUserAgents){
        (function (userAgents) {
            for (j in userAgents) {
                (function(expections){
                    for (property in expections) {
                        if (!result[property]) {
                            result[property] = expections[property];
                        }
                    }
                }(userAgents[j]))
            }
        }(allUserAgents[i]));
    }

    return result;
}

function _convertToDefinitionFileContent(propertyObj){
    var content = "",
        property = null;

    //todo newline char
    content += "declare class bowser{\n";

    for(property in propertyObj) {
        content += "public static " + property + ":";
        content += _getType(propertyObj[property]) + ";\n";
    }


    content += "}";

    return content;
}

function _getType(value){
    return typeof(value);
}


gulp.task("createBowserDefinitionFile", function(done){
    var allUserAgents = JSON.parse(
            fs.readFileSync(
                path.join(process.cwd(), "build/gulp_task/createDefinitionFile/bowser/bowser.json"),
                "utf8"
            )
        ),
        fileName = path.join(process.cwd(), "src/lib/inner/bowser/bowser.d.ts");

    fs.writeFileSync(fileName, _convertToDefinitionFileContent(_getProperty(allUserAgents)));

    done();
});


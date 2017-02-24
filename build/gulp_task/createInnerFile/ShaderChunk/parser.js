function GLSLParser(){
    this.fieldTable = {
        top: "@top",
        define: "@define",
        varDeclare: "@varDeclare",
        funcDeclare: "@funcDeclare",
        funcDefine: "@funcDefine",
        body: "@body"
    };
}

GLSLParser.prototype.parse= function(content){
    var field = null,
        startIndex = 0,
        endIndex = 0,
        result = '{',
        endFlag = /@end/g,
        newlineFlag = "\\n";

    for(var i in this.fieldTable){
        if(this.fieldTable.hasOwnProperty(i)){
            field = this.fieldTable[i];

            startIndex = content.search(field);

            if(startIndex === -1){
                result += i + ': "",';
                continue;
            }

            startIndex += field.length + newlineFlag.length;

            endIndex = endFlag.exec(content).index;

            result += i + ': "' + content.slice(startIndex, endIndex).trim() + '",';
        }
    }

    /*!remove last ","*/
    if(result.slice(-1) === ","){
        result = result.slice(0, -1);
    }

    result += '};\n';

    return result;
};

module.exports = {
    GLSLParser: GLSLParser
};


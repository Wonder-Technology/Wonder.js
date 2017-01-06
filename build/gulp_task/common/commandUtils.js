function parseOption (name) {
    var value = null,
        i = process.argv.indexOf(name);

    if (i > -1) {
        value = process.argv[i + 1];
    }

    return value;
}

function isDefinOption(name) {
    return process.argv.indexOf(name) > -1;
}

module.exports = {
    parseOption: parseOption,
    isDefinOption: isDefinOption
}

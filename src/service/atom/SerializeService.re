let serializeFunction = [%raw func => {|
    return func.toString();
    |}];

let deserializeFunction = [%raw funcStr => {|
    return eval('(' + funcStr + ')');
    |}];
var _isShowLog = true;

/*! side effect */
export var hideLog = () => {
    _isShowLog = false;
}

/*! side effect */
export var log = (...msgArr) => {
    if(_isShowLog){
        console.log(msgArr.join(""));
    }
}

//2013.04.20
//采用Class形式。

(function () {
    var findTextInFF = function () {
        var insertStr = _str;
        _e = getElement();
        var range = [];
        var reg = new RegExp(_str, 'g');  //使用RegExp对象来构造动态匹配，要设置为全局，获得lastIndex
        //        reg = reg || new RegExp(_str, 'g');
        //        alert("_start=" + _start);
        //        _e.setSelectionRange(_start, _e.value._length);  //范围设置为
        //        alert("find中_e.selectionStart=" + _e.selectionStart);
        //        alert("_e.value=" + _e.value);
        //        if (first) {
        //        alert("_start="+_start);
        //        alert("first _find_value=" + _find_value);
        _find_value = _e.value.substring(_start);    //从当前光标处开始查找，若没有光标（textarea没有选中）则从开头查找
        //        alert("substring _find_value=" + _find_value);
        //        }
        //        else {
        //            _find_value = _e.value.substring(_start);
        //        }
        //        alert("_find_value=" + _find_value);
        var result = reg.exec(_find_value);
        //        alert("result=" + result);

        //        alert("result=" + result);
        //        alert("_length=" + _str._length);
        if (!result) {    //result为null
            //            alert("false!");
            return false;
        }
        else {
            //            alert("reg.lastIndex=" + reg.lastIndex);
            //            alert("_start=" + _start);
            range[0] = reg.lastIndex - insertStr.length;  //result._length有问题！为什么？
            range[1] = reg.lastIndex;
            //            alert("range[1]=" + range[1]);
            //            alert("reg.lastIndex=" + reg.lastIndex);
            return range;
        }
    }

    var getElement = function () {
        var e = null;
        if (_id) {
            e = document.getElementById(_id);    //不能用$("#"+id),因为jquery对象没有createTextRange方法！
        }
        else {
            e = window.event.srcElement ? window.event.srcElement : window.event.target;
        }
        return e;
    }

    var Textarea = YYC.Class({
        Init: function (id, length, str) {
            /*对象私有属性，不允许外部访问
    同一个实例的私有属性会保存操作后的值。
    如同一个实例调用Shout方法，_start会累加。

            Shout: function () {
            _start++;
            alert(_start);
        },

   重新new的实例，_start会初始化（置0）。
    */

            var _id = id;   //如果没有传入id,则_id=undefine，下同
            var _length = length;
            var _str = str;
            var _start = 0;     //存储ff下光标位置
            var _find_value = null; //存储ff下剩余文本(findTextInFF方法)
            var _e = null;

            /*静态属性，与c#的静态属性性质相同。
            新建一次实例，静态属性才初始化（如Textarea._start初始化为0）
            如果不新建实例，调用同一实例的方法(该方法操作了静态属性)，则该静态属性会保持操作结果，
            即不会初始化。
            */
            //    Textarea._start = 0;
            //    Textarea._find_value = null; 
            //    Textarea.count = 0;
            /*私有方法*/
            /*火狐下查找字符串，搜索一个不区分大小写的字符串匹配。
            如果在范围中发现一个实例，范围的开始点和结束点就放到这个文本中，方法返回true；
            否则返回false,开始点和结束点都不动。
            */
        },
        Public: {
            /*
           这种面向对象的形式，return中的函数可以通过this指针互相调用！
   
           AlertA: function () {
           alert("aaaa");
           },
           Shout: function () {
           this.AlertA();
           },
           */
            /*光标停在文本框文字的最后
            ie7、9,ff12.0测试通过
            参数为id，若id为空，则目标为当前事件发生的目标（如点击textarea，则textarea为当前目标）*/
            moveToEnd: function () {
                _e = null;
                var r = null;
                _e = getElement();
                if (_e.createTextRange) {    //ie
                    r = _e.createTextRange();
                    r.moveStart("character", _e.value.length);
                    r.collapse(true);
                    r.select();
                }
                else if (!isNaN(_e.selectionStart)) {  //ff
                    _e.setSelectionRange(_e.value.length, _e.value.length);    //设置光标范围（第一个为开始范围，第二个为结束范围）
                    _e.focus();
                }
            },
            /*光标移动到指定处
            ie7、9,ff12.0测试通过
            参数为id，_length;id可为空，此时参数为_length*/
            moveToTarget: function () {
                _e = getElement();
                if (_e.createTextRange) {
                    var r = _e.createTextRange();
                    r.moveStart("character", _length);
                    r.collapse(true);
                    r.select();
                }
                else if (!isNaN(_e.selectionStart)) {  //ff
                    _e.setSelectionRange(_length, _length);    //设置光标范围（第一个为开始范围，第二个为结束范围）
                    _e.focus();  //相当于ie中的_e.select();
                }
            },
            /*获取当前光标位置
            ie7、9，ff12.0测试通过
            参数为id可为空*/
            getPointLocation: function () {
                _e = getElement();
                //        if (arguments[0]) {
                //            _e = document.getElementById(arguments[0]);    //不能用$("#"+id),因为jquery对象没有createTextRange方法！
                //        }
                //        else {
                //            _e = window.event.srcElement ? window.event.srcElement : window.event.target;
                //        }
                if (_e.createTextRange) {    //ie

                    _e.focus();  //光标所在位置不变,textarea获得焦点

                    /*workRange.text为空,开始范围和结束范围为当前光标所在位置（重叠），
                    workRange为TextRange对象，来自textarea*/
                    var workRange = document.selection.createRange();

                    //            workRange.moveStart("character", 4);
                    //            alert(workRange.text);
                    //            var r = _e.createTextRange();
                    //            r.moveStart("character", 5);

                    /*注意，此处_e为textarea对象，不是TextRange对象！
                    选择textarea的全部文本*/
                    _e.select();

                    var allRange = document.selection.createRange();    //allRange为选中全部内容的TextRange对象，来自同一个textarea对象

                    /*workRange和allRange来自同一对象（textarea）
                    必须是来自同一对象的TextRange对象才能使用setEndPoint方法！*/
                    workRange.setEndPoint("StartToStart", allRange);   //将workRange的开始范围设置为allRange的开始范围（即文本开头）

                    var len = workRange.text.length;    //获得光标所在位置
                    workRange.collapse(false);  //光标定位于结束范围处
                    workRange.select(); //显示光标
                    return len;
                }
                else if (!isNaN(_e.selectionStart)) {  //ff
                    return _e.selectionStart;
                }
            },
            /*移动到当前光标的后length处，移到末尾后就不再移动（停留在末尾）
            ie7、9,ff12.0测试通过
            参数为id可为空*/
            moveCurrentPointToTarget: function () {
                _e = getElement();
                if (_e.createTextRange) {
                    var r = _e.createTextRange();
                    r.moveStart("character", _length);
                    r.collapse(true);
                    r.select();
                }
                else if (!isNaN(_e.selectionStart)) {  //ff
                    _e.setSelectionRange(_length, _length);    //设置光标范围（第一个为开始范围，第二个为结束范围）
                    _e.focus();
                }
            },
            /*光标移到到当前选中区域的第length位,不再选中区域
            ie7、9,ff12.0测试通过
            参数为id，length;id可为空，此时参数为length*/
            moveSelectTarget: function () {
                var r = null;
                _e = getElement();
                if (document.selection) {   //ie
                    r = document.selection.createRange();
                    r.moveStart("character", _length);
                    r.collapse(true);
                    r.select();
                }
                else if (window.getSelection) {  //ff
                    //            alert("ff");
                    //            r = window.getSelection().getRangeAt(0);
                    //            alert(_e.selectionStart);
                    //            alert(_e.selectionEnd);


                    /*火狐用window.getSelection().toString()可以获取到选中的文本，但是对文本框无效。
                    文本框用_e.value.substring(_e.selectionStart, _e.selectionEnd)获得选中文本*/

                    /*  _e.selectionStart为当前选中区域的开始位置,
                    _e.selectionEnd为当前选中区域的结束位置*/
                    var start = _e.selectionStart + _length;
                    _e.setSelectionRange(start, start);
                    //            _e.focus();
                }
            },
            /*光标移到到当前选中区域的第length位,继续选中区域
            ie7、9,ff12.0测试通过
            参数为id，length;id可为空，此时参数为length*/
            moveSelectTargetBySelected: function () {
                var r = null;
                _e = getElement();
                if (document.selection) {   //ie
                    r = document.selection.createRange();
                    r.moveStart("character", _length);
                    r.collapse(true);
                    r.select();
                }
                else if (window.getSelection) {  //ff


                    /*火狐用window.getSelection().toString()可以获取到选中的文本，但是对文本框无效。
                    文本框用_e.value.substring(_e.selectionStart, _e.selectionEnd)获得选中文本*/

                    /*  _e.selectionStart为当前选中区域的开始位置,
                    _e.selectionEnd为当前选中区域的结束位置*/
                    var start = _e.selectionStart + _length;
                    var end = _e.selectionEnd;
                    _e.setSelectionRange(start, end);
                    _e.focus();
                }
            },
            /*当前光标处插入字符串
            ie7、9,ff12.0测试通过
            参数为id,str*/
            insertStrToCurrentPoint: function () {
                var insertStr = _str;
                _e = getElement();
                _e.focus();
                if (_e.createTextRange) {    //ie
                    var r = document.selection.createRange();
                    r.text = r.text == "" ? _str : r.text + _str;
                    //            r.collapse(true);
                    r.select(); //显示光标
                }
                else if (!isNaN(_e.selectionStart)) {  //ff
                    var length = _e.selectionStart + str.length;
                    _e.value = _e.value.substring(0, _e.selectionStart) + _str + _e.value.substring(_e.selectionEnd);
                    _e.setSelectionRange(length, length);    //将范围定在在插入的字符串后（此处不用focus即可获得光标！为什么？）
                    //            _e.focus();    //此处可以不用focus()
                }
            },
            /*加粗指定的字符串（全部加粗）
            ie7、9,ff12.0测试通过
            参数为id,str*/
            boldResultByFindStr: function () {
                var insertStr = _str;
                _e = getElement();
                var result = null;
                var length = _str.length;
                _start = 0;
                _find_value = null;

                _e.focus();  //光标定位在文本开头
                if (_e.createTextRange) {
                    var new_textRange = _e.createTextRange();
                    var test_textRange = _e.createTextRange();;
                    var r = _e.createTextRange();
                    if (this.getPointLocation(_id) != 0) {   //如果textarea被选中,则从当前光标往后搜索
                        //                alert(this.getPointLocation(id));
                        r.moveStart("character", this.getPointLocation(_id));
                        test_textRange = r; //test_textRange的开始范围设为与r相同

                    }
                    if (test_textRange.findText(str)) {
                        var len = test_textRange.text.length;
                        test_textRange.moveStart("character", -3);
                        test_textRange.moveEnd("character", -len);
                        if (test_textRange.text == "<b>") { //如果已经加粗了，则不再加粗
                            alert("不能重复操作！");
                            return false;
                        }
                        //                alert(test_textRange.text);
                    }
                    else {
                        alert("没有查找到结果！");
                    }
                    //如果textarea没被选中,全文搜索
                    while (r.findText(_str)) {   //循环查找，全部加粗

                        //                alert(!r.text.match(/<b>/));
                        //                if (r.text.match(/<b>/)) {     //如果已经加粗了，则不再加粗
                        //                    alert("不能重复操作！");
                        //                    break;
                        //                }
                        r.text = "<b>" + r.text + "</b>";   //光标开始范围为“</b>”后面,所以不用再移动了！
                        r.setEndPoint("EndToEnd", new_textRange);   //r的结束范围移到文本最后
                        //r.moveStart("character", result.text.length);   //r的开始范围移到搜索结果字符串的后面，这样可以继续在后面搜索
                    }




                    //            reg = null;

                    //            alert("sss");
                    //            var ff_result = this.findTextInFF(id, str);
                    //            alert(ff_result[1]);
                    //            alert("sss");


                    //            if (r.findText(str)) {
                    //                r.select();
                    //            }
                    //            if (this.getPointLocation(id) == 0) {   //如果textarea没被选中,全文搜索
                    //                var new_textRange = _e.createTextRange();
                    //                if (r.findText(str)) {
                    //                    alert("aa");
                    //                    r.select();
                    //                    result = document.selection.createRange();
                    //                    //                    //                    result.text += "aaa";
                    //                    //                    alert(typeof result.text);
                    //                    //                    alert(result.text.length);
                    //                    alert("result=" + result.text);
                    //                    r.text = "<b>" + r.text + "</b>";   //光标开始范围为“</b>”后面
                    //                    alert("length=" + result.text.length);
                    //                    alert("r=" + r.text);
                    //                    r.setEndPoint("EndToEnd", new_textRange);   //r的结束范围移到文本最后
                    //                    //                    alert("length=" + result.text.length);
                    //                    //                    r.moveStart("character", result.text.length);
                    //                    //                    r.collapse(false);
                    //                    //                    r.findText(str);
                    //                    //                    r.select();
                    //                    //                    result = document.selection.createRange();
                    //                    //                    //                    //                    result.text += "aaa";
                    //                    //                    //                    alert(typeof result.text);
                    //                    //                    //                    alert(result.text.length);
                    //                    //                    alert("result=" + result.text);
                    //                    //                    r.text = "<b>" + r.text + "</b>";
                    //                    //                    alert("length=" + result.text.length);
                    //                    //                    alert("r=" + r.text);
                    //                    //                    r.setEndPoint("EndToEnd", new_textRange);   //r的结束范围移到文本最后
                    //                    //                    r.select();
                    //                    //                    alert("aa");
                    //                }
                    //                if (r.findText(str)) {
                    //                    alert("bb");
                    //                    r.select();
                    ////                    result = document.selection.createRange();
                    ////                    result.text = "<b>" + r.text + "</b>";
                    ////                    r.collapse(false);
                    ////                    r.select();
                    //                }
                    //            }
                    //            else {  //如果textarea已被选中（当前光标在textarea中），从当前光标往后搜索
                    //                r.moveStart("character", this.getPointLocation(id));
                    //                if (r.findText(str)) {
                    //                    r.select();
                    //                }
                    //            }

                    //            alert("已经全部加粗！");
                    //            r = _e.createTextRange();    //恢复
                }
                else if ((!isNaN(_e.selectionStart))) {  //ff
                    //            var first = true;
                    YYC.Tool.Textarea.count++;
                    var range = null;
                    var find_str = null;
                    var ff_result = findTextInFF();
                    var len = _str.length;
                    if ($.isArray(ff_result)) {
                        if (_e.value.substring((ff_result[0] - 3), (ff_result[1] - len)) == '<b>') {     //检查是否已经加粗
                            //                    alert("repeat");
                            alert("不能重复操作！");
                            return false;
                        }
                    }
                    else {
                        alert("没有查找到结果！");
                    }
                    while ((range = findTextInFF())) { //range不等于false
                        //                alert("first=" + first);
                        //                alert("_start find");
                        //                _e.setSelectionRange(range[1], _e.value.length);  //范围设置为

                        //                first = false;
                        //                alert("_e.selectionStart=" + _e.selectionStart);


                        find_str = "<b>" + _str + "</b>";
                        //                    alert("find_str=" + find_str);
                        alert("range[0]=" + range[0]);
                        alert("_start=" + _start);
                        _e.value = _e.value.substring(0, _start + range[0]) + "<b>" + _str + "</b>" + _e.value.substring(_start + range[1]);  //加粗
                        _start += range[1] + find_str.length - len;  //_start为插入后的位置


                        //                alert("find add _start=" + _start);
                        //                alert("_e.value=" + _e.value);
                        //                _e.setSelectionRange(range[1], _e.value.length);  //范围设置为
                    }
                }
            }
        }
    });

    YYC.namespace("Control").Textarea = Textarea;
}());
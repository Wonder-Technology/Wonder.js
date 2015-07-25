module dyCb{
    declare var document:any;

    export class AjaxUtils{
        /*!
         实现ajax

         ajax({
         type:"post",//post或者get，非必须
         url:"test.jsp",//必须的
         data:"name=dipoo&info=good",//非必须
         dataType:"json",//text/xml/json，非必须
         success:function(data){//回调函数，非必须
         alert(data.name);
         }
         });*/
        public static ajax(conf){
            var type = conf.type;//type参数,可选
            var url = conf.url;//url参数，必填
            var data = conf.data;//data参数可选，只有在post请求时需要
            var dataType = conf.dataType;//datatype参数可选
            var success = conf.success;//回调函数可选
            var error = conf.error;
            var xhr = null;
            var self = this;

            if (type === null) {//type参数可选，默认为get
                type = "get";
            }
            if (dataType === null) {//dataType参数可选，默认为text
                dataType = "text";
            }

            xhr = this._createAjax(error);
            if (!xhr) {
                return;
            }

            try {
                xhr.open(type, url, true);

                if (this._isSoundFile(dataType)) {
                    xhr.responseType = "arraybuffer";
                }

                if (type === "GET" || type === "get") {
                    xhr.send(null);
                }
                else if (type === "POST" || type === "post") {
                    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                    xhr.send(data);
                }

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4
                            //如果ajax访问的是本地文件，则status为0
                        && (xhr.status === 200 || self._isLocalFile(xhr.status))) {
                        if (dataType === "text" || dataType === "TEXT") {
                            if (success !== null) {//普通文本
                                success(xhr.responseText);
                            }
                        }
                        else if (dataType === "xml" || dataType === "XML") {
                            if (success !== null) {//接收xml文档
                                success(xhr.responseXML);
                            }
                        }
                        else if (dataType === "json" || dataType === "JSON") {
                            if (success !== null) {//将json字符串转换为js对象
                                success(eval("(" + xhr.responseText + ")"));
                            }
                        }
                        else if (self._isSoundFile(dataType)) {
                            if (success !== null) {//将json字符串转换为js对象
                                success(xhr.response);
                            }
                        }
                    }
                };
            }
            catch (e) {
                error(xhr, e);
            }
        }

        private static _createAjax(error) {
            var xhr = null;
            try {//IE系列浏览器
                xhr = new ActiveXObject("microsoft.xmlhttp");
            } catch (e1) {
                try {//非IE浏览器
                    xhr = new XMLHttpRequest();
                } catch (e2) {
                    error(xhr, {message: "您的浏览器不支持ajax，请更换！"});
                    return null;
                }
            }
            return xhr;
        }

        private static _isLocalFile(status) {
            return document.URL.contain("file://") && status === 0;
        }

        private static _isSoundFile(dataType) {
            return dataType === "arraybuffer";
        }
    }
}

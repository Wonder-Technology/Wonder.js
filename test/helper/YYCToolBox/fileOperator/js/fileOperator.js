/**HTML5 file操作
 * 作者：YYC
 * 日期：2014-05-02
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    window.fileOperator = {
        /**
         * Copyright 2013 - Eric Bidelman
         *
         * Licensed under the Apache License, Version 2.0 (the "License");
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         *      http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.

         * @fileoverview
         * Convenient wrapper library for the HTML5 Filesystem API, implementing
         * familiar UNIX commands (cp, mv, ls) for its API.
         *
         * @author Eric Bidelman (ebidel@gmail.com)
         * @version: 0.4.3
         */

        /**
         * Turns a NodeList into an array.
         *
         * @param {NodeList} list The array-like object.
         * @return {Array} The NodeList as an array.
         */
        toArray: function (list) {
            return Array.prototype.slice.call(list || [], 0);
        },

        /*toDataURL: function(contentType, uint8Array) {
         return 'data:' + contentType + ';base64,' +
         self.btoa(this.arrayToBinaryString(uint8Array));
         },*/

        /**
         * Creates a data: URL from string data.
         *
         * @param {string} str The content to encode the data: URL from.
         * @param {string} contentType The mimetype of the data str represents.
         * @param {bool=} opt_isBinary Whether the string data is a binary string
         *     (and therefore should be base64 encoded). True by default.
         * @return {string} The created data: URL.
         */
        strToDataURL: function (str, contentType, opt_isBinary) {
            var isBinary = opt_isBinary != undefined ? opt_isBinary : true;
            if (isBinary) {
                return 'data:' + contentType + ';base64,' + self.btoa(str);
            } else {
                return 'data:' + contentType + ',' + str;
            }
        },

        /**
         * Creates a blob: URL from a binary str.
         *
         * @param {string} binStr The content as a binary string.
         * @param {string=} opt_contentType An optional mimetype of the data.
         * @return {string} A new blob: URL.
         */
        strToObjectURL: function (binStr, opt_contentType) {

            var ui8a = new Uint8Array(binStr.length);
            for (var i = 0; i < ui8a.length; ++i) {
                ui8a[i] = binStr.charCodeAt(i);
            }

            var blob = new Blob([ui8a],
                opt_contentType ? {type: opt_contentType} : {});

            return self.URL.createObjectURL(blob);
        },

        /**
         * Creates a blob: URL from a File or Blob object.
         *
         * @param {Blob|File} blob The File or Blob data.
         * @return {string} A new blob: URL.
         */
        fileToObjectURL: function (blob) {
            return self.URL.createObjectURL(blob);
        },

        /**
         * Reads a File or Blob object and returns it as an ArrayBuffer.
         *
         * @param {Blob|File} blob The File or Blob data.
         * @param {Function} callback Success callback passed the array buffer.
         * @param {Function=} opt_error Optional error callback if the read fails.
         */
        fileToArrayBuffer: function (blob, callback, opt_errorCallback) {
            var reader = new FileReader();
            reader.onload = function (e) {
                callback(e.target.result);
            };
            reader.onerror = function (e) {
                if (opt_errorCallback) {
                    opt_errorCallback(e);
                }
            };

            reader.readAsArrayBuffer(blob);
        },

        /**
         * Creates and returns a blob from a data URL (either base64 encoded or not).
         *
         * @param {string} dataURL The data URL to convert.
         * @return {Blob} A blob representing the array buffer data.
         */
        dataURLToBlob: function (dataURL) {
            var BASE64_MARKER = ';base64,';
            if (dataURL.indexOf(BASE64_MARKER) == -1) {
                var parts = dataURL.split(',');
                var contentType = parts[0].split(':')[1];
                var raw = parts[1];

                return new Blob([raw], {type: contentType});
            }

            var parts = dataURL.split(BASE64_MARKER);
            var contentType = parts[0].split(':')[1];
            var raw = window.atob(parts[1]);
            var rawLength = raw.length;

            var uInt8Array = new Uint8Array(rawLength);

            for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }

            return new Blob([uInt8Array], {type: contentType});
        },

        /**
         * Reads an ArrayBuffer as returns its contents as a binary string.
         *
         * @param {ArrayBuffer} buffer The buffer of data.
         * @param {string=} opt_contentType An optional mimetype of the data.
         * @return {Blob} A blob representing the array buffer data.
         */
        arrayBufferToBlob: function (buffer, opt_contentType) {
            var uInt8Array = new Uint8Array(buffer);
            return new Blob([uInt8Array],
                opt_contentType ? {type: opt_contentType} : {});
        },

        /**
         * Reads an ArrayBuffer as returns its contents as a binary string.
         *
         * @param {ArrayBuffer} buffer The buffer of data.
         * @param {Function} callback Success callback passed the binary string.
         * @param {Function=} opt_error Optional error callback if the read fails.
         */
        arrayBufferToBinaryString: function (buffer, callback, opt_errorCallback) {
            var reader = new FileReader();
            reader.onload = function (e) {
                callback(e.target.result);
            };
            reader.onerror = function (e) {
                if (opt_errorCallback) {
                    opt_errorCallback(e);
                }
            };

            var uInt8Array = new Uint8Array(buffer);
            reader.readAsBinaryString(new Blob([uInt8Array]));
        },

        /**
         * Create a binary string out of an array of numbers (bytes), each varying
         * from 0-255.
         *
         * @param {Array} bytes The array of numbers to transform into a binary str.
         * @return {string} The byte array as a string.
         */
        arrayToBinaryString: function (bytes) {
            if (typeof bytes != typeof []) {
                return null;
            }
            var i = bytes.length;
            var bstr = new Array(i);
            while (i--) {
                bstr[i] = String.fromCharCode(bytes[i]);
            }
            return bstr.join('');
        },

        /**
         * Returns the file extension for a given filename.
         *
         * @param {string} filename The filename.
         * @return {string} The file's extension.
         */
        getFileExtension: function (filename) {
            var idx = filename.lastIndexOf('.');
            return idx != -1 ? filename.substring(idx) : '';
        },


        readFile: function (file, onload) {
            if (!YYC.Tool.judge.isHostMethod(window, "FileReader")) {
                console.log("浏览器不支持FileReader");
                return;
            }

            if (file) {
                var reader = new FileReader();  //创建filereader对象
//                console.log(file_obj.type);

//                if (type === "text") {
//                    //以文本方式打开文件，强制文件编码为utf8
//                    read.readAsText(file, 'UTF-8');
//                }
                if (/image/.test(file.type)) {
                    reader.readAsDataURL(file);
                }
                else {
//                    console.log("type:", file.type, file.type === "");
                    //json文件类型为空字符""，文本文件类型为text/plain
                    reader.readAsText(file, 'UTF-8');
                }

                //增加file属性，使得在onload中，可通过this.file来获得上传的file对象
                reader.file = file;
                //文件载入完毕时执行onload
                reader.onload = onload;
            }
        },
        /** 创建文件，写入value，下载到客户端
         *  var a = {
                "a": 1,
                "b": {}
            };
         createFileAndDownload(YYC.Tool.convert.toString(a), "application/json", "hello.json");


         *  Array parts:一个数组,包含了将要添加到Blob对象中的数据.
         *  数组元素可以是任意多个的ArrayBuffer,ArrayBufferView (typed array), Blob,或者 DOMString对象.
         *
         *  var blob = new Blob( Array parts);
         *
         *  createFileAndDownload(blob, "hello.json");
         */
        createFileAndDownload: function (args) {
            var blob = null,
                name = null,
                value = null,
                tool = YYC.Tool;

            if (arguments.length === 2) {
                blob = arguments[0];
                name = arguments[1];
            }
            else if (arguments.length === 3) {
                value = arguments[0];
                type = arguments[1];
                name = arguments[2];

                if (tool.judge.isHostMethod(window, "Blob")) {
                    blob = new Blob([value], {type: type});
                } else {
                    var BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;
                    var bb = new BlobBuilder();
                    bb.append(value);
                    blob = bb.getBlob(type);
                }
            }

            var URL = window.URL || window.webkitURL;
            if (!tool.judge.isHostMethod(URL, "createObjectURL")) {
                console.log("浏览器不支持createObjectURL方法");
                return;
            }

            var bloburl = URL.createObjectURL(blob);  //创建一个新的对象URL,该对象URL可以代表某一个指定的File对象或Blob对象.
            var anchor = document.createElement("a");
            if ('download' in anchor) {
                anchor.style.visibility = "hidden";
                anchor.href = bloburl;
                anchor.download = name;
                document.body.appendChild(anchor);

//            var evt = document.createEvent("MouseEvents");
//            evt.initEvent("click", true, true);
//            anchor.dispatchEvent(evt);
                tool.event.triggerEvent(anchor, "click");

                //window.URL.revokeObjectURL(anchor.href);
                document.body.removeChild(anchor);
            }
            else if (navigator.msSaveBlob) {
                navigator.msSaveBlob(blob, name);
            }
            else {
                location.href = bloburl; //直接在页面上显示文件内容
            }
        }
    }
}());

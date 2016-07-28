/***********************************************
分页控件    YYC.Control.Paging.PagingClient v0.1
作者：YYC
日期：2012-11-03
电子邮箱：395976266@qq.com
QQ: 395976266
博客：http://www.cnblogs.com/chaogex/

************************************************/

/*

可以设置每项的宽度和高度，并动态设置样式表中外层的宽度（即总宽度）。
onclick返回当前选中项和选中项的序号。
选中项有效果（加边框）。


下面例子创建了两个分页控件：

//图片和文字数据
var i = 1;
var str_img = "", str_text = "", temp = null;
var items = [];
for (i = 1; i < 20; i++){
str_img = "Image/clue_col.jpg";
str_text = "图片1111111111啊啊啊啊啊啊啊啊啊啊啊啊" + i.toString();
temp = [str_img, str_text];
items.push(temp);
}
//第一个
    var page = new YYC.Control.Paging.PagingClient({
        onlyImg: false,
    col: 2,
    row: 1,
    width: 100,
    height: 50,
    show: 5,
    onclick: onclick,
    items: items
}).renderTo("yyc_map");

page.renderTo("yyc_map");

function onclick(e, index, current) {
    console.log(e);
    console.log("click");
    console.log(index);
    console.log(current);
//    $(current).css("border", "10px  solid #EED435");
}

//第二个
var page_2 = new YYC.Control.Paging.PagingClient({
id: "yyc_map_2",
onlyImg: false,
col: 1,
row: 1,
show: 1,
width: 100,
height: 50,
onclick: onclick,
items: items
});
page_2.renderTo("yyc_map_2");
*/
YYC.namespace("Control.Paging").PagingClient = YYC.Class({
        Init: function (config) {
            var pageIndex = 0;
            //        var ul = null;
            //        console.log("Paging");

            this.config = YYC.Tool.extend.extend({
                //            id: "",     //分页所在的层的id
                id: "",     //分页控件层的id
                onlyImg: true,  //是否只有图片
                onlyText: false,    //是否只有文字
                col: 10,   //一行显示的个数
                row: 5,  //行数
                show: 2,    //一次显示show + 1页
                width: 100, //每项的宽度
                height: 100,    //每项的图片的高度
                nullPath: "",   //空图片的地址（ie下如果图片src=""，则显示“X”，很不好看。故用空图片来占位）
                imgBorder: "",  //图片是否有边框（指定颜色，如imgBorder: "black"）
                //            _goPage: "",     //调用_goPage的外部函数的名字
                //            Jump: function () { },   //调用Jump的外部函数

                //点击每项的事件委托。
                //序号从0开始。
                onclick: function (e, index, current) { },
                items: []    //图片和文字的数组（如果onlyImg为true，则该数组只有图片（一维数组）；否则为二维数组）
            }, config || {});


            //        var m = this.config.items;

            //        var t = this.config.items[0][0];



            //        console.log(this.config._goPage);

            //                                                this.current = null;    //当前选中项(div)

            this.index = -1;    //当前选中项的序号

            this.total = this.config.items.length;    //总个数
            this.pageSize = this.config.row * this.config.col;   //每页个数
            this.pageNum = Math.ceil(this.total / this.pageSize);  //总页数

            pageIndex = parseInt((this.index - 1) / this.pageSize) + 1;
            this.pageIndex = pageIndex < 1 ? 1 : pageIndex;

            //            this.list = new List(config);
            //            this.page = new Page(config);

            //数据验证
            this._validate();

            //                //创建控件
            //                this._createPaging();


            //加入到指定层中
            //        this.renderTo(this.config.id);


            //		this.Game();
            //		this.showPage();
        },
        Private: {
            _but: null,
            _goPage: null,
            _li: null,
            _list: null,
            _page: null,
            //选中项所在的页数
            _currentPageIndex: 0,
            //前一个选中的li
            _prevLi: null,
            //选中效果层
            _selectedDiv: null,
            //控件容器
            _container: null,

            //选中指定项标志，用于ff下延迟显示选中效果层
            _select_flag: false,

            _onclick_goPage: function () {
            },

            //设置宽度
            _setWidth: function (col, width) {
                //            var totalWidth = (width + 7) * col;    //总宽度，5为每项间的间距

                //            //设置外层类名
                //            document.getElementById(this.config.id).className = className;

                //            this._list.attr("class", list);
                //            this._page.attr("class", page);

                //            this.element.css("width", totalWidth);  //设置宽度

                var self = this;

                var ulWidth = (width + 15) * col;    //list的总宽度，15为每项间的间距的估计值
                var divWidth = 0;
                var selectedDiv_width = 0,
                    selectedDiv_height = 0,
                    temp = null;
                //            if (this.config.show <= 3) {
                //                divWidth = this.width = Math.max(500, ulWidth);  //控件层的宽度，最小为500px
                //            }
                //            else {
                //                divWidth = this.width = Math.max(600, ulWidth);  //控件层的宽度，最小为500px
                //            }
                divWidth = this.width = Math.max(600, ulWidth);  //控件层的宽度，最小为600px

                //            //设置外层类名
                //            document.getElementById(this.config.id).className = className;

                //            this._list.attr("class", list);
                //            this._page.attr("class", page);

                //设置控件层
                //            this.element.attr("class", className);  //设置类名
                this.element.css("width", divWidth);  //设置宽度

                //设置list
                this.element.find("div.list").css("width", ulWidth);  //设置宽度

                //设置效果层宽度和高度
                //            console.log(this._list.find("li").width());
                //            console.log(this._list.find("span")[0].offsetWidth);

                /* 获得每项(<li>)的宽度和高度。
                此处要放到setTimeout中，目的是把任务从某个队列中跳脱成为新队列。
                如果不放到setTimeout中,则this._li.width()和this._li.height()的值都为0！
    
                现有的 JavaScript 引擎是单线程处理任务的，
                它把任务放到队列中，不会同步去执行，必须在完成一个任务后才开始另外一个任务。
    
                GUI渲染线程:
                该线程负责渲染浏览器界面HTML元素,当界面需要重绘(Repaint)或由于某种操作引发回流(reflow)时,该线程就会执行.
                因为 JavaScript脚本是可操纵DOM元素,在修改这些元素属性同时渲染界面,那么渲染线程前后获得的元素数据就可能不一致了.
    
                在JavaScript引擎运行脚本期间,浏览器渲染线程都是处于挂起状态的,也就是说被”冻结”了. 
    
                所以,在脚本中执行对界面进行更新操作,如添加结点,删除结点或改变结点的外观等更新并不会立即体现出来,这些操作将保存在一个队列中,
                待JavaScript引擎空闲时才有机会渲染出来.
    
                详见:深入理解JavaScript定时机制 http://www.phpv.net/html/1700.html
    
    
                所以我认为，此时的GUI渲染线程被挂起，要待JavaScript引擎空闲时才有机会渲染出来。<li>中的内容是js动态加入的，这些操作被保存到一个队列a中。
                所以需要把“self._selectedDiv.css({ "width": self._li.width().toString() + "px", "height": self._li.height().toString() + "px" });”
                放到另一个队列b中，该队列在a之后，这样就能获得渲染之后的dom元素的高度和宽度了。
                */
                setTimeout(function () {
                    //                console.log(self._li.height());

                    temp = YYC.Tool.collection.getMaxWidthHeight(self._li); //获得li中最大的width和height

                    //ff下self._li的宽度和高度可能还是为0（如在一个window控件中显示分页列表，并且该列表有图片），此时就直接设定。
                    selectedDiv_width = temp.width == 0 ? self.config.width : temp.width.toString();
                    selectedDiv_height = temp.height == 0 ? self.config.height : temp.height.toString();
                    //                console.log(self._li.width() == 0, self.config.width, selectedDiv_width);
                    self._selectedDiv.css({ "width": selectedDiv_width + "px", "height": selectedDiv_height + "px" });
                    //                console.log("li width = ", self._li.width().toString(), "width = ", self._selectedDiv.css("width"));
                }, 0);

                //            this._selectedDiv.css({ "width": this.config.width, "height": this.config.height + spanHeight.slice(-2) });

                //            console.log(this.element.find("ul.list").css("display"));
                //            console.log(this.element.find("ul.list").css("vertical-align"));
            },
            //创建控件
            _createPaging: function () {
                this.element = $("<div class='yyc_paging'/>");
                this.config.id && this.element.attr("id", this.config.id);    //设置控件层id


                this._list = $("<div class='list'/>").append($("<ul/>"));
                //        console.log(this._list.children().length);
                //        ul = $("<div class='list'/>").append(ul);
                this._page = $("<div class='paging'/>");

                //创建选中效果层
                this._selectedDiv = $("<div class='selected'/>").appendTo(this.element);


                //            var listHtml = "";
                //            var pageHtml = "";

                //            var t = this._li;



                //        container = YYC.Tool.selector.$(container);

                //        //            container.html($("<div/>"));
                //        container.append(ul);
                //        container.append(page);

                this._initHtml();
                this._showPage();
                this._showList();


                //        var ul = this._list;
                //        ul = $("<div class='list'/>").append(this._list);
                //        var page = this._page;
                //            var listHtml = "";
                //            var pageHtml = "";

                //            var t = this._li;

                this.element.append(this._list);
                this.element.append(this._page);


                this._setWidth(this.config.col, this.config.width);

            },
            //数据验证
            _validate: function () {
                var i = 0,
                len = 0;

                for (i = 0, len = this.config.items.length; i < len; i++) {
                    if (this.config.onlyImg || this.config.onlyText) {
                        if (YYC.Tool.judge.isArray(this.config.items[i])) {
                            throw new Error("items必须为一维数组！");
                        }
                    }
                    else {
                        if (!YYC.Tool.judge.isArray(this.config.items[i])) {
                            throw new Error("items必须为二维数组！");
                        }
                    }
                }

                if (typeof this.config.Jump == "string" || typeof this.config.onclick == "string") {
                    throw new Error("Jump和onclick必须为函数！");
                }

                //限制show，因为太大的话，页面装不下页码
                if (this.config.show > 5) {
                    throw new Error("show只能小于等于5！");
                }

                if (!YYC.Tool.judge.isString(this.config.imgBorder)) {
                    throw new Error("imgBorder要指定为颜色字符串，如imgBorder: \"black\"");
                }
            },
            //页数跳转
            _jump: function (e, value) {
                //            console.log("jump!");
                //要跳转的页数
                var jtext = this._page.find(".jump").val();
                var regex = null;
                var self = this;
                //            console.log(jtext);

                var pageNum = arguments[1][0],
                    pageIndex = arguments[1][1];

                jtext = jQuery.trim(jtext);

                //    alert("jtext="+jtext);
                if (jtext.length > 0) {
                    //                regex = /^\d{1,4}$/;
                    regex = /^\d+$/;

                    if (!regex.test(jtext) || jtext === "0") {  //页号为0也不行
                        alert("请输入正确的页号，谢谢!");
                    }
                    else {
                        jtext = parseInt(jtext);    //jtext为String型，要转换为整型
                        //                    console.log(jtext);
                        //                    console.log(pageNum);
                        //                    console.log(arguments[1]);
                        //                    console.log(arguments[2]);
                        if (jtext == pageIndex) {     //输入的页码为当前页
                            alert("您输入的是当前页，请重新输入~");
                        }
                        else if (jtext <= pageNum) {
                            //                alert("jtext=" + jtext);
                            //                        console.log(pageIndex);

                            //                        YYC.Tool.event.bindEvent(this, this._goPage, jtext)(window.event);
                            this._goPage(null, jtext); //跳转到pageIndex页
                        }
                        else {
                            alert("您输入的页号超过了最大页数，请重新输入~");
                        }
                    }
                }
                else {
                    window.alert("请输入要跳转的页号，谢谢~");
                }
            },
            //插入按钮控件
            _addButton: function () {
                var self = this;

                //按钮
                this._but = new YYC.Control.Button({
                    //                id: "bu",
                    text: "跳转",
                    //                value: [self.pageNum, self.pageIndex],  //传参
                    addClass: "button_add",    //增加样式
                    //                onclick: function () {
                    //                    console.log("pageNum = " + arguments[1][0]);
                    //                }
                    onclick: YYC.Tool.event.bindEvent(self, self._jump, [self.pageNum, self.pageIndex])  //调用Jump方法
                });
                temp = $("<span>&nbsp;<input type='text' size='4' class='jump'/></span>");
                //            temp.append($(but.button));

                this._but.renderTo(temp);

                //            temp.append($(this._but.button));

                this._page.append(temp);
            },
            _setBorder: function () {
                var top = 0,
                    left = 0;


                //            console.log(this._currentPageIndex);
                //            console.log(this.pageIndex);

                if (this._currentPageIndex !== this.pageIndex) {
                    //                $(this._prevLi).css("border", "0px");
                    //                console.log(this._selectedDiv.css("top"));
                    this._selectedDiv.css("top", "-4000px");
                    //                console.log(this._selectedDiv.css("top"));
                    //                this._prevLi = null;
                }
                else {
                    top = $(this._prevLi).position().top;
                    left = $(this._prevLi).position().left;

                    this._selectedDiv.css({ "top": top.toString() + "px", "left": left.toString() + "px" });
                }

            },
            //为页码绑定click事件，点击时调用私有方法_onclick_goPage（实际上调用的是_goPage）
            _bindClick: function (str, temp, value) {
                var evt = YYC.Tool.event;
                var element = $(str);
                this._onclick_goPage = evt.bindEvent(this, this._goPage, value);

                if (element[0]) {
                    this._goPage = element[0];
                    evt.addEvent(element[0], "click", this._onclick_goPage);
                }
                temp.append(element);

            },
            //显示page页的内容
            _goPage: function (e, page) {
                //            console.log(e);
                //            console.log(arguments[1]);
                switch (page) {
                    case "prev":
                        //                    console.log("prev");
                        this.pageIndex = this.pageIndex > 1 ? this.pageIndex - 1 : 1;
                        break;
                    case "next":
                        this.pageIndex = this.pageIndex < this.pageNum ? this.pageIndex + 1 : this.pageNum;
                        break;
                    case "first":
                        this.pageIndex = 1;
                        break;
                    case "last":
                        this.pageIndex = this.pageNum;
                        break;
                    default:
                        if (page >= 1 && page <= this.pageNum) {
                            this.pageIndex = page;
                        }
                        break;
                }

                //如果page页不是选中项所在的页，则不显示边框
                this._setBorder();
                //刷新页面和页码
                this._showList();
                this._showPage();
            },
            _onclick: function (e, i, current) {
                var index = -1;
                var top = 0,
                    left = 0;
                var self = this;

                //序号从0开始
                index = i + (this.pageIndex - 1) * this.pageSize;


                //                                        if (self.lockMap && index < self.mapCount) {

                //去掉前一个选中项的边框，设置选中项的边框
                //            if (this._prevLi) {
                //                $(this._prevLi).css("border", "0px");
                //            }

                //指定选中项时ff下需要延迟，这样才能获得坐标。
                if (this._select_flag) {
                    setTimeout(function () {
                        top = $(current).position().top;
                        left = $(current).position().left;
                        //                console.log(left);
                        $(self._selectedDiv).css({ "top": top, "left": left });
                        //复位标志
                        self._select_flag = false;
                    }, 200);
                }
                else {
                    top = $(current).position().top;
                    left = $(current).position().left;
                    //                console.log(left);
                    $(this._selectedDiv).css({ "top": top, "left": left });
                }
                //            $(current).css("border", "1px solid #EED435");
                this._prevLi = current;

                //记录选中项所在的页数
                this._currentPageIndex = this.pageIndex;
                //                                            this.mapIndex = index;
                //                                        }

                //调用onclick委托，其中current为dom元素。
                //不用call，这样会破坏封装性。
                this.config.onclick(e, index, current);
                //            return this.config.onclick.call(this, e, index, current);
            },
            //搭建一页的框架（具体图片src和文字在_showList中加入），并为每个图片绑定click事件
            _initHtml: function () {
                var html = null;
                var str = "";
                var li = null;
                var self = this;
                var index = -1;


                //只有图片
                if (this.config.onlyImg) {
                    //调用格式化函数
                    str = YYC.Tool.string.formatDelegate("<li><img src='' border='0' width={0} height={1}/></li>", this.config.width, this.config.height);
                    //                    html = new Array(this._pageSize + 1).join("<li><div><img src='' border='0' width=/> </div></li>");
                }
                    //只有文字
                else if (this.config.onlyText) {
                    str = YYC.Tool.string.formatDelegate("<li><span style='display:block;width:{0}px;'></span></li>", this.config.width);
                }
                    //有图片和文字
                else {
                    str = YYC.Tool.string.formatDelegate("<li><img src='' border='0' width={0} height={1} style='display:block;'/>"
                          + "<span style='display:block;width:{2}px;'></span></li>", this.config.width, this.config.height, this.config.width);
                }
                html = new Array(this.pageSize + 1).join(str);
                //                var html = new Array(this._pageSize + 1).join("<li><div></div></li>");
                //                DOTA.$("map").innerHTML = html;

                //            console.log($(html).length);
                //            var t = $(html).filter("li"); ;

                //插入
                this._list.find("ul").html(html);
                //            var t = this._list;
                //            console.log(this._list.toString());

                //此处不能写成“li = this._li = $(html)”，否则在renderTo中调用_showList无效！
                li = this._li = this._list.find("li");



                for (var i = 0; i < li.length; i++) {
                    //                function () {
                    //                            index = i + (self.pageIndex - 1) * self.pageSize;
                    //                            if (self.lockMap && index < self.mapCount) {
                    //                                if (self.prevImg) {
                    //                                    self.prevImg.style.border = "1px solid #506DA9";
                    //                                }
                    //                                this.style.border = "1px solid #EED435";
                    //                                self.prevImg = this;
                    //                                self.mapIndex = index;
                    //                            }
                    //                        };

                    //绑定li点击事件
                    (function (i) {
                        //                    index = i + (self.pageIndex - 1) * self.pageSize;
                        //                    console.log("self.pageIndex = " + self.pageIndex);
                        //                    this._onclick = YYC.Tool.event.bindEvent(self, self.config.onclick, i, li[i]);
                        //                    li[i].onclick = YYC.Tool.event.bindEvent(self, self.config.onclick, i, li[i]);
                        YYC.Tool.event.addEvent(li[i], "click", YYC.Tool.event.bindEvent(self, self._onclick, i, li[i]));
                    })(i);
                    //                    //显示当前选中的地图
                    //                    index = i + (self.pageIndex - 1) * self.pageSize;
                    //                    if (index == this.mapIndex) {
                    //                        imgs[i].style.border = "1px solid #EED435";
                    //                        self.prevImg = imgs[i];
                    //                    }
                }
                return html;
            },
            //显示页码
            _showPage: function () {
                //                this.page._showPage();
                //                var html = [];
                var str = "";
                var show = this.config.show;
                //获得函数名
                var _goPage = YYC.Tool.judge.isFunction(this.config._goPage) ? YYC.Tool.func.getFunctionName(this.config._goPage) : this.config._goPage;
                var temp = null;
                var handler = null;
                var element = null;
                var evt = YYC.Tool.event;

                //            str = YYC.Tool.string.formatDelegate("<span>共<b>{0}</b>个 每页显示<b>{1}</b>个 第<b>{2}</b>/<b>{3}</b>页</span>", this.total, this.pageSize, this.pageIndex, this.pageNum);
                str = YYC.Tool.string.formatDelegate("<span>共<b>{0}</b>个 第<b>{1}</b>/<b>{2}</b>页</span>", this.total, this.pageIndex, this.pageNum);

                //                html.push("<span>共 <b>");
                //                html.push(this.total + "</b> 个 每页显示 <b>" + this.pageSize + "</b> 个");
                //                html.push(str);
                //                html.push();

                temp = $(str);
                //            console.log("showpage");

                if (this.pageIndex == 1) {
                    str = "<a onclick='void(0);' class='gray'>第一页</a>";
                    //                this._bindClick(str, temp, "first");
                    temp.append($(str));
                    str = "<a onclick='void(0);' class='gray'>上一页</a>";
                    temp.append($(str));
                    //                this._bindClick(str, temp, "prev");
                    //                    html.push("<a onclick='void(0);' class='gray'>上一页</a>");
                } else {
                    str = "<a  name='first'>第一页</a>";
                    this._bindClick(str, temp, "first");

                    str = "<a  name='first'>上一页</a>";
                    this._bindClick(str, temp, "prev");
                    //                    html.push("<a onclick=\"goPage('prev');void(0);\">上一页</a>");
                }

                //            this._bindClick(str, temp, "prev");




                //            element = $(str);

                //            handler = evt.bindEvent(this, this._goPage, "prev");
                //            //            handler = 
                //            if (element[0]) {
                //                evt.addEvent(element[0], "click", handler);
                //            }
                //            //            element

                //            temp.append(element);




                if (this.pageIndex > (show + 1)) {
                    str = YYC.Tool.string.formatDelegate("<a name='before' title='前" + (show + 1) + "页'>{0}</a>", "..");

                    this._bindClick(str, temp, this.pageIndex - (show + 1));

                    //                element = $(str);

                    //                handler = evt.bindEvent(this, this._goPage, "prev");
                    //                //            handler = 
                    //                if (element[0]) {
                    //                    evt.addEvent(element[0], "click", handler);
                    //                }
                    //                //            element

                    //                temp.append(element);

                }
                for (var i = this.pageIndex - show; i <= this.pageIndex + show; i++) {
                    if (i == this.pageIndex) {
                        str = YYC.Tool.string.formatDelegate("<a onclick='void(0);' class='current'>{0}</a>", i);

                        temp.append($(str));
                    }
                    else {
                        if (i > 0 & i <= this.pageNum) {
                            str = YYC.Tool.string.formatDelegate("<a name='page' >{0}</a>", i);

                            this._bindClick(str, temp, i);
                        }
                    }
                }
                if (this.pageIndex < (this.pageNum - (show))) {
                    str = YYC.Tool.string.formatDelegate("<a name='after' title='后" + (show + 1) + "页' >{0}</a>", "..");

                    this._bindClick(str, temp, this.pageIndex + (show + 1));
                }




                if (this.pageIndex == this.pageNum) {
                    //                    html.push("<a onclick='void(0);' class='gray'>下一页</a");
                    //                str = "<a onclick='void(0);' class='gray'>下一页</a>";

                    //                temp.append($(str));

                    str = "<a onclick='void(0);' class='gray'>最后一页</a>";
                    temp.append($(str));
                    str = "<a onclick='void(0);' class='gray'>下一页</a>";
                    temp.append($(str));
                } else {
                    //                    html.push("<a onclick=\"goPage('next');void(0);\">下一页</a>");
                    str = "<a  name='last'>最后一页</a>";
                    this._bindClick(str, temp, "last");

                    str = "<a  name='next'>下一页</a>";
                    this._bindClick(str, temp, "next");
                    //                str = "<a name='next'>下一页</a>";
                    //                this._bindClick(str, temp, "next");
                }


                //            if (this.pageIndex == 1) {
                //                str = "<a onclick='void(0);' class='gray'>上一页</a>";
                //                //                    html.push("<a onclick='void(0);' class='gray'>上一页</a>");
                //            } else {
                //                str = YYC.Tool.string.formatDelegate("<a name='prev' >上一页</a>");
                //                //                    html.push("<a onclick=\"goPage('prev');void(0);\">上一页</a>");
                //            }



                //            if (this.pageIndex > (show + 1)) {
                //                str += YYC.Tool.string.formatDelegate("<a name='before' title='前" + (show + 1) + "页' onclick='{0}({1})'>{2}</a>", _goPage, this.pageIndex - (show + 1), "..");
                //            }
                //            for (var i = this.pageIndex - show; i <= this.pageIndex + show; i++) {
                //                if (i == this.pageIndex) {
                //                    str += YYC.Tool.string.formatDelegate("<a onclick='void(0);' class='current'>{0}</a>", i);
                //                }
                //                else {
                //                    if (i > 0 & i <= this.pageNum) {
                //                        str += YYC.Tool.string.formatDelegate("<a name='page' onclick='{0}({1});void(0);'>{2}</a>", _goPage, i, i);
                //                    }
                //                }
                //            }
                //            if (this.pageIndex < (this.pageNum - (show))) {
                //                str += YYC.Tool.string.formatDelegate("<a name='after' title='后" + (show + 1) + "页' onclick='{0}({1})'>{2}</a>", _goPage, this.pageIndex + (show + 1), "..");
                //            }




                //            //            for (var i = 1; i <= this.pageNum; i++) {
                //            //                if (i == this.pageIndex) {
                //            //                    str += YYC.Tool.string.formatDelegate("<a onclick='void(0);' class='current'>{0}</a>", i);
                //            //                    //                        html.push("<a onclick='void(0);' class='current'>" + i + "</a>");
                //            //                } else {
                //            //                    str += YYC.Tool.string.formatDelegate("<a onclick='{0}({1});void(0);'>{2}</a>", _goPage, i, i);
                //            //                    //                        html.push("<a onclick='goPage(" + i + ");void(0);'>" + i + "</a>");
                //            //                }
                //            //            }
                //            if (this.pageIndex == this.pageNum) {
                //                //                    html.push("<a onclick='void(0);' class='gray'>下一页</a");
                //                str += "<a onclick='void(0);' class='gray'>下一页</a>";
                //            } else {
                //                //                    html.push("<a onclick=\"goPage('next');void(0);\">下一页</a>");
                //                str += YYC.Tool.string.formatDelegate("<a name='next' onclick=\"{0}('next');void(0);\">下一页</a>", _goPage);
                //            }


                //            temp = "<span id='paging_jump'>&nbsp;跳转到&nbsp;<input type='text' id='paging_jump_text' size='4' class='jump'/></span>";
                //            str += YYC.Tool.string.formatDelegate("<span id='paging_jump'>&nbsp;跳转到&nbsp;<input type='text' id='paging_jump_text' size='4' class='jump'/></span>");
                //            <input type='button' id='jumpid' value='跳转' "
                //                + "onclick='{0}({0},  {1}, \"{2}\");'/>       , total, page, str




                //            str += temp;
                //                DOTA.$("page").innerHTML = html.join("");

                //            //清空
                this._page.html("");
                //插入
                this._page.append(temp);

                //插入按钮控件
                this._addButton();

                //            //绑定click事件
                //            this._bindClick();

                //            console.log(temp);

                //            return str;
            },
            //显示列表
            _showList: function () {
                //                this.list._showList();
                //start到end中的图片序号为该页的图片序号
                var i, n, imgs = null,
                            span = null,
                        start = (this.pageIndex - 1) * this.pageSize,
                //			        map = this.map,
                        end = Math.min(start + this.pageSize, this.total);

                //            if (this.config.onlyText) {
                span = this._li.find("span");
                //            }
                //            else {
                imgs = this._li.find("img");
                //            }

                for (i = start, n = 0; i < end; i++, n++) {
                    //			imgs[n].src = "../Images/Map/Map" + map[i].id + ".gif";
                    if (this.config.onlyImg) {
                        imgs.eq(n).attr("src", this.config.items[i]);
                    }
                    else if (this.config.onlyText) {
                        //用html()，不用text()。
                        //因为这样可以加入this.config.items[i]文本中的html元素（如<span>、<br/>等）。
                        span.eq(n).html(this.config.items[i]);
                    }
                    else {
                        imgs.eq(n).attr("src", this.config.items[i][0]);
                        //用html()，不用text()。
                        //因为这样可以加入this.config.items[i][1]文本中的html元素（如<span>、<br/>等）。
                        imgs.eq(n).next().html(this.config.items[i][1]);
                        //                    console.log("showlist imgs.eq(n).next() = " + imgs.eq(n).next().height());
                    }
                    //设置边框
                    this.config.imgBorder && imgs.eq(n).css("border", "1px solid " + this.config.imgBorder);
                    //                this.index = n;
                }
                //            n++;
                //        //如果图片未显示满一页（即最后一页，则剩余图片为null.gif）
                for (; n < this.pageSize; n++) {
                    //                console.log("n = ", n);
                    if (imgs) {
                        imgs.eq(n).attr("src", this.config.nullPath);
                        imgs.eq(n).css("border", "0px");    //空图片没有边框
                    }
                    span.eq(n).html("");
                }

            }
            //            _onclick: function () {
            //            }
        },
        Public: {
            element: null,
            config: null,
            //            list: null,
            //            page: null,
            index: -1,
            //            current: null,
            total: 0,
            pageSize: 0,
            pageNum: 0,
            pageIndex: 0,
            //控件的宽度
            width: 0,

            //加入到container中
            renderTo: function (container) {
                //            console.log("renderTo");
                //                                var e = document.createElement("div");
                //            var ul = $("<div><ul/></div>");
                //            this._list = ul.find("ul");

                //创建控件
                this._createPaging();


                container = YYC.Tool.selector.$(container);

                //            container.html($("<div/>"));
                //            container.append(ul);
                //            container.append(page);

                container.append(this.element);

                //保存容器
                this._container = container;

                //            this._initHtml();
                //            this._showPage();

                //            this._showList();


                //            //设置样式
                //            this._setWidth("yyc_paging", "list", "paging", this.config.col, this.config.width);

                //            var m = this._li;





                //            ul.append(listHtml);
                //            page.append(pageHtml);

                //                this.list.renderTo(container);  //显示列表
                //                this.page.renderTo(container);  //显示页码
                //                e.className = "DOTA_Menu";
                //                e.id = this.menuID;
                //                //加入菜单最外围的层
                //                container.appendChild(e);

                //                //加入菜单
                //                this.mainMenu.renderTo(e);
            },
            //选中指定项
            selectTarget: function (index) {
                var self = this;

                this._select_flag = true;
                //设置所在页码
                this.pageIndex = Math.floor(index / this.pageSize) + 1;
                //计算位置
                index = index % this.pageSize;

                //此处用setTimeout 0 来跳出当前线程。
                setTimeout(function () {
                    //刷新页面和页码，跳转到所在页码
                    self._showList();
                    self._showPage();
                    //触发该项的点击事件
                    self._li[index].click();
                }, 0);
            },
            //隐藏分页控件容器
            hide: function () {
                var self = this;

                if (this._container) {
                    //此处如果不用setTimeout 0，会造成_setWidth中的self._li.width()为0！
                    setTimeout(function () {
                        self._container.hide();
                    }, 0);
                }
                else {
                    throw new Error("没有指定控件容器container！");
                }
            },
            //显示分页控件容器
            show: function () {
                if (this._container) {
                    this._container.show();
                }
                else {
                    throw new Error("没有指定控件容器container！");
                }
            },
            dispose: function () {
                //按钮dispose
                this._but.dispose();

                //移除事件。
                //每一项的click事件太多，此处就不移除了。
                YYC.Tool.event.removeEvent(this._goPage, "click", this._onclick_goPage);

                //删除节点
                this.element.remove();
            }
        }
    });
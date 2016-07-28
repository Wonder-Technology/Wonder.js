/***********************************************
来自：

DOTA.ToolBar v0.1
作者：黄健
ＱＱ：573704282
Email: freewind22@163.com


修改：

作者：YYC
电子邮箱：395976266@qq.com
QQ: 395976266
日期：2012-10-31
博客：http://www.cnblogs.com/chaogex/

************************************************/

//if (typeof YYC == "undefined" || !YYC) {
//    window.YYC = {};
//}


YYC.namespace("Control").ToolBarItem = function (config) {
	this.config = YYC.Tool.extend.extend({
		icon : '',
		text : '',
		menu : null,    //菜单控件对象
		field : null    //field是什么？
	}, config || {});
	
	this.Init();
};
YYC.Control.ToolBarItem.prototype = {
    Init: function () {
        var cfg = this.config, e = this.element = document.createElement("div");
//        $(this.element).css({"border": "1px solid red"});
        if (cfg.menu) {
            cfg.menu.renderTo(e);
        }
        if (cfg.field) {
            cfg.field.renderTo(e);
        }
    },
    renderTo: function (container) {
        container.appendChild(this.element);
    },
    dispose: function () {
        var cfg = this.config;
        if (cfg.menu) {
            cfg.menu.dispose();
        }
        if (cfg.field) {
            cfg.field.dispose();
        }
        this.element.innerHTML = "";
        this.element = null;
    }
};

YYC.namespace("Control").ToolBar = function (container) {
    this.container = YYC.Tool.selector.getDom(container);
    this.Init();
    this.items = [];
};
YYC.Control.ToolBar.prototype = {
	Init : function(){
		var e = this.element = document.createElement("div");
		e.cssText = "position:relative;"
		this.container.appendChild(e);
},
    //加入一个工具条
	add : function(o){
		if(typeof o == "object"){
			var i = new YYC.Control.ToolBarItem(o);    
			this.items.push(i);
			i.renderTo(this.element);
		}
	},
	render : function(){
		this.container.style.display = "block";
		this.container.appendChild(this.element);
	},
	getHeight : function(){
		var i, o = this.items, h = 0, e;
		for( i = 0; i < o.length; i++ ){
			e = o[i].element;
			h += parseInt(e.style.height || e.offsetHeight);
		}
		return h;
	},
	dispose : function(){
		var i, o = this.items;
		for( i = 0; i < o.length; i++ ){
			o[i].dispose();
		}
		
		this.element.innerHTML = "";
		this.container.removeChild(this.element);
		this.items = this.element = null;
	}
};
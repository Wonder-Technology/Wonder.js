/*!
 YOOP
 Javascript OOP framework

 version:1.1.0
 author:YYC
 email:395976266@qq.com
 qq:395976266
 blog:http://www.cnblogs.com/chaogex/
 homepage:https://github.com/yyc-git/YOOP
 repository:git@github.com:yyc-git/YOOP.git
 license:MIT
 date:2013-06-09
 */ 
(function () {
    var version = "1.1.0";
    var global = this,
        YOOP = {};

    //js对象扩展
    (function () {
        String.prototype.contain = function (str) {
            var reg = new RegExp(str);  //str需要转义
            if (this.match(reg)) {
                return true;
            }
            else {
                return false;
            }
        }
    }());

    //获得在原型prototype中不存在同名的str。
    //如果有同名，则加上前缀"_"
    function _getNoRepeatStrInPrototype(prototype, str) {
        var new_str = "";

        if (!prototype[str]) {
            return str;
        }
        new_str = "_" + str;

        return arguments.callee(prototype, new_str);
    }

    function _extendDeep(parent, child) {
        var i = null,
            len = 0,
            toStr = Object.prototype.toString,
            sArr = "[object Array]",
            sOb = "[object Object]",
            type = "",
            _child = null;

        //数组的话，不获得Array原型上的成员。
        if (toStr.call(parent) === sArr) {
            _child = child || [];

            for (i = 0, len = parent.length; i < len; i++) {
                type = toStr.call(parent[i]);
                if (type === sArr || type === sOb) {    //如果为数组或object对象
                    _child[i] = type === sArr ? [] : {};
                    arguments.callee(parent[i], _child[i]);
                }
                else {
                    _child[i] = parent[i];
                }
            }
        }
        //对象的话，要获得原型链上的成员。因为考虑以下情景：
        //类A继承于类B，现在想要拷贝类A的实例a的成员（包括从类B继承来的成员），那么就需要获得原型链上的成员。
        else if (toStr.call(parent) === sOb) {
            _child = child || {};

            for (i in parent) {
                if (i.contain("baseClass")) {
                    _child[i] = parent[i];
                    continue;
                }

                type = toStr.call(parent[i]);
                if (type === sArr || type === sOb) {
                    _child[i] = type === sArr ? [] : {};
                    arguments.callee(parent[i], _child[i]);
                }
                else {
                    _child[i] = parent[i];
                }
            }
        }
        else {
            _child = parent;
        }

        return _child;
    }

    function _extend(destination, source) {
        var property = "";

        for (property in source) {
            destination[property] = source[property];
        }
        return destination;
    }

    function _getFunctionName(fn) {
        var name = "";

        if (!fn) {
            return null;
        }

        name = fn.toString().match(/^.*function\s*([^\(]*)/);
        return name === null ? name : name[1];
    }

    function _isArray(val) {
        return Object.prototype.toString.call(val) === "[object Array]";
    }

    function _initParentContainer(struct) {
        struct.yoop_parents = []
    }

    function _saveParents(struct, inheritedInterfaces, inheritedClasses) {
        if (inheritedInterfaces) {
            struct.yoop_parents = struct.yoop_parents.concat(inheritedInterfaces);
            for (var i = 0, len = inheritedInterfaces.length; i < len; i++) {
                struct.yoop_parents = struct.yoop_parents.concat(inheritedInterfaces[i].yoop_parents);
            }
        }

        if (inheritedClasses) {
            struct.yoop_parents.push(inheritedClasses);
            struct.yoop_parents = struct.yoop_parents.concat(inheritedClasses.yoop_parents);
        }
    }

    /*
     Structure写成原型形式，而Interface、AClass、Class不写成原型形式！（如写成:
     Interface.prototype = (function(){
     function I(){
     };

     return {
     ...
     };
     }());
     ）
     因为如果写成原型形式，则Interface/AClass/Class的实例就共享同一个I/A/F类！这样会造成不同的类之间互相干扰！
     */
    (function () {
        function Interface() {
            var that = this;

            this.parent = null;
            this.method = null;
            this.attribute = null;

            _initParentContainer(I);

            function I() {
            }

            function _getByParent(_parent, _method, _attribute) {
                if (_hasParent(_parent)) {
                    _checkInheritInterface(_parent);
                    that.parent = _isArray(_parent) ? _parent : [_parent];

                    //形如“Interface(Parent, "A", "B", "GetName");”
                    if (_method && !_isArray(_method)) {
                        that.method = Array.prototype.slice.call(arguments, 1);
                        that.attribute = null;
                    }
                    //形如“Interface(Parent, ["A", "B", "GetName"], ["a", "c"]);”
                    else {
                        that.method = _method;
                        that.attribute = _attribute;
                    }
                }
                else {
                    that.parent = null;
                    //形如“Interface("A", "B", "GetName");”
                    if (_parent && !_isArray(_parent)) {
                        that.method = Array.prototype.slice.call(arguments, 0);
                        that.attribute = null;
                    }
                    //形如“Interface(["A", "B", "GetName"], ["a", "c"]);”
                    else {
                        that.method = arguments[0];
                        that.attribute = arguments[1];
                    }
                }

                _saveParents(I, that.parent);
                _checkMethod();
            };
            function _hasParent(_parent) {
                return typeof _parent === "function" || (_isArray(_parent) && typeof _parent[0] === "function");
            };
            function _checkInheritInterface(_parent) {
                var i = 0,
                    len = 0;

                for (i = 0, len = _parent.length; i < len; i++) {
                    if (_getFunctionName(_parent[i]) !== "I") {
                        throw new Error("Interface must inherit interface!");
                    }
                }
            };
            function _checkMethod() {
                if (!that.method) {
                    throw new Error("Interface must has methods");
                }
            };
            function _inherit() {
                var i = 0,
                    len = 0;

                for (i = 0, len = that.parent.length; i < len; i++) {
                    _extendDeep(that.parent[i].prototype, I.prototype);
                }
                I.prototype.constructor = I;
            };
            function _addMethod() {
                var i = 0,
                    len = 0;

                for (i = 0, len = that.method.length; i < len; i++) {
                    if (that.method[i] === undefined) {
                        continue;
                    }
                    //加上前缀“Interface_”
                    I.prototype["Interface_" + that.method[i]] = function () {
                        throw new Error("This method must be overwrited!");
                    };
                }
            };
            function _addAttribute() {
                var i = 0,
                    len = 0;

                if (that.attribute) {
                    if (!_isArray(that.attribute)) {
                        throw new Error("Attribute must be array!");
                    }
                    else {
                        for (i = 0, len = that.attribute.length; i < len; i++) {
                            //加上前缀“Interface_”
                            I.prototype["Interface_" + that.attribute[i]] = 0;
                        }
                    }
                }
            };

            this.buildInterface = function (_parent, _method, _attribute) {
                _getByParent(_parent, _method, _attribute);
                if (this.parent) {
                    _inherit();
                }
                _addMethod();
                _addAttribute();

                return I;
            };
        };

        YOOP.Interface = function (_parent, _method, _attribute) {
            return new Interface().buildInterface(_parent, _method, _attribute);
        };
    }());

    (function () {

        function Structure() {
        };
        Structure.prototype = (function () {
            return {
                _addMemberAndSetBaseFunc: function (name, position) {
                    var parentClass = this.parentClass,
                        prop = this.prop,
                        P_class = this.P_class,
                        backup = null;

                    if (parentClass &&
                        typeof prop[position][name] === "function" &&
                        typeof P_class.prototype[name] === "function") {
                        P_class.prototype[name] = function (name) {
                            return function () {
                                backup = this.base;
                                this.base = parentClass.prototype[name];

                                return (function (backup, self, args, name) {
                                    var result = prop[position][name].apply(self, args);
                                    self.base = backup;
                                    return result;
                                }(backup, this, arguments, name))

                            };
                        }(name);
                    }
                    else {
                        P_class.prototype[name] = prop[position][name];
                    }
                },
                _addToImplementMap: function (name, func) {
                    this.implementaionMap[name] = func;
                },
                _prepareCheckFor: function (module) {
                    var name = null;

                    if (module) {
                        for (name in module) {
                            if (module.hasOwnProperty(name)) {
                                this._prepareCheckForSpecial(name, module);
                                this._addToImplementMap(name, module[name]);
                            }
                        }
                    }
                },
                _prepareCheckForSpecial: function (name, module) {
                    this._addVirtualToImplementMap(name, module);
                },
                _addVirtualToImplementMap: function (name, module) {
                    var name2 = "";

                    if (name === "Virtual") {
                        for (name2 in module[name]) {
                            if (module[name].hasOwnProperty(name2)) {
                                this._addToImplementMap(name2, module[name][name2]);
                            }
                        }
                    }
                },
                P_checkImplementationOfAbstract: function () {
                    var name = "",
                        parentClass = this.parentClass;

                    if (this.parentClass) {
                        for (name in parentClass.prototype) {
                            if (name === "constructor") {
                                continue;
                            }
                            if (name.contain("Abstract_")) {
                                if (typeof parentClass.prototype[name] === "function") {
                                    this._checkAbstractMethod(name);
                                }
                                else {
                                    this._checkAbstractAttribute(name);
                                }
                            }
                        }
                    }
                },
                _checkAbstractMethod: function (name) {
                    var parentClass = this.parentClass,
                        implementaionMap = this.implementaionMap;

                    if (this._noMethodForAbstract(implementaionMap, name) && this._noMethodForAbstract(parentClass.prototype, name)) {
                        throw new Error("Abstract method '" + name + "' must be overwrited!");
                    }
                },
                _checkAbstractAttribute: function (name) {
                    var parentClass = this.parentClass,
                        implementaionMap = this.implementaionMap;

                    if (this._noAttritubeForAbstract(implementaionMap, name) && this._noAttritubeForAbstract(parentClass.prototype, name)) {
                        throw new Error("Abstract attribute '" + name + "' must be overwrited!");
                    }
                },
                P_checkImplementationOfInterface: function (_interface) {
                    var name = "";

                    for (name in _interface.prototype) {
                        if (!name.contain("Interface_")) {
                            continue;
                        }
                        if (typeof _interface.prototype[name] === "function") {
                            this._checkInterfaceMethod(name);
                        }
                        else {
                            this._checkInterfaceAttribute(name);
                        }
                    }
                },
                _checkInterfaceMethod: function (name) {
                    var implementaionMap = this.implementaionMap,
                        parentClassPrototype = this.parentClass ? this.parentClass.prototype : {};

                    if (this._noMethodForInterface(implementaionMap, name) && this._noMethodForInterface(parentClassPrototype, name)) {
                        throw new Error("Interface method '" + name + "' must be overwrited!");
                    }
                },
                _checkInterfaceAttribute: function (name) {
                    var implementaionMap = this.implementaionMap,
                        parentClassPrototype = this.parentClass ? this.parentClass.prototype : {};

                    if (this._noAttritubeForInterface(implementaionMap, name) && this._noAttritubeForInterface(parentClassPrototype, name)) {
                        throw new Error("Interface attribute '" + name + "' must be overwrited!");
                    }
                },
                _noMethodForAbstract: function (_class, name) {
                    return _class[name.slice(9)] === undefined || typeof _class[name.slice(9)] !== "function";
                },
                _noAttritubeForAbstract: function (_class, name) {
                    return _class[name.slice(9)] === undefined || typeof _class[name.slice(9)] === "function";
                },
                _noMethodForInterface: function (_class, name) {
                    return _class[name.slice(10)] === undefined || typeof _class[name.slice(10)] !== "function";
                },
                _noAttritubeForInterface: function (_class, name) {
                    return _class[name.slice(10)] === undefined || typeof _class[name.slice(10)] === "function";
                },
                P_addAbstract: function (abstract) {
                    var name = "",
                        _class = this.P_class;

                    for (name in abstract) {
                        if (abstract.hasOwnProperty(name)) {
                            //抽象方法前面加"Abstract_"前缀
                            _class.prototype["Abstract_" + name] = abstract[name];
                        }
                    }
                },
                //加入虚方法(不能为虚属性)
                P_addVirtualAndCheck: function (virtual) {
                    var name = "",
                        _class = this.P_class;

                    for (name in virtual) {
                        if (virtual.hasOwnProperty(name)) {
//                            if (typeof virtual[name] !== "function") {
//                                throw new Error("Virtual attribute is not allowed!");
//                            }
//                            else {
                                _class.prototype[name] = virtual[name];
//                            }
                        }
                    }
                },
                P_addStaticMember: function () {
                    var Static = null,
                        k = null,
                        _class = this.P_class,
                        prop = this.prop;

                    Static = prop.Static ? prop.Static : null;

                    for (k in Static) {
                        _class[k] = Static[k];
                    }
                },
                P_inherit: function () {
                    var _class = this.P_class,
                        parentClass = this.parentClass;

                    if (parentClass) {
                        _class.prototype = _extendDeep(parentClass.prototype);
                        _class.prototype.constructor = _class;
                        // 如果父类存在，则实例对象的baseClass指向父类的原型。
                        // 这就提供了在实例对象中调用父类方法的途径。
                        // 注意：baseClass的方法是指向this.parentClass.prototype的，不是指向（子类）的！
                        _class.prototype[_getNoRepeatStrInPrototype(parentClass.prototype, "baseClass")] = parentClass.prototype;
                    }
                },
                P_addInit: function () {
                    var _class = this.P_class,
                        parentClass = this.parentClass,
                        prop = this.prop;

                    if (prop.Init) {
                        if (parentClass &&
                            typeof prop.Init === "function" &&
                            typeof _class.prototype.Init === "function") {
                            _class.prototype.Init = function (name) {
                                return function () {
                                    this.base = parentClass.prototype[name];

                                    return prop[name].apply(this, arguments);
                                };
                            }("Init");
                        }
                        else {
                            _class.prototype.Init = prop.Init;
                        }
                    }
                },
                P_addPrivateMember: function () {
                    var name = null,
                        _class = this.P_class,
                        private = this.prop.Private;

                    if (private) {
                        for (name in private) {
                            if (private.hasOwnProperty(name)) {
                                _class.prototype[name] = private[name];
                            }
                        }
                    }
                },
                P_addPublicMember: function () {
                    var name = null;

                    if (this.prop.Public) {
                        for (name in this.prop.Public) {
                            if (this.prop.Public.hasOwnProperty(name)) {
                                if (this.P_addSpecial("Public", name) === "continue") {
                                    continue;
                                }
                                this._addPublic(name);
                            }
                        }
                    }
                },
                _addPublic: function (name) {
                    this._addMemberAndSetBaseFunc(name, "Public");
                },
                P_prepareCheck: function () {
                    this._prepareCheckFor(this.prop.Public);
                    this._prepareCheckFor(this.prop.Protected);
                },
                P_addProtectedMember: function () {
                    var name = null;
                    var parentClass = this.parentClass,
                        prop = this.prop,
                        P_class = this.P_class;

                    if (this.prop.Protected) {
                        for (name in this.prop.Protected) {
                            if (this.prop.Protected.hasOwnProperty(name)) {
                                if (this.P_addSpecial("Protected", name) === "continue") {
                                    continue;
                                }
                                this._addMemberAndSetBaseFunc(name, "Protected");
                            }
                        }
                    }
                }
            }
        }());

        //创建抽象类
        function AClass() {
            var that = this;

            this.P_class = A;
            this.implementaionMap = {};
            this.parentClass = null;
            this.interface = null;
            this.prop = null;

            _initParentContainer(A);

            //构造函数
            function A() {
            };

            function _getByParent(args) {
                var _parent = args[0],
                    _prop = args[1];

                _checkOnlyOneParentClass(args);

                if (_prop === undefined) {
                    that.prop = _parent;
                    that.parentClass = null;
                    that.interface = null;
                }
                //{Class: xx, Interface: xx}
                else if (typeof _parent === "object") {
                    if (!_parent.Class && !_parent.Interface) {
                        throw new Error("Please add AbstractClass or Interface!");
                    }
                    that.parentClass = _parent.Class;
                    if (_isArray(_parent.Interface)) {
                        that.interface = _parent.Interface;
                    }
                    else if (typeof _parent.Interface === "function") {
                        that.interface = [_parent.Interface];
                    }
                    that.prop = _prop;
                }
                //直接为xx抽象类
                else if (typeof _parent === "function") {
                    that.parentClass = _parent;
                    that.interface = null;
                    that.prop = _prop;
                }
                else {
                    throw new Error("arguments is not allowed!");
                }
                if (_isInheritFromClass()) {
                    throw new Error("AbstractClass can't inherit class!");
                }

                _saveParents(A, that.interface, that.parentClass);
            };
            function _checkOnlyOneParentClass(args) {
                if (args.length >= 3) {
                    throw new Error("AbstractClass can only inherit from one parentClass");
                }

                if (args[0].Class) {
                    if (_isArray(args[0].Class) && args[0].Class.length >= 2) {
                        throw new Error("AbstractClass can only inherit from one parentClass");
                    }
                }
            };
            function _isInheritFromClass() {
                return _getFunctionName(that.parentClass) === "F";
            };
            this.P_inheritInterface = function () {
                if (this.interface) {
                    var i = 0,
                        len = 0;

                    for (i = 0, len = this.interface.length; i < len; i++) {
                        _extendDeep(this.interface[i].prototype, A.prototype);
                    }
                }
            };
            this.P_addSpecial = function (moduleName, name) {
                if (name === "Abstract") {
                    this.P_addAbstract(this.prop[moduleName][name]);
                    return "continue";
                }
                if (name === "Virtual") {
                    this.P_addVirtualAndCheck(this.prop[moduleName][name]);
                    return "continue";
                }
                return null;
            };

            this.buildAClass = function (args) {
                _getByParent(args);

                this.P_inherit();
                this.P_inheritInterface();
                //抽象类本身不能实例化，所以不在A中调用构造函数Init。
                //抽象类中的构造函数供子类构造函数中调用。
                this.P_addInit();
                this.P_addPrivateMember();
                this.P_addProtectedMember();
                this.P_addPublicMember();
                this.P_addStaticMember();
                _addOuterAbstract();
                _addOuterVirtual();

                this.P_prepareCheck();

                return A;
            };

            //放到外面的抽象成员，默认为公有抽象成员
            function _addOuterAbstract() {
                if (that.prop.Abstract) {
                    that.P_addAbstract(that.prop.Abstract);
                }
            };
            function _addOuterVirtual() {
                if (that.prop.Virtual) {
                    that.P_addVirtualAndCheck(that.prop.Virtual);
                }
            };
        };

        AClass.prototype = new Structure();

        //创建普通类
        function Class() {
            var that = this;

            this.implementaionMap = {};
            this.parentClass = null;
            this.interface = null;
            this.prop = null;

            this.P_class = F;
            //当前是否处于创建类的阶段。
            this.initializing = false;

            _initParentContainer(F);

            //构造函数
            function F() {
                var self = this,
                    args = arguments;

                function _copyProtoAttrToInstance() {
                    var i = null,
                        member = null,
                        toStr = Object.prototype.toString;

                    for (i in F.prototype) {
                        if (F.prototype.hasOwnProperty(i)) {
                            member = F.prototype[i];
                            if (toStr.call(member) === "[object Function]") {
                                continue;
                            }

                            self[i] = _extendDeep(member);
                        }
                    }

                    //F.prototype.baseClass的constructor为自带的属性，因此_extendDeep中的for不会遍历到F.prototype.baseClass.constructor
                    //因此该属性不会复制到self中，需要进行手动复制
                    if (self.baseClass) {
                        self.baseClass.constructor = F.prototype.baseClass.constructor;
                    }
                }

                function _init() {
                    if (!that.initializing) {
                        self.Init && self.Init.apply(self, args);
                    }
                }

                function _getInheritLayerCount(classInstance) {
                    var count = 0,
                        name = "baseClass";

                    while (classInstance[name]) {
                        count += 1;
                        name = "_" + name;
                    }

                    return count + 1;
                }

                function _getBaseClass(index) {
                    var count = _getInheritLayerCount(self),
                        index = index || 0,
                        i = 0,
                        len = count - 1 - index,
                        baseClass = "baseClass";

                    if (len <= 0) {
                        throw new Error("没有找到baseClass");
                    }

                    for (i = 0; i < len - 1; i++) {
                        baseClass = "_" + baseClass;
                    }

                    return  self[baseClass];
                }

                _copyProtoAttrToInstance();
                _init();

                this.isInstanceOf = function (_class) {
                    var i = 0,
                        len = F.yoop_parents.length;

                    for (i = 0; i < len; i++) {
                        if (F.yoop_parents[i] === _class) {
                            return true;
                        }
                    }

                    return this instanceof  _class;
                };

                this.stubParentMethod = function (sandbox, method, func) {
                    if (arguments.length === 2) {
                        sandbox.stub(_getBaseClass(0).constructor.prototype, method);
                    }
                    else if (arguments.length === 3) {
                        sandbox.stub(_getBaseClass(0).constructor.prototype, method, func);
                    }

                    this.lastBaseClassForTest = _getBaseClass(0).constructor.prototype;
                };
                this.stubParentMethodByAClass = function (sandbox, method, func) {
                    if (arguments.length === 2) {
                        sandbox.stub(_getBaseClass(1).constructor.prototype, method);
                    }
                    else if (arguments.length === 3) {
                        sandbox.stub(_getBaseClass(1).constructor.prototype, method, func);
                    }

                    this.lastBaseClassForTest = _getBaseClass(1).constructor.prototype;
                };
            }

            function _getByParent(args) {
                var _parent = args[0],
                    _prop = args[1];

                _checkOnlyOneParentClass(args);

                if (_prop === undefined) {
                    that.prop = _parent;
                    that.parentClass = null;
                    that.interface = null;
                }
                //{Class: xx, Interface: xx}
                else if (typeof _parent === "object") {
                    if (!_parent.Class && !_parent.Interface) {
                        throw new Error("Please add Class or Interface!");
                    }
                    that.parentClass = _parent.Class;
                    if (_isArray(_parent.Interface)) {
                        that.interface = _parent.Interface;
                    }
                    else if (typeof _parent.Interface === "function") {
                        that.interface = [_parent.Interface];
                    }
                    that.prop = _prop;
                }
                //直接为xx类
                else if (typeof _parent === "function") {
                    that.parentClass = _parent;
                    that.interface = null;
                    that.prop = _prop;
                }
                else {
                    throw new Error("arguments is not allowed!");
                }

                _saveParents(F, that.interface, that.parentClass);
            };
            function _checkOnlyOneParentClass(args) {
                if (args.length >= 3) {
                    throw new Error("class can only inherit from one parentClass");
                }

                if (args[0].Class) {
                    if (_isArray(args[0].Class) && args[0].Class.length >= 2) {
                        throw new Error("class can only inherit from one parentClass");
                    }
                }
            };
            this.P_addSpecial = function (moduleName, name) {
                if (name === "Abstract") {
                    throw new Error("class can't have abstract members");
                }
                if (name === "Virtual") {
                    this.P_addVirtualAndCheck(this.prop[moduleName][name]);
                    return "continue";
                }
                return null;
            };
            this.buildClass = function (args) {
                _getByParent(args);

                if (this.parentClass) {
                    this.initializint = true;
                    this.P_inherit();
                    this.initializing = false;
                }

                this.P_addInit();
                this.P_addPrivateMember();
                this.P_addProtectedMember();
                this.P_addPublicMember();
                this.P_addStaticMember();
                _addOuterAbstract();
                _addOuterVirtual();

                this.P_prepareCheck();
                this.P_checkImplementationOfAbstract();
                _checkEachImplementationOfInterface();

                return F;
            };
            function _checkEachImplementationOfInterface() {
                F.prototype._inheritedInterfaces = [];

                if (that.interface) {
                    var i = 0,
                        len = 0;

                    for (i = 0, len = that.interface.length; i < len; i++) {
                        that.P_checkImplementationOfInterface(that.interface[i]);
                        F.prototype._inheritedInterfaces.push(that.interface[i]);
                    }
                }
                if (_hasInterfaceInheritFromParentClass()) {
                    that.P_checkImplementationOfInterface(that.parentClass);

                    for (var j  in that.parentClass.prototype) {
                        if (j.contain("Interface_")) {
                            F.prototype._inheritedInterfaces.push(that.parentClass.prototype[j]);
                        }
                    }
                }

            }

            function _hasInterfaceInheritFromParentClass() {
                var name = "";

                for (name in F.prototype) {
                    if (name.contain("Interface_")) {
                        return true;
                    }
                }

                return false;
            };
            function _addOuterAbstract() {
                if (that.prop.Abstract) {
                    throw new Error("class can't have abstract members!");
                }
            };
            function _addOuterVirtual() {
                if (that.prop.Virtual) {
                    that.P_addVirtualAndCheck(that.prop.Virtual);
                }
            };
        };

        Class.prototype = new Structure();

        YOOP.AClass = function () {
            return new AClass().buildAClass(arguments);
        };
        YOOP.Class = function () {
            return new Class().buildClass(arguments);
        };
        YOOP.YOOP = {
            version: version
        };
    }());


    // 支持AMD、CMD、CommonJS规范
    // 支持通过script标签直接引用（引入命名空间YYC）

    var hasDefine = typeof define === "function",
        hasExports = typeof module !== 'undefined' && module.exports;

    if (hasDefine || hasExports) {
        if (hasDefine) {
            define(function () {
                return YOOP;
            });
        }
        else if (hasExports) {
            module.exports = YOOP;
        }
    }
    else {
        global.YYC = global.YYC || {};

        _extend(global.YYC, YOOP);
    }
}());
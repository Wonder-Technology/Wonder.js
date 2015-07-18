# TypeScript style guide
Using typescript 1.5

## Basic

**缩进使用4格软空格**

```javascript
export class Name {
    field1;     // good
  field2;       // bad
}
```

**使用英文，不使用拼音**

```javascript
export class Name {
    event;      // good
    shijian;    // bad
}
```

**允许使用let, const**

```
const b = 1;
for(;;) {
    let a = ...
}
```

**最大程度地定义变量类型**

```javascript
var a:Event;
function b(a:Event) {}
function c(callback:Function) {}
```

**尽量使用for...of代替forEach函数**


```javascript
for(var v of expr) { }

// 编译后
for (var _i = 0, _a = expr; _i < _a.length; _i++) {
    var v = _a[_i];
}
```

**尽量使用ES6 Templates**

```javascript
var i = 0;
var str = `i is ${i}`;

var multiLines = `ES6 templates
multi lines string`;
```

## Class

**驼峰式命名类名，变量名，方法名**

```javascript
class TheClassName {
    theFieldName;
    theMethodName() {
        var theLocalVariable;
    }
}
```

**下划线_, public, protected, private**

只有private属性和方法需要下划线

```javascript
class TheClassName {
    public publicField;
    protected protectedField;
    private _privateField;

    public publicMethod() {}
    protected protectedMethod() {}
    private _privateMethod() {}
}
```

**静态变量**

```javascript
class TheClassName {
    static THE_STATIC_CONST_FIELD = 1;
    static theStaticField;
}
```

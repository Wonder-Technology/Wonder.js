[@bs.val] [@bs.scope "console"] external log1 : 'a => unit = "log";

[@bs.val] [@bs.scope "console"] external log2 : ('a, 'b) => unit = "log";

[@bs.val] [@bs.scope "console"] external log3 : ('a, 'b, 'c) => unit = "log";

[@bs.val] [@bs.scope "console"]
external log4 : ('a, 'b, 'c, 'd) => unit = "log";

/* [@bs.val] [@bs.scope "console"] [@bs.splice] external logMany : array('a) => unit = "log"; */
[@bs.val] [@bs.scope "console"] external info1 : 'a => unit = "info";

[@bs.val] [@bs.scope "console"] external info2 : ('a, 'b) => unit = "info";

[@bs.val] [@bs.scope "console"] external info3 : ('a, 'b, 'c) => unit = "info";

[@bs.val] [@bs.scope "console"]
external info4 : ('a, 'b, 'c, 'd) => unit = "info";

/* [@bs.val] [@bs.scope "console"] [@bs.splice] external infoMany : array('a) => unit = "info"; */
[@bs.val] [@bs.scope "console"] external warn1 : 'a => unit = "warn";

[@bs.val] [@bs.scope "console"] external warn2 : ('a, 'b) => unit = "warn";

[@bs.val] [@bs.scope "console"] external warn3 : ('a, 'b, 'c) => unit = "warn";

[@bs.val] [@bs.scope "console"]
external warn4 : ('a, 'b, 'c, 'd) => unit = "warn";

/* [@bs.val] [@bs.scope "console"] [@bs.splice] external warnMany : array('a) => unit = "warn"; */
[@bs.val] [@bs.scope "console"] external error1 : 'a => unit = "error";

[@bs.val] [@bs.scope "console"] external error2 : ('a, 'b) => unit = "error";

[@bs.val] [@bs.scope "console"]
external error3 : ('a, 'b, 'c) => unit = "error";

[@bs.val] [@bs.scope "console"]
external error4 : ('a, 'b, 'c, 'd) => unit = "error";

/* [@bs.val] [@bs.scope "console"] [@bs.splice] external errorMany : array('a) => unit = "error"; */
[@bs.val] [@bs.scope "console"]
external assert_ : (bool, 'b) => unit = "assert";

/* [@bs.val] [@bs.scope "console"] external assert2 : ('a, 'b) => unit = "assert";

   [@bs.val] [@bs.scope "console"] external assert3 : ('a, 'b, 'c) => unit = "assert";

   [@bs.val] [@bs.scope "console"] external assert4 : ('a, 'b, 'c, 'd) => unit = "assert"; */
/* [@bs.val] [@bs.scope "console"] [@bs.splice] external assertMany : array('a) => unit = "assert"; */
[@bs.val] [@bs.scope "console"] external trace : unit => unit = "";

[@bs.val] [@bs.scope "console"] external profile : string => unit = "";

[@bs.val] [@bs.scope "console"] external profileEnd : unit => unit = "";

[@bs.val] [@bs.scope "console"] external group : 'a => unit = "";

[@bs.val] [@bs.scope "console"] external groupCollapsed : 'a => unit = "";

[@bs.val] [@bs.scope "console"] external groupEnd : unit => unit = "";
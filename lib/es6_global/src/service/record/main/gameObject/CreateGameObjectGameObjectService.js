

import * as UidService$Wonderjs from "../../../primitive/UidService.js";

function create(record) {
  var uid = record[/* uid */0];
  var aliveUidArray = record[/* aliveUidArray */27];
  record[/* uid */0] = UidService$Wonderjs.increase(uid);
  aliveUidArray.push(uid);
  return /* tuple */[
          record,
          uid
        ];
}

export {
  create ,
  
}
/* No side effect */

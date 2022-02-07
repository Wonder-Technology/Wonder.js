open WonderBsMost.Most

//  let callFunc<'States> = (func: () => States): Stream<States> {
//     return just(func).map(func => func());
// }

let callFunc = func => {
  just(func)->map(func => func(), _)
}

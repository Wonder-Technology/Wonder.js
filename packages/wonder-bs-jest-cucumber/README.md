# the commands which are used for changing jest-cumcumber for rescript

<!-- :%s/\/(.+)\//%re("\/$1\/")->Obj.magic/g -->
:%s/\/(.+)\//%re("/$1/")->Obj.magic/g

:%s/"s\s/'s /g

:%s/\(arg0,.+\)/()/g
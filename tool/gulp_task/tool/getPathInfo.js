exports.getProjectDir = function(){
    return process.env.OLDPWD;
};

exports.getWorkingDir = function(){
    return process.cwd();
};

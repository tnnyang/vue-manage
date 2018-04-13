//验证手机号
export function isMObile(value){
    var val = value.replace(/\ +/g, "");
    if (!value.match("^((13[0-9])|(14[0-9])|(15[0|1|2|3|5|6|7|8|9])|(17[0-9])|18[0-9])\\d{8}|(170\\d{8})$")) {
        return true;
    }
}
//长度验证
export function lengthCheck(value, length){
    var value = value.replace(/\ +/g, "");    
    if(value.length < length){
        return true;
    }
}
//密码验证
export function checkPwd(value){
    var value = value.replace(/\ +/g, "");      
    if(!value.match(/^[0-9a-zA-Z]{6,16}$/)){
        return true;
    }
}

export function isEqual(value1, value2){
    var value1 = value1.replace(/\ +/g, "");
    var value2 = value2.replace(/\ +/g, "");  
    if(value1 != value2){
        return true;
    }
}

//邮箱
export function isEmail(value) {
    if (!value.match("^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$")) {
        return true;
    }
}
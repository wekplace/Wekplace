var str = 'preferredJobType:Internship,firstName:Isaac,lastName:Tian';

var arrStr = str.split(',');
var objArrStr = arrStr.reduce((acc, cur) => {
    acc[cur.split(':')[0]] = cur.split(':')[1];
    return acc;
}, {});
console.log(objArrStr);
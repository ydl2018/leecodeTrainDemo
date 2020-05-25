const originStr = 'ABCABCDABCDEFG';
const subStr = 'ABCDG';

var searchSubString = (str,sub)=>{
    for(let i = 0; i < str.length; i++){
        for(let j = 0; j<sub.length; j++){
            if( str[i+j] != sub[j]) break;
            if(j === sub.length-1){
                return true
            }
        }
       
    }
    return false
}
console.log(searchSubString(originStr,subStr));

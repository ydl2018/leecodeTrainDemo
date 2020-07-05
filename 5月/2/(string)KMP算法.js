const originStr = 'ABCABCDABCDEFG';
// const originStr =  'ABCABCDABCDEFG';
//              [ -1, 0, 0, 0, 1, 2, 3, 0, 1, 2, 3, 0, 0, 0, 0 ]
const subStr = 'ABCD';
// 常规解法
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

// KMP 
var KMPsearch = function (org,tar) {
    // 1. build table
    //why is -1 ? because next[k] represent that k-1 prefix and afterfix max common length

    const next = [-1];
    let j = -1;
    let i = 0;
    while(i<org.length){
        if(j == -1 || org[i] == org[j]){
            i++;
            j++;
            next[i] = j;
        }else{
            j = next[j]
        }
    }
    // 
    let i1 = 0;
    let j1 = 0;
    while(i1<org.length && j1<tar.length){
        // 相等 或者j已经回到了-1位置，同时向前走
        // 不相等 回退 => j1 = next[j1] 回退到可以最大公有子串的下一位
        if(j1 == -1 ||  org[i1] == tar[j1]){
            i1++;
            j1++;
        }else{
            j1 = next[i1]
        }
    }
    if(j1 === tar.length){
        return true
    }else{
        return false
    }
    
    
}


// kMP 解法思路 str 都有一个前缀和后缀，当不匹配时，求出前缀组成的数组与后缀组成的数组中交集最长序列
// 将sub指针移动到以最长序列长度的索引

// 
const KMPsearchCopy = function(son,father){
    // 建表
    const next = [-1];
    let str_i = 0, str_j = -1;
    while(str_i < son.length){
        if(str_j == -1 || son[str_j] == son[str_i]){
            str_j++;
            str_i++;
            next[str_i] = str_j
        }else{
            str_j = next[str_j]
        }
    }

    let son_i = 0 , father_j = 0;
    while(son_i < son.length && father_j < father.length){
        console.log(son_i);
        
        if(son_i == -1 || son[son_i] == father[father_j]){
            son_i++;
            father_j++;
        }else{
            son_i = next[son_i]
        }
    }
    
    if(son_i == son.length){
        return true
    }else{
        return false
    }

}
console.log(KMPsearchCopy(subStr,originStr));
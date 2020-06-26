/**
 * 给定一个字符串s，找到其中最长的回文子序列。可以假设s的最大长度为1000。

示例 1:
输入:

"bbbab"
输出:

4
一个可能的最长回文子序列为 "bbbb"。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-palindromic-subsequence
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
var longestPalindromeSubseq = function(s) {
    let maxLen = 0;
    const getPalindDrome = (s,left,right) =>{
        let res = left === right ? -1 :0;
        console.log(left,right);
        
        while(left>=0 && right<s.length){
            if(s[left] != s[right]){
                let _left = left;
                let _right = right;
                let isEqual = false
                console.log(left,right);
                
                while(--_left>=0){
                    if(s[_left] === s[right]){
                        res+=2;
                        isEqual = true;
                        break;
                    }
                }
                if(isEqual){
                    left = _left-1;
                    right++;
                    continue;
                }
                while(++_right < s.length){
                    if(s[_right] === s[left]){
                        res+=2;
                        isEqual = true;
                        break;
                    }
                }
                if(isEqual){
                    left--;
                    right = _right+1;
                    continue
                }
                left--;
                right++;
            }else{
                res += 2;
    
                left--;
                right++;
            }
        }
        return res
    }
    for(let i = 0 ; i< s.length; i++){
        const len1 = getPalindDrome(s,i,i);
        const len2 = getPalindDrome(s,i,i+1);
        maxLen = Math.max(maxLen,len1,len2);
    }
    return maxLen;
};
const getPalindDrome = (s,left,right) =>{
    let res = left === right ? -1 :0;
    
    while(left>=0 && right<s.length){
      
        if(s[left] != s[right]){
            let _left = left;
            let _right = right;
            let isEqual = false
           
            
            while(--_left>=0){
                if(s[_left] === s[right]){
                    res+=2;
                    isEqual = true;
                    break;
                }
            }
            if(isEqual){
                left = _left-1;
                right++;
                console.log(left,right,s.length);
                continue;
            }
            while(++_right < s.length){
                if(s[_right] === s[left]){
                    res+=2;
                    isEqual = true;
                    break;
                }
            }
            if(isEqual){
                left--;
                right = _right+1;
                console.log(left,right,s.length);
                continue
            }
            left--;
            right++;
            console.log(left,right,s.length);
            
        }else{
            res += 2;

            left--;
            right++;
            console.log(left,right,s.length);
        }
    }
    return res
}
// console.log(getPalindDrome("baaaaabbab",3,4));

// 思路二： 动态规划

// i <= j-2
    // w[i] != w[j]
    // dep[i][j] = max{dep[i+1][j],dep[i][j-1]}

    // w[i] == w[j]

    // dep[i][j] = dep[i+1][j-1]+2;

// 考虑边界情况

// i === j => dep[i][j] = 1 ;
// i == j-1 => dep[i][j] = w[i] === w[j] ? 2 : 1;


// 由于涉及到要计算i+1的值，所以采用倒序遍历

var longestPalindromeSubseq  = function(s){
    if(!s.length){
        return 0
    }
 const dep = Array.from({length:s.length},()=>[]);
    for(let i = s.length-1; i >= 0 ;i--){
        dep[i][j] = 1;
        for(let j = i+1 ; j < s.length; j++){
            if( i == j-1){
                dep[i][j] = s[i] === s[j] ? 2 :1; 
            }else{
                dep[i][j] = s[i] === s[j] ? dep[i+1][j-1]+2 :
                 Math.max(dep[i+1][j],dep[i][j-1]);
            }
            console.log(i,j,dep[i][j]);

        }
    }    
    return  dep[0][s.length-1]
}
// 犯错记录 for循环的位置出了问题
// 关键步骤：想想清楚每一步骤其实是可以由上一步组成的
var longestPalindromeSubseq  = function(s){
    if(!s.length){
        return 0
    }
    const dep = Array.from({length:s.length},()=>[]);
    // i = j => dep[i][j] = 1
    // i = j - 1 => dep[i][j] = s[i] == s[j] ?  2 : 1;
    // i < j -1  => dep[i][j] = s[i] == s[j] ? dep[i+1][j-1] + 2 : Math.max(dep[i+1][j],dep[i][j-1])
    for(let i = s.length-1 ; i >= 0; i-- ){
        dep[i][i] = 1;
        for(let j = i+1 ; j< s.length ; j++){
            if(i == j-1){
                dep[i][j] = s[i] === s[j] ? 2 : 1;
            }else{
                dep[i][j] = s[i] === s[j] ? dep[i+1][j-1]+2 : Math.max(dep[i+1][j],dep[i][j-1])
            }
        }
    }  
    console.log(dep);
    
    return dep[0][s.length-1]
}
console.log(longestPalindromeSubseq("bbbab"));

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
console.log(getPalindDrome("baaaaabbab",3,4));

/**
 * 给出一个字符串 S，考虑其所有重复子串（S 的连续子串，出现两次或多次，可能会有重叠）。

 返回任何具有最长可能长度的重复子串。（如果 S 不含重复子串，那么答案为 ""。）


 示例 1：

 输入："banana"
 输出："ana"
 示例 2：

 输入："abcd"
 输出：""

 提示：
 1. 2 <= S.length <= 10^5
 2. S 由小写英文字母组成。
 *
 * ***/
// 1. 通过二分法查找最大的字串长度
    //  1.1 初始化left = 1 和 right = nums.length - 1
    //  1.2 计算mid = (left + right) / 2
    //  1.3 利用2提供的算法检验是否存在着最大字符串length为mid的字符串
    //          存在：left = mid + 1
    //          不存在：right = mid - 1
    //
// 2. 1. 构建hashSet
//    2. 遍历字符串，将字符进行编码
//    3. 判断是否存在于hashSet
//          存在，则返回开始索引的位置
//          不存在，返回-1

    // todo 处理溢出的情况
var longestDupSubstring = function(s) {
    const sLen = s.length;
    const nums = s.split('').map(v => v.charCodeAt(0) - 'a'.charCodeAt(0))
        // 滑动窗口
    const findStartIndex  = (curLen)=>{
        const hashSet = new Set();
        let h = 0;
        for(let i = 0; i < curLen; ++i){
            h = (h * 26 + nums[i])
        }
        hashSet.add(h)
        let al = Math.pow(26,curLen)
        for(let i = 1,len = sLen - curLen + 1; i < len; ++i){
            // h1 = (h0 - c0 * a^(L-1)) * a + c(L+1)
            h = h * 26 -  nums[i-1] * al + nums[i + curLen - 1]
            if(hashSet.has(h)){
                return i
            }
            hashSet.add(h)
        }
        return -1
    }
    let minL = 1, maxL = sLen,startIndex;
    while (minL < maxL){
        let mid = minL + Math.floor( (maxL - minL)/2);
        startIndex = findStartIndex(mid)
        if(startIndex !== -1){
            minL = mid + 1
        }else{
            maxL = mid
        }
    }
    startIndex = findStartIndex(minL-1)
        if(startIndex !== -1){
        return s.slice(startIndex,startIndex + minL-1)
    }else{
        return ''
    }
};


console.log(longestDupSubstring('banana')) // 'ana'
console.log(longestDupSubstring('abcd')) // ''
console.log(longestDupSubstring('abcdabcd')) // abcd

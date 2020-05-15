/**
 * 
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-substring-without-repeating-characters
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
// 思路 ： 滑动窗口
// 循环一次，如果数组存在着与当前元素相同的值，那么遍历数组，
// 将数组从0到第一次出现这个元素的所有内容清空
var lengthOfLongestSubstring = function(s) {

    // hashMap
    const stacks = [];
    let maxLen = 0;
    for(let i = 0 ;i <s.length;i++){
        if(!stacks.includes(s[i])){
            stacks.push(s[i])
        }else{
            maxLen = Math.max(maxLen,stacks.length);
            // 找出索引
            const index  = stacks.indexOf(s[i]);
            stacks.splice(0,index+1)
            stacks.push(s[i])
        }
    }
    return  Math.max(maxLen,stacks.length)
};

var lengthOfLongestSubstring = function(s) {
    const set = new Set();
    let maxLen = 0,n = s.length;
    let rp = -1;
    for(let i = 0; i< n; i++){
        if(i !== 0 ){
            set.delete(s[i-1])
        }
        while(rp+1 < n && !set.has(s[rp+1])){
            set.add(s[++rp])
        }
        maxLen = Math.max(maxLen,rp - i+1)
    }
    return maxLen
}
console.log(lengthOfLongestSubstring("pwwkew"));

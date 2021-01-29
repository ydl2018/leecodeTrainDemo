/**
 *
 所有 DNA 都由一系列缩写为 'A'，'C'，'G' 和 'T' 的核苷酸组成，例如："ACGAATTCCG"。在研究 DNA 时，识别 DNA 中的重复序列有时会对研究非常有帮助。

 编写一个函数来找出所有目标子串，目标子串的长度为 10，且在 DNA 字符串 s 中出现次数超过一次。



 示例 1：

 输入：s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
 输出：["AAAAACCCCC","CCCCCAAAAA"]
 示例 2：

 输入：s = "AAAAAAAAAAAAA"
 输出：["AAAAAAAAAA"]


 提示：

 0 <= s.length <= 105
 s[i] 为 'A'、'C'、'G' 或 'T'
 *
 * ***/
// 解法1： Rabin-Karp常规实现
var findRepeatedDnaSequences = function(s) {
    const map = {
        'A':0,
        'C':1,
        'G':2,
        'T':3
    };

    const result = new Set();

    const nums = s.split('').map(v=>map[v])
    let curLen = 10;
    let sLen  = s.length;
    const hashSet = new Set();
    let h = 0;
    let al = Math.pow(4,curLen);
    for(let i = 0; i < curLen; ++i){
        h = h * 4 + nums[i]
    }

    hashSet.add(h)

    for(let i = 1; i <= sLen - curLen; ++i){
        h = h * 4 - nums[i-1] * al + nums[i + curLen - 1]
        const curStr = s.slice(i,i+curLen)


        if(hashSet.has(h)){
            result.add(curStr)
        }
        hashSet.add(h)
    }
    return Array.from(result)
};

// 解法2：位运算

// keypoint: 结合 Rabin-Karp，将h改为将每次只移动一位的位运算
// 其实并没有太大的差异
var findRepeatedDnaSequences = function(s) {
    const map = {
        'A':0,
        'C':1,
        'G':2,
        'T':3
    };

    const result = new Set();

    const nums = s.split('').map(v=>map[v])
    let curLen = 10;
    let sLen  = s.length;
    const hashSet = new Set();
    let bitmask  = 0;
    for(let i = 0; i < curLen; ++i){
        bitmask <<= 2
        bitmask |= nums[i]
    }
    hashSet.add(bitmask)

    for(let i = 1; i <= sLen - curLen; ++i){
        bitmask <<= 2;
        bitmask |= nums[i + curLen - 1];

        // delete head
        bitmask = bitmask & (1 << 2 * curLen)
        bitmask &= bitmask & (1 << (2 * curLen + 1))
        if(hashSet.has(bitmask)){
            result.add(s.slice(i,i+curLen))
        }
        hashSet.add(bitmask)
    }
    return Array.from(result)
};

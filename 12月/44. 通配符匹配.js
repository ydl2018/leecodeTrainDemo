/**
 给定一个字符串 (s) 和一个字符模式 (p) ，实现一个支持 '?' 和 '*' 的通配符匹配。

 '?' 可以匹配任何单个字符。
 '*' 可以匹配任意字符串（包括空字符串）。
 两个字符串完全匹配才算匹配成功。

 说明:

 s 可能为空，且只包含从 a-z 的小写字母。
 p 可能为空，且只包含从 a-z 的小写字母，以及字符 ? 和 *。
 示例 1:

 输入:
 s = "aa"
 p = "a"
 输出: false
 解释: "a" 无法匹配 "aa" 整个字符串。
 示例 2:

 输入:
 s = "aa"
 p = "*"
 输出: true
 解释: '*' 可以匹配任意字符串。
 示例 3:

 输入:
 s = "cb"
 p = "?a"
 输出: false
 解释: '?' 可以匹配 'c', 但第二个 'a' 无法匹配 'b'。
 示例 4:

 输入:
 s = "adceb"
 p = "*a*b"
 输出: true
 解释: 第一个 '*' 可以匹配空字符串, 第二个 '*' 可以匹配字符串 "dce".
 示例 5:

 输入:
 s = "acdcb"
 p = "a*c?b"
 输出: false


 **/

// 思考：贪心算法的贪心，如何在这道题目里体现呢



    // 参考思路1：动态规划处理匹配字符串问题
var isMatch = function(s, p) {
  let pLen = p.length;
  let sLen = s.length;
  let dep = Array.from({length: sLen + 1}, () => Array.from({length: pLen + 1},()=>false));
  dep[0][0] =  true;
  for(let i = 1; i <= pLen; ++i){
      if(p[i-1] === "*"){
          dep[0][i] = true
      }else{
          break
      }
  }

  for(let i  = 1; i <= sLen; ++i){
    for(let j = 1; j <= pLen; ++j){
        // keyPoint 如果当前位置的字符都是字母并且相等，或者其中一个为"?"，则与前面的有关
        if(p[j-1] === "?" || s[i-1] === p[j-1]){
            dep[i][j] = dep[i-1][j-1]
        }else if( p[j-1] === "*" ){  // 关键在于用不用 “*”，分两种情况，此处要好好理解
            dep[i][j] = dep[i-1][j] || dep[i][j-1]
        }
    }
  }
        return dep[sLen][pLen]
};


// 参考思路2： 贪心算法，对于 u1 * u2 * u3  此思路需要对贪心算法较为熟悉



// unit test
isMatch('aa','a')  // false
isMatch('aa','*')  // true
isMatch('cb','?a')  // false
isMatch('adceb','*a*b')  // true
isMatch('acdcb','a*c?b')  // false



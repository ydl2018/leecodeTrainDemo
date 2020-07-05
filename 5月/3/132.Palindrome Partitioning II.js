/**
 * Given a string s, partition s such that every substring of the partition is a palindrome.

Return the minimum cuts needed for a palindrome partitioning of s.

Example:

Input: "aab"
Output: 1
Explanation: The palindrome partitioning ["aa","b"] could be produced using 1 cut.

 */

 /**
 * @param {string} s
 * @return {number}
 */

 // 思考方向错误
var minCut = function(s) {
    if(s.length < 2){
        return 0
    }
    const checkPalindrome = Array.from({length:s.length},()=> Array.from({length:s.length}))
    
    for(let i = s.length-1; i >= 0 ;i--){
        for(let j = i; j <s.length;j++){
            if(s[i] == s[j]){
                if((j - i <=2) || checkPalindrome[i+1][j-1]){
                    checkPalindrome[i][j] = true;
                }
            }
        }
    }
    const dep = [];
    for(let i = 0; i < s.length; i++){
        if(checkPalindrome[0][i]){
            dep[i] = 0
        }else{
            // 需要 i次切割
            dep[i] = i
        }
    }
    
    for(let i = 1; i <s.length; i++){
        // j是割点
        for(let j = 0; j< i; j++){
            if(checkPalindrome[j+1][i]){
                dep[i] = Math.min(dep[i],dep[j]+1)
            }
        }
    }
    return dep[s.length-1]
};
// 1. first question : how do we divide s to make all of its substring to be a palindrome?
// there are sub questions:
// 1.1 how to divide s ?
// 1.2 how to determine if a substring is a palindrome?

// 2. second question
// 2.1 how to get the minimum substring ?


// 1. 分治 优化前的时间复杂度是 0(n^3) <= 2n + 2*2(n-1) + 3*2(n-3) + 4*2(n - 4)
// 可以通过空间复杂度来优化

var minCut = function(s) {
    // there are two step.
    // 1. how to get the minimum substring ?
    // refer to the fifth quetion of leecode

    // 2. how to cut s? 
    // as we know, we only need to get the answer that the minimum value of s, so we set its cutting index is k
    // and it consists of minimum(0,k) and minimum(k+1,s)  if  0 <= k < s.length-1
    
    // the sub-question is how to get the minimum(k+1,s)?

    // just use divide and conquer to overcome it 
    
     // 1. struct a two dimenson array to save if s substring is a palindrome  

     const checkPalindrome = Array.from({length:s.length},()=>Array.from({length:s.length},()=>false));
     for(let left = s.length-1; left>=0; --left){
         for(let right = left; right< s.length; ++right){
             if(s[left] == s[right]){
                 if(right -left <= 2){
                    checkPalindrome[left][right] = true
                 }else if(checkPalindrome[left+1][right-1]){
                     checkPalindrome[left][right] = true
                 }
             }
         }
     }
     
     // 2 divide and conquer
     const dep = Array.from({length:s.length},()=>Array.from({length:s.length}));
     let aim = 0;
     const divideAndConquer = (left,right)=>{
        aim++
         
         if(left == right || checkPalindrome[left][right]){
             return 0
         }
         if(dep[left][right] !== undefined){
             return dep[left][right]
         }
        let LeftCutNum,rightCutNum,min = right - left;
        for(let i = left; i <right; i++){
            LeftCutNum =  divideAndConquer(left,i);
            rightCutNum = divideAndConquer(i+1,right)
           min = Math.min(LeftCutNum+rightCutNum+1,min)
        }
        return dep[left][right] = min
     }
     
     const result =  divideAndConquer(0,s.length-1)
     return result
}

// the space complexity is O(n^2)
// the time complexity is O(1/2*n^2 + 1/2 * n^1) => 0(n^2)
var minCut = function(s) {
  // thinking direction

  //  set dep as a array, and dep[i] is the minimum num to cut the string when the index of s is i

  // state transition equation => dep[i] = dep[0][k-1] + dep[k][i] + 1   ( 0 <= k < i)

  // the key point is how to get the value of dep[k][i] if we use one dimension array

  // if dep[k][i] is not a palindrome , 
  // it con be divided as dep[k][l-1] + dep[l][i] (l > k)

  //  dep[i] = dep[0][k-1] + dep[k][i] +1 => dep[0][k-1] + dep[k][l-1] + dep[l][i] + 1
  // => dep[0][l-1] + dep[l][k]

  // therefore , when the the dep[k][i] is not a palindrome, we can caculate the dep[i] by dep[0][l-1] + 1 (if dep[l][k] is a palindrome) 

  // how to init dep ?
  // dep[i] = i
  const checkPalindrome = Array.from({length:s.length},()=>Array.from({length:s.length},()=>false));
  for(let left = s.length-1; left>=0; --left){
      for(let right = left; right< s.length; ++right){
          if(s[left] == s[right]){
              if(right -left <= 2){
                 checkPalindrome[left][right] = true
              }else if(checkPalindrome[left+1][right-1]){
                  checkPalindrome[left][right] = true
              }
          }
      }
  }


  // init  warning!!! there is a special state to consider
  //  if checkPalindrome[0][i] = true, then the init value of dep[i] should be zero 
  const dep = Array.from({length:s.length},(_,i)=>{
      if(checkPalindrome[0][i]){
          return 0
      }else{
          return i
      }
  });

  // start caculate dep
  for(let i = 0,len = s.length; i < len; i++){
     for(let j = 0; j < i; j++){
         if(checkPalindrome[j+1][i]){
             // caculate minimum
             dep[i] = Math.min(dep[j] + 1,dep[i])
         }
     }
  }
  return s.length ? dep[s.length-1] : 0
}

 console.log(minCut("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"));

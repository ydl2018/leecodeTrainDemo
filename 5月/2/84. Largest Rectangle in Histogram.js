/**
 * Given n non-negative integers representing the histogram's bar 
 * height where the width of each bar is 1, find the area of largest 
 * rectangle in the histogram.

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/largest-rectangle-in-histogram
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
// 这里比完全暴力的优势在于第二层循环可以使用上一次的结果
var largestRectangleArea = function(heights) {
    let maxArea = 0;
    for(let i = 0; i < heights.length; i++){
        let minHeight = Infinity;
        for(let j = i ; j<heights.length; j++){
            let x = j - i + 1;
            minHeight = Math.min(minHeight,heights[j]);
            
            maxArea = Math.max(x*minHeight,maxArea);
        }
    }
    return maxArea
};

// 确定最小的高度对应的面积之后，
// 以当前的节点作为中心点，分别分为左右两个区域，分别求区域的最大面积
// 求出之后，之后是步骤合：
// 如何合呢？通过不断从返回的面积比较面积大小，从而得到最大的面积

var largestRectangleArea = function(heights) {
    const divideAndConquer = function(heights,start,end){
        if(start > end){
            return 0;
        }
        let curX = end - start + 1;
        let i = start;
        let curMinIndex = i;
        // 求出最小值和对应的索引值
        while(i <= end){
          if(heights[i] < heights[curMinIndex]){
              curMinIndex = i
          }
          i++
        }
        // 分治
        return Math.max(
            divideAndConquer(heights,start,curMinIndex-1),
        divideAndConquer(heights,curMinIndex+1,end),
        heights[curMinIndex]*curX);
    }
    return divideAndConquer(heights,0,heights.length-1)

}

// 空间复杂度是O(n)
// 时间复杂度

// 双指针
// 错误！！！！ 双指针的优势在于不需要考略中间的柱子，这里要考虑
var largestRectangleArea = function(heights) {
    let i = 0, j = heights.length-1;
    let maxArea = 0;
    while(i <= j){
        if(heights[i]>heights[j]){ // i是长边
            maxArea = Math.max(maxArea,heights[j]*(j - i + 1))
            j--
        }else{
            maxArea = Math.max(maxArea,heights[i]*(j - i + 1))
            i++
        }
    }
    return maxArea
}

// 单调栈
// 两种边界情况
// 1. 只有一个元素的情况
// 2. heights是个单调递增数列
// 巧妙思路：在heights 添加一个0，使得所有stacks都能出栈
var largestRectangleArea = function(heights) {
    let maxArea = 0;
    heights.push(-1);
    // 单调递增栈
    const stacks = [];
    stacks.peek = ()=>stacks[stacks.length-1];
    stacks.empty = ()=>stacks.length === 0;
    for(let i = 0 ; i < heights.length; i++){
        while(stacks.length && heights[stacks.peek()]> heights[i]){
           const index = stacks.pop();
           let x;
   
            if(stacks.empty()){
                x = i;
            }else{
                x = i - stacks.peek() - 1;
            }
            maxArea = Math.max(maxArea, x*heights[index])
        }        
        stacks.push(i)
    }
    return maxArea
}
var largestRectangleArea = function(heights) {
    let maxArea = 0;
    const stacks = [];
    stacks.peek = ()=>stacks[stacks.length - 1];
    stacks.empty = ()=> stacks.length === 0 ;
    // 如果栈里元素不为空，-1直接出栈
    heights.push(-1);
    stacks.push(-1);
    let popIndex;
    for(let i = 0 ; i < heights.length; i++){
        while( !stacks.empty() && stacks.peek() !==-1 && heights[stacks.peek()]> heights[i] ){
            popIndex = stacks.pop();
            let x = i - stacks.peek() - 1;
            maxArea = Math.max(maxArea,x * heights[popIndex])
        }
        heights.push(i);
    }
    return maxArea
}
console.log(largestRectangleArea([2,1,2]));

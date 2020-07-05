var searchRange = function(nums, target) {
    let i = 0,j = nums.length-1;
    let left = -1,right = -1;
    if(nums.length == 1 && nums[0] == target){
        return [0,0]
    }
    while(i<=j){
        const middle = Math.floor((j + i)/2);
        
        if(nums[middle]>target){
            j = middle-1;
        }else if(nums[middle] < target){
            i = middle+1
        }else{
            left = right = middle;
            
            while(nums[--left] == target);
            while(nums[++right] == target);
            left++;
            right--;
            break;
        }
    }
    return [left,right]
};
// 找到左边界 解法一，全闭合区间

var searchLeft = function(nums,target){
    let i = 0 ,j = nums.length-1;
    while(i<=j){
        const middle = Math.floor((i+j)/2);
        if(target == nums[middle]){
            j = middle-1;
        }else if(target > nums[middle]){
            i = middle+1;
        }else if(target < nums[middle]){
            j = middle - 1
        }
    }
   
    
    if(j<nums.length-1 && nums[j+1] == target){
        return j+1
    }else{
        return -1
    }
}
// 左闭合右开区间
var searchLeft2 = function(nums,target){
    let left = 0 ,right = nums.length;
    while(left < right){
        const middle = Math.floor((left + right)/2); // 偶数取右，奇数取中间
        if(nums[middle] == target){
            // 缩小右区间
            right = middle;
        }else if(nums[middle] > target){
            right = middle
        }else if(nums[middle] < target){
            left = middle+1;
        }
    }
    return left
}
// console.log(searchLeft([5,7,7,8,8,10],8));
// console.log(searchLeft2([5,7,7,8,8,10],8));
// console.log(searchLeft([1,4,4,4,4,4],4));
// console.log(searchLeft2([1,4,4,4,4,4],4));

// 搜索右边区间
//  1. 闭合区间
var searchRight = function(nums,target){
    let left = 0, right = nums.length - 1,middle;
    while(left <= right){
        middle = Math.floor((left+right)/2);
        if(nums[middle] <= target){
            left = middle+1;
        }else if(nums[middle]> target){
            right = middle - 1
        }
    }
    if(left != 0 && nums[left-1] == target){
        return left - 1
    }else{
        return -1
    }
}
// 2. 闭开区间

var searchRight2 = function(nums,target){
    let left = 0, right = nums.length,middle;
    while(left < right){
        middle = Math.floor((left+right)/2);
        if(target ==  nums[middle]){
            left = middle +1
        }else if(target < nums[middle]){
            right = middle
        }else if(target > nums[middle]){
            left = middle+1
        }
    }
    return left - 1
}


console.log(searchRight([5,7,7,8,8,10],8));
console.log(searchRight([1,4,4,4,4,4],4));
console.log(searchRight2([5,7,7,8,8,10],8));
console.log(searchRight2([1,4,4,4,4,4],4));
var largestRectangleArea = function(heights) {
    const stacks = [-1]; //存储索引
    let maxArea = 0,x,y;
     for(let i = 0; i < heights.length; i++){
         while(heights[stacks[stacks.length-1]] < heights[i]){
             // 出栈
              y = heights[stacks.pop()];
              x = i - stacks[stacks.length-1] - 1; // 最难理解
              maxArea = Math.max(maxArea,x*y)
         }
         stacks.push(i)
     }
     // 
     while(stacks.length && stacks[stacks.length-1] !==-1){
         const y =  heights[stacks.pop()];
         maxArea = Math.max(maxArea,y * (heights.length - stacks[stacks.length-1]-1))
     }
     console.log(stacks);
     return maxArea
 } 
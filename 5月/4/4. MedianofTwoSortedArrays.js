/**
 * There are two sorted arrays nums1 and nums2 of size m and n respectively.

Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

You may assume nums1 and nums2 cannot be both empty.

Example 1:

nums1 = [1, 3]
nums2 = [2]

The median is 2.0
Example 2:

nums1 = [1, 2]
nums2 = [3, 4]

The median is (2 + 3)/2 = 2.5


 */

 /**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
// 中位数法
// 总体指导思想： 对于数组A跟数组B,找到他们两个的割点c1与c2，其中c1 = 中点坐标 - c2 ; 
// 使得leftMax1 <= rightMin2 && leftMax2 = rightMin1
// 则由于数组有序，此时中位数为(max(leftMax1,leftMax2) + min(rightMin1,rightMin2)) / 2

// 1. 如何求割点呢，我们知道，对于中位数来说，
//  如果数组长度为偶数，那么 割点在中点间隔，我们求出来的是左右两边的值
//  如果数组长度为奇数，那么 割点在中点上，我们求出来的是一个值

// 加#号是为了让每一次割的地方都能求出中位数，而不需要额外的判断

var findMedianSortedArrays = function(nums1, nums2) {
    let m = nums1.length, n = nums2.length;
    if(m > n){
        // 为什么加这一步？ 设置最大的数组长度为m,因为二分法中是c1max = 2m; 而 c2 = m +n - 2m <0,数组越界 c1min = 0, c2 = m + n - 0 > 2n ,越界，我太难了
       return findMedianSortedArrays(nums2,nums1)
    }
    let c1 ,c2, leftMax1,leftMax2,rightMin1,rightMin2,i = 0, j = 2*m;
 
    while(i <= j){
        c1 =  Math.floor((i + j)/2);
        c2 = m + n - c1;
        leftMax1 = c1 == 0 ? -Infinity : nums1[Math.floor((c1 - 1) / 2)];
        // 当 m === n 时，会出现 c2 == 0 的情况
        leftMax2 = c2 == 0 ? -Infinity: nums2[Math.floor((c2 - 1) / 2)];
        rightMin1 = c1 == 2*m ? Infinity:nums1[Math.floor(c1  / 2)];
        rightMin2 = c2 >= 2*n ? Infinity : nums2[Math.floor(c2  / 2)];
      
        
        if(leftMax1 > rightMin2){
            j = c1 - 1;
        }else if(leftMax2 > rightMin1){
            i =  c1 + 1
        }else{
            break;
        }
    }
    return (Math.max(leftMax1,leftMax2)+Math.min(rightMin1,rightMin2))/2
};
console.log(findMedianSortedArrays([2,3],[1]));

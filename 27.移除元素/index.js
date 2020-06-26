/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
// 1. 解法思路 1 通过splice删除
let nums = [0,1,2,2,3,0,4,2];
var removeElement = function(nums, val) {

    for(let i=nums.length-1; i>=0;i--){
        if(nums[i] === val){
            nums.splice(i,1)
        }
    }
    return nums.length
 };
 


 // 2. 解法思路2 通过赋值覆盖的数组下标对应的值去操作，但是这种做法会让后面的元素没有删除操作

 // 一种优化思路是 return nums.length = i
 var removeElement = function(nums, val) {
    let i = 0;
    for(let j = 0; j < nums.length ;j++){
        if(nums[j] != val){
            nums[i] = nums[j]
            i++
        }
    }
    return nums.length = i
 }
 // removeElement(nums,2)
 //console.log(nums);

 // 3. 思路来源：
 // 1. 不限制数组的排序
 // 2.上面操作的思路有个缺陷，是在一个数组元素!== val 时，进行赋值覆盖


  
 // 思路分析： 
 // 这在要删除的元素比较少而数组长度很大时，重复操作
 // 如果!== val 时，赋值操作多，如何优化呢？
 // 可不可以走到反面去，当数组元素 == val时，才进行赋值覆盖呢？

//   我们删除的思路是覆盖，那么能不能用别的没遍历过的元素去覆盖它呢？
//   最好是没被覆盖的元素
//   通常顺序遍历，能想到的没被覆盖的元素，是不是尾部？

//  是尾部，但是如果尾部也是要删除的元素，怎么办？
//  那我们下次还在这个位置比较，直到不是删除元素了，我们再调走
 
 
 var removeElement = function(nums, val) {
    let i = 0;
    let n = nums.length;
    while(i<n){
        if(nums[i]== val){
            nums[i] = nums[n-1];
            n--
        }else{
            i++
        }
    }
 }
 var removeElement = function(nums,val){
     let i = 0;
     let n = nums.length;
     while(i < n){
         if(val == nums[i]){
             console.log(nums[i]);
             
            nums[i] = nums[n-1] 
             n-- // 记得不要调过
         }else{
             i++
         }
     }
     return n
 }
removeElement(nums,2)
  console.log(nums);
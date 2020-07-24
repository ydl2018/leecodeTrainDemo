/**
 *
 Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary).

 You may assume that the intervals were initially sorted according to their start times.

 Example 1:

 Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
 Output: [[1,5],[6,9]]
 Example 2:

 Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
 Output: [[1,2],[3,10],[12,16]]
 Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
 * **/

// 如果当前右区间与待合并的区间左区间有交集

// merger interval
// state 1: newInterval in one interval range

// state 2: 当前要合并的区间超过了当前遍历的某个区间的右边界
//  要合并的区间是超出了右边界
    // 下一个区间是否存在
    // 存在
        // 判断下一个区间的左边界是否大于要合并区间的右边界
            // 大于，将当前合并的区间推进栈
            // 不大于，继续遍历
    // 不存在
    // 将当前区间直接推进结果栈
var insert = function(intervals, newInterval) {
    let len = intervals.length;
    const result = []
    let i = 0
    let curInterval;
    let toMergeInterval = newInterval;
    while (i < len){
        curInterval = intervals[i]
        if(curInterval[0] > toMergeInterval[1]){
            result.push(toMergeInterval)
            break;
        }
        // inner
        if(curInterval[0] < toMergeInterval[0] && curInterval[1] > toMergeInterval[1]){
            break;
        }

        // half inner or contain
        if(curInterval[0] >= toMergeInterval[0] || curInterval[1] <= toMergeInterval[1]){
            let left = Math.min(curInterval[0],toMergeInterval[0])
            let right = Math.max(curInterval[1],toMergeInterval[1])
            toMergeInterval = [left,right]
        }

        if(i === len - 1 ){
            result.push(toMergeInterval)
            break;
        }
        result.push(intervals[i])
        i++
    }
    result.push(...intervals.slice(i))
    return result

};
console.log(insert([[1,3],[6,9]],[2,5]))
console.log(insert( [[1,2],[3,5],[6,7],[8,10],[12,16]],[4,8]))

// [[1,2],[3,10],[12,16]]

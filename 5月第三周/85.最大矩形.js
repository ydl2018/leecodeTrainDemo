var maximalRectangle = function(matrix) {
    if(!matrix.length){
        return 0
    }
    let maxArea = 0;
    let stacks = Array.from({length:matrix.length},()=>[])
    // 设置一个专门存储对应下标最大连续的宽度，二维数组stacks
    // 遍历到一个节点为1时，将其对应的最大宽度值，push到stacks,
    // 接着遍历y值到0，求出以该节点为右下角的最大面积
    for(let row = 0 ; row< matrix.length;row++){
        for(let col = 0 ; col<matrix[0].length; col++){
            if(matrix[row][col] == 1){
                if(col == 0){
                    stacks[row][col] = 1
                }else{
                    stacks[row][col] = stacks[row][col-1]+1
                }
            }else{
                stacks[row][col] = 0
            }
            let minX = stacks[row][col];
            for(let y = row ; y >=0 ; y--){
                // 求出y
                let curY = row - y + 1;
                // 求出此时行最小的x
                minX =  Math.min(minX,stacks[y][col])
                maxArea = Math.max(maxArea,curY * minX);
            }
        }
    }
    console.log(maxArea);
    
    return maxArea
}
// 时间复杂度O(n^3) 空间复杂度 O(n^2)
var maximalRectangle = function(matrix) {
    if(!matrix.length){
        return 0
    }
    let maxArea = 0;
    const stacks = Array.from({length:matrix.length},()=>[]); // 存储当前单元格对应的最大高度
    for(let i = 0 ; i < matrix.length; i++){
        for(let j = 0 ; j < matrix[0].length; j++){
            if( i == 0){
                stacks[0][j] = +matrix[0][j];
            }else if(matrix[i][j] == 1){
                stacks[i][j] = +stacks[i-1][j] + 1;

            }else{
                stacks[i][j] = 0
            }
            
            if(stacks[i][j]>0){  // O(n)
                const columnIndexStacks = [j+1];
                columnIndexStacks.peek = ()=>{
                   // console.log(columnIndexStacks[columnIndexStacks.length-1]);
                    
                    return columnIndexStacks[columnIndexStacks.length-1]
                };
                let _j = j;
                const columnStacks = stacks[i];
                while(_j>=0 && columnStacks[_j]!=0){
                     while(columnStacks[_j] < columnStacks[columnIndexStacks.peek()]){
                        const index  = columnIndexStacks.pop();
                        let x = columnIndexStacks.peek() - _j - 1;
                       // console.log(x);
                        
                        maxArea = Math.max(maxArea,   x * columnStacks[index]);        
                     }
                     columnIndexStacks.push(_j--);
                }
                while(columnIndexStacks.length){
                    // 此时的_j == stacks.push(0)
                   const index = columnIndexStacks.pop();
                    if(columnIndexStacks.length){
                        const prevIndex = columnIndexStacks.peek();
                        const x =  prevIndex - _j - 1;
                        maxArea = Math.max(maxArea, x * columnStacks[index]);
                    }
                   
                }
            }
        }
    }
    return maxArea
}

  // 分治法 平均时间复杂度O(n^3logn) 空间复杂度为O(N ^ 2)
  var maximalRectangle = function(matrix) {
    if(!matrix.length){
        return 0
    }
    let maxArea = 0;
    const stacks = Array.from({length:matrix.length},()=>[]); // 存储当前单元格对应的最大高度
    for(let i = 0 ; i < matrix.length; i++){
        for(let j = 0 ; j < matrix[0].length; j++){
            if( i == 0){
                stacks[0][j] = +matrix[0][j];
            }else if(matrix[i][j] == 1){
                stacks[i][j] = +stacks[i-1][j] + 1;

            }else{
                stacks[i][j] = 0
            }
            
            if(stacks[i][j]>0){ 
               maxArea = Math.max(maxArea,devideAndQuqer(stacks[i],0,j));
            }
        }
    }
    return maxArea
}
var devideAndQuqer = function (arr,start,end) {
    if(start > end){
        return -1
    }
    // 1. 找到最小点索引
    let minIndex = start;
    for(let i = start ; i<=end;i++){
        if(arr[i] < arr[minIndex]){
            minIndex = i
        }
    }
    // 2.分治，分割成小问题，合并
    const maxLeftArea = devideAndQuqer(arr,start,minIndex-1);
    const maxRightArea  = devideAndQuqer(arr,minIndex+1,end);
    return Math.max(maxLeftArea,maxRightArea,arr[minIndex] * (end -  start + 1))
}


console.log(maximalRectangle([
    ["1","0","1","0","0"],
    ["1","0","1","1","1"],
    ["1","1","1","1","1"],
    ["1","0","0","1","0"]
  ]));


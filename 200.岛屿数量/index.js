var numIslands = function (grid) {
    const rowLen = grid.length;
    const colLen = grid.length;
    for (let i = 0; i < rowLen; i++) {

        for (let j = 0; j < colLen; j++) {
            // 找出左边与上边为海水的网格
            const prevTop = grid[i - 1][j]
            const prevLeft = grid[i][j - 1]
            if (prevTop !== 1 && prevLeft !== 1) {
                // 分别从网格的下方和右方开始遍历
                
                let hasLeft = false
                // 往下走
                for(let i1 = i+1;i1<rowLen;i1++){
                    const nextBottom = grid[i1][j]
                    // 左下都不是陆地
                    if(grid[i1+1][j]!==1 && grid[i1][j+1]!==1){

                    }
                }
                // 往右走
                for(let j1 = j+1;j1<colLen;j1++){
                    co
                }
            }
        }
    }
};
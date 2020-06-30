/**
 * he demons had captured the princess (P) and imprisoned her in the bottom-right corner of a dungeon. The dungeon consists of M x N rooms laid out in a 2D grid. Our valiant knight (K) was initially positioned in the top-left room and must fight his way through the dungeon to rescue the princess.

The knight has an initial health point represented by a positive integer. If at any point his health point drops to 0 or below, he dies immediately.

Some of the rooms are guarded by demons, so the knight loses health (negative integers) upon entering these rooms; other rooms are either empty (0's) or contain magic orbs that increase the knight's health (positive integers).

In order to reach the princess as quickly as possible, the knight decides to move only rightward or downward in each step.

 

Write a function to determine the knight's minimum initial health so that he is able to rescue the princess.

For example, given the dungeon below, the initial health of the knight must be at least 7 if he follows the optimal path RIGHT-> RIGHT -> DOWN -> DOWN.

-2 (K)	-3	3
-5	-10	1
10	30	-5 (P)
 

Note:

The knight's health has no upper bound.
Any room can contain threats or power-ups, even the first room the knight enters and the bottom-right room where the princess is imprisoned.

 */

 /**
 * @param {number[][]} dungeon
 * @return {number}
 */ 

 // conflict： the maxium save is not the best choise, but the minimum cost can not decide current way is a best way because of pre save

 // but shall we consider the pre save ,yes we need
var calculateMinimumHP = function(dungeon) {
    // i > 0 j > 0
    // dep[i][j] = min(dep[i-1][j],dep[i][j-1]) + dungeon[i][j]

    // i == 0 j > 0
    // dep[i][j] = dep[i][j-1] + dungeon[i][j]

    // j == 0 i > 0
    // dep[i][j] = dep[i-1][j]  + dungeon[i][j]

    // i == 0 j == 0
    // dep[i][j] = dungeon[i][j]
    if(!dungeon.length){
        return 0
    }
    const dep = Array.from({length:dungeon.length},()=>Array.from({length:dungeon[0].length}))
    const minimumArr = Array.from({length:dungeon.length},()=>Array.from({length:dungeon[0].length}))
    dep[0][0] = dungeon[0][0]
    minimumArr[0][0]= dungeon[0][0] >= 0 ? 0 : dungeon[0][0];

    for(let i = 0; i < dungeon.length; i++){
        for(let j = 0; j < dungeon[0].length;++j){
            if(i == 0 && j > 0){
                dep[i][j] = dep[i][j-1] + dungeon[i][j];
                // 思考如何优化
                if(dep[i][j] < 0){
                    minimumArr[i][j] = minimumArr[i][j-1] -  dep[i][j]
                }else{
                    minimumArr[i][j] = minimumArr[i][j-1]
                }
            }else if(j == 0 && i > 0){
                dep[i][j] = dep[i-1][j]  + dungeon[i][j]
                if(dep[i][j] < 0){
                    minimumArr[i][j] = minimumArr[i-1][j] -  dep[i][j]
                }else{
                    minimumArr[i][j] = minimumArr[i-1][j]
                }
                
            }else if(i > 0 && j > 0){
                dep[i][j] = Math.max(dep[i-1][j],dep[i][j-1]) + dungeon[i][j]
            }
          
        }
    }
    console.log(dep);
    
    return dep[dungeon.length-1][dungeon.length-1]
};

// how to solve this conflict ?
// for this quesion , if we consider how to get the maximum profit, we can depend current best solution by the prev step

// but we we should realize the best solution doese not depend on the prev step, because the man has to decide the road by the 
// next steps which towards right or bottom .
// why ?  because we should find a best way  to minimum the cost ,  and if the next step which we choose cause the health below zero, we will find
// our choise is wrong.


// so the key point is if the man health is under zero, he will die, which make us cannot decide the best way by the prev steps.
var calculateMinimumHP = function(dungeon) {
    
    // dep[i][j] represent the the minimum cost when the index is i & j

    // state transition
    // 0 < = i < row.length-1 0 < = i < col.length-1
    // dep[i][j] = min(dep[i+1][j],dep[i][j+1]) - dungeon[i][j] > 0 ? min(dep[i+1][j],dep[i][j+1]) - dungeon[i][j]  : 0

    // i == row.length - 1  && j == col.length - 1
    // dep[i][j] = dungeon[i][j] > 0 ? dungeon[i][j] : 0 

    // i == row.length - 1
    // dep[i][j] = dep[i][j+1] - dungeon[i][j] > 0 ? dep[i][j+1] - dungeon[i][j] ：0

    // j == col.length -1 
    // dep[i][j] = dep[i+1][j]- dungeon[i][j] > 0 ?  self :0   => Math.max( dep[i+1][j]- dungeon[i][j],0)

    const row = dungeon.length;
    const col = dungeon[0].length;

    const dep = Array.from({length:row},()=> Array.from({length:col}))

    let temp;
    for(let i = row-1; i >= 0; --i){
        for(let j = col-1; j >=0; --j){

            if( i == row-1 && j == col - 1 ){
                dep[i][j] = dungeon[i][j] > 0 ?  0 : -dungeon[i][j]  
            }else if( i == row -1){
                temp = dep[i][j+1] - dungeon[i][j];
                dep[i][j] = temp > 0 ? temp : 0
            }else if( j == col -1){
                temp = dep[i+1][j] -  dungeon[i][j];
                dep[i][j] = temp > 0 ? temp : 0
            }else{
                temp = Math.min(dep[i+1][j],dep[i][j+1]) - dungeon[i][j]
                dep[i][j] = temp > 0 ? temp : 0
            }
        }
    }
    // confirm 血量不为 0
    return dep[0][0] + 1

}

// 优化解法

// state transition dep[i][j] = max(1, min(dep[i+1][j],dep[i][j+1]) - dungeon[i][j])

var calculateMinimumHP = function(dungeon) {
    const row = dungeon.length;
    const col = dungeon[0].length;

    // why infinity because if i == row.length -1 , the only way is go straight , use infinity to put him to go straight
    const dep = Array.from({length:row+1},()=> Array.from({length:col+1},()=> Infinity))

    // init 
    dep[row-1][col] = dep[row][col-1] = 1; 

    for(let i = row-1; i >= 0; --i){
        for(let j = col-1; j >=0; --j){
            dep[i][j] = Math.max(1,Math.min(dep[i+1][j],dep[i][j+1])- dungeon[i][j])
        }
    }
    return dep[0][0]
}

console.log(calculateMinimumHP([
    [-2 , -3, 3],
    [-5, -10, 1],
    [10,  30,-5]
])); // 7

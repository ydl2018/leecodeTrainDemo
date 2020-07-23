class Node {
    start;
    end;
    data;
    mark = 0;

    constructor(start, end, max) {
        this.start = start;
        this.end = end;
        this.max = max;
    }

    addMark(value) {
        this.mark += value
    }

    clearMark() {
        this.mark = 0
    }

    toString() {
        return this.start + '-' + this.end;
    }

}

class SegmentTree {
    tree = null;

    constructor(initArray) {
        this.tree = this.buildHelper(0, initArray.length - 1, initArray)
    }

    buildHelper = (left, right, initArray) => {
        if (left > right) {
            return null;
        }
        const root = new Node(left, right, initArray[left]);
        if (left === right) {
            return root
        }

        const mid = Math.floor((left + right) / 2);
        root.left = this.buildHelper(left, mid, initArray);
        root.right = this.buildHelper(mid + 1, right, initArray);
        root.max = Math.max(root.left.max, root.right.max)
        return root
    }

    modify(index, value, root) {
        root = root || this.tree;
        if (root.start === root.end && root.start === index) {
            root.max = value;
            return;
        }
        let mid = Math.floor((root.start + root.end) / 2);
        if (index <= mid) {
            this.modify(index, value, root.left)
        } else {
            this.modify(index, value, root.right)
        }
        root.max = Math.max(root.left.max, root.right.max)
    }

    query(start, end, root) {
        if (start < root.start && end > root.end) {
            return root.max
        }

        let mid = Math.floor((root.start + root.end) / 2)
        let result = -Infinity;
        // 与左边区间有交集
        if (mid >= start) {
            result = Math.max(this.query(start, end, root.left), result)
        }
        if (end > mid) {
            result = Math.max(this.query(start, end, root.right), result)
        }
        return result
    }
}

const A = [1, 4, 2, 3];
const tree = new SegmentTree(A);


/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {
    const createNode = (sum, left = null, right = null, start, end) => {
        return {
            sum,
            left,
            right,
            start,
            end
        }
    }
    const initHelper = (left, right) => {
        if (left > right) {
            return null
        }

        const root = createNode(nums[left], null, null, left, right);
        if (left === right) {
            return root
        }
        const mid = Math.floor((left + right) / 2);

        root.left = initHelper(left, mid);
        root.right = initHelper(mid + 1, right);

        root.sum = root.left.sum + root.right.sum;
        return root
    }
    this.root = initHelper(0, nums.length - 1)
};

/**
 * @param {number} i
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function (i, val, root) {
    if (root === null) {
        return
    }
    root = root || this.root;
    if (root.start === root.end && root.start === i) {
        root.sum = val;
        return
    }
    const mid = Math.floor((root.start + root.end) / 2);

    if (i <= mid) {
        this.update(i, val, root.left)
    } else {
        this.update(i, val, root.right)
    }
    root.sum = root.left.sum + root.right.sum;
};

/**
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function (i, j, root) {
    if (root === null) {
        return 0
    }
    root = root || this.root;
    if (root.start >= i && root.end <= j) {
        return root.sum
    }
    const mid = Math.floor((root.start + root.end) / 2);
    let result = 0;

    if (mid >= i) {
        result += this.sumRange(i, j, root.left)
    }
    if (mid + 1 <= j) {
        result += this.sumRange(i, j, root.right)
    }
    return result
};

// 方法二 数组存储线段树

const buildTree = (nums,n) => {
    const tree = [];
    for (let i = n, j = 0; i < 2 * n; i++, j++) {
        tree[i] = nums[j]
    }

    for (let i = n - 1; i > 0; --i) {
        tree[i] = tree[2 * i] + tree[i * 2 + 1]
    }
    return tree
}
var NumArray = function (nums) {
    let n = nums.length;

    this.tree = buildTree(nums,n)
    this.n = n;
};

/**
 * @param {number} i
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function (i, val) {
    const {n, tree} = this;
    let pos = n + i;
    tree[pos] = val;
    let left,right;
    while (pos > 0){
         left = right = pos
        // 左边
        if(pos % 2 === 0 ){
            right++
        }else{
            left--
        }
        pos = Math.floor(pos / 2);
        // because it is sum
        tree[pos] = tree[left] + tree[right]
    }
};

/**
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function (i, j) {
    const {n,tree} = this;
    i += n;
    j += n;
    let sum = 0;
    while (i <= j){
        if(i % 2 === 1){ // 左指针落单
            sum += tree[i]
            i++
        }
        if(j % 2 === 0){ // 右指针落单
            sum += tree[j]
            j--
        }
        i = Math.floor(i /2);
        j = Math.floor(j / 2);
    }
    return sum
};


/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(i,val)
 * var param_2 = obj.sumRange(i,j)
 */
const instance = new NumArray([1, 3, 5]);
console.log(instance, instance.sumRange(0, 2))
console.log(instance, instance.sumRange(0, 2), instance.update(1, 2), instance.sumRange(0, 2))

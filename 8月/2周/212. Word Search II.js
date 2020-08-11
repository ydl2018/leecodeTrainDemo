/**
 * Given a 2D board and a list of words from the dictionary,
 * find all words in the board.

 Each word must be constructed from letters of sequentially
 adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

  

 Example:

 Input:
 board = [
 ['o','a','a','n'],
 ['e','t','a','e'],
 ['i','h','k','r'],
 ['i','f','l','v']
 ]
 words = ["oath","pea","eat","rain"]

 Output: ["eat","oath"]
 * **/

class Trie {
    root = null

    static createTreeNode() {
        return Object.create(null)
    }

    constructor(arr) {
        if (arr.length) {
            this.root = this.recursiveCreateNode(arr, 0, 0)
        } else {
            this.root = Trie.createTreeNode()
        }
    }

    recursiveCreateNode(arr, row, col) {
        let rowL = arr.length
        let colL = arr[0].length
        const node = Trie.createTreeNode()
        if (row + 1 < rowL) {
            node[arr[row + 1][col]] = this.recursiveCreateNode(arr, row + 1, col)
        }
        if (col + 1 < colL) {
            node[arr[row][col + 1]] = this.recursiveCreateNode(arr, row, col + 1)
        }
        return node
    }

    insert(node, word) {
        node = node || this.root
        for (const c of word) {
            if (!node[c]) node[c] = Trie.createTreeNode()
            node = node[c]
        }
        node.isWord = true
    }

    search(word, node) {
        console.log(word);
        node = node || this.root
        for (const char of word) {
            if (!node[char]) {
                const keys = Object.keys(node);
                for (let i = 0,len = keys.length; i < len; ++i) {
                    const index = word.indexOf(char)
                    if(this.search(word.slice(index),node[keys[i]])){
                         return true
                     }
                }
                return false

            }
            node = node[char]
        }
        return true
    }


}

const ins = new Trie([
    ['o', 'a', 'a', 'n'],
    ['e', 't', 'a', 'e'],
    ['i', 'h', 'k', 'r'],
    ['i', 'f', 'l', 'v']
])

// console.log(ins);
console.log(ins.search(['oath']));
// console.log(ins.search(['oakl']));

/**
 * 实现一个 Trie (前缀树)，包含 insert, search, 和 startsWith 这三个操作。
 * Trie trie = new Trie();

trie.insert("apple");
trie.search("apple");   // 返回 true
trie.search("app");     // 返回 false
trie.startsWith("app"); // 返回 true
trie.insert("app");
trie.search("app");     // 返回 true
 */
// Trie 字典树的三个特质：
// 1、根节点不包含字符，除根节点外每一个节点都只包含一个字符
// 2、从根节点到某一个节点，路径上经过的字符连接起来，就是该节点对应的字符串
// 3、每个节点的所有子节点包含的字符都不相同。
// Tire的用处：
// 1)、字符串的快速查找
// 给出N个单词组成的熟词表，以及一篇全用小写英文书写的文章，请你按最早出现的顺序写出所有不在熟词表中的生词。
// 在这道题中，我们可以用数组枚举，用哈希，用字典树，先把熟词建一棵树，然后读入文章进行比较，这种方法效率是比较高的。

// 2)、字典树在“串”排序方面的应用
// 给定N个互不相同的仅由一个单词构成的英文名，让你将他们按字典序从小到大输出
// 用字典树进行排序，采用数组的方式创建字典树，这棵树的每个节点的所有儿子
// 很显然地按照其字母大小排序,对这棵树进行先序遍历即可。

// 3)、字典树在最长公共前缀问题的应用
// 对所有串建立字典树，对于两个串的最长公共前缀的长度即他们所在的节点的公共祖先个数，于是，问题就转化为最近公共祖先问题。

// Trie 的数据结构
//
/**
 * Initialize your data structure here.
 */

class Trie {
    constructor() {
        this.root = Object.create(null)
    }
    insert(word){
        let node = this.root
        for(let char of word){
            if(!node[char]) node[char] = Object.create(null)
            node = node[char]
        }
        node.isWord = true
    }
    traverse(word){
        let node = this.root
        for(let char of word){
            node = node[char]
            if(!node) return null
        }
        return node
    }
    search(word){
        const node = this.traverse(word)
        return !!node && !!node.isWord
    }
    startsWith(word){
        return !!this.traverse(word)
    }
}
/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

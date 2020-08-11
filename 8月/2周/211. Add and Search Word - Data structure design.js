/**
 * Design a data structure that supports the following two operations:

 void addWord(word)
 bool search(word)
 search(word) can search a literal word or a regular expression string containing only letters a-z or .. A . means it can represent any one letter.

 Example:

 addWord("bad")
 addWord("dad")
 addWord("mad")
 search("pad") -> false
 search("bad") -> true
 search(".ad") -> true
 search("b..") -> true
 Note:
 You may assume that all words are consist of lowercase letters a-z.

 * **/

class WordDictionary {
    static createTreeNode(){
        return Object.create(null)
    }
    constructor() {
        this.root = WordDictionary.createTreeNode()
    }

    addWord(word) {
        let node = this.root
        for(const char of word){
            if(!node[char]) node[char] = WordDictionary.createTreeNode()
            node = node[char]
        }
        node.isWord = true
    }

    search(word,node) {
        node = node || this.root
        for(const char of word){
            if(char === '.'){
                const index  = word.indexOf(char)
                let result = false
                for(let key of Object.keys(node)){
                    if(this.search(word.slice(index+1),node[key])){
                        result = true
                        break
                    }
                }
                return  result
            }
            node = node[char]
            if(!node) return false
        }
        return !!node.isWord
    }
}
const ins = new WordDictionary()
ins.addWord("bad")
ins.addWord("dad")
ins.addWord("mad")

console.log(ins.search('pad'));
console.log(ins.search('bad'));
console.log(ins.search('.ad'));
console.log(ins.search('b..'));
console.log(ins.search('b.f'));

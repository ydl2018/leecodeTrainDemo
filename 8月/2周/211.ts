class WordDictionary {
    root = null
    createTreeNode(){
        return Object.create(null)
    }
    constructor() {
        this.root = this.createTreeNode()
    }

    addWord(word) {
        let node = this.root
        for(const char of word){
            node = node[char]
            if(!node){
                node = this.createTreeNode()
            }
        }
        node.isWord = true
    }

    search(word,node) {
        node = node || this.root
        for(const char of word){
            if(char === '.'){
                const index = word.indexOf(char)
                return  this.search(word.slice(index+1),node)
            }
            node = node[char]
            if(!node) return false
        }
        return node.isWord
    }
}

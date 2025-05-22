import { Trie } from "./Trie";

const trie = new Trie();
trie.insert("car");
trie.insert("card");
trie.insert("care");
trie.insert("careful");
trie.insert("egg");
console.log(trie.longestCommonPrefix(["card", "care"]));
console.log(trie.longestCommonPrefix(["car", "care"]));
console.log(trie.longestCommonPrefix(["car", "dog"]));
console.log(trie.longestCommonPrefix(["car"]));
// console.log(trie.countWords());

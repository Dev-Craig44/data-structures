import { TrieNode } from "./TrieNode";

export class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  isEmpty(node: TrieNode): boolean {
    return node.children.size === 0;
  }

  hasChild(node: TrieNode, char: string): boolean {
    return node.children.has(char);
  }

  addChild(node: TrieNode, char: string): void {
    node.children.set(char, new TrieNode());
  }

  getChild(node: TrieNode, char: string): TrieNode | undefined {
    return node.children.get(char);
  }

  getChildren(node: TrieNode): TrieNode[] {
    return Array.from(node.children.values());
  }

  hasChildren(current: TrieNode): boolean {
    return !this.isEmpty(current);
  }

  public traverse(): void {
    this._traverseFrom(this.root);
  }

  private _traverseFrom(node?: TrieNode): void {
    if (!node) return;
    for (let [char, child] of node.children.entries()) {
      console.log(char);
      this._traverseFrom(child);
    }
  }

  insert(word: string): void {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      let char = word[i];
      if (!this.hasChild(node, char)) {
        this.addChild(node, char);
      }
      const nextNode = this.getChild(node, char);
      if (!nextNode) {
        throw new Error("nextNode is undefined");
      }
      node = nextNode;
    }
    node.isEndOfWord = true;
  }

  search(word: string): boolean {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      let char = word[i];
      if (!node.children.has(char)) {
        return false;
      }
      const nextNode = node.children.get(char);
      if (!nextNode) {
        throw new Error("nextNode is undefined");
      }
      node = nextNode;
    }
    return node.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    let node = this.root;
    for (let i = 0; i < prefix.length; i++) {
      let char = prefix[i];
      if (!node.children.has(char)) {
        return false;
      }
      const nextNode = node.children.get(char);
      if (!nextNode) {
        throw new Error("nextNode is undefined");
      }
      node = nextNode;
    }
    return true;
  }

  contains(word: string): boolean {
    let current = this.root;
    for (let char of word) {
      if (!current.children.has(char)) return false;
      const nextNode = this.getChild(current, char);
      if (!nextNode) return false;
      current = nextNode;
    }
    return current.isEndOfWord;
  }

  containsRecursive(word: string): boolean {
    return this._containsRecursive(this.root, word);
  }

  private _containsRecursive(root: TrieNode, word: string): boolean {
    let current = root;
    for (let char of word) {
      let child = this.getChild(current, char);
      if (!child) return false;
      current = child;
      this._containsRecursive(child, word);
    }
    return current.isEndOfWord;
  }

  remove(word: string): void {
    this._remove(this.root, word, 0);
  }

  private _remove(root: TrieNode, word: string, index: number): void {
    if (index === word.length) {
      root.isEndOfWord = false;
      return;
    }

    let char = word.charAt(index);
    let child = this.getChild(root, char);
    if (!child) return;

    this._remove(child, word, index + 1);
    if (this.isEmpty(child) && !child.isEndOfWord) this.removeChild(root, char);
  }

  removeChild(parent: TrieNode, char: string): void {
    parent.children.delete(char);
  }

  findWords(prefix: string): string[] {
    const words: string[] = [];
    let lastNode = this._findLastNodeOf(prefix);
    if (!lastNode) return words;
    this._findWords(lastNode, prefix, words);
    return words;
  }

  private _findWords(node: TrieNode, prefix: string, words: string[]): void {
    if (node.isEndOfWord) {
      words.push(prefix);
    }
    // we should visit the children of this root node.

    for (let [char, child] of node.children.entries()) {
      this._findWords(child, prefix + char, words);
    }
  }

  private _findLastNodeOf(prefix: string): TrieNode | undefined {
    let current: TrieNode | undefined = this.root;
    for (let char of prefix) {
      const child = this.getChild(current, char);
      if (!child) return undefined;
      current = child;
    }
    return current;
  }

  longestCommonPrefix(words: string[]): string {
    for (let word of words) {
      this.insert(word);
    }
    return this._longestCommonPrefix(this.root, words);
  }

  private _longestCommonPrefix(root: TrieNode, words: string[]): string {
    let current = root;
    let prefix = "";

    for (let char of words) {
      const next = this.getChild(current, char);
      if (current.children.size !== 1 || !next || current.isEndOfWord) {
        return prefix;
      }
      prefix += char;
      current = next;
    }
    return prefix;
  }

  countWords(): number {
    return this._countWord(this.root);
  }

  private _countWord(node: TrieNode): number {
    let count = node.isEndOfWord ? 1 : 0;

    for (let [, child] of node.children.entries()) {
      count += this._countWord(child);
    }
    return count;
  }
}

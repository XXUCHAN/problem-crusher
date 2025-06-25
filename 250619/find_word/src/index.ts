import fs from 'fs';
import path from 'path';
import { performance } from 'perf_hooks';
const data = fs.readFileSync(path.join(__dirname, '../input/3m.csv'));
const queries = fs.readFileSync(path.join(__dirname, '../input/queries.csv'));
const words = data
	.toString()
	.split('\n')
	.map((line) => line.trim());
const pre = queries
	.toString()
	.split('\n')
	.map((line) => line.trim());

// ----------------------------------------
// findWord 함수를 호출하여 결과를 출력함.
// queries.csv 와 연결할 필요 있음.
// console.log(findWord('WORDHERE'));
// ----------------------------------------

// ----------------------------------------
// Function to find words that start with a given prefix

class Node {
  value: string;
  children: Map<string, Node>;
  end: number = 0;
  constructor(value = "") {
    this.value = value;
    this.children = new Map();
  }
}

class Trie {
  root: Node;

  constructor() {
    this.root = new Node();
  }

  insert(string: string) {
    let node = this.root;
    for (let i = 0; i < string.length; i++) {
      if (!node.children.has(string[i])) {
        node.children.set(string[i], new Node(node.value + string[i]));
      }
      node = node.children.get(string[i])!;
    }
	node.end++;
  }

  // prefix로 시작하는 단어 개수
  findWordsWithPrefix(prefix: string): string[] {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) return [];
      node = node.children.get(char)!;
    }
    const results: [string, number][] = [];
    const dfs = (cur: Node, path: string) => {
      if (cur.end > 0) results.push([path, cur.end]);
      for (const [char, child] of cur.children) {
        dfs(child, path + char);
      }
    };
    dfs(node, prefix);

    results.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    return results.slice(0,10).map(([word]) => word); 
  }

}

const trie = new Trie();
for(const w of words){
	trie.insert(w);
}


function findWord(prefix: string): {
	duration: number;
	result: string[];
} {
	const startTime = performance.now();
	const result: string[] = [];
	result.push(...trie.findWordsWithPrefix(prefix));
	// TODO: Implement the logic to find words that start with the given prefix
	const duration = performance.now() - startTime;
	return {
		duration,
		result,
	};
}
for(let i =1 ;i<pre.length;i++){
	console.log('prefix : ',pre[i],findWord(pre[i]));
}

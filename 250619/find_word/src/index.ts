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
words.sort();

function findWord(prefix: string): {
	duration: number;
	result: string[];
} {
	const startTime = performance.now();
	const result: string[] = [];

	const start = words.findIndex((w) => w.charAt(0) === prefix.charAt(0));
	const wordCount: { [key: string]: number } = {};
	for (let i = start; i < words.length; i++) {
		if (words[i].charAt(0) != prefix.charAt(0)) {
			break;
		}
		if (words[i].length >= prefix.length) {
			if (words[i].slice(0, prefix.length) === prefix) {
				wordCount[words[i]] = (wordCount[words[i]] || 0) + 1;
			}
		}
	}
	// console.log(wordCount);

	// const sortedObj = Object.fromEntries(entries);

	// TODO: Implement the logic to find words that start with the given prefix
	const duration = performance.now() - startTime;
	console.log(duration);
	return {
		duration,
		result,
	};
}

findWord('a');

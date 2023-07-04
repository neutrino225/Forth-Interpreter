/** @format */
import { Token } from "./token";
import { Type } from "./types";

export class Lexer {
	inputText: string;

	constructor(inputText: string) {
		this.inputText = inputText;
	}

	isNumber = (n: string | number): boolean =>
		!isNaN(parseFloat(String(n))) && isFinite(Number(n));

	isLetter(str) {
		return str.length === 1 && str.match(/[a-z]/i);
	}

	lex() {
		const tokenList: Token[] = [];
		const text = this.inputText;

		let i = 0;

		let curr_word: string;

		while (i < text.length) {
			const start_pos = i;
			const curr_char = text[i];
			if (this.isNumber(curr_char)) {
				//iterate till whitespace
				curr_word = curr_char;
				while (this.isNumber(text[i + 1])) {
					curr_word += text[i + 1];
					i++;
				}
				tokenList.push(new Token(Type.NUM, curr_word, start_pos)); // converts string to number token
				curr_word = "";
				i++;
			} else if (curr_char === "+") {
				tokenList.push(new Token(Type.PLUS, null, start_pos)); // converts string to operator token
				i++;
			} else if (curr_char === "-") {
				tokenList.push(new Token(Type.MINUS, null, start_pos)); // converts string to operator token
				i++;
			} else if (curr_char === "*") {
				tokenList.push(new Token(Type.MULTIPLY, null, start_pos)); // converts string to operator token
				i++;
			} else if (curr_char === "/") {
				tokenList.push(new Token(Type.DIVIDE, null, start_pos)); // converts string to operator token
				i++;
			} else if (curr_char === "dup") {
				tokenList.push(new Token(Type.DUP, null, start_pos)); // converts string to known word token
				i++;
			} else if (curr_char === "swap") {
				tokenList.push(new Token(Type.SWAP, null, start_pos)); // converts string to known word token
				i++;
			} else if (curr_char === "over") {
				tokenList.push(new Token(Type.OVER, null, start_pos)); // converts string to known word token
				i++;
			} else if (curr_char === "rot") {
				tokenList.push(new Token(Type.ROT, null, start_pos)); // converts string to known word token
				i++;
			} else if (curr_char === "drop") {
				tokenList.push(new Token(Type.DROP, null, start_pos)); // converts string to known word token
				i++;
			} else if (curr_char === ":") {
				tokenList.push(new Token(Type.START_OF_DEFINITION, null, start_pos)); // converts string to defniition start token
				i++;
			} else if (curr_char === ";") {
				tokenList.push(new Token(Type.END_OF_DEFINITION, null, start_pos)); // converts string to defniition end token
				i++;
			} else if (this.isLetter(curr_char)) {
				curr_word = curr_char;
				while (this.isLetter(text[i + 1])) {
					curr_word += text[i + 1];
					i++;
				}
				tokenList.push(new Token(Type.WORD, curr_word, start_pos)); // converts string to word token
				curr_word = "";
				i++;
			} else if (curr_char === "[" || curr_char === "]" || curr_char === " ") {
				i++; // ignore whitespace and comments
			} else {
				throw new Error(`Unknow character at position ${i}: ${curr_char}`); // throw error if unknown character
			}
		}
		tokenList.push(new Token(Type.EOF, null, this.inputText.length)); // add EOF token
		return tokenList;
	}
}

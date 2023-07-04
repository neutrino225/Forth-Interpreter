/** @format */
import { Type } from "./types";
import { Stack } from "./stack";
import { Token } from "./token";

export class Parser {
	private _tokens: Token[];
	private _current_token: Token;
	private _current_index: number;

	private _words: Map<string, string>;

	constructor(tokens: Token[]) {
		this._tokens = tokens;
		this._current_index = 0;
		this._current_token = this._tokens[this._current_index];
		this._words = new Map();
	}

	private _advance() {
		this._current_index += 1;
		if (
			this._current_index === this._tokens.length &&
			this._tokens[this._current_index].type !== Type.EOF
		) {
			this._error();
		}
		this._current_token = this._tokens[this._current_index];
	}

	private _error(text?: string) {
		if (text) {
			throw new Error(text);
		}
		throw new Error("Parsing error");
	}

	parse() {
		const stack = new Stack();
		while (this._current_token.type !== Type.EOF) {
			if (this._current_token.type === Type.NUM) {
				stack.push(+this._current_token.text as number);
				this._advance();
			} else if (this._current_token.type === Type.PLUS) {
				this._advance();
				const a = parseInt(stack.pop() as string);
				const b = parseInt(stack.pop() as string);
				if (a === undefined || b === undefined) {
					throw new Error("Invalid syntax");
				}
				stack.push(a + b);
			} else if (this._current_token.type === Type.MINUS) {
				this._advance();
				const a = parseInt(stack.pop() as string);
				const b = parseInt(stack.pop() as string);
				if (a === undefined || b === undefined) {
					throw new Error("Invalid syntax");
				}
				stack.push(b - a);
			} else if (this._current_token.type === Type.MULTIPLY) {
				this._advance();
				const a = parseInt(stack.pop() as string);
				const b = parseInt(stack.pop() as string);
				if (a === undefined || b === undefined) {
					throw new Error("Invalid syntax");
				}
				stack.push(a * b);
			} else if (this._current_token.type === Type.DIVIDE) {
				this._advance();
				const a = parseInt(stack.pop() as string);
				const b = parseInt(stack.pop() as string);
				if (a === undefined || b === undefined) {
					throw new Error("Invalid syntax");
				}
				stack.push(b / a);
			} else if (this._current_token.type === Type.DUP) {
				this._advance();
				const a = parseInt(stack.pop() as string);
				if (a === undefined) {
					throw new Error("Invalid syntax");
				}
				stack.push(a);
				stack.push(a);
			} else if (this._current_token.type === Type.SWAP) {
				this._advance();
				const a = stack.pop();
				const b = stack.pop();
				if (a === undefined || b === undefined) {
					throw new Error("Invalid syntax");
				}
				stack.push(a);
				stack.push(b);
			} else if (this._current_token.type === Type.OVER) {
				this._advance();
				const a = stack.pop();
				const b = stack.pop();
				if (a === undefined || b === undefined) {
					throw new Error("Invalid syntax");
				}
				stack.push(b);
				stack.push(a);
				stack.push(b);
			} else if (this._current_token.type === Type.ROT) {
				this._advance();
				const a = stack.pop();
				const b = stack.pop();
				const c = stack.pop();
				if (a === undefined || b === undefined || c === undefined) {
					throw new Error("Invalid syntax");
				}
				stack.push(b);
				stack.push(a);
				stack.push(c);
			} else if (this._current_token.type === Type.DROP) {
				this._advance();
				const a = stack.pop();
				if (a === undefined) {
					throw new Error("Invalid syntax");
				}
			} else if (this._current_token.type === Type.START_OF_DEFINITION) {
				this._advance();
				const name = this._current_token.text as string;
				let definition = "";
				this._advance();
				if (
					(this._tokens[this._current_index].type as Type) ===
					Type.END_OF_DEFINITION
				) {
					this._error("Empty definition");
				}
				while ((this._current_token.type as Type) !== Type.END_OF_DEFINITION) {
					if ((this._current_token.type as Type) === Type.EOF) {
						this._error();
					}
					definition += this._current_token.text + " ";
					this._advance();
				}
				this._words.set(name, definition);
				this._advance();
			} else if (this._current_token.type === Type.WORD) {
				const word = this._current_token.text as string;
				const definition = this._words.get(word).trim().split(" ");
				if (definition === undefined) {
					this._error(`Undefined word ${word}`);
				} else {
					definition.forEach((word) => {
						stack.push(word);
					});
				}
				this._advance();
			} else {
				this._error();
			}
		}
		return stack;
	}
}

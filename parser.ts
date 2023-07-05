/** @format */
import { Type } from "./types";
import { Token } from "./token";
import { ASTNODE } from "./astNode";
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
		const astStream: ASTNODE[] = [];
		while (this._current_token.type !== Type.EOF) {
			if (this._current_token.type === Type.START_OF_DEFINITION) {
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
						astStream.push(new ASTNODE(word, Type.WORD));
					});
				}
				this._advance();
			} else if (Object.values(Type).includes(this._current_token.type)) {
				astStream.push(
					new ASTNODE(
						this._current_token.text as string,
						this._current_token.type
					)
				);
				this._advance();
			} else {
				this._error();
			}
		}
		return astStream;
	}
}

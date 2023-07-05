/** @format */
import { Stack } from "./stack";
import { ASTNODE } from "./astNode";
import { Type } from "./types";
export class Interpreter {
	private _stack: Stack;
	private _astStream: ASTNODE[];

	constructor(astStream: ASTNODE[]) {
		this._stack = new Stack();
		this._astStream = astStream;
	}

	public evaluate() {
		for (let i = 0; i < this._astStream.length; i++) {
			if (this._astStream[i].type === Type.NUM) {
				this._stack.push(+this._astStream[i].value);
			} else if (this._astStream[i].type === Type.PLUS) {
				const first = this._stack.pop() as number;
				const second = this._stack.pop() as number;
				this._stack.push(first + second);
			} else if (this._astStream[i].type === Type.MINUS) {
				const first = this._stack.pop() as number;
				const second = this._stack.pop() as number;
				this._stack.push(second - first);
			} else if (this._astStream[i].type === Type.MULTIPLY) {
				const first = this._stack.pop() as number;
				const second = this._stack.pop() as number;
				this._stack.push(first * second);
			} else if (this._astStream[i].type === Type.DIVIDE) {
				const first = this._stack.pop() as number;
				const second = this._stack.pop() as number;
				if (first === 0) {
					throw new Error("Cannot divide by zero");
				}
				this._stack.push(second / first);
			} else if (this._astStream[i].type === Type.WORD) {
				if (this._astStream[i].value === Type.DROP) {
					if (this._stack.size() === 0) {
						throw new Error("Stack is empty");
					}
					this._stack.pop();
				} else if (this._astStream[i].value === Type.DUP) {
					const first = this._stack.pop() as number;
					this._stack.push(first);
					this._stack.push(first);
				} else if (this._astStream[i].value === Type.SWAP) {
					const first = this._stack.pop() as number;
					const second = this._stack.pop() as number;
					this._stack.push(first);
					this._stack.push(second);
				} else if (this._astStream[i].value === Type.OVER) {
					const first = this._stack.pop() as number;
					const second = this._stack.pop() as number;
					this._stack.push(second);
					this._stack.push(first);
					this._stack.push(second);
				}
			}
		}
		return this._stack.storage;
	}
}

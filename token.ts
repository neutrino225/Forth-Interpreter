/** @format */

import { Type } from "./types";
export class Token {
	type: Type;
	text: string | number;
	startPos: number;

	constructor(type: Type, text: string | number, startPos: number) {
		this.type = type;
		this.text = text;
		this.startPos = startPos;
	}
}

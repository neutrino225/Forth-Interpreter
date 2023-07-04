/** @format */
import { Lexer } from "./lexer";
import { Parser } from "./parser";

const main = () => {
	const expression = "[: foo dup dup ; 2 3 + foo 3 4 *]";

	const stream = new Lexer(expression).lex();
	console.log(stream);
	const stack = new Parser(stream).parse();
	stack.printStack();
};

main();

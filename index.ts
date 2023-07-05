/** @format */
import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { ASTNODE } from "./astNode";
import { Interpreter } from "./interpreter";

const main = () => {
	const expression = "[: foo dup dup ; 2 3 + foo 3 4 * * foo]";

	const stream = new Lexer(expression).lex();
	console.log(stream);
	const astStream: ASTNODE[] = new Parser(stream).parse();
	console.log(astStream);
	const result = new Interpreter(astStream).evaluate();
	console.log(result);
};

main();

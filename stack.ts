/** @format */

type inputType = string | number;

export class Stack {
	public storage: inputType[] = [];

	constructor(private capacity: number = Infinity) {}

	push(item: inputType): void {
		if (this.size() === this.capacity) {
			throw Error("Stack has reached max capacity, you cannot add more items");
		}
		this.storage.push(item);
	}

	pop(): inputType | undefined {
		return this.storage.pop();
	}

	peek(): inputType | undefined {
		return this.storage[this.size() - 1];
	}

	size(): number {
		return this.storage.length;
	}

	printStack() {
		console.log(this.storage);
	}
}

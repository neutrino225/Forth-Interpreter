/** @format */
type INPUT = string | number;
export class Stack {
	public storage: INPUT[] = [];

	constructor(private capacity: number = Infinity) {}

	push(item: INPUT): void {
		if (this.size() === this.capacity) {
			throw Error("Stack has reached max capacity, you cannot add more items");
		}
		this.storage.push(item);
	}

	pop(): INPUT {
		return this.storage.pop();
	}

	peek(): INPUT {
		return this.storage[this.size() - 1];
	}

	size(): number {
		return this.storage.length;
	}

	printStack() {
		console.log(this.storage);
	}
}

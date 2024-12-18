// https://www.codewars.com/kata/595970246c9b8fa0a8000086/train/typescript

export function capitalizeWord(word: string): string {
	if (!word) return word;
	const capitalizedLetter = word[0].toUpperCase();
	return capitalizedLetter + word.slice(1).toLowerCase();
}

capitalizeWord("word");
capitalizeWord("i");
capitalizeWord("glasswear");

// https://www.codewars.com/kata/598057c8d95a04f33f00004e/train/typescript

function getRange(startNum: number, endNum: number): number[] {
	const range: number[] = [];
	if (startNum === endNum) return range;
	for (let i = startNum + 1; i < endNum; i++) {
		range.push(i);
	}
	return range;
}

console.log(getRange(2, 9));
console.log(getRange(6, 8));
console.log(getRange(2, 9));

// https://www.codewars.com/kata/5a2be17aee1aaefe2a000151/train/typescript

export const arrayPlusArray = (arr1: number[], arr2: number[]): number => {
	let sumArr1 = 0;
	for (let i = 0; i < arr1.length; i++) {
		sumArr1 = sumArr1 + arr1[i];
	}
	let sumArr2 = 0;
	for (let i = 0; i < arr2.length; i++) {
		sumArr2 = sumArr2 + arr2[i];
	}
	const total = sumArr1 + sumArr2;
	return total;
};

// https://www.codewars.com/kata/5899dc03bc95b1bf1b0000ad/train/typescript

export function invert(array: number[]): number[] {
	return array.map((int) => int * -1);
}

console.log(invert([1, 2, 6, -3, 2, -5]));

// https://www.codewars.com/kata/53dc54212259ed3d4f00071c/train/javascript

function sum(numbers: number[]): number {
	if (!numbers.length) return 0;
	let sumArr = 0;

	for (let i = 0; i < numbers.length; i++) {
		sumArr = sumArr + numbers[i];
	}
	return sumArr;
}

// https://www.codewars.com/kata/57a77726bb9944d000000b06/train/typescript

export function mango(quantity: number, price: number): number {
	const freeMangos = Math.floor(quantity / 3);
	const totalPrice = quantity * price - freeMangos * price;
	return totalPrice;
}

// https://www.codewars.com/kata/57e3f79c9cb119374600046b/train/typescript

type nameType = string | null;

export function hello(name: nameType): string {
	if (!name || name === "") {
		return "Hello, World!";
	}
	if (name) {
		const formattedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
		return `Hello, ${formattedName}`;
	}
	return "Hello, World!";
}

// https://www.codewars.com/kata/57a0e5c372292dd76d000d7e/train/typescript

// TODO

// https://www.codewars.com/kata/5266876b8f4bf2da9b000362/train/typescript

// TODO

// https://www.codewars.com/kata/5a1a9e5032b8b98477000004/train/typescript

// TODO

// https://www.codewars.com/kata/57cc981a58da9e302a000214/train/typescript

// TODO

// https://www.codewars.com/kata/563e320cee5dddcf77000158/train/typescript

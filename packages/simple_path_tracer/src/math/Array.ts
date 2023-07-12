export let flatten = <T>(array: Array<Array<T>>): Array<T> => {
	return array.reduce((result, arr) => {
		// return result.concat(arr)
		return arr.reduce((result, value) => {
			result.push(value)

			return result
		}, result)
	}, [])
}

// let _swap = (nums, i, j) => ([nums[i], nums[j]] = [nums[j], nums[i]])

// let _quickSelect = (nums: Array<number>, lo, hi, k) => {
// 	// 避免最坏情况发生
// 	const p = Math.floor(Math.random() * (hi - lo + 1)) + lo
// 	_swap(nums, p, hi)

// 	let i = lo
// 	let j = lo

// 	while (j < hi) {
// 		if (nums[j] <= nums[hi]) {
// 			_swap(nums, i, j)

// 			i += 1
// 		}
// 		j += 1
// 	}
// 	_swap(nums, i, j)

// 	// pivot 是我们要找的 Top k
// 	if (hi === k + i - 1) return [nums[i], i]
// 	// Top k 在右边
// 	if (hi > k + i - 1) return _quickSelect(nums, i + 1, hi, k)
// 	// Top k 在左边
// 	return _quickSelect(nums, lo, i - 1, k - (hi - i + 1))
// }


// export let findKthLargest = (nums: Array<number>, k: number) => {
// 	return _quickSelect(nums, 0, nums.length - 1, k)
// }


let _swap = (A, i, j) => {
	const t = A[i];
	A[i] = A[j];
	A[j] = t;
}

/**
 *
 * @param {*} A  数组
 * @param {*} p  起始下标
 * @param {*} r  结束下标 + 1
 */
let _divide = (A, getValue, p, r) => {
	const x = getValue(A[r - 1]);
	let i = p - 1;

	for (let j = p; j < r - 1; j++) {
		if (getValue(A[j]) <= x) {
			i++;
			_swap(A, i, j);
		}
	}

	_swap(A, i + 1, r - 1);

	return i + 1;
}

/**
 * 
 * @param {*} A  数组
 * @param {*} p  起始下标
 * @param {*} r  结束下标 + 1
 */
export let qsort = (A, getValue, p = 0, r = A.length) => {
	// r = r || A.length;

	if (p < r - 1) {
		const q = _divide(A, getValue, p, r);
		qsort(A, getValue, p, q);
		qsort(A, getValue, q + 1, r);
	}

	return A;
}
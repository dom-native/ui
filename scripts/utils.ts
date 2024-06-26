import * as Path from 'path';


export async function wait(ms: number) {
	return new Promise(function (resolve: any) {
		setTimeout(() => { resolve(); }, ms);
	});
}

// return now in milliseconds using high precision
export function now() {
	var hrTime = process.hrtime();
	return hrTime[0] * 1000 + hrTime[1] / 1000000;
}







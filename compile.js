/*
	***********************************************************************************

		TMS.js
		compile.js

		This file is responsible for compiling TMS.js

		IMPORTANT: This file is suposed to run on nodejs - not on nwjs or any
		browser.

	***********************************************************************************
*/

try {

	const fs = require('fs'),
		uglifyJs = require('uglify-js'),
		originalTs = fs.readFileSync('./src/TMS.ts', 'utf8'),
		originalJs = fs.readFileSync('./Compile/TMS.js', 'utf8'),
		mFile = uglifyJs.minify(originalJs).code,
		final = `${originalTs.slice(0, (originalTs.indexOf('*/') + 2))}\n${mFile}`;

	fs.writeFileSync('./Compile/TMS.js', originalJs, 'utf8');
	fs.writeFileSync('./Compile/TMS.min.js', final, 'utf8');

} catch (err) {
	throw new Error(err);
}
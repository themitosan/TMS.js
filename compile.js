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
		baseFile = fs.readFileSync('./TMS.js', 'utf8'),
		mFile = uglifyJs.minify(baseFile).code,
		final = baseFile.slice(0, (baseFile.indexOf('*/') + 2)) + '\n' + mFile;

	if (fs.existsSync('./Compile') === !1){
		fs.mkdirSync('./Compile');
	}

	fs.writeFileSync('./Compile/TMS.js', baseFile, 'utf8');
	fs.writeFileSync('./Compile/TMS.min.js', final, 'utf8');

} catch (err) {

	throw new Error(err);

}
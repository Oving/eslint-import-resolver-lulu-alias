'use strict';

const path = require('path');

const localResolve = module.constructor._findPath;
const defaultExtension = ['.js', 'jsx', '.json'];
const defaultWebpackConfig = {
	externals: {},
	resolve: {},
	entry: {},
	output: {},
	module: {},
	plugins: {},
	externals: {},
	resolve:{}
};

function findConfiguredPath(modulePath, alias) {
	const __pathes = modulePath.split('/');
	let aliasPath = null;

	if (__pathes.length === 1) {
		aliasPath = alias[__pathes[0]] || alias[__pathes[0] + '$'];
	} else {
		aliasPath = alias[__pathes[0]];
	}
	return aliasPath;
}

function fileWithExtension(path, extensions) {
	return extensions.some(ext => path.endsWith(ext));
}
exports.interfaceVersion = 2;

exports.resolve = function(modulePath, sourceFile, config) {
	try {
    const luluConfig = require(path.join(process.cwd(), `${config.configPath || 'lulu.config.js'}`));
		const { alias } = luluConfig.webpack(defaultWebpackConfig).resolve;
    if (alias) {
      const __pathes = modulePath.split('/');
  
      const aliasPath = findConfiguredPath(modulePath, alias);
  
      if (aliasPath) {
        let filename = null;

				if (fileWithExtension(aliasPath, defaultExtension)) {
					filename = localResolve(aliasPath, []);
				} else {
					const filePath = aliasPath.startsWith('.')
						? path.join(__dirname, aliasPath, ...__pathes.slice(1))
						: path.join(aliasPath, ...__pathes.slice(1));
					filename = localResolve(filePath, []);
				}
				return {
					found: !!filename,
					path: filename || null,
				};
      }
    }
	} catch (err) {
		console.log(err);
	}
	return { found: false };
};

// Define the include function for absolute file names

// __dirname is a global variable in Node.js that provides 
// the directory path of the current module
global.base_dir = __dirname;

// Returns the absolute directory of the path passed into the anonymous function
global.abs_path = function(path) {
    return base_dir + path;
}

global.include = function(file) {
    return require(abs_path('/' + file));
}
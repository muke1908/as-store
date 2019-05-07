let writeListener = null;
let __AS = (localStorage.getItem('__AS') && JSON.parse(localStorage.getItem('__AS'))) || {}

const asyncStorage = {
	cache:__AS,
	onWriteComplete: function(callback) {
		console.log('Listening to write')
		writeListener = callback
	},
	setItem: function(key, value) {
		if(!(key && value)) {
			throw{
				error:"Data not valid. Expected: (key, value)"
			}
		}

		__AS[key] = value;
		asyncStorage.cache = __AS
		writeToDisk()
	},
	getItem: function(key) {

        if(asyncStorage.cache[key]) {
			return asyncStorage.cache[key];
		}
		if(localStorage.getItem('__AS')) {
			var __AS = JSON.parse(localStorage.getItem('__AS'));

            if(!asyncStorage.cache) {
                asyncStorage.cache = __AS;
            }

            if(__AS[key]) {
				return __AS[key];
			}else{
				return null;
			}
		}else{
			return null;
		}
	},
	removeItem: function(key) {
		if(localStorage.getItem('__AS')) {
			var __AS = JSON.parse(localStorage.getItem('__AS'));
			var keysArray = Object.keys(__AS);
			for(let x in keysArray) {
				if(keysArray[x] == key) {
					delete(__AS[key]);
				}
			}
			localStorage.setItem('__AS',JSON.stringify(__AS));
			asyncStorage.cache = __AS
		}
		return
	},
	flush: function() {
		localStorage.removeItem('__AS');
		return
	}
}



let writingToDisk = false
function writeToDisk() {


	if(writingToDisk) {
		// console.log('debouncing..')
	}else {
		writingToDisk = true;
		setTimeout(()=>{
			// console.log('writing to disk');
			localStorage.setItem('__AS', JSON.stringify(__AS));
			writingToDisk = false;

			if(writeListener) {
				writeListener(__AS)
			}
		},500)
	}
	return
}

module.exports = asyncStorage;

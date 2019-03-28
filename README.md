# Asynchronous local storage
A local storage wrapper, that helps to write data to disk asynchronously. It uses in-mem cache for faster "READ" 

## Install  
`npm install AsyncLS`

## Usage  

### Methods: 
1) `AsyncLS.setItem(key, value)` - set `value` for `key` in AsyncLS  
2) `AsyncLS.getItem(key)` - lookup data for `key` from AsyncLS  
3) `AsyncLS.removeItem(key)` - remove `key` from AsyncLS  
4) `AsyncLS.flush()` - flush all the data from AsyncLS  
5) `AsyncLS.onWriteComplete(function)` - attach handler to disk "WRITE". `funciton` will be called when writing to disk.  

### Why it's fast and non-blocking ?
`setItem` - doesn't write the data to disk immediately. Non-blocking. Process multiple write operation at once (with 200ms debounce).  
`getItem` - doesn't read data from disk. It maintain a hash map in client. It directly returns data from memory.  

var entries = require('./entries.json');




exports.getBlogEntry = function(id) {
	for(var i=0; i<entries.length; i++) {
		if(entries[i].id == id) return entries[i];
	}
};














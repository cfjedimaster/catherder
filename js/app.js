let CAT_PREFIX = ['Lord','Lady','Mr','King','Queen','Empress','Emperor','Strange','Delerious'];
let CAT_NAME = ['Fluffy','Pig','Elise','Luna','Grace','Zelda','Sintra','Elvis','Crackers','Smelly Cat','Toebeans','Bob','Mary','Sammy']
let NEEDS = ['to be left alone','food','petting'];

document.addEventListener('alpine:init', () => {
  Alpine.data('app', () => ({
	cats:[],
	cheatsEnabled:false,
	purrs:0,
    async init() {
		this.addCat();
    },

    heartBeat() {
    },

	addCat() {
		let cat = {};
		cat.gender = Math.random() < 0.5 ? 'male':'female';
		cat.name = getRandomArrayEl(CAT_PREFIX) + ' ' + getRandomArrayEl(CAT_NAME);
		cat.happiness = 0;
		cat.need = null;
		this.cats.push(cat);
	},

    get cheatsEnabled() {
      let p = new URLSearchParams(window.location.search);
      return p.has('xyzzy');
    },

    // utils
    numberFormat(s) {
      if(!window.Intl) return s;
      return new Intl.NumberFormat().format(s);
    }

  }))
});


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
  //The maximum is exclusive and the minimum is inclusive
}

function getRandomArrayEl(arr) {
	return arr[getRandomInt(0, arr.length)];
}
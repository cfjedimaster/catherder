let CAT_PREFIX = ['Lord','Lady','Mr','King','Queen','Empress','Emperor','Strange','Delerious','Fluffy'];
let CAT_NAME = ['Fluffy','Pig','Elise','Luna','Grace','Zelda','Sintra','Elvis','Crackers','Smelly Cat','Toebeans','Bob','Mary','Sammy']

// Needs are a collection of strings related to display and user action
let NEEDS = [
	{ display:'to be left alone', action:'ignore' },
	{ display:'food', action:'feed' },
	{ display: 'petting', action:'pet' }
];

let ACTIVITIES = ['chasing a laser dot', 'sleeping', 'chasing sunbeams', 'laying in the sun', 'sitting in a box', 'stalking a bug'];

// Range of how many seconds until next mood change
let CAT_MOOD_MIN = 10;
let CAT_MOOD_MAX = 30;

// Threshold where you get a chance for a purr
let PURR_THRESHOLD = 10;

// Threshold for when you can buy machines
let MACHINE_THRESHOLD = 70;

document.addEventListener('alpine:init', () => {
  Alpine.data('app', () => ({
	boxes:0, 
	cats:[],
	cheatsEnabled:false,
	feeders:0, 
	machinesEnabled:false,
	petters:0, 
	purrs:0,
    async init() {
		this.addCat();
		setInterval(() => { this.heartBeat() }, 1000);
    },

    heartBeat() {
		/*
		For each cat, see if it's time for a mood change, and if so, change it
		*/
		for(let i=0; i<this.cats.length;i++) {

			let cat = this.cats[i];

			// do we purr?
			if(cat.happiness > PURR_THRESHOLD) {
				console.log('chance to purr');
				// need to think about the chance, for now, lets just purr
				this.purrs += Math.floor(cat.happiness / PURR_THRESHOLD);
			}

			// does a machine help us?
			if(cat.need.action === 'ignore' && this.boxes >= (i+1)) cat.happiness++;
			if(cat.need.action === 'feed' && this.feeders >= (i+1)) cat.happiness++;
			if(cat.need.action === 'pet' && this.petters >= (i+1)) cat.happiness++;

			// do we change mood?
			if(new Date() > cat.moodChangeTime) {
				cat.activity = getRandomArrayEl(ACTIVITIES);
				cat.need = getRandomArrayEl(NEEDS);

				let duration = getRandomInt(CAT_MOOD_MIN, CAT_MOOD_MAX);
				let now = new Date();
				now.setSeconds(now.getSeconds() + duration);
				cat.moodChangeTime = now;

				// guess what chicken butt
				// TODO: ok, this isn't fair - i think i'll degrade happiness later
				cat.happiness = 0;

			}

			if(this.nextCatCost <= this.purrs) {
				console.log('add cat based on purrs');
				this.addCat();
			}
		}
    },

	addCat(notify=true) {
		let cat = {};
		cat.gender = Math.random() < 0.5 ? 'male':'female';
		cat.name = getRandomArrayEl(CAT_PREFIX) + ' ' + getRandomArrayEl(CAT_NAME);
		cat.happiness = 0;
		cat.need = getRandomArrayEl(NEEDS);
		cat.activity = getRandomArrayEl(ACTIVITIES);

		// repeated code from heartbeat - to do, dont repeat
		let duration = getRandomInt(CAT_MOOD_MIN, CAT_MOOD_MAX);
		let now = new Date();
		now.setSeconds(now.getSeconds() + duration);
		cat.moodChangeTime = now;

		this.cats.push(cat);
	},

	buyBox() {
		if(this.canBuyBox) {
			this.boxes++;
			this.purrs -= this.machineCost;
		}
	},

	buyFeeder() {
		if(this.canBuyFeeder) {
			this.feeders++;
			this.purrs -= this.machineCost;
		}
	},

	buyPetter() {
		if(this.canBuyPetter) {
			this.petters++;
			this.purrs -= this.machineCost;
		}
	},

	doIt(action, cat) {
		console.log(`Player wants to ${action} to ${cat.name}`);
		if(cat.need.action === action) {
			cat.happiness++;
			console.log('good');
		} else {
			cat.happiness--;
			console.log('bad');
		}

	},

	// getters, duh
	get canBuyBox() {
		return this.purrs >= this.machineCost;
	},

	get canBuyFeeder() {
		return this.purrs >= this.machineCost;
	},

	get canBuyPetter() {
		return this.purrs >= this.machineCost;
	},

	get nextCatCost() {
		// https://gamedev.stackexchange.com/a/13639
		// reverse is: XP = level squared / constanst
		// constant from that same comment, 0.04
		return (this.cats.length + 1) ** 2 / 0.04;
	},

	get machineCost() {
		return 100 + ((this.boxes + this.petters + this.feeders) * 10);
	},

	get machinesAllowed() {
		if(this.purrs > MACHINE_THRESHOLD) {
			this.machinesEnabled = true;
		}

		return this.machinesEnabled;
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
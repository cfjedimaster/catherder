# Cat Herder

Cat Herder is an "idle clicker" game where you as the lucky cat parent get to try your best to keep your fur babies happy. Each cat has three basic needs - to be fed, petted, or ignored, and you have to do your best to meet those needs! Good luck!

Play it at <https://catherder.netlify.app/>

## Mechanics

This section details how the game operates, so if you want to really enjoy the game, do not read further. I'm making these
notes to help me keep track, and to help someone who wants to work on the game as well.

* Cat moods change every CAT_MOOD_MIN to CAT_MOOD_MAX seconds. This value is randomly set for each cat.
* When a cat's happiness value is over PURR_THRESHOLD, they get a purr every heartbeat (one second).
* You can now get 2 or more purrs - we divide happiness by PURR_THRESHOLD. I may reverse this.
* Machines are enabled once your PURRS go over MACHINE_THRESHOLD. It's a one-time toggle.
* Machine cost is based on the total number of machines across all three types: 100 + ((# of Boxes + # of Petters + # of Feeders) * 10);
* Cat 'cost' is based on a geometric growth (believe it is geometric, not exponential) compared to purrs
* The heartbeat function: 
  * If a cat is over PURR_THRESHOLD, add to purrs
  * If a cat's need is met by a machine and the cat's index (what number cat is) is less then or equal to the number of machines of that type, then happiness goes up
  * If a cat's mood needs to change, a new one is assigned and happiness is set to zero
  * If purrs are over the cost for a new cat, cats++

## Notes

As I think of stuff, I add it here. 

Cat traits:
	zoomies: mood changes 2 to 3x
	crazy: even if mood=X and you do X, you don't get credit, you need a random chance 
	grumpy: needs high happiness to purr

New cat notification:
	I added support such that the cheat can add a cat, but when a cat is added via the game, a flag will be true. I should do something such that the new cat is announced. 

notes for firefly: 
landscape, art, style: themes/cartoon

## Changelog

* 6/30/2024: Support adding cats based on purrs. You can now get more purrs the more happy the cat is. Added some documentation here on how things work, potential spoilers though.

* 6/6/2024: Fixed bug with pet machine, increased time for moods.

* 6/5/2024: Machines now add to happiness for each cat up to the # of machines. So X feeders will feed the first X cats. Also reduced the amount of purrs needed to enable machines. Also simplified machine cost. I still have methods for each 3 types and I could reduce that, but keeping them in case I reverse the decision. Added version # to title screen.

* 6/4/2024: Added flag for when machines are enabled. Added machine display and ability to purchase. Machines don't do anything yet. Oh, added money cheat to the cheats. 

* 5/25/2024: Initial release

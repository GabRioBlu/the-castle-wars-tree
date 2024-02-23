addLayer("des", {
    name: "demsododo!!!", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#388AE8",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "deemsododo coolness factor!!", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
	buyables: {
		11: {
			title() { return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>gamer ability"; },
			cost(x) { return new Decimal(x).add(1).pow(1.3); },
			effect(x) { return new Decimal(x).mul(2).add(1); },
			display() { return "des is such gamer they can do more point generating<br/>cost: " + format(tmp[this.layer].buyables[this.id].cost); },
			canAfford() { return player[this.layer].points.gte(this.cost()); },
			buy() { 
				player[this.layer].points = player[this.layer].points.sub(this.cost());
            	setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
			}
		},
		12: {
			title() { return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>gamer ability TWO!!1"; },
			cost(x) { return new Decimal(x).add(1).pow(2); },
			effect(x) { return new Decimal(x).mul(player[this.layer].points.add(1).pow(0.5)).add(1); },
			display() { return "absolute gamer skills!!! des points boost point gain<br/>cost: " + format(tmp[this.layer].buyables[this.id].cost);},
			canAfford() { return player[this.layer].points.gte(this.cost()); },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost());
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
			}
		}
	},
	upgrades: {
		11: {
			title: "epic building skill,",
			description: "with these epic building skills des can do more points",
			cost: new Decimal(1),
		}
	},
	microtabs: {
		stuff: {
			"gaming prowess": {
				content: [
					["blank", "15px"],
					"buyables"
				]
			},
			"skillishness": {
				content: [
					["blank", "15px"],
					"upgrades"
				]
			}
		}
	},
	tabFormat: [
		"main-display",
		"prestige-button",
		["blank",  "25px"],
		["microtabs", "stuff"],
		["blank", "35px"]
	]
})

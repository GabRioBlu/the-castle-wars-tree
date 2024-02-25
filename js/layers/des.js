addLayer("des", {
    name: "Desmododo", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#388AE8",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Des Points", // Name of prestige currency
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
        {key: "d", description: "D: Prestige for Des Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){ return true },
	buyables: {
		11: {
			title() { return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Gathered Dirt"; },
			cost(x) { return new Decimal(1.5).pow(x).div(hasUpgrade("des", 11) ? x : 1) },
			effect(x) { return new Decimal(x).add(1) },
			display() { return "Gather some dirt. Boosts point gain for some reason: x" + format(tmp[this.layer].buyables[this.id].effect) + "<br/>Cost: " + format(tmp[this.layer].buyables[this.id].cost); },
			canAfford() { return player[this.layer].points.gte(this.cost()); },
			buy() { 
				player[this.layer].points = player[this.layer].points.sub(this.cost());
            	setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
			}
		},
		12: {
			title() { return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Gathered Wood"; },
			cost(x) { return new Decimal(2.1).pow(x).mul(10).div(hasUpgrade("des", 12) ? x : 1) },
			effect(x) {
				return new Decimal(x).mul(1.5).add(1)
			},
			display() { return "Gather some wood. Also boosts point gain. x" + format(tmp[this.layer].buyables[this.id].effect) + "<br/>Cost: " + format(tmp[this.layer].buyables[this.id].cost);},
			canAfford() { return player[this.layer].points.gte(this.cost()); },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost());
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
			}
		},
		13: {
			title() { return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Gathered Stone"; },
			cost(x) { return new Decimal(2.5).pow(x).mul(50).div(hasUpgrade("des", 13) ? x : 1); },
			effect(x) {
				return new Decimal(x).pow(1.2).add(1)
			},
			display() { return "Gather some stone. You decide it's a good idea to stop wondering why these boost point gain. x" + format(tmp[this.layer].buyables[this.id].effect) + "<br/>Cost: " + format(tmp[this.layer].buyables[this.id].cost);},
			canAfford() { return player[this.layer].points.gte(this.cost()); },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost());
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
			}
		},
		14: {
			title() { return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Gathered Food"; },
			cost(x) { return new Decimal(3.3).pow(x).mul(100).div(hasUpgrade("des", 14) ? x : 1); },
			effect(x) { 
				return new Decimal(x).pow(1.3).mul(1.2).add(1)
			},
			display() { return "Gather some food. The extra healthiness boosts point gain: x" + format(tmp[this.layer].buyables[this.id].effect) + "<br/>Cost: " + format(tmp[this.layer].buyables[this.id].cost);},
			canAfford() { return player[this.layer].points.gte(this.cost()); },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost());
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
			}
		}
	},
	upgrades: {
		11: {
			title: "Wooden Shovel",
			description: "Decrease dirt resource price",
			cost: new Decimal(30),
		},
		12: {
			title: "Wooden Axe",
			description: "Decrease wood resource price",
			cost: new Decimal(100),
		},
		13: {
			title: "Wooden Pickaxe",
			description: "Decrease stone resource price",
			cost: new Decimal(750),
		},
		14: {
			title: "Wooden Hoe",
			description: "Decrease food resource price",
			cost: new Decimal(2000),
		}
	},
	microtabs: {
		stuff: {
			"Resources": {
				content: [
					["blank", "15px"],
					"buyables"
				]
			},
			"Tools": {
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

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
		mult = mult.mul(tmp.blu.buyables[11].effect)
        if (hasUpgrade("dec", 11)) mult = mult.mul(2);
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: get suom ddesmodo point", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
	buyables: {
		11: {
			title() { return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>gamer ability"; },
			cost(x) { return new Decimal(x).add(1).pow(1.4); },
			effect(x) { return new Decimal(x).mul(new Decimal(x).add(1)).add(1) },
			display() { return "des is such gamer they can do more point generating x" + format(tmp[this.layer].buyables[this.id].effect) + "<br/>cost: " + format(tmp[this.layer].buyables[this.id].cost); },
			canAfford() { return player[this.layer].points.gte(this.cost()); },
			buy() { 
				player[this.layer].points = player[this.layer].points.sub(this.cost());
            	setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
			}
		},
		12: {
			title() { return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>gamer ability TWO!!1"; },
			cost(x) { return new Decimal(x).add(1).pow(1.2); },
			effect(x) {
				let output = new Decimal(x).sqrt().mul(player[this.layer].points.ln()).add(1);
				ret = applyPolynomialSoftcap(ret, 40, 1.5);
				return ret;
			},
			display() { return "absolute gamer skills!!! des points boost point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + "<br/>cost: " + format(tmp[this.layer].buyables[this.id].cost);},
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
			description: "with these epic building skills des can do 2x points",
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

addLayer("dec", {
    name: "NotDecklyDeclan",
    symbol: "D2",
    row: 0,
    position: 0,
    branches: ["des"],
    startData() { return {
        unlocked: false,
        points: new Decimal(0)
    }},
    color: "#2ECADB",
    requires: new Decimal(300000),
    resource: "Dec Points",
    baseResource: "points",
    baseAmount() { return player.points },
    type: "normal",
    exponent: 0.7,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 0,
    hotkeys: [
        { key: "k", description: "K: Prestige for Dec Points", onPress() { if (canReset(this.layer)) doReset(this.layer) }},
    ],
    layerShown() { return true },
    buyables: {
        11: {
            title() { return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Build Ideas"; },
            cost(x) { return new Decimal(1.5).pow(x).mul(5) },
            effect(x) { return new Decimal(x).pow(1.3).mul(1.5).add(1) },
            display() { return "Think of some build ideas. Boosts points (and no stop asking why) gain by x" + format(tmp[this.layer].buyables[this.id].effect) + "<br/>Cost: " + format(tmp[this.layer].buyables[this.id].cost); },
            canAfford() { return player[this.layer].points.gte(this.cost()); },
            buy() {
                player[this.layer].points = player[this.layer].points.sub((this.cost()))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            }
        },
        12: {
            title() { return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Better Build Ideas"; },
            cost(x) { return new Decimal(1.9).pow(x).mul(100) },
            effect(x) { return new Decimal(x).add(1).pow(1.8).add(new Decimal(x).mul(1.4)) },
            display() { return "Weed out the shitty ideas. Point gain x" + format(tmp[this.layer].buyables[this.id].effect) + "<br/>Cost: " + format(tmp[this.layer].buyables[this.id].cost); },
            canAfford() { return player[this.layer].points.gte(this.cost()); },
            buy() {
                player[this.layer].points = player[this.layer].points.sub((this.cost()))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            }
        },
        13: {
            title() { return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Plan Ideas"; },
            cost(x) { return new Decimal(2.5).pow(x).mul(5000) },
            effect(x) { return new Decimal(1.9).pow(x) },
            display() { return "Do some building. Point gain x" + format(tmp[this.layer].buyables[this.id].effect) + "<br/>Cost: " + format(tmp[this.layer].buyables[this.id].cost); },
            canAfford() { return player[this.layer].points.gte(this.cost()); },
            buy() {
                player[this.layer].points = player[this.layer].points.sub((this.cost()))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            }
        },
        21: {
            data: {
                dirt: new Number(0),
                wood: new Number(0),
                stone: new Number(0),
                food: new Number(0)
            },
            title() { return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Houses" },
            cost(x) { return 1 },
            display() { return "Reset all Des layer progress, and all Dec layer buyables, to gain a boost based on all Des layer resources raised to a power slightly increased by total resources and ideas.<br/>Current multi: x" + format(tmp[this.layer].buyables[this.id].effect) + "<br/>Multi on buy: x" + format(tmp[this.layer].buyables[this.id].nextEffect()) },
            effect(x) { return this.data.dirt.add(1).add(this.data.wood.mul(1.5).add(1)).add(this.data.stone.pow(1.2).add(1)).add(this.data.food.pow(1.3).mul(1.2).add(1)) },
            nextEffect() { return getBuyableAmount("des", 11).add(1).add(getBuyableAmount("des", 12).mul(1.5).add(1)).add(getBuyableAmount("des", 13).pow(1.2).add(1)).add(getBuyableAmount("des", 14).pow(1.3).mul(1.2).add(1)) },
            canAfford() { return true },
            buy() {
                data.dirt = getBuyableAmount("des", 11)
                data.wood = getBuyableAmount("des", 12)
                data.stone = getBuyableAmount("des", 13)
                data.food = getBuyableAmount("des", 14)
                setBuyableAmount("des", 11, 0)
                setBuyableAmount("des", 12, 0)
                setBuyableAmount("des", 13, 0)
                setBuyableAmount("des", 14, 0)
                setBuyableAmount("dec", 11, 0)
                setBuyableAmount("dec", 12, 0)
                setBuyableAmount("dec", 13, 0)
                player["des"].points = new Decimal(0)
                player.points = new Decimal(10)
            }
        }
    },
    microtabs: {
        stuff: {
            "Build Ideas": {
                content: [
                    ["blank", "15px"],
                    "buyables"
                ]
            },
            "nothing": {
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
        ["blank", "25px"],
        ["microtabs", "stuff"],
        ["blank", "35px"]
    ]
})
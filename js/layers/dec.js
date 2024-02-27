addLayer("dec", {
    name: "NotDecklyDeclan",
    symbol: "D2",
    row: 0,
    position: 0,
    branches: ["des"],
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        houseMulti: new Decimal(1)
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
            cost(x) { return new Decimal(1.7).pow(x || getBuyableAmount(this.layer, this.id)).mul(5) },
            effect(x) { return new Decimal(x || getBuyableAmount(this.layer, this.id)).pow(1.2).mul(1.2).add(1) },
            display() { return "Think of some build ideas. Boosts points (and no stop asking why) gain by x" + format(tmp[this.layer].buyables[this.id].effect) + "<br/>Cost: " + format(tmp[this.layer].buyables[this.id].cost); },
            canAfford() { return player[this.layer].points.gte(this.cost()); },
            buy() {
                player[this.layer].points = player[this.layer].points.sub((this.cost()))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            }
        },
        12: {
            title() { return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Better Build Ideas"; },
            cost(x) { return new Decimal(2.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(100) },
            effect(x) { return new Decimal(x || getBuyableAmount(this.layer, this.id)).add(1).pow(1.3).add(new Decimal(x).mul(1.3)) },
            display() { return "Weed out the shitty ideas. Point gain x" + format(tmp[this.layer].buyables[this.id].effect) + "<br/>Cost: " + format(tmp[this.layer].buyables[this.id].cost); },
            canAfford() { return player[this.layer].points.gte(this.cost()); },
            buy() {
                player[this.layer].points = player[this.layer].points.sub((this.cost()))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            }
        },
        13: {
            title() { return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Plan Ideas"; },
            cost(x) { return new Decimal(2.9).pow(x || getBuyableAmount(this.layer, this.id)).mul(2000) },
            effect(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)) },
            display() { return "Do some building. Point gain x" + format(tmp[this.layer].buyables[this.id].effect) + "<br/>Cost: " + format(tmp[this.layer].buyables[this.id].cost); },
            canAfford() { return player[this.layer].points.gte(this.cost()); },
            buy() {
                player[this.layer].points = player[this.layer].points.sub((this.cost()))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            }
        },
        21: {
            title() { return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Houses" },
            cost(x) { return 1 },
            display() { return "Reset all Des/Dec progress for a boost based on Des layer resources: x" + format(tmp[this.layer].buyables[this.id].effect) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount("des", 11).add(1).mul(getBuyableAmount("des", 12).mul(1.5).add(1)).mul(getBuyableAmount("des", 13).pow(1.2).add(1)).mul(getBuyableAmount("des", 14).pow(1.3).mul(1.2).add(1)).sqrt().ln()) },
            canAfford() { return this.effect().gte(player[this.layer].houseMulti) },
            buy() {
                player[this.layer].houseMulti = player[this.layer].houseMulti.max(this.effect())
                player.points = new Decimal(10)
                player.des.points = new Decimal(0)
                player.dec.points = new Decimal(0)
                resetBuyables("des");
                player.des.upgrades = [];

                let n = getBuyableAmount(this.layer, this.id).add(1);
                resetBuyables(this.layer);
                setBuyableAmount(this.layer, this.id, n);
            }
        }
    },
    microtabs: {
        stuff: {
            "Build Ideas": {
                content: [
                    ["blank", "15px"],
                    ["row", [["buyable", "11"], ["buyable", "12"], ["buyable", "13"]]],
                    ["blank", "30px"],
                    ["display-text", () => "Your current house multiplier is boosting points by: x" + format(player.dec.houseMulti)],
                    ["buyable", "21"]
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
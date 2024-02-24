addLayer("dec", {
    name: "declanbutNOTDECKLY",
    symbol: "D2",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0)
    }},
    color: "#2ECADB",
    requires: new Decimal(1000000),
    resource: "dec points (idk)",
    baseResource: "points",
    baseAmount() { return player.points },
    type: "normal",
    exponent: 0.5,
    gainMult() {
        mult = new Decimal(1)
        mult = mult.mul(tmp.blu.buyables[11].effect)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 0,
    hotkeys: [
        { key: "k", description: "k: prestig for decklyness", onPress() { if (canReset(this.layer)) doReset(this.layer) }},
    ],
    layerShown() { return true },
    buyables: {
        11: {
            title() { return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>brotherness"; },
            cost(x) { return new Decimal(x) },
            effect(x) { return new Decimal(x).add(1).pow(1.5) },
            display() { return "even a famlial relatioship with des boots point gain by x" + format(tmp[this.layer].buyables[this.id]..effect) + "<br/>costs: " + format(tmp[this.layer].buyables[this.id].cost); },
            canAfford() { return player[this.layer].points.gte(this.cost()); },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost());
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            }
        }
    },
    upgrades: {
        11: {
            title: "supreme desity",
            description: "boost des points gains by 2",
            cost: new Decimal(100)
        },
        12: {
            title: "unlock blu",
            description: "unlocks blu",
            cost: new Decimal(2000)
        }
    },
    microtabs: {
        stuff: {
            "buy things here!!": {
                content: [
                    ["blank", "15px"],
                    "buyables"
                ]
            },
            "buy other things here": {
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
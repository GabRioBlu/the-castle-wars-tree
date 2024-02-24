addLayer("blu", {
    name: "blu (the big man)",
    symbol: "B",
    row: 1,
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0)
    }},
    color: "#0000FF",
    requires: new Decimal(5000),
    resource: "leader point",
    baseResource: "dec points (idk)",
    baseAmount() { return player.dec.points },
    type: "normal",
    exponent: 0.6,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    hotkeys: [
        { key: "b", description: "bB; reset and get blu leaderness", onPress() { if (canReset(this.layer)) doReset(this.layer) }}
    ],
    layerShown() { return (hasUpgrade("dec", 12) || player.blu.unlocked) },
    branches: ["des", "dec"],
    buyables: {
        11: {
            title() { return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>lead your peoples"; },
            cost(x) { return new Decimal(1.05).pow(x) },
            effect(x) { return new Decimal(x).ln().pow(2)},
            display() { return "boost des/dec point gain<br/>cost: " +  format(tmp[this.layer].buyables[this.id].cost)},
            canAfford() { return player[this.layer].points.gte(this.cost())},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost());
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
            }
        }
    },
    microtabs: {
        stuff: {
            "do things": {
                content: [
                    ["blank", "15px"],
                    "buyables"
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
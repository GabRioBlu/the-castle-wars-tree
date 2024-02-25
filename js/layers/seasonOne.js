addLayer("seasonOne", {
    name:  "Season One",
    symbol: "S1",
    position: 0,
    row: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0)
    }},
    color: "#FFD978",
    requires: new Decimal(20),
    resource: "Season One Points",
    baseAmount() { return player.blu.points },
    type: "normal",
    exponent: 0.5,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    hotkeys: [
        { key: "1", description: "1: Prestige for Season One Points" }
    ],
    layerShown() { return true }
})
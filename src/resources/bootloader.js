Number.prototype.numberToHumanFormat = function(decimal = 2, symbol = false) {
    var config = { minimumFractionDigits: decimal }

    if (symbol) {
        config.style = "currency"
        config.currency = "BRL"
    }

    return this.toLocaleString("pt-br", config)
}

String.prototype.capitalize = function() {
    var text = this.toLowerCase()
    return text.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); })
}

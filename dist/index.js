"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dayjs_1 = __importDefault(require("dayjs"));
var faker_1 = __importStar(require("faker"));
var fs_1 = __importDefault(require("fs"));
faker_1["default"].setLocale("it");
dayjs_1["default"].locale("it");
if (fs_1["default"].existsSync('note-spesa.csv'))
    fs_1["default"].writeFileSync('note-spesa.csv', '');
var casa = "Via Provinciale Sud, 157, Fossò (VE)";
var clienti = [
    {
        nome: "Azzurra Trasporti Soc. Coop.",
        indirizzo: "Corso Stati Uniti, 18, Padova (PD)",
        distanza: 13.5
    },
    {
        nome: "Nuova Officina Piovese",
        indirizzo: "Via Leonardo Da Vinci, 20, Brugine (PD)",
        distanza: 11.3
    },
];
var lavoro = {
    nome: "Tri.Lem Srl Logistica e trasporti",
    indirizzo: "Via dell'Artigianato, 13, Grantorto (PD)",
    distanza: 47.6
};
var sogliaMensile = 3250;
var anno = 2021;
var viaggi = [];
// ciclo annuale
for (var mese = 0; mese < 12; mese++) {
    var sommaKmMese = 0;
    // ciclo mensile
    for (var giorno = 1; giorno < dayjs_1["default"]().year(anno).month(mese).daysInMonth(); giorno++) {
        if (sommaKmMese >= sogliaMensile)
            break;
        var data = dayjs_1["default"]().year(anno).month(mese).day(giorno);
        if (data.day() === 5 || data.day() === 6)
            continue;
        // viaggio Trilem ogni giorno
        viaggi.push({
            co: lavoro.nome,
            data: data,
            partenza: casa,
            destinazione: lavoro.indirizzo,
            km: lavoro.distanza * 2
        });
        sommaKmMese += lavoro.distanza * 2;
        // numero random di viaggi nel giorno
        var numeroViaggi = faker_1["default"].datatype.number() % 5;
        for (var i = 1; i <= numeroViaggi; i++) {
            var cliente = faker_1.random.arrayElement(clienti);
            viaggi.push({
                co: cliente.nome,
                partenza: casa,
                destinazione: cliente.indirizzo,
                km: cliente.distanza * 2,
                data: data
            });
            sommaKmMese += cliente.distanza * 2;
        }
    }
}
viaggi.sort(function (viaggio1, viaggio2) {
    if (viaggio1.data.isSame(viaggio2.data, 'day'))
        return 0;
    return viaggio1.data.isBefore(viaggio2.data) ? -1 : 1;
});
viaggi.forEach(function (viaggio) {
    fs_1["default"].appendFileSync('note-spesa.csv', viaggio.data + "; " + viaggio.co + "; " + viaggio.partenza + "; " + viaggio.destinazione + "; " + viaggio.destinazione + "; " + viaggio.partenza + "; " + viaggio.km + "\n");
});
console.log("Finito!");

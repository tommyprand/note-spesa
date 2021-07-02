import dayjs, { Dayjs } from "dayjs";
import faker, { random } from "faker";
import fs from "fs"

faker.setLocale("it")
dayjs.locale("it")

if (fs.existsSync('note-spesa.csv'))
    fs.writeFileSync('note-spesa.csv', '')

interface Cliente {
    nome: string,
    indirizzo: string,
    distanza: number
}

interface Viaggio {
    data: Dayjs,
    co: string,
    partenza: string,
    destinazione: string
    km: number
}

const casa = "Via Provinciale Sud, 157, Fossò (VE)"

const clienti: Cliente[] = [
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
]

const lavoro: Cliente = {
    nome: "Tri.Lem Srl Logistica e trasporti",
    indirizzo: "Via dell'Artigianato, 13, Grantorto (PD)",
    distanza: 47.6
}

const sogliaMensile = 3295
const anno = 2020

const viaggi: Viaggio[] = []

// ciclo annuale
for (let mese = 0; mese < 12; mese++) {

    let sommaKmMese = 0

    // ciclo mensile
    for (let giorno = 1; giorno < dayjs().year(anno).month(mese).daysInMonth(); giorno++) {

        // console.log(`mese: ${dayjs().month(mese).format("MMM")} somma km mese: ${sommaKmMese}, soglia: ${sogliaMensile}`);
        
        if (sommaKmMese >= sogliaMensile)
            break

        const data = dayjs().year(anno).month(mese).add(giorno, 'days')

        if (data.day() === 0 || data.day() === 6)
                continue

        // viaggio Trilem ogni giorno
        viaggi.push({
            co: lavoro.nome,
            data,
            partenza: casa,
            destinazione: lavoro.indirizzo,
            km: lavoro.distanza * 2
        })

        sommaKmMese += lavoro.distanza * 2

        // numero random di viaggi nel giorno
        const numeroViaggi = faker.datatype.number() % 8

        for (let i = 1; i <= numeroViaggi; i++) {
        
            const cliente = random.arrayElement<Cliente>(clienti)

            viaggi.push({
                co: cliente.nome,
                partenza: casa,
                destinazione: cliente.indirizzo,
                km: cliente.distanza * 2,
                data
            })

            sommaKmMese += cliente.distanza * 2
        } 

    }
}

viaggi.sort((viaggio1, viaggio2) => {
    if (viaggio1.data.isSame(viaggio2.data, 'day'))
        return 0
    return viaggio1.data.isBefore(viaggio2.data) ? -1 : 1
})

viaggi.forEach(viaggio => {
    fs.appendFileSync(
        'note-spesa.csv',
        `"${viaggio.data.format("DD/MM/YYYY")}", "${viaggio.co}", "${viaggio.partenza}", "${viaggio.destinazione}", "${viaggio.destinazione}", "${viaggio.partenza}", "${viaggio.km.toString().replace(".", ",")}"\n`,
    )
})

console.log("Finito!");
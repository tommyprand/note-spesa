import dayjs from "dayjs";
import faker, { random } from "faker";

faker.setLocale("it")
dayjs.locale("it")

interface Cliente {
    nome: string,
    indirizzo: string,
    distanza: number
}

interface Viaggio {
    data: string,
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
    {
        nome: "Tri.Lem Srl Logistica e trasporti",
        indirizzo: "Via dell'Artigianato, 13, Grantorto (PD)",
        distanza: 47.6
    }
]

const sogliaMensile = 100

let sommaKm = 0
let giorni = 0

while (sommaKm < sogliaMensile) {
    const data = faker.date.soon(5, dayjs().add(giorni).toDate())
    if (data.getDay() === 5 || data.getDay() === 6)
        continue
    
    const cliente = random.arrayElement<Cliente>(clienti)

    const viaggio: Viaggio = {
        co: cliente.nome,
        partenza: casa,
        destinazione: cliente.indirizzo,
        km: cliente.distanza * 2,
        data: dayjs(data).toString()
    }

    sommaKm += viaggio.km
    giorni++

    console.log(viaggio);    

}
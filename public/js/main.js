class Patient {
    constructor(nom,maladie,argent,poche,etatSante,traitement){
        this.nom = nom;
        this.maladie = maladie;
        this.argent = argent;
        this.poche = poche;
        this.etatSante = etatSante;
        this.traitement = traitement;
    }

    paye(recepteur){
        this.argent -= 50;
        recepteur.argent += 50;
    }

    goTo(lieu){
        lieu.push(this);
    }


    takeCare(){
        if (this.poche.length > 0){
            this.etatSante = "bonne santé";
        } else {
            this.etatSante = "décès";
            cimetiere.push(this);
        }
    }
}

let marcus = new Patient("Marcus","mal indenté",100,[],"malade",[]);
let optimus = new Patient("Optimus","unsave",200,[],"malade",[]);
let sangoku = new Patient("Sangoku","404",80,[],"malade",[]);
let darthVader = new Patient("DarthVader","asthmatique",110,[],"malade",[]);
let semiColon = new Patient("SemiColon","syntaxError",60,[],"malade",[]);


let salleAttente = [marcus,optimus,sangoku,darthVader,semiColon];
let pharma = [];
let cimetiere = [];


class Pharma {
    constructor(personnes,caisse){
        this.personnes = personnes;
        this.caisse = caisse;
    }

    achat(patient){
       if (patient.argent < patient.traitement[0].prix){
  
                patient.takeCare();

                console.log(patient);
                
        } else {
                patient.argent -= patient.traitement[0].prix;
                pharmacie.caisse += patient.traitement[0].prix;
                patient.poche.push(patient.traitement[0]);

                patient.takeCare();

                console.log(patient);   
        }
    }
}

let pharmacie = new Pharma([],0);



class Tarifs {
    constructor(nom,prix){
        this.nom = nom;
        this.prix = prix;
    }
}


let traitement_a = new Tarifs(`ctrl+maj+f`,60);
let traitement_b = new Tarifs(`saveOnFocusChange`,100);
let traitement_c = new Tarifs(`CheckLinkRelation`,35);
let traitement_d = new Tarifs(`Ventoline`,40);
let traitement_e = new Tarifs(`f12+doc`,20);


class Doc {
    constructor(nom,cabinet,argent){
        this.nom = nom;
        this.cabinet = cabinet;
        this.argent = argent;
    }

    patientIn(patient){
        console.log(`Bonjour, Mr ${patient.nom}, vous pouvez entrer`);
        console.log(patient);

        this.cabinet.push(patient);

        this.diagnostique(patient);
    }

    diagnostique(patient){
        console.log(`Mr ${patient.nom}, vous êtes atteint de ${patient.maladie}. La prestation vous coûtera 50€`);

        patient.paye(this);
        this.traitement(patient);

        console.log(`Merci pour votre payement, Mr ${patient.nom}, votre traitement sera: ${patient.traitement[0].nom}.`);
        
    }

    traitement(patient){
        switch(true){
            case patient.maladie == "mal indenté":
                patient.traitement.push(traitement_a);
                break;

            case patient.maladie == "unsave":
                patient.traitement.push(traitement_b);
                break;

            case patient.maladie == "404":
                patient.traitement.push(traitement_c);
                break;

            case patient.maladie == "asthmatique":
                patient.traitement.push(traitement_d);
                break;

            case patient.maladie == "syntaxError":
                patient.traitement.push(traitement_e);
                break;
        }
    }

    patientOut(patient){
        patient.etatSante = "en traitement";

        console.log(`Au revoir, Mr ${patient.nom}`);
        this.cabinet.splice(this.cabinet.indexOf(patient));

        patient.goTo(pharma);

        pharmacie.personnes = pharma;
    }
}

let docteur = new Doc("Roger",["chat"],0);


function miaou() {
    console.log("Je suis le chat du docteur et je fais Miaou");
}

setInterval(miaou, 2000);


console.log(salleAttente);

for (i = 0; i < salleAttente.length; i++){

    console.log(docteur);

    docteur.patientIn(salleAttente[i]);

    console.log(docteur);
    
    docteur.patientOut(salleAttente[i]);
    
    console.log(salleAttente[i]);
}

console.log(salleAttente = []);
console.log(pharmacie);

pharma.forEach(element => pharmacie.achat(element));

pharmacie.personnes = []
console.log(pharmacie);


console.log(cimetiere);





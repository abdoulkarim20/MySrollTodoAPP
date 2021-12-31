const URL_API="https://eunurtstlwiselpnhdlx.supabase.co/rest/v1/Apprenant";
const API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDY4ODAyNCwiZXhwIjoxOTU2MjY0MDI0fQ.TmCrjrlgP1Eos7T1RFWTm2xZTwhIognYalzkL1ZFhoo";
//Afficher les donner depuis la base de donnees
const listeApprenant=document.querySelector('.charge-liste-apprenanat');
// console.log(listeApprenant);

//esseye
const identifiant=document.querySelector('#id-datas');
// console.log(identifiant);
// console.log(containerCarte);
const photoApp=document.querySelector('#photo-app');

//Recuperation dom du formulaire
const nomApp=document.querySelector('.nom-app');
const prenomApp=document.querySelector('.prenom-app ');
const niveauApp=document.querySelector('.les-niveau-app');
const biographieApp=document.querySelector('.bioApp');
const compteurMotSaisie=document.querySelector('#mot-saisie')
const progressMotSaisie=document.querySelector('#progressChar');
const restantDeMoSaisie=document.querySelector('#restant-saisie');
const buttonAjouterApp=document.querySelector('.ajouter-app');
const formulaireAddApp=document.querySelector('form');

const displayError=document.querySelector('.error-message')

const buttonModifier=document.querySelector('.modifer-app');

const modifierData=document.querySelector('#modifer-data');

const saveData=document.querySelector('#save-data');

const competenceMaquette=document.querySelector('.la-comptence-mquette');
const comptenceUserStatiqueAdaptable=document.querySelector('.la-comptence-user-statique');
const comptenceUserDynamique=document.querySelector('.la-comptence-user-dynamique');
const comptenceUserGestionContenu=document.querySelector('.la-comptence-user-gestion-contenu');
const comptenceCreateDb=document.querySelector('.la-comptence-cree-db');
const comptenceComposantAcces=document.querySelector('.la-comptence-composant-accees');
const comptenceDevlopperBackend=document.querySelector('.la-comptence-developper-backend');
const comptenceComposantAplication=document.querySelector('.la-comptence-composant-application');
//esseye

function createListeApprenant(list){

    let ButtonSupprimer="id_btnSupprime"+list.id;
    let ButtonModifier="id_btnModifier"+list.id;
    let ButtonDetail="id_btnDetail"+list.id;
    // console.log(ButtonSupprimer,ButtonModifier,ButtonDetail);

    listeApprenant.insertAdjacentHTML("beforeend",
    `
        <div class="carte-list-apprenant mb-5 mx-3" id="">
            <div class="avatar-app">
                <img src="./images/${list.photo}" alt="" style="height: 60%; width: 60%; border-radius:15px"> 
            </div>
            <div class="column">
                <div class="nom-prenom-app">
                    <h6 class="nom-app mx-2">${list.nom}</h6>
                    <h6 class="prenom-app mx-2">${list.prenoms}</h6>
                    <div class="btn-delet-edit">
                        <a href=""><i id="${ButtonModifier}" class="bi bi-pencil-fill mx-3" style="font-size: 1.5rem;" data-bs-toggle="modal" data-bs-target="#add"></i></a>
                        <a href=""><i id="${ButtonSupprimer}" class="bi bi-trash-fill mx-3" style="font-size: 1.5rem; color: #ce0033;"></i></a>
                        <a href=""><i id="${ButtonDetail}" class="bi bi-eye-fill mx-3" style="font-size: 2rem; color: primary;"data-bs-toggle="modal" data-bs-target="#detailApp"></i></a>
                    </div> 
                </div>
                <p>${list.biographie}</p>
                <h4 class="text-end mx-4">${list.niveau}</h4>
            </div>                       
        </div>
    `)

    //Je recupere les dom des button modif supprim et detail
    const btnSuprimer=document.querySelector('#'+ButtonSupprimer);
    // console.log(btnSuprimer);
    btnSuprimer.addEventListener('click',(e)=>{
        e.preventDefault();
        fetch(URL_API+"?id=eq."+list.id,{
            method : "DELETE",
            headers : {
                apikey:API_KEY,
                "Content-Type": "application/json", 
                Prefer: "return=representation"
            }
        })
        .then((respons)=>respons.json())
        .then((data)=>{
            // console.log(data);
            location.reload();
        })
        
    })

    //Update btn
    const btnModifier=document.querySelector('#'+ButtonModifier);
    const testNom=document.querySelector('#recupId');
    const inchang=document.querySelector('#test');
    const containerModif=document.querySelector('.form-container');
    // console.log(containerModif);
    btnModifier.addEventListener('click',(e)=>{
        e.preventDefault();
            //Je recupere d'abord l'element complet a modifier
        fetch(URL_API+"?id=eq."+list.id,{
            method:"GET",
            headers:{
                apikey:API_KEY,
                "Content-Type": "application/json",
                Prefer:"return=representation"
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            // const indexElement=ApprenantsData.indexOf(carte);
            identifiant.value=list.id;
            nomApp.value=list.nom
            prenomApp.value=list.prenoms;
            // photoApp.value=list.photo;
            niveauApp.value=list.niveau;
            biographieApp.value=list.biographie;
            competenceMaquette.value=list.competenceMaquette;
            comptenceUserStatiqueAdaptable.value=list.competenceUserInterface;
            comptenceUserDynamique.value=list.competenceUserInterfaceDynamique;
            comptenceUserGestionContenu.value=list.competenceGestionContenu;
            comptenceCreateDb.value=list.competenceCreationDb;
            comptenceComposantAcces.value=list.competenceAccesAuxDonnee;
            comptenceDevlopperBackend.value=list.competenceDevelopperBkend;
            comptenceComposantAplication.value=list.competenceEnApplicationContenu;
        })
    })

    const formModif=document.querySelector('form');
    formModif.addEventListener('submit',(e)=>{
        e.preventDefault();
        fetch(URL_API+"?id=eq."+identifiant.value,{
            method:"PATCH",
            headers:{
                apikey:API_KEY,
                "Content-Type": "application/json",
                Prefer:"return=representation"
            },
            body:JSON.stringify({
                                "nom":nomApp.value,
                                "prenoms":prenomApp.value,
                                "niveau":niveauApp.value,
                                // "photo":photoApp.value,
                                "biographie":biographieApp.value,
                                "competenceMaquette":competenceMaquette.value,
                                "competenceUserInterface":comptenceUserStatiqueAdaptable.value,
                                "competenceUserInterfaceDynamique":comptenceUserDynamique.value,
                                "competenceGestionContenu":comptenceUserGestionContenu.value,
                                "competenceCreationDb":comptenceCreateDb.value,
                                "competenceAccesAuxDonnee":comptenceComposantAcces.value,
                                "competenceDevelopperBkend":comptenceDevlopperBackend.value,
                                "competenceEnApplicationContenu":comptenceComposantAplication.value
                                })
        })
        .then((response)=>response.json())
        .then((data)=>{
            window.location.reload();
            removeChamp();
        })
    })

    //La partie detail
    const btnDetail=document.querySelector('#'+ButtonDetail);
    btnDetail.addEventListener('click',(e)=>{
        e.preventDefault();
        //Je recupere d'abord l'element complet a modifier
        fetch(URL_API+"?id=eq."+list.id,{
            method:"GET",
            headers:{
                apikey:API_KEY,
                "Content-Type": "application/json",
                Prefer:"return=representation"
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            const champNomPrenom=document.querySelector('.app-name');
            const champNiveau=document.querySelector('.app-niveau');
            const imageApp=document.querySelector('#image-app');
            const chmpBio=document.querySelector('.champ-bio');
            
            if(list.niveau==="Bien"){
                champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                champNiveau.innerHTML=list.niveau;
                imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                chmpBio.innerHTML=list.biographie;
            }else if(list.niveau==="Assez Bien"){
                champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                champNiveau.innerHTML="Niveau: "+list.niveau;
                imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                chmpBio.innerHTML=list.biographie;
            }
        })
    })   
}

window.addEventListener('DOMContentLoaded',(e)=>{
    fetch(URL_API,{
        method:"GET",
        headers:{
            apikey:API_KEY,
            "Content-Type": "application/json", 
        }
    })
    .then((response)=>response.json())
    .then((data)=>{
        data.forEach((list) => {
            createListeApprenant(list);
        });
    })
});

function removeChamp(){
    nomApp.value="";
    prenomApp.value="";
    niveauApp.value="";
    biographieApp.value="";
    // photoApp.value="";
    competenceMaquette.value="";
    comptenceUserStatiqueAdaptable.value="";
    comptenceUserDynamique.value="";
    comptenceUserGestionContenu.value="";
    comptenceCreateDb.value="";
    comptenceComposantAcces.value="";
    comptenceDevlopperBackend.value="";
    comptenceComposantAplication.value="";

}

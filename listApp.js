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
//Dom statistique
const champNomPrenom=document.querySelector('.app-name');
const champNiveau=document.querySelector('.app-niveau');
const imageApp=document.querySelector('#image-app');
const chmpBio=document.querySelector('.champ-bio');
const maqute=document.querySelector('#maquette');
const progressBar=document.querySelectorAll('.progress-bar');
const userIterfaceStic=document.querySelector('#userInterfaceStatique');
const prgressGestionContenu=document.querySelector('#gestionContenu');
const progressBd=document.querySelector('#gestionBD');
const prgressEcommerce=document.querySelector('#gestion-e-commerce');
const progressBackend=document.querySelector('#developper-back-end');
const progressComposantAcceesDonnees=document.querySelector('#composant-access-donnees');
const progressUserInterfaceDynamique=document.querySelector('#interface-dynamique');

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
            const gestionMauette=list.competenceMaquette;
            switch(gestionMauette){
                case "Débutant":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    maqute.classList.add('debutatn');
                    maqute.classList.remove('intermediare')
                    maqute.classList.remove('avance')
                    maqute.classList.remove('expert')
                    maqute.classList.remove('deafult')
                    // userIterfaceStic.classList.add('debutatn');
                break;
                case "Intermediaire":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    maqute.classList.remove('debutatn');
                    maqute.classList.add('intermediare')
                    maqute.classList.remove('avance')
                    maqute.classList.remove('expert')
                    maqute.classList.remove('deafult')
                    // userIterfaceStic.classList.add('intermediare');
                break;
                case "Avancée":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    maqute.classList.remove('debutatn');
                    maqute.classList.remove('intermediare')
                    maqute.classList.add('avance')
                    maqute.classList.remove('expert')
                    maqute.classList.remove('deafult')
                    // userIterfaceStic.classList.add('intermediare');
                break;
                case "Expert":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    maqute.classList.remove('debutatn');
                    maqute.classList.remove('intermediare')
                    maqute.classList.remove('avance')
                    maqute.classList.add('expert')
                    maqute.classList.remove('deafult')
                    // userIterfaceStic.classList.add('intermediare');deafult
                break;
                default:
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    maqute.classList.add('deafult')
            }
            const comptenceUX=list.competenceUserInterface;
            switch(comptenceUX){
                case "Débutant":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    userIterfaceStic.classList.add('debutatn');
                    userIterfaceStic.classList.remove('intermediare')
                    userIterfaceStic.classList.remove('avance')
                    userIterfaceStic.classList.remove('expert')
                    userIterfaceStic.classList.remove('deafult')
                break;
                case "Intermediaire":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    userIterfaceStic.classList.remove('debutatn');
                    userIterfaceStic.classList.add('intermediare')
                    userIterfaceStic.classList.remove('avance')
                    userIterfaceStic.classList.remove('expert')
                    userIterfaceStic.classList.remove('deafult')
                break;
                case "Avancée":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    userIterfaceStic.classList.remove('debutatn');
                    userIterfaceStic.classList.remove('intermediare')
                    userIterfaceStic.classList.add('avance')
                    userIterfaceStic.classList.remove('expert')
                    userIterfaceStic.classList.remove('deafult')
                break;
                case "Expert":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    userIterfaceStic.classList.remove('debutatn');
                    userIterfaceStic.classList.remove('intermediare')
                    userIterfaceStic.classList.remove('avance')
                    userIterfaceStic.classList.add('expert')
                    userIterfaceStic.classList.remove('deafult')
                break;
                default:
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    userIterfaceStic.classList.add('deafult')
            }
            const gestionContenu=list.competenceGestionContenu;
            switch(gestionContenu){
                case "Débutant":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    prgressGestionContenu.classList.add('debutatn');
                    prgressGestionContenu.classList.remove('intermediare')
                    prgressGestionContenu.classList.remove('avance')
                    prgressGestionContenu.classList.remove('expert')
                    prgressGestionContenu.classList.remove('deafult')
                break;
                case "Intermediaire":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    prgressGestionContenu.classList.add('intermediare');
                    prgressGestionContenu.classList.remove('debutatn')
                    prgressGestionContenu.classList.remove('avance')
                    prgressGestionContenu.classList.remove('expert')
                    prgressGestionContenu.classList.remove('deafult')
                break;
                case "Avancée":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    prgressGestionContenu.classList.remove('intermediare');
                    prgressGestionContenu.classList.remove('debutatn')
                    prgressGestionContenu.classList.add('avance')
                    prgressGestionContenu.classList.remove('expert')
                    prgressGestionContenu.classList.remove('deafult')
                break;
                case "Expert":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    prgressGestionContenu.classList.remove('intermediare');
                    prgressGestionContenu.classList.remove('debutatn')
                    prgressGestionContenu.classList.remove('avance')
                    prgressGestionContenu.classList.add('expert')
                    prgressGestionContenu.classList.remove('deafult')
                break;
                default:
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    prgressGestionContenu.classList.add('deafult')
            }
            const gestionBaseDoneees=list.competenceCreationDb;
            switch(gestionBaseDoneees){
                case "Débutant":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    progressBd.classList.add('debutatn');
                    progressBd.classList.remove('intermediare')
                    progressBd.classList.remove('avance')
                    progressBd.classList.remove('expert')
                    progressBd.classList.remove('deafult')
                break;
                case "Intermediaire":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    progressBd.classList.remove('debutatn');
                    progressBd.classList.add('intermediare')
                    progressBd.classList.remove('avance')
                    progressBd.classList.remove('expert')
                    progressBd.classList.remove('deafult')
                break;
                case "Avancée":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    progressBd.classList.remove('debutatn');
                    progressBd.classList.remove('intermediare')
                    progressBd.classList.add('avance')
                    progressBd.classList.remove('expert')
                    progressBd.classList.remove('deafult')
                break;
                case "Expert":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    progressBd.classList.remove('debutatn');
                    progressBd.classList.remove('intermediare')
                    progressBd.classList.remove('avance')
                    progressBd.classList.add('expert')
                    progressBd.classList.remove('deafult')
                break;
                default:
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    progressBd.classList.add('deafult')
            }
            const gestionEcommerce=list.competenceEnApplicationContenu;
            switch(gestionEcommerce){
                case "Débutant":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    prgressEcommerce.classList.add('debutatn');
                    prgressEcommerce.classList.remove('intermediare')
                    prgressEcommerce.classList.remove('avance')
                    prgressEcommerce.classList.remove('expert')
                    prgressEcommerce.classList.remove('deafult')
                break;
                case "Intermediaire":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    prgressEcommerce.classList.remove('debutatn');
                    prgressEcommerce.classList.add('intermediare')
                    prgressEcommerce.classList.remove('avance')
                    prgressEcommerce.classList.remove('expert')  
                    prgressEcommerce.classList.remove('deafult')  
                break;
                case "Avancée":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    prgressEcommerce.classList.remove('debutatn');
                    prgressEcommerce.classList.remove('intermediare')
                    prgressEcommerce.classList.add('avance')
                    prgressEcommerce.classList.remove('expert')
                    prgressEcommerce.classList.remove('deafult')
                break;
                case "Expert":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    prgressEcommerce.classList.remove('debutatn');
                    prgressEcommerce.classList.remove('intermediare')
                    prgressEcommerce.classList.remove('avance')
                    prgressEcommerce.classList.add('expert')
                    prgressEcommerce.classList.remove('deafult')
                break;
                default:
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    prgressEcommerce.classList.add('deafult')
            }
            const gestionBackend=list.competenceDevelopperBkend;
            switch(gestionBackend){
                case "Débutant":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    progressBackend.classList.add('debutatn');
                    progressBackend.classList.remove('intermediare')
                    progressBackend.classList.remove('avance')
                    progressBackend.classList.remove('expert')
                    progressBackend.classList.remove('deafult')
                break;
                case "Intermediaire":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    progressBackend.classList.remove('debutatn');
                    progressBackend.classList.add('intermediare')
                    progressBackend.classList.remove('avance')
                    progressBackend.classList.remove('expert')
                    progressBackend.classList.remove('deafult')
                break;
                case "Avancée":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    progressBackend.classList.remove('debutatn');
                    progressBackend.classList.remove('intermediare')
                    progressBackend.classList.add('avance')
                    progressBackend.classList.remove('expert')
                    progressBackend.classList.remove('deafult')
                break;
                case "Expert":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    progressBackend.classList.remove('debutatn');
                    progressBackend.classList.remove('intermediare')
                    progressBackend.classList.remove('avance')
                    progressBackend.classList.add('expert')
                    progressBackend.classList.remove('deafult')
                break;
                default:
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    progressBackend.classList.add('deafult')
            }
            const gestionComposantAcessDonnee=list.competenceAccesAuxDonnee;
            switch(gestionComposantAcessDonnee){
                case "Débutant":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    progressComposantAcceesDonnees.classList.add('debutatn');
                    progressComposantAcceesDonnees.classList.remove('intermediare')
                    progressComposantAcceesDonnees.classList.remove('avance')
                    progressComposantAcceesDonnees.classList.remove('expert')
                    progressComposantAcceesDonnees.classList.remove('deafult')
                break;
                case "Intermediaire":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    progressComposantAcceesDonnees.classList.remove('debutatn');
                    progressComposantAcceesDonnees.classList.add('intermediare')
                    progressComposantAcceesDonnees.classList.remove('avance')
                    progressComposantAcceesDonnees.classList.remove('expert')
                    progressComposantAcceesDonnees.classList.remove('deafult')
                break;
                case "Avancée":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    progressComposantAcceesDonnees.classList.remove('debutatn');
                    progressComposantAcceesDonnees.classList.remove('intermediare')
                    progressComposantAcceesDonnees.classList.add('avance')
                    progressComposantAcceesDonnees.classList.remove('expert')
                    progressComposantAcceesDonnees.classList.remove('deafult')
                break;
                case "Expert":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    progressComposantAcceesDonnees.classList.remove('debutatn');
                    progressComposantAcceesDonnees.classList.remove('intermediare')
                    progressComposantAcceesDonnees.classList.remove('avance')
                    progressComposantAcceesDonnees.classList.add('expert')
                    progressComposantAcceesDonnees.classList.remove('deafult')
                break;
                default:
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    progressComposantAcceesDonnees.classList.add('deafult')
            }
            const gestionUserInterfaceDynamique=list.competenceUserInterfaceDynamique;
            switch(gestionUserInterfaceDynamique){
                case "Débutant":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    progressUserInterfaceDynamique.classList.add('debutatn');
                    progressUserInterfaceDynamique.classList.remove('intermediare')
                    progressUserInterfaceDynamique.classList.remove('avance')
                    progressUserInterfaceDynamique.classList.remove('expert')
                    progressUserInterfaceDynamique.classList.remove('deafult')
                break;
                case "Intermediaire":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    progressUserInterfaceDynamique.classList.remove('debutatn');
                    progressUserInterfaceDynamique.classList.add('intermediare')
                    progressUserInterfaceDynamique.classList.remove('avance')
                    progressUserInterfaceDynamique.classList.remove('expert')
                    progressUserInterfaceDynamique.classList.remove('deafult')
                break;
                case "Avancée":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    progressUserInterfaceDynamique.classList.remove('debutatn');
                    progressUserInterfaceDynamique.classList.remove('intermediare')
                    progressUserInterfaceDynamique.classList.add('avance')
                    progressUserInterfaceDynamique.classList.remove('expert')
                    progressUserInterfaceDynamique.classList.remove('deafult')
                break;
                case "Expert":
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    progressUserInterfaceDynamique.classList.remove('debutatn');
                    progressUserInterfaceDynamique.classList.remove('intermediare')
                    progressUserInterfaceDynamique.classList.remove('avance')
                    progressUserInterfaceDynamique.classList.add('expert')
                    progressUserInterfaceDynamique.classList.remove('deafult')
                break;
                default:
                    champNomPrenom.innerHTML=list.prenoms+" "+list.nom;
                    champNiveau.innerHTML="Niveau: "+list.niveau;
                    imageApp.innerHTML=`<img src="./images/${list.photo}" alt="" style="height: 100%; width: 100%; border-radius:100%">`
                    chmpBio.innerHTML=list.biographie;
                    progressUserInterfaceDynamique.classList.add('deafult')
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
    photoApp.value="";
    competenceMaquette.value="";
    comptenceUserStatiqueAdaptable.value="";
    comptenceUserDynamique.value="";
    comptenceUserGestionContenu.value="";
    comptenceCreateDb.value="";
    comptenceComposantAcces.value="";
    comptenceDevlopperBackend.value="";
    comptenceComposantAplication.value="";

}

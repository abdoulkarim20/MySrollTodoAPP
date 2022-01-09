const URL_API="https://eunurtstlwiselpnhdlx.supabase.co/rest/v1/Apprenant";
const API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDY4ODAyNCwiZXhwIjoxOTU2MjY0MDI0fQ.TmCrjrlgP1Eos7T1RFWTm2xZTwhIognYalzkL1ZFhoo";
const ApprenantsData=[]

const section1=document.querySelector('.formulaire-p1');
const section2=document.querySelector('.section-liste');
// section2.remove();
const listeSection=document.querySelector('#liste-section');
listeSection.addEventListener('click',(e)=>{
    e.preventDefault();
    section1.remove();
    // section2.add();
    section2.classList.add('section-liste-visible');

})

//Recuperation des dom de la carte
const containerCarte=document.querySelector('.charge-cartes')

// const identifiant=document.querySelector('#id-datas');
// console.log(identifiant);
// console.log(containerCarte);

const photoApp=document.querySelector('#photo-app');
// console.log(photoApp);

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
// console.log(comptenceComposantAplication,comptenceDevlopperBackend,comptenceComposantAcces);


// console.log(modifierData);
// console.log(nomApp,prenomApp,niveauApp,
//     biographieApp,progressMotSaisie,restantDeMoSaisie,
//     compteurMotSaisie,formulaireAddApp,buttonAjouterApp);


//Ajout dans la base de donner
formulaireAddApp.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(nomApp.value.trim()===""){
        nomApp.classList.add('error');
        // displayError.textContent="Le nom ne doit pas etre vide"
        displayError.style.color="#ce0033";
    }else if(prenomApp.value.trim()===""){
        prenomApp.classList.add('error');
        // displayError.textContent="Le prenom ne doit pas etre vide"
        displayError.style.color="#ce0033";   
    }else if(niveauApp.value.trim()===""){
        niveauApp.classList.add('error');
        // displayError.textContent="Le niveau ne doit pas etre vide"
        displayError.style.color="#ce0033";  
    }else if(biographieApp.value.trim()===""){
        biographieApp.classList.add('error');
        // displayError.textContent="La biographie ne doit pas etre vide"
        displayError.style.color="#ce0033";  
    }else if(photoApp.value.trim()===""){
        photoApp.classList.add('error');
        displayError.style.color="#ce0033"; 
    }else if(identifiant.value==''){
        const newApprenants={
            id:Date.now(),
            nom:nomApp.value,
            prenoms:prenomApp.value,
            photo:photoApp.files[0].name,
            niveau:niveauApp.value,
            biographie:biographieApp.value,
            competenceMaquette:competenceMaquette.value,
            competenceUserInterface:comptenceUserStatiqueAdaptable.value,
            competenceUserInterfaceDynamique:comptenceUserDynamique.value,
            competenceGestionContenu:comptenceUserGestionContenu.value,
            competenceCreationDb:comptenceCreateDb.value,
            competenceAccesAuxDonnee:comptenceComposantAcces.value,
            competenceDevelopperBkend:comptenceDevlopperBackend.value,
            competenceEnApplicationContenu:comptenceComposantAplication.value
        }
        createCarte(newApprenants);
        ApprenantsData.push(newApprenants);
        console.log(ApprenantsData);
        removeChamp();
       
        // console.log(identifiant.value);
    }else{
        const dataEdit={
            id:Date.now(),
            nom:nomApp.value,
            prenoms:prenomApp.value,
            photo:photoApp.files[0].name,
            niveau:niveauApp.value,
            biographie:biographieApp.value,
            competenceMaquette:competenceMaquette.value,
            competenceUserInterface:comptenceUserStatiqueAdaptable.value,
            competenceUserInterfaceDynamique:comptenceUserDynamique.value,
            competenceGestionContenu:comptenceUserGestionContenu.value,
            competenceCreationDb:comptenceCreateDb.value,
            competenceAccesAuxDonnee:comptenceComposantAcces.value,
            competenceDevelopperBkend:comptenceDevlopperBackend.value,
            competenceEnApplicationContenu:comptenceComposantAplication.value
        }
        ApprenantsData.splice(identifiant.value,1,dataEdit)
        containerCarte.innerHTML="";
        ApprenantsData.forEach(carte=>{
            createCarte(carte);
        })
        identifiant.value='';
        console.log(ApprenantsData);
        removeChamp();
    }
})



//Je vais faire le control de saisie sur le champs message
biographieApp.addEventListener('input',(e)=>{
    let longueurMaxSaisie=130;
    let longueurMot=biographieApp.value.length;
    let leReste=longueurMaxSaisie-longueurMot;
    progressMotSaisie.textContent=longueurMot;
    restantDeMoSaisie.textContent="Il vous reste " +leReste+ " Caracteres";
    if(leReste<0){
        restantDeMoSaisie.textContent="Vous avez depasser le nombre de mots";
        buttonAjouterApp.disable=true;
        compteurMotSaisie.style.color="#ce0033";
    }else if(leReste<=16){
        buttonAjouterApp.disable=false;
        compteurMotSaisie.style.color="yellow";

    }else{
        compteurMotSaisie.style.color="#000000"
        buttonAjouterApp.disabled = false;
    }
})
// console.log(ApprenantsData);


//Creation d'une carte.




//Creation d'une carte qui me permet de d'ajouter en html dynamiquement
function createCarte(carte){
    //Je vais recupere id de la carte
    let idCarte="id_carteAsuprimer"+carte.id;
    let idButtonSupprimer="id_btnSupprime"+carte.id;
    let idButtonModifier="id_btnModifier"+carte.id;
    // console.log(idCarte , idButtonSupprimer);
    containerCarte.insertAdjacentHTML("beforeend",
    `
        <div class="carte-resulat-apprenant" id="${idCarte}">
            <div class="avatar-app">
              
                <img src="./images/${carte.photo}" alt="" style="height: 70%; width: 70%; border-radius:100%">

            </div>
            <div class="column">
                <div class="nom-prenom-app">
                    <h6 class="nom-app mx-2">${carte.nom}</h6>
                    <h6 class="prenom-app mx-2">${carte.prenoms}</h6>
                    <div class="btn-delet-edit">
                        <a href=""><i id="${idButtonModifier}" class="bi bi-pencil-fill mx-3" style="font-size: 1.5rem;"></i></a>
                        <a href=""><i id="${idButtonSupprimer}" class="bi bi-x-circle mx-3" style="font-size: 1.5rem; color: #ce0033;"></i></a>
                    </div> 
                </div>
                <p>${carte.biographie}</p>
                <h4 class="text-end mx-4">${carte.niveau}</h4>
            </div>                       
        </div>
    `)

    //Le button qui va me permettre de supprimer
    const deleteBtn=document.querySelector('#'+idButtonSupprimer);
    const carteAsupprimer=document.querySelector('#'+idCarte);
    // console.log(deleteBtn,carteAsupprimer);
    deleteBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        
        const indexElement=ApprenantsData.indexOf(carte);
        // console.log(indexElement);
        // console.log(ApprenantsData);
        if(indexElement>-1){
            ApprenantsData.splice(indexElement,1);
            carteAsupprimer.remove();
            // console.log(arr);
            console.log(ApprenantsData);  
        }
    })

    //le button qui va me permettre de modifier;
    const editBtn=document.querySelector('#'+idButtonModifier);
    // console.log(editBtn);
    editBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        // alert("modifier");
        const indexElement=ApprenantsData.indexOf(carte);
        identifiant.value=indexElement;
        nomApp.value=ApprenantsData[indexElement].nom;
        prenomApp.value=ApprenantsData[indexElement].prenoms;
        // photoApp.value.name=ApprenantsData[indexElement].photo;
        niveauApp.value=ApprenantsData[indexElement].niveau;
        biographieApp.value=ApprenantsData[indexElement].biographie;
        competenceMaquette.value=ApprenantsData[indexElement].competenceMaquette;
        comptenceUserStatiqueAdaptable.value=ApprenantsData[indexElement].competenceUserInterface;
        comptenceUserDynamique.value=ApprenantsData[indexElement].competenceUserInterfaceDynamique;
        comptenceUserGestionContenu.value=ApprenantsData[indexElement].competenceGestionContenu;
        comptenceCreateDb.value=ApprenantsData[indexElement].competenceCreationDb;
        comptenceComposantAcces.value=ApprenantsData[indexElement].competenceAccesAuxDonnee;
        comptenceDevlopperBackend.value=ApprenantsData[indexElement].competenceDevelopperBkend;
        comptenceComposantAplication.value=ApprenantsData[indexElement].competenceEnApplicationContenu;
        // console.log(indexElement);
    })

}

saveData.addEventListener('click',(e)=>{
    //Je vais sauvegarder les data dans la base de donner
    ApprenantsData.forEach(apprenant=>{
        delete apprenant['id'];
        fetch(URL_API,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                apikey:API_KEY,
                Prefer: "return=representation" 
            },
            body:JSON.stringify(apprenant),
    
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data); 
            containerCarte.innerHTML=""; 
        })
    })
  
    ApprenantsData.splice(0,ApprenantsData.length);
    console.log(ApprenantsData);
    
    // console.log(ApprenantsData);
})




ApprenantsData.forEach((carte)=>createCarte(carte));

//Je cree une fonction pour vider les champs
function removeChamp(){
    nomApp.value="";
    prenomApp.value="";
    niveauApp.value="";
    photoApp.value="";
    biographieApp.value="";
    competenceMaquette.value="";
    comptenceUserStatiqueAdaptable.value="";
    comptenceUserDynamique.value="";
    comptenceUserGestionContenu.value="";
    comptenceCreateDb.value="";
    comptenceComposantAcces.value="";
    comptenceDevlopperBackend.value="";
    comptenceComposantAplication.value="";

}




const editNom=document.querySelector('.edit-nom ');
const editPrenom=document.querySelector('.edit-prenom');
const editNiveau=document.querySelector('.eidt-niveau');
const editCompetanceMaquette=document.querySelector('.edit-comptence-mquette');
const editCompetanceUserStatique=document.querySelector('.edit-comptence-user-statique');
const editCompetanceUserDynamique=document.querySelector('.edit-comptence-user-dynamique');
const editGestionContenu=document.querySelector('.eidt-comptence-user-gestion-contenu');
const editCreationDb=document.querySelector('.edit-comptence-cree-db');
const editCompetenceAccesDonnees=document.querySelector('.eidt-comptence-composant-accees');
const editCompetanceDevelopperBack=document.querySelector('.edit-comptence-developper-backend');
const editComposantApplication=document.querySelector('.edit-comptence-composant-application');
const editBiographie=document.querySelector('.eidt-bioApp ');






//Js liste
const btnMofication=document.querySelector('#modifcation-apprenant');
const listeApprenant=document.querySelector('.charge-liste-apprenanat');
//esseye
const identifiant=document.querySelector('#id-datas');
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
                <img src="./images/${list.photo}" alt="" style="height: 60%; width: 60%; border-radius:100%"> 
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
            editNom.value=list.nom
            editPrenom.value=list.prenoms;
            // photoApp.value=list.photo;
            editNiveau.value=list.niveau;
            editBiographie.value=list.biographie;
            editCompetanceMaquette.value=list.competenceMaquette;
            editCompetanceUserStatique.value=list.competenceUserInterface;
            editCompetanceUserDynamique.value=list.competenceUserInterfaceDynamique;
            editGestionContenu.value=list.competenceGestionContenu;
            editCreationDb.value=list.competenceCreationDb;
            editCompetenceAccesDonnees.value=list.competenceAccesAuxDonnee;
            editCompetanceDevelopperBack.value=list.competenceDevelopperBkend;
            editComposantApplication.value=list.competenceEnApplicationContenu;
        })
    })

    const formModif=document.querySelector('#btn-edit');
    formModif.addEventListener('click',(e)=>{
        e.preventDefault();
        fetch(URL_API+"?id=eq."+identifiant.value,{
            method:"PATCH",
            headers:{
                apikey:API_KEY,
                "Content-Type": "application/json",
                Prefer:"return=representation"
            },
            body:JSON.stringify({
                                "nom":editNom.value,
                                "prenoms":editPrenom.value,
                                "niveau":editNiveau.value,
                                // "photo":photoApp.value,
                                "biographie":editBiographie.value,
                                "competenceMaquette":editCompetanceMaquette.value,
                                "competenceUserInterface":editCompetanceUserStatique.value,
                                "competenceUserInterfaceDynamique":editCompetanceUserDynamique.value,
                                "competenceGestionContenu":editGestionContenu.value,
                                "competenceCreationDb":editCreationDb.value,
                                "competenceAccesAuxDonnee":editCompetenceAccesDonnees.value,
                                "competenceDevelopperBkend":editCompetanceDevelopperBack.value,
                                "competenceEnApplicationContenu":editComposantApplication.value
                                })
        })
        .then((response)=>response.json())
        .then((data)=>{
            // console.log(data);
            // window.location.reload();
            // removeChamp();
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


//fin js liste






























































































//Je cree une function qui va me valider les champs
// function setError(champName, message){
//     displayError.textContent=message;
//     const champControl=element.parentElement;
//     champControl.classList.add('error');
//     champControl.classList.remove('succees');
// }
// function setSuccess(){
//     displayError.textContent="";
//     const champControl=element.parentElement;
//     champControl.classList.add('succees');
//     champControl.classList.remove('error');
// }


// function valideChamps(){
//     let champNom=nomApp.value.trim();
//     let champPrenom=prenomApp.value.trim();
//     let champNiveau=niveauApp.value.trim();
//     let champBiographie=biographieApp.value.trim();

//     if(champNom===""){
//         setError(champNom,"ok nom")
//     }else{
//         setSuccess();
//     }
// }
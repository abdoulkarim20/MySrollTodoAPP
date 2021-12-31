const URL_API="https://eunurtstlwiselpnhdlx.supabase.co/rest/v1/Apprenant";
const API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDY4ODAyNCwiZXhwIjoxOTU2MjY0MDI0fQ.TmCrjrlgP1Eos7T1RFWTm2xZTwhIognYalzkL1ZFhoo";
const ApprenantsData=[]

//Recuperation des dom de la carte
const containerCarte=document.querySelector('.charge-cartes')

const identifiant=document.querySelector('#id-datas');
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
              
                <img src="./images/${carte.photo}" alt="" style="height: 70%; width: 70%; border-radius:15px">

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
        console.log(indexElement);
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
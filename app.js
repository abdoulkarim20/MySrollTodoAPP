const ApprenantsData=[]

//Recuperation des dom de la carte
const containerCarte=document.querySelector('.charge-cartes')
// console.log(containerCarte);

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
// console.log(nomApp,prenomApp,niveauApp,
//     biographieApp,progressMotSaisie,restantDeMoSaisie,
//     compteurMotSaisie,formulaireAddApp,buttonAjouterApp);

//Je cree une fonction pour vider les champs
function removeChamp(){
    nomApp.value="";
    prenomApp.value="";
    niveauApp.value="";
    biographieApp.value="";

}

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
    }else{
        const newApprenants={
            id:Date.now(),
            nom:nomApp.value,
            prenoms:prenomApp.value,
            niveau:niveauApp.value,
            biographie:biographieApp.value
        }
        ApprenantsData.push(newApprenants);
        console.log(ApprenantsData);
        createCarte(newApprenants);
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
    console.log(idCarte , idButtonSupprimer);
    containerCarte.insertAdjacentHTML("beforeend",
    `
        <div class="carte-resulat-apprenant" id="${idCarte}">
            <div class="avatar-app">
                <img src="images/image-app.png" alt="" style="height: 70%; width: 70%;">
                
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
        if(indexElement!==-1){
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

        nomApp.value=ApprenantsData[indexElement].nom;
        prenomApp.value=ApprenantsData[indexElement].prenoms;
        niveauApp.value=ApprenantsData[indexElement].niveau;
        biographieApp.value=ApprenantsData[indexElement].biographie;
        
        // console.log(ApprenantsData[indexElement].prenoms,
        //     ApprenantsData[indexElement].niveau,
        //     ApprenantsData[indexElement].biographie,
        //     ApprenantsData[indexElement].nom);
    })

}




ApprenantsData.forEach((carte)=>createCarte(carte));





































































































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
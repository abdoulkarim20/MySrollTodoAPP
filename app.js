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
// console.log(nomApp,prenomApp,niveauApp,
//     biographieApp,progressMotSaisie,restantDeMoSaisie,
//     compteurMotSaisie,formulaireAddApp,buttonAjouterApp);


//Je vais faire le control de saisie sur le champs message
biographieApp.addEventListener('input',(e)=>{
    let longueurMaxSaisie=130;
    let longueurMot=biographieApp.value.length;
    let leReste=longueurMaxSaisie-longueurMot;
    progressMotSaisie.textContent=longueurMot;
    restantDeMoSaisie.textContent="Il vous reste " +leReste+ " Caracteres";

})


//Creation d'une carte.

const ApprenantsData=[{
    id:1,
    nom:"abdoul Karim",
    prenoms:"DIALLO",
    niveau:"Tres Bien",
    biographie:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam eius dicta quos eligendi non eaque modi? Aliquam perspiciatis consequatur ullam, blanditiis vero illo, exercitationem dolores id, doloribus consequuntur rerum recusandae.",
}]


//Creation d'une carte qui me permet de d'ajouter en html dynamiquement
function createCarte(carte){
    containerCarte.insertAdjacentHTML("beforeend",
    `<div class="carte-resulat-apprenant">
    <div class="avatar-app">
        <img src="images/image-app.png" alt="" style="height: 70%; width: 70%;">
        
    </div>
    <div class="column">
        <div class="nom-prenom-app">
            <h4 class="nom-app mx-2">${carte.nom}</h4>
            <h4 class="prenom-app mx-2">${carte.prenoms}</h4>
            <div class="btn-delet-edit">
                <a href=""><i class="bi bi-pencil-fill mx-3" style="font-size: 1.5rem;"></i></a>
                <a href=""><i class="bi bi-x-circle mx-3" style="font-size: 1.5rem; color: #ce0033;"></i></a>
            </div> 
        </div>
        <p>${carte.biographie}</p>
        <h4 class="text-end mx-4">${carte.niveau}</h4>
    </div>                       
</div>`)}
ApprenantsData.forEach((carte)=>createCarte(carte));
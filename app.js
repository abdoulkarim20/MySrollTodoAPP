//Recuperation des dom
const containerCarte=document.querySelector('.charge-cartes')
console.log(containerCarte);


//Creation d'une carte.

const ApprenantsData=[{
    id:1,
    nom:"abdoul Karim",
    prenoms:"DIALLO",
    niveau:"Tres Bien",
    biographie:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam eius dicta quos eligendi non eaque modi? Aliquam perspiciatis consequatur ullam, blanditiis vero illo, exercitationem dolores id, doloribus consequuntur rerum recusandae.",
},
{
    id:2,
    nom:"abdoul Karim",
    prenoms:"DIALLO",
    niveau:"Bien",
    biographie:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam eius dicta quos eligendi non eaque modi? Aliquam perspiciatis consequatur ullam, blanditiis vero illo, exercitationem dolores id, doloribus consequuntur rerum recusandae.",
},
{
    id:3,
    nom:"abdoul Karim",
    prenoms:"DIALLO",
    niveau:"Assez Bien",
    biographie:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam eius dicta quos eligendi non eaque modi? Aliquam perspiciatis consequatur ullam, blanditiis vero illo, exercitationem dolores id, doloribus consequuntur rerum recusandae.",
},
{
    id:4,
    nom:"Rokhaya",
    prenoms:"GUEYE",
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
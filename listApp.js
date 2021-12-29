const URL_API="https://eunurtstlwiselpnhdlx.supabase.co/rest/v1/Apprenant";
const API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDY4ODAyNCwiZXhwIjoxOTU2MjY0MDI0fQ.TmCrjrlgP1Eos7T1RFWTm2xZTwhIognYalzkL1ZFhoo";
//Afficher les donner depuis la base de donnees
const listeApprenant=document.querySelector('.charge-liste-apprenanat');
console.log(listeApprenant);

function createListeApprenant(list){

    let ButtonSupprimer="id_btnSupprime"+list.id;
    let idButtonModifier="id_btnModifier"+list.id;

    listeApprenant.insertAdjacentHTML("beforeend",
    `
        <div class="carte-list-apprenant mb-5 mx-3" id="">
            <div class="avatar-app">
                <img src="images/image-app.png" alt="" style="height: 40%; width: 40%;">
                
            </div>
            <div class="column">
                <div class="nom-prenom-app">
                    <h6 class="nom-app mx-2">${list.nom}</h6>
                    <h6 class="prenom-app mx-2">${list.prenoms}</h6>
                    <div class="btn-delet-edit">
                        <a href=""><i id="" class="bi bi-pencil-fill mx-3" style="font-size: 1.5rem;"></i></a>
                        <a href=""><i id="" class="bi bi-x-circle mx-3" style="font-size: 1.5rem; color: #ce0033;"></i></a>
                        <a href=""><i id="" class="bi bi-eye-fill mx-3" style="font-size: 2rem; color: #ce0033;"></i></a>
                    </div> 
                </div>
                <p>${list.biographie}</p>
                <h4 class="text-end mx-4">${list.niveau}</h4>
            </div>                       
        </div>
    `)
}
window.addEventListener('DOMContentLoaded',(e)=>{
    fetch(URL_API,{
        method:"GET",
        headers:{
            apikey:API_KEY,
            "Content-Type": "application/json", 
        }
    }).then((response)=>response.json())
    .then((data)=>{
        data.forEach((list) => {
            createListeApprenant(list);
        });
    })
});



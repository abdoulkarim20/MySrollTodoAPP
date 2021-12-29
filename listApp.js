const URL_API="https://eunurtstlwiselpnhdlx.supabase.co/rest/v1/Apprenant";
const API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDY4ODAyNCwiZXhwIjoxOTU2MjY0MDI0fQ.TmCrjrlgP1Eos7T1RFWTm2xZTwhIognYalzkL1ZFhoo";
//Afficher les donner depuis la base de donnees
const listeApprenant=document.querySelector('.charge-liste-apprenanat');
// console.log(listeApprenant);

function createListeApprenant(list){

    let ButtonSupprimer="id_btnSupprime"+list.id;
    let ButtonModifier="id_btnModifier"+list.id;
    let ButtonDetail="id_btnDetail"+list.id;
    // console.log(ButtonSupprimer,ButtonModifier,ButtonDetail);

    listeApprenant.insertAdjacentHTML("beforeend",
    `
        <div class="carte-list-apprenant mb-5 mx-3" id="">
            <div class="avatar-app">
                <img src="images/image-app.png" alt="" style="height: 60%; width: 60%;">
                
            </div>
            <div class="column">
                <div class="nom-prenom-app">
                    <h6 class="nom-app mx-2">${list.nom}</h6>
                    <h6 class="prenom-app mx-2">${list.prenoms}</h6>
                    <div class="btn-delet-edit">
                        <a href=""><i id="${ButtonModifier}" class="bi bi-pencil-fill mx-3" style="font-size: 1.5rem;"></i></a>
                        <a href=""><i id="${ButtonSupprimer}" class="bi bi-x-circle mx-3 btn" style="font-size: 1.5rem; color: #ce0033;"></i></a>
                        <a href=""><i id="${ButtonDetail}" class="bi bi-eye-fill mx-3" style="font-size: 2rem; color: #ce0033;"></i></a>
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
            console.log(data);
        })
    })

    //Update btn
    const btnModifier=document.querySelector('#'+ButtonModifier);
    console.log(list.nom, list.prenoms, list.id ,list.niveau, list.biographie, list.competenceMaquette)
    btnModifier.addEventListener('click',(e)=>{
        e.preventDefault();
        fetch(URL_API+"?id=eq."+list.id,{
            method:"PATCH",
            headers:{
                apikey:API_KEY,
                "Content-Type": "application/json",
                Prefer:"return=representation"
            },
            body:JSON.stringify({"nom":"test","prenoms":"Abdul Karim DIALLO","niveau":"Bien","biographie":"Je suis entrain d'apprendre javascript","competenceMaquette":"Bien"})
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
        })
    });
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



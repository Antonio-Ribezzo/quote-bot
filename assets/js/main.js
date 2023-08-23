// VARIABILI
const API_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-3.5-turbo";
const API_KEY = "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";
const modale = document.querySelector(".modale");



// FUNCTIONS
async function playCharacter(nameCharacter){
    console.log(nameCharacter)
    // 1. Mostrare il loader
    const loader = document.querySelector(".loading");
    loader.classList.remove("d-none");
    // 2. Chiamare le API di Open AI
    const action = "Saluta nel tuo modo più iconico";
    const temperature = 0.7;
    // 3. Recuperare la risposta
    const response = await fetch(API_URL,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: MODEL,
            messages: [
                {
                    role: "user",
                    content: `Sei ${nameCharacter} e ${action} con un massimo di 100 caratteri senza mai uscire dal tuo personaggio`
                }
            ],
            temperature: temperature
        })
    })

    // 4. Interpretare la risposta in JSON
    const data = await response.json();
    // 5. Compilare la modale con i dati ricevuti 
    const message = data.choices[0].message.content;
    const modalContent = document.querySelector(".modale-content");
    modalContent.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <h2>${nameCharacter}</h2>
            <div class="modal-close d-flex justify-content-center align-items-center">
                <img src="./assets/img/close.svg" alt="close">
            </div>
        </div>
        <p class="mt-3">${message}</p>
        <code>Character: ${nameCharacter}, action: ${action}, temperature: ${temperature} </code>
    `;
    // 6. Nascondere il loader e mostrae la modale
    loader.classList.add("d-none");
    modale.classList.remove("d-none");

}





// INIT
const characters = document.querySelectorAll(".character");

characters.forEach(element => {
    element.addEventListener("click", function(){
        playCharacter(element.dataset.character);
    })
});

const modalClose = document.querySelector('.modal-close');
modalClose.addEventListener("click", function(){
    modale.classList.add("d-none");
});

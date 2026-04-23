
// Recupera riferimenti al Dom per inout text, bottone e div visualizzazione del messaggio

const chatHistoryEl = document.querySelector('#chat-history');
const sendMessageFormEl = document.querySelector('#send-message-form');
const userMessageInputEl = document.querySelector('#user-message');
const history = [
    { 
        "role": "user", 
        "content": "Ciao, che frutto ti piace?" 
    }
]; // qui pusheremo i messagg idi user e agent

// creare variabili con parametri necessari per la fetch a Claude

const headers = { // i primi tre parametri sono obbligatori, l'ultimo facoltativo
    "x-api-key": CLAUDE_API_KEY, // mia variabile API key
    "anthropic-version": "2023-06-01", // la seconda versione, va imparata cosi'
    "content-type": "application/json", // come vogliamo ricevere la risposta
    "anthropic-dangerous-direct-browser-access": "true" // consento accesso diretto al browser
}

const requestObj = { // elementi obbligatori per la fetch
    model: CLAUDE_MODEL, // quale modello, es "claude-haiku-4-5-20251001"
    max_tokens: 1024, // limite massimo di token nella risposta
    messages: history // questa variabile dove metteremo la cronologia msg
}

// con queste cose voglio fare la fetch

fetch (CLAUDE_API_URL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(requestObj)
})
.then (response => {
    if (!response.ok) {

        return response.json()
        .then(err => {throw err});
    } else {
        return response.json();
    }

})
.then (data => {
    console.log(data.content[0].text); // la risposta di Claude nellóggetto
    
})
.catch (error => {
    throw error 
});
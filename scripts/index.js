
// Recupera riferimenti al Dom per inout text, bottone e div visualizzazione del messaggio

const chatHistoryEl = document.querySelector('#chat-history');
const sendMessageFormEl = document.querySelector('#send-message-form');
const userMessageInputEl = document.querySelector('#user-message');
let history = []; // qui pusheremo i messagg idi user e agent





function chiediAClaudio(messaggio) {

    history.push({ // questo serve a mettere messaggio utente in cronologia
        role: 'user',
        content: messaggio
    })

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

    return fetch(CLAUDE_API_URL, {
        method: "POST",
        headers: headers,// la mia variabile di prima
        body: JSON.stringify(requestObj) // stringo la mia variabile sopra
    })
        .then(response => {
            if (!response.ok) {

                return response.json()
                    .then(err => { throw err });
            } else {
                return response.json();
            }

        })
        .then(data => {
            const rispostaClaudio = data.content[0].text; // la risposta di Claude nellóggetto
            history.push({
                role: 'assistant',
                content: rispostaClaudio
            })

            return rispostaClaudio
        })
        .catch(error => {
            throw error
        });

}

// funzione per stampare tutti i messaggi in pagina

function renderAllMessages() {
    chatHistoryEl.innerHTML = '';

    let chatHtmlString = '';
    for (const message of history) {

        chatHtmlString += `
            <p>${message.role === 'user' ? 'Io' : 'Claudio'}: ${message.content}</p>
        ` //bellissima elegantissima terna logica se user allora sono io altrimenti Claudio
    }

    chatHistoryEl.innerHTML = chatHtmlString;
}

// advebt listener al btn del text input

sendMessageFormEl.addEventListener('submit', event => {
    event.preventDefault();

    const messaggio = userMessageInputEl.value;

    // Svuota l'input dopo l'invio
    userMessageInputEl.value = '';

    chiediAClaudio(messaggio)
        .then(() => {
            renderAllMessages();
        })
        .catch(err => {
            alert("Errore nella chiamata a Claudio!");
        });
});

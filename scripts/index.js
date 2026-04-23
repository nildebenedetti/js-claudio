
// Recupera riferimenti al Dom per inout text, bottone e div visualizzazione del messaggio

const chatHistoryEl = document.querySelector('#chat-history');
const sendMessageFormEl = document.querySelector('#send-message-form');
const userMessageInputEl = document.querySelector('#user-message');

// creare variabili con parametri necessari per la fetch a Claude

const headers = {
    "x-api-key": CLAUDE_API_KEY, // mia variabile API key
    "anthropic-version": "2023-06-01", // la seconda versione, va imparata cosi'
    "content-type": "application/json", // come vogliamo ricevere la risposta
    "anthropic-dangerous-direct-browser-access": "true" // consento accesso diretto al browser
}



// ===== Lista de radios =====
const radios = [
    { name: "Radio Pudahuel", url: "https://envivo.pudahuel.cl/live.mp3" },
    { name: "Radio Imagina", url: "https://envivo.radioimagina.cl/live.mp3" },
    { name: "Radio ADN", url: "https://envivo.adnradio.cl/live.mp3" },
    { name: "Radio Bio Bio", url: "https://www.biobiochile.cl/media/audio/live.mp3" },
    { name: "Radio Cooperativa", url: "https://cooperativa.cl/media/audio/live.mp3" },
    { name: "Radio Futuro", url: "https://envivo.futuro.cl/live.mp3" },
    { name: "Radio Carolina", url: "https://carolina.cl/media/audio/live.mp3" },
    { name: "Radio Corazón", url: "https://envivo.corazon.cl/live.mp3" }
];

// ===== Proxy CORS =====
const corsProxy = "https://cors-anywhere.herokuapp.com/";

// ===== Variables =====
let currentIndex = 0;
const player = document.getElementById("radioPlayer");
const radioName = document.getElementById("radioName");

// ===== Función para cambiar radio =====
function changeRadio() {
    currentIndex = (currentIndex + 1) % radios.length;
    player.src = corsProxy + radios[currentIndex].url;
    radioName.textContent = radios[currentIndex].name;
}

// ===== Función para iniciar reproducción =====
function playRadio() {
    player.src = corsProxy + radios[currentIndex].url;
    player.play().catch(err => console.log("Error al reproducir:", err));
    radioName.textContent = radios[currentIndex].name;
}

// ===== Inicializar =====
document.getElementById("playRadio").addEventListener("click", playRadio);
document.getElementById("changeRadio").addEventListener("click", changeRadio);

radioName.textContent = radios[0].name;

// ===== Código del chat con Firebase =====
const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const sendChat = document.getElementById("sendChat");

function initChat() {
    const { ref, push, onChildAdded, database } = window.firebaseRefs;

    sendChat.addEventListener("click", () => {
        if (chatInput.value.trim() !== "") {
            push(ref(database, "messages"), {
                user: "Anónimo",
                text: chatInput.value,
                timestamp: Date.now()
            });
            chatInput.value = "";
        }
    });

    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendChat.click();
    });

    onChildAdded(ref(database, "messages"), (snapshot) => {
        const msg = snapshot.val();
        const div = document.createElement("div");
        div.textContent = `${msg.user}: ${msg.text}`;
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

setTimeout(initChat, 1000);

const toggleTheme = document.getElementById("toggleTheme");
toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
});

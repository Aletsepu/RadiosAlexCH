// ===== Lista de radios con proxy CORS =====
const radios = [
    { name: "Radio Pudahuel", url: "https://cors-anywhere.herokuapp.com/https://envivo.pudahuel.cl/live.mp3" },
    { name: "Radio Imagina", url: "https://cors-anywhere.herokuapp.com/https://envivo.radioimagina.cl/live.mp3" },
    { name: "Radio ADN", url: "https://cors-anywhere.herokuapp.com/https://envivo.adnradio.cl/live.mp3" },
    { name: "Radio Bio Bio", url: "https://cors-anywhere.herokuapp.com/https://www.biobiochile.cl/media/audio/live.mp3" },
    { name: "Radio Cooperativa", url: "https://cors-anywhere.herokuapp.com/https://cooperativa.cl/media/audio/live.mp3" },
    { name: "Radio Futuro", url: "https://cors-anywhere.herokuapp.com/https://envivo.futuro.cl/live.mp3" },
    { name: "Radio Carolina", url: "https://cors-anywhere.herokuapp.com/https://carolina.cl/media/audio/live.mp3" },
    { name: "Radio Corazón", url: "https://cors-anywhere.herokuapp.com/https://envivo.corazon.cl/live.mp3" }
];

// ===== Código de la radio =====
let currentIndex = 0;
const player = document.getElementById("radioPlayer");
const radioName = document.getElementById("radioName");

function changeRadio() {
    currentIndex = (currentIndex + 1) % radios.length;
    player.src = radios[currentIndex].url;
    player.play();
    radioName.textContent = radios[currentIndex].name;
}

player.src = radios[0].url;
radioName.textContent = radios[0].name;

document.getElementById("changeRadio").addEventListener("click", changeRadio);

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

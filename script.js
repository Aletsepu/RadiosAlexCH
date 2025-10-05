// ===== Lista de radios =====
const radios = [
    { name: "Radio Pudahuel", url: "https://envivo.pudahuel.cl/stream" },
    { name: "Radio Imagina", url: "https://streaming.radio.cl/imagina" },
    { name: "Radio ADN", url: "https://envivo.adnradio.cl/stream" },
    { name: "Radio Bio Bio", url: "https://streaming.biobiochile.cl/biobio" },
    { name: "Radio Cooperativa", url: "https://streaming.cooperativa.cl/cooperativa" },
    { name: "Radio Futuro", url: "https://streaming.radio.cl/futuro" },
    { name: "Radio Romántica", url: "https://streaming.radio.cl/romantica" },
    { name: "Radio Carolina", url: "https://streaming.radio.cl/carolina" },
    { name: "Radio Corazón", url: "https://streaming.radio.cl/corazon" },
    { name: "Radio Concierto", url: "https://streaming.radio.cl/concierto" }
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

// Esperar a que window.firebaseRefs exista
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

// Esperar a que Firebase esté listo
setTimeout(initChat, 1000);

const toggleTheme = document.getElementById("toggleTheme");

toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
});

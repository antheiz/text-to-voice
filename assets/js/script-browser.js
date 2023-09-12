const buttonVoice = document.getElementById('clickToSpeak')
const buttonListen = document.getElementById('startListening')
const voicesDropdown = document.getElementById('voices');

function populateVoices() {
    const voices = window.speechSynthesis.getVoices();
    voicesDropdown.innerHTML = voices
        .filter(voice => voice.lang.includes('id') || voice.lang.includes('en')) // Filter untuk Bahasa Indonesia dan English
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');
}

// Memuat daftar suara yang tersedia
window.speechSynthesis.onvoiceschanged = populateVoices;

// Panggil fungsi ini saat pertama kali memuat halaman untuk memastikan dropdown diisi
populateVoices();


function speakText() {
    const text = document.getElementById('textToSpeak').value;
    const selectedVoiceName = voicesDropdown.value;
    const selectedVoice = window.speechSynthesis.getVoices().find(voice => voice.name === selectedVoiceName);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    window.speechSynthesis.speak(utterance);
}

function startListenBrowser() {
    let recognition;

    if (window.SpeechRecognition) {
        recognition = new window.SpeechRecognition();
    } else if (window.webkitSpeechRecognition) {
        recognition = new window.webkitSpeechRecognition();
    } else {
        alert("Browser Anda tidak mendukung fitur Voice-to-Text.");
        // Anda bisa menonaktifkan atau menyembunyikan fitur yang terkait dengan voice-to-text di sini
    }

    if (recognition) {
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = function (event) {
            const speechResult = event.results[0][0].transcript;
            document.getElementById('textToSpeak').value = speechResult;
        };
    }

    if (recognition) {
        recognition.start();
    } else {
        alert("Browser Anda tidak mendukung fitur Voice-to-Text.");
    }

}

buttonVoice.addEventListener('click', speakText)
buttonListen.addEventListener('click', startListenBrowser)
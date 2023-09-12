const buttonVoice = document.getElementById('clickToSpeak')

function speakTextWithGoogleCloud() {
    const text = document.getElementById('textToSpeak').value;

    // Konfigurasi permintaan
    const requestBody = {
        input: { text: text },
        voice: { languageCode: 'id-ID', ssmlGender: 'NEUTRAL' },
        audioConfig: { audioEncoding: 'MP3' }
    };

    fetch('https://texttospeech.googleapis.com/v1/text:synthesize?key=GOOGLE_CLOUD_API_KEY', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then(data => {
            const audioBlob = new Blob([new Uint8Array(atob(data.audioContent).split("").map(function (c) {
                return c.charCodeAt(0);
            }))], { type: 'audio/mp3' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

buttonVoice.addEventListener('click', speakTextWithGoogleCloud)

function toggleChat() {
    document.getElementById('chatbox').classList.toggle('active');
}

async function handleInput(e) {
    if (e.key === 'Enter') {
        const input = document.getElementById('userInput');
        const message = input.value.trim();
        if (!message) return;

        const chatMessages = document.getElementById('chatMessages');
        const userDiv = document.createElement('div');
        userDiv.className = 'message user';
        userDiv.textContent = message;
        chatMessages.appendChild(userDiv);

        const botDiv = document.createElement('div');
        botDiv.className = 'message bot';
        botDiv.textContent = 'Thinking...';
        chatMessages.appendChild(botDiv);

        chatMessages.scrollTop = chatMessages.scrollHeight;
        input.value = '';

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            botDiv.textContent = data.reply;
        } catch (error) {
            botDiv.textContent = "Error contacting Arcadia AI.";
        }
    }
}
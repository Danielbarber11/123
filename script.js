document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const mainScreen = document.getElementById('main-screen');
    const chatScreen = document.getElementById('chat-screen');
    const chatToolbar = document.getElementById('chat-toolbar');
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const plusButton = document.getElementById('plus-button');
    const extraOptions = document.getElementById('extra-options');
    const suggestedQuestionsContainer = document.querySelector('.suggested-questions');

    // State
    let isChatActive = false;
    const allSuggestedQuestions = [
        'מה הים הכי גדול בעולם?',
        'כתוב לי סיפור קצר',
        'מה בירת אוסטרליה?',
        'תכנן לי טיול לסוף שבוע',
        'מהי התחזית למחר?',
        'הסבר לי על תורת היחסות',
        'תרגם "שלום עולם" ליפנית',
        'כתוב קוד פייתון שממיין רשימה'
    ];

    // Functions
    const switchToChatView = () => {
        if (isChatActive) return;
        mainScreen.classList.add('hidden');
        chatScreen.classList.remove('hidden');
        chatToolbar.classList.remove('hidden');
        isChatActive = true;
    };

    const addMessage = (text, sender) => {
        const bubble = document.createElement('div');
        bubble.classList.add('message-bubble', sender);

        const content = document.createElement('div');
        content.classList.add('message-content');
        content.textContent = text;
        bubble.appendChild(content);

        const actions = document.createElement('div');
        actions.classList.add('message-actions');

        if (sender === 'user') {
            actions.innerHTML = `
                <button class="action-button">ערוך</button>
                <button class="action-button">העתק</button>
            `;
        } else { // bot
            actions.innerHTML = `
                <button class="action-button">העתק</button>
                <button class="action-button">הקראה</button>
                <button class="action-button">סכם</button>
                <button class="action-button">תרגם</button>
                <button class="action-button">חיפוש מקורות</button>
            `;
        }
        bubble.appendChild(actions);
        chatScreen.appendChild(bubble);
        chatScreen.scrollTop = chatScreen.scrollHeight; // Scroll to bottom
    };

    const showThinkingAnimation = () => {
        const thinkingBubble = document.createElement('div');
        thinkingBubble.classList.add('message-bubble', 'bot', 'thinking-bubble');
        thinkingBubble.id = 'thinking';
        thinkingBubble.innerHTML = `
            <div class="thinking-dot"></div>
            <div class="thinking-dot"></div>
            <div class="thinking-dot"></div>
        `;
        chatScreen.appendChild(thinkingBubble);
        chatScreen.scrollTop = chatScreen.scrollHeight;
    };

    const removeThinkingAnimation = () => {
        const thinkingBubble = document.getElementById('thinking');
        if (thinkingBubble) {
            thinkingBubble.remove();
        }
    };

    const handleSendMessage = () => {
        const messageText = userInput.value.trim();
        if (messageText) {
            if (!isChatActive) {
                switchToChatView();
            }
            addMessage(messageText, 'user');
            userInput.value = '';

            // Simulate bot response
            showThinkingAnimation();
            setTimeout(() => {
                removeThinkingAnimation();
                addMessage(`זוהי תגובה לדוגמה עבור: "${messageText}"`, 'bot');
            }, 2000);
        }
    };

    const rotateSuggestedQuestions = () => {
        const questions = Array.from(allSuggestedQuestions);
        // Shuffle and pick 4
        const selected = questions.sort(() => 0.5 - Math.random()).slice(0, 4);

        suggestedQuestionsContainer.innerHTML = '';
        selected.forEach(q => {
            const button = document.createElement('button');
            button.className = 'question';
            button.textContent = q;
            button.addEventListener('click', () => {
                userInput.value = q;
                handleSendMessage();
            });
            suggestedQuestionsContainer.appendChild(button);
        });
    };


    // Event Listeners
    sendButton.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    plusButton.addEventListener('click', (e) => {
        e.stopPropagation();
        extraOptions.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!extraOptions.contains(e.target) && !plusButton.contains(e.target)) {
            extraOptions.classList.add('hidden');
        }
    });

    // Initialization
    rotateSuggestedQuestions();
    setInterval(rotateSuggestedQuestions, 8000); // Rotate questions every 8 seconds
    console.log('Ivan AI Bot Initialized');
});
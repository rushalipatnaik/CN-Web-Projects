document.addEventListener('DOMContentLoaded', function () {
    const chatbotToggler = document.querySelector('.chatbot-toggler');
    const chatbot = document.querySelector('.chatbot');
    const chatbox = document.querySelector('.chatbox');
    const chatInput = document.querySelector('.chat-input textarea');
    const sendButton = document.querySelector('#send-btn');
    const closeBtn = document.querySelector('.close-btn');
  
    let isOpen = false;
  
    chatbotToggler.addEventListener('click', toggleChatbot);
    closeBtn.addEventListener('click', toggleChatbot);
  
    function toggleChatbot() {
      isOpen = !isOpen;
      chatbot.classList.toggle('open', isOpen);
    }
  
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keyup', function (event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        sendMessage();
      }
    });
  
    function sendMessage() {
      const message = chatInput.value.trim();
      if (message === '') return;
  
      displayMessage('outgoing', message);
      chatInput.value = '';
  
      // Simulate "thinking" before generating a response
      displayThinking();
  
      // Call the function to generate a chatbot response here
      generateChatbotResponse(message);
    }
  
    function displayMessage(type, text) {
      const li = document.createElement('li');
      li.classList.add('chat', type);
      li.innerHTML = `
        <span class="material-symbols-outlined">N</span>
        <p>${text}</p>
      `;
      chatbox.appendChild(li);
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  
    function displayThinking() {
      const thinkingMessage = document.createElement('li');
      thinkingMessage.classList.add('chat', 'incoming');
      thinkingMessage.innerHTML = `
        <span class="material-symbols-outlined">N</span>
        <p class="typing">Thinking...</p>
      `;
      chatbox.appendChild(thinkingMessage);
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  
    function displayChatbotResponse(response) {
      const thinkingMessage = chatbox.querySelector('.typing');
      if (thinkingMessage) {
        thinkingMessage.textContent = response;
        thinkingMessage.classList.remove('typing');
      }
    }
  
    async function generateChatbotResponse(message) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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',
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'user',
                content: message,
              },
            ],
          }),
        });
        if (response.ok) {
          const responseData = await response.json();
          const chatbotMessage = responseData.choices[0].message.content;
  
          displayChatbotResponse(chatbotMessage);
        } else {
            console.log(response);
          console.error('Failed to get a response from the chatbot.');
          displayChatbotResponse('Sorry, something went wrong. Please try again later.');
        }
      } catch (error) {
        console.log(response);
        console.error('An error occurred while calling the API:', error);
        displayChatbotResponse('Sorry, something went wrong. Please try again later.');
      }
    }
  });
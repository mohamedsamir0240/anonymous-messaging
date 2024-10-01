const form = document.getElementById('messageForm');
const messageContainer = document.createElement('p');
form.appendChild(messageContainer);

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = document.getElementById('message').value;
    
    const response = await fetch('/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    });

    const result = await response.json();
    if (result.success) {
        messageContainer.textContent = 'تم إرسال الرسالة بنجاح!';
        messageContainer.style.color = 'green';
        form.reset();
    } else {
        messageContainer.textContent = 'حدث خطأ أثناء إرسال الرسالة.';
        messageContainer.style.color = 'red';
    }
});

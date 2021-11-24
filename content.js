// document.addEventListener("DOMContentLoaded", function() {
    const INTERVAL = 1 * 60 * 60 * 1000; // 1 hour
    const HIDE_MESSAGE = localStorage.getItem('hide-message');
    const MESSAGE_SHOW_COUNTER = sessionStorage.getItem('message-show-counter') || 0;

    const render_message = (message) => {
        if(!message) return;
        
        const messageHtml = `
            <div class="extension-message">
                <div class="extension-message-text">${message}</div>
                <div class="extension-message-instruction">Для отключения этого сообщения нажмите на кнопку Закрыть</div>
                <div class="extension-message-button">Закрыть</div>
            </div>
        `;
        
        document.querySelector('body').innerHTML += messageHtml;
        document.querySelector('.extension-message-button').addEventListener('click', () => {
            const messageHtml = document.querySelector('.extension-message');
            
            if(!messageHtml) return;
            messageHtml.remove();
            localStorage.setItem('hide-message', true);
        });
    };

    const init = () => chrome.storage.sync.get('link_list', ({ link_list}) => {
        if(HIDE_MESSAGE) return;
        if(MESSAGE_SHOW_COUNTER >= 3) return;
        if(!link_list) return;

        const { hostname } = window.location;
        const linkList = JSON.parse(link_list);
        const linkItem = linkList.find((link) => hostname.includes(link.domain));

        if(!linkItem) return;

        sessionStorage.setItem('message-show-counter', +MESSAGE_SHOW_COUNTER + 1);
        
        render_message(linkItem.message);
    });

    init();
    setInterval(init, INTERVAL);
// });
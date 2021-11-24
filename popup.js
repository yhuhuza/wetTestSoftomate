
const render_link_list = (linkList) => {
    const listHtml = document.querySelector('.extension-link-list');
    listHtml.innerHTML = '';

    if (linkList.length != 0){
        linkList.map(({ domain, name }) => {
        const linkHtml = `
            <a href="https://${domain}" target="_blank" class="extension-link-item">
            ${name}
            </a>
        `;

        listHtml.innerHTML += linkHtml;
        });
    }
}

chrome.storage.sync.get(["link_list"], function({ link_list }){
    render_link_list(JSON.parse(link_list));
});
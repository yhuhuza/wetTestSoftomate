const URL = "https://www.softomate.net/ext/employees/list.json";
const INTERVAL = 1 * 60 * 60 * 1000; // 1 hour

const fetch_link_list = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return (data);
}

const save_link_list_to_localstorage = (linkList) => {
  const jsonLinkList = JSON.stringify(linkList);
  chrome.storage.sync.set({ 'link_list': jsonLinkList });
}

const update_link_list = async () => {
  const data = await fetch_link_list();
  
  save_link_list_to_localstorage(data);
}

const init_extension = async () => {
  update_link_list();
  setInterval(update_link_list, INTERVAL);
}

init_extension();

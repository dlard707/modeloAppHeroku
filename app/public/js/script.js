// Programação do menu
let url_atual = window.location.pathname

if (url_atual == '/') {
    document.querySelector('#menuHome').className = 'nav-link text-white active'
} else if (url_atual == '/noticias') {
    document.querySelector('#menuNoticias').className = 'nav-link text-white active'
} else if (url_atual == '/admin') {
    document.querySelector('#menuAdmin').className = 'nav-link text-white active'
}

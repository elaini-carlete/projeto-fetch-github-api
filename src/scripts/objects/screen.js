const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                            <div class="data">
                                                <h1>${user.name ?? 'Não possui nome cadastrado 😿'}</h1>
                                                <p>${user.bio ?? 'Não possui bio cadastrada 😿'}</p>
                                            </div>
                                            <div class="followers-following">
                                                <h2>Followers</h2>
                                                <ul>
                                                    <li>
                                                        <span class="number">${user.followers}</span>
                                                        <span class="fallowers">Fallowers</span>
                                                    </li>
                                                    <li>
                                                        <span class="number">${user.following}</span>
                                                        <span class="fallowing">Following</span>
                                                    </li>
                                                </ul>
                                            </div>
                                      </div>`

        let repositoriesItens = ''

        user.repositories.forEach((repo) => {
            repositoriesItens += `<li>
                                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>

                                    <ul class="repositories-info">
                                      <li>🍴 ${repo.forks}</li>
                                      <li>⭐ ${repo.star ?? '0'}</li>
                                      <li>👀 ${repo.watchers}</li>
                                      <li>💻 ${repo.language ?? 'Sem linguagem'}</li>
                                    </ul>
                                  </li>`
        })
                              
        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        } this.renderEvents(user.events)
    },
    renderEvents(events){
    let eventsItens = ''

        events.forEach( (event) => { 
            if(event.payload.commits){
                eventsItens += `<li><a href="${event.html_url}" target="_blank"><span class="repo-name">${event.repo.name}</span> -> ${event.payload.commits[0].message}</a></li>`
            }
        })

        if(events.length > 0){
            this.userProfile.innerHTML += `<div class="events section">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                           </div>`
        }
    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }
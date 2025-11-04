// Espera todo o conteúdo da página carregar antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {
    
    // --- EFEITO 1: NAVBAR QUE MUDA DE COR AO ROLAR ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // --- EFEITO 2: FAZ A TABELA DE JOGOS APARECER/SUMIR ---
    const toggleBtn = document.getElementById('toggle-schedule-btn');
    const scheduleTable = document.getElementById('schedule-table');

    if (toggleBtn && scheduleTable) {
        toggleBtn.addEventListener('click', (event) => {
            event.preventDefault(); 
            const isVisible = scheduleTable.classList.contains('visible');
            if (isVisible) {
                scheduleTable.classList.remove('visible');
                toggleBtn.innerText = "Ver Tabela de Jogos Completa";
            } else {
                scheduleTable.classList.add('visible');
                toggleBtn.innerText = "Esconder Tabela";
            }
        });
    }

    // ===============================================
    // --- NOVO MOTOR: PREENCHE O SITE COM DADOS DO data.js ---
    // ===============================================

    // 1. Preenche o Próximo Desafio
    const nextMatchElement = document.getElementById('next-match-details');
    if (nextMatchElement && siteData.nextMatch) {
        const match = siteData.nextMatch;
        
        nextMatchElement.innerHTML = `
            <div class="match-teams">
                <span class="team-home">Sky Legends</span>
                <span class="team-vs">vs.</span>
                <span class="team-away">${match.adversario}</span>
            </div>
            <div class="match-time">${match.data} | ${match.hora}</div>
        `;
    }

    // 2. Preenche a Tabela de Jogos
    const scheduleBody = document.getElementById('schedule-body');
    if (scheduleBody && siteData.schedule) {
        scheduleBody.innerHTML = ""; 
        
        siteData.schedule.forEach(jogo => {
            const statusClass = jogo.status === 'win' ? 'status-win' : 'status-loss';
            const statusText = jogo.status === 'win' ? 'Vitória' : 'Derrota';
            
            const row = `
                <tr>
                    <td>${jogo.dia}</td> 
                    <td>${jogo.adversario}</td>
                    <td><span class="${statusClass}">${statusText}</span></td>
                    <td>${jogo.placar}</td>
                </tr>
            `;
            scheduleBody.innerHTML += row;
        });
    }

    // 3. Preenche os Destaques do Time
    const highlightsGrid = document.getElementById('highlights-grid');
    if (highlightsGrid && siteData.highlights) {
        highlightsGrid.innerHTML = ""; 

        siteData.highlights.forEach(destaque => {
            // ================== -->
            // == MUDANÇA AQUI == -->
            // ================== -->
            const card = `
                <div class="highlight-item">
                    <img src="${destaque.img}" alt="${destaque.titulo}">
                    <h3>${destaque.titulo}</h3>
                    <h4 class="player-name">${destaque.nome}</h4> <p>${destaque.desc}</p>
                </div>
            `;
            highlightsGrid.innerHTML += card;
        });
    }

});
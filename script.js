document.addEventListener('DOMContentLoaded', function() {
    // Age Verification
    const ageVerification = document.getElementById('ageVerification');
    const confirmAge = document.getElementById('confirmAge');
    const denyAge = document.getElementById('denyAge');
    
    // Check if age was already verified
    if(localStorage.getItem('ageVerified') !== 'true') {
        ageVerification.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    confirmAge.addEventListener('click', function() {
        localStorage.setItem('ageVerified', 'true');
        ageVerification.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    denyAge.addEventListener('click', function() {
        window.location.href = 'https://www.google.com';
    });
    
    // Array de vídeos com informações diferentes
    const videos = [
        {
            id: 1,
            title: "Cena quente com morena sensual",
            category: "Morenas",
            duration: "12:45",
            views: "1.8M",
            daysAgo: 3,
            premium: false,
            thumbnail: "video.html",
            preview: "https://www.xvideos.com/embedframe/otcbthme17f"
        },
        {
            id: 2,
            title: "Novinha brasileira em cena exclusiva",
            category: "Novinhas",
            duration: "8:30",
            views: "2.4M",
            daysAgo: 5,
            premium: true,
            thumbnail: "video_2.html",
            preview: "https://www.xvideos.com/embedframe/otkohdb3dd9"
        },
        {
            id: 3,
            title: "Loirinha deliciosa em ação",
            category: "Loiras",
            duration: "15:10",
            views: "1.5M",
            daysAgo: 1,
            premium: false,
            thumbnail: "imagens/thumbnail3.jpg",
            preview: "videos/preview3.mp4"
        },
        {
            id: 4,
            title: "Mamãe gostosa surpreendendo",
            category: "Mamães",
            duration: "22:30",
            views: "3.1M",
            daysAgo: 7,
            premium: true,
            thumbnail: "imagens/thumbnail4.jpg",
            preview: "videos/preview4.mp4"
        },
        {
            id: 5,
            title: "Ruiva ardente em cena intensa",
            category: "Ruivas",
            duration: "9:50",
            views: "987K",
            daysAgo: 2,
            premium: false,
            thumbnail: "imagens/thumbnail5.jpg",
            preview: "videos/preview5.mp4"
        },
        {
            id: 6,
            title: "Coroas experientes em ação",
            category: "Coroas",
            duration: "18:15",
            views: "1.2M",
            daysAgo: 4,
            premium: false,
            thumbnail: "imagens/thumbnail6.jpg",
            preview: "videos/preview6.mp4"
        },
        {
            id: 7,
            title: "Negra poderosa dominando a cena",
            category: "Negras",
            duration: "14:40",
            views: "2.2M",
            daysAgo: 1,
            premium: true,
            thumbnail: "imagens/thumbnail7.jpg",
            preview: "videos/preview7.mp4"
        },
        {
            id: 8,
            title: "Dupla de morenas em cena especial",
            category: "Morenas",
            duration: "25:20",
            views: "3.5M",
            daysAgo: 10,
            premium: false,
            thumbnail: "imagens/thumbnail8.jpg",
            preview: "videos/preview8.mp4"
        },
        {
            id: 9,
            title: "Novinha tímida revela seu lado selvagem",
            category: "Novinhas",
            duration: "10:05",
            views: "1.7M",
            daysAgo: 3,
            premium: false,
            thumbnail: "imagens/thumbnail9.jpg",
            preview: "videos/preview9.mp4"
        },
        {
            id: 10,
            title: "Loiras gêmeas em cena exclusiva",
            category: "Loiras",
            duration: "30:15",
            views: "4.2M",
            daysAgo: 15,
            premium: true,
            thumbnail: "imagens/thumbnail10.jpg",
            preview: "videos/preview10.mp4"
        }
    ];
    
    // Generate video cards
    const videoGrid = document.getElementById('videoGrid');
    videos.forEach(video => {
        const videoCard = `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="video-card">
                    ${video.premium ? '<div class="premium-badge">PREMIUM</div>' : ''}
                    <div class="video-thumbnail">
                        <video class="video-preview" loop muted preload="metadata" poster="${video.thumbnail}">
                            <source src="${video.preview}" type="video/mp4">
                        </video>
                        <img src="${video.thumbnail}" alt="${video.title}">
                        <div class="video-duration">${video.duration}</div>
                    </div>
                    <div class="video-info">
                        <h5 class="video-title">${video.title}</h5>
                        <div class="video-meta">
                            <span><i class="fas fa-eye"></i> ${video.views}</span>
                            <span><i class="fas fa-calendar-alt"></i> ${video.daysAgo} ${video.daysAgo === 1 ? 'dia' : 'dias'}</span>
                        </div>
                    </div>
                    ${video.premium ? `
                    <div class="premium-overlay">
                        <i class="fas fa-lock fa-3x mb-3"></i>
                        <p class="text-center">Conteúdo exclusivo para assinantes</p>
                        <button class="btn btn-premium" data-bs-toggle="modal" data-bs-target="#subscriptionModal">Assine agora</button>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        videoGrid.innerHTML += videoCard;
    });
    
    // Initialize video preview hover effect
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const preview = this.querySelector('.video-preview');
            if(preview) {
                preview.play().catch(e => console.log("Autoplay prevented:", e));
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const preview = this.querySelector('.video-preview');
            if(preview) {
                preview.pause();
                preview.currentTime = 0;
            }
        });
        
        // Click handler for video cards
        card.addEventListener('click', function(e) {
            // Don't open if clicking on subscription button
            if(e.target.closest('.btn-premium') || e.target.closest('.premium-overlay')) {
                return;
            }
            
            // Show ad before playing video
            const adModal = document.getElementById('adModal');
            adModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            let count = 10;
            const countdown = document.getElementById('countdown');
            const countdownInterval = setInterval(() => {
                count--;
                countdown.textContent = count;
                
                if(count <= 0) {
                    clearInterval(countdownInterval);
                    playVideo();
                }
            }, 1000);
            
            // Close ad handlers
            document.getElementById('closeAd').addEventListener('click', function() {
                clearInterval(countdownInterval);
                adModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            
            document.getElementById('skipAd').addEventListener('click', function() {
                clearInterval(countdownInterval);
                playVideo();
            });
            
            function playVideo() {
                adModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                // In a real app, this would open the video page
                window.open('video.html', '_blank');
            }
        });
    });
    
    // Category filter
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.textContent.trim();
            if(category === 'Todos') {
                document.querySelectorAll('.col-lg-3').forEach(card => {
                    card.style.display = 'block';
                });
            } else {
                document.querySelectorAll('.col-lg-3').forEach(card => {
                    const videoTitle = card.querySelector('.video-title').textContent;
                    if(videoTitle.includes(category)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });
});
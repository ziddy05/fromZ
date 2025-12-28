document.addEventListener('DOMContentLoaded', function() {
    // Select all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');

    // --- Mobile Navigation Toggle ---
    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('active');
            });
        });
    }

    // --- Navbar scroll effect ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Update active navigation link based on scroll position ---
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Adjust offset for fixed navbar (approx. 80px)
            if (window.scrollY >= (sectionTop - 80)) { 
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // --- Smooth scrolling for navigation links ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed navbar
                window.scrollTo({ 
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Explore button scroll to features
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                // Adjust for fixed navbar
                window.scrollTo({ 
                    top: featuresSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }

    // --- Gallery Filter Functionality & Load More Fix ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryGrid = document.querySelector('.gallery-grid');

    // Function to add event listeners to like buttons
    function addLikeListeners() {
        document.querySelectorAll('.gallery-like').forEach(button => {
            button.removeEventListener('click', handleLikeClick); // Remove old listeners
            button.addEventListener('click', handleLikeClick);
        });
    }
    
    function handleLikeClick(e) {
        e.stopPropagation();
        const button = e.currentTarget;
        const icon = button.querySelector('i');
        const isLiked = icon.classList.contains('fas');
        
        if (isLiked) {
            icon.classList.remove('fas');
            icon.classList.add('far');
            const span = button.querySelector('span');
            if (span) span.textContent = 'Like';
        } else {
            icon.classList.remove('far');
            icon.classList.add('fas');
            const span = button.querySelector('span');
            if (span) span.textContent = 'Liked';
        }
    }

    addLikeListeners(); // Initialize listeners for initial items

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active state of filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter gallery items
            document.querySelectorAll('.gallery-item').forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Load More Button Logic
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn && galleryGrid) {
        loadMoreBtn.addEventListener('click', () => {
            // Example: Add more gallery items
            const newItems = [
                {
                        category: 'special',
                        imgSrc: './images/pc10.jpg',
                        caption: 'special',
                    },
                    {
                        category: 'special',
                        imgSrc: './images/pc5.jpg',
                        caption: 'special',
                    },
                    {
                        category: 'special',
                        imgSrc: './images/pc4.jpg',
                        caption: 'special',
                    },
                    {
                        category: 'special',
                        imgSrc: './images/pc2.jpg',
                        caption: 'special',
                    },
                    {
                        category: 'special',
                        imgSrc: './images/pc1.jpg',
                        caption: 'special',
                    },
                    {
                        category: 'special',
                        imgSrc: './images/pc3.jpg',
                        caption: 'special',
                }
            ];

            newItems.forEach(item => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.setAttribute('data-category', item.category);
                galleryItem.innerHTML = `
                    <div class="gallery-image-container">
                        <img src="${item.imgSrc}" alt="${item.caption}" loading="lazy">
                        <div class="gallery-overlay"></div>
                    </div>
                    <button class="gallery-like"><i class="far fa-heart"></i> <span>Like</span></button>
                `;
                galleryGrid.appendChild(galleryItem);
                
                // Add event listener to the new like button immediately
                const newLikeBtn = galleryItem.querySelector('.gallery-like');
                if (newLikeBtn) {
                    newLikeBtn.addEventListener('click', handleLikeClick);
                }
            });

            // Hide load more button after loading all items (for demo)
            loadMoreBtn.style.display = 'none';
        });
    }

    // --- Tab functionality for Love Lines section ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // --- Read More buttons for poems ---
    const readMoreButtons = document.querySelectorAll('.read-more');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const poem = button.closest('.poem').querySelector('.poem-lines'); // Target the lines div
            if (poem) {
                const isExpanded = button.textContent === 'Show Less';
                
                if (isExpanded) {
                    poem.style.maxHeight = '5em'; // Set a reasonable height for collapsed state
                    button.textContent = 'Read More';
                } else {
                    poem.style.maxHeight = poem.scrollHeight + 'px';
                    button.textContent = 'Show Less';
                }
            }
        });
    });

    

    // --- Message Board Functionality Fix ---
    const sendButton = document.querySelector('.send-message');
    const messageInput = document.querySelector('.message-input textarea');
    const messagesContainer = document.querySelector('.messages');

    if (sendButton && messageInput && messagesContainer) {
        sendButton.addEventListener('click', (e) => {
            e.preventDefault();
                const messageText = messageInput.value.trim();
                
                if (messageText) {
                    const messageElement = document.createElement('div');
                    messageElement.className = 'message';
                    
                    const now = new Date();
                    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    
                    messageElement.innerHTML = `
                        <div class="message-content">
                            <p>${messageText}</p>
                            <span class="message-time">${timeString}</span>
                        </div>
                    `;
                    
                    messagesContainer.prepend(messageElement);
                    messageInput.value = '';
                }
            });
        }

    // --- Story navigation functionality ---
    const storyContainer = document.querySelector('.story-container');
    const prevBtnStory = storyContainer?.querySelector('.story-nav.prev-btn');
    const nextBtnStory = storyContainer?.querySelector('.story-nav.next-btn');
    const storySlides = storyContainer?.querySelectorAll('.story-slide');
    const progressSteps = storyContainer?.querySelectorAll('.progress-step');
    let currentSlide = 0;

    function updateStoryNavigation() {
        if (!prevBtnStory || !nextBtnStory || !storySlides || !progressSteps) return;
        
        // Update button states
        prevBtnStory.disabled = currentSlide === 0;
        nextBtnStory.disabled = currentSlide === storySlides.length - 1;
        
        // Update progress steps
        progressSteps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index === currentSlide) {
                step.classList.add('active');
            } else if (index < currentSlide) {
                step.classList.add('completed');
            }
        });
        
        // Update pagination
        const currentSlideElement = storyContainer.querySelector('.current-slide');
        const totalSlidesElement = storyContainer.querySelector('.total-slides');
        if (currentSlideElement) currentSlideElement.textContent = currentSlide + 1;
        if (totalSlidesElement) totalSlidesElement.textContent = storySlides.length;
    }

    function showSlide(index) {
        if (!storySlides || index < 0 || index >= storySlides.length) return;
        
        // Hide all slides
        storySlides.forEach(slide => slide.classList.remove('active'));
        
        // Show current slide
        storySlides[index].classList.add('active');
        currentSlide = index;
        
        updateStoryNavigation();
    }

    // Event listeners for navigation buttons
    if (prevBtnStory && nextBtnStory) {
        prevBtnStory.addEventListener('click', () => showSlide(currentSlide - 1));
        nextBtnStory.addEventListener('click', () => showSlide(currentSlide + 1));
    }

    // Initialize first slide
    if (storySlides?.length > 0) {
        showSlide(0);
    }

    // --- Quote slider functionality ---
    const quoteSlider = document.querySelector('.quote-slider');
    const quotes = quoteSlider?.querySelectorAll('.quote');
    const dots = quoteSlider?.querySelectorAll('.dot');
    let currentQuote = 0;

    function showQuote(index) {
        if (!quotes || quotes.length === 0) return;
        
        // Handle wrap-around
        if (index < 0) index = quotes.length - 1;
        if (index >= quotes.length) index = 0;
        
        // Hide all quotes and dots
        quotes.forEach(quote => quote.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current quote and update dot
        if (quotes[index]) quotes[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        currentQuote = index;
    }

    // Dot navigation
    dots?.forEach((dot, index) => {
        dot.addEventListener('click', () => showQuote(index));
    });

    // Previous/Next buttons
    const quotePrev = quoteSlider?.querySelector('.quote-prev');
    const quoteNext = quoteSlider?.querySelector('.quote-next');
    
    if (quotePrev && quoteNext) {
        quotePrev.addEventListener('click', () => showQuote(currentQuote - 1));
        quoteNext.addEventListener('click', () => showQuote(currentQuote + 1));
    }

    // Initialize first quote
    if (quotes?.length > 0) {
        showQuote(0);
    }

    // --- Back to top button ---
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Love Meter ---
    const loveBtn = document.querySelector('.love-btn');
    const loveFill = document.querySelector('.love-fill');
    
    if (loveBtn && loveFill) {
        loveBtn.addEventListener('click', () => {
            // Reset animation
            loveFill.style.transition = 'none';
            loveFill.style.width = '0';
            
            // Trigger reflow
            void loveFill.offsetWidth;
            
            // Animate
            loveFill.style.transition = 'width 3s ease-in-out';
            const randomPercentage = Math.floor(Math.random() * 100) + 1;
            loveFill.style.width = `${randomPercentage}%`;
            
            // Change button text
            const loveMessages = [
                `Compatibility: ${randomPercentage}%`, // Show result
                'Measure Again',
                'Check Again',
                'Try Your Luck',
                'Another Try?',
                'Test Again'
            ];
            const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
            loveBtn.textContent = randomMessage;
        });
    }

    // --- Initialize animations on scroll ---
    function animateOnScroll() {
        const elements = document.querySelectorAll('.card, .gallery-item, .features h2, .content-section h2, .love-lines-container, .music-player-container');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial state for animation
    document.querySelectorAll('.card, .gallery-item, .features h2, .content-section h2, .love-lines-container, .music-player-container').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    // Run animations on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Set initial active state for home section on page load
    updateActiveNav();
    window.addEventListener('scroll', updateActiveNav);


    // ----------------------------------------------------------------------
    // --- Advanced Music Player Functionality (Start of dedicated block) ---
    // ----------------------------------------------------------------------

    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const muteBtn = document.getElementById('muteBtn');
    const volumeControl = document.getElementById('volumeControl');
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.querySelector('.progress-bar');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const trackTitle = document.getElementById('trackTitle');
    const artistName = document.getElementById('artistName');
    const albumArt = document.getElementById('albumArt');
    const playlist = document.getElementById('playlist');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const repeatBtn = document.getElementById('repeatBtn');
    const addToPlaylistBtn = document.getElementById('addToPlaylistBtn');

// Your Music Playlist
const songs = [
    {
        title: "Perfect",
        artist: "Ed Sheeran",
        src: "./music/Perfect.mp3",
        cover: "./images/perfect.jpg"
    },
    {
        title: "All of Me",
        artist: "John Legend",
        src: "./music/All of Me.mp3",
        cover: "./images/allofme.jpg"
    },
    {
        title: "Thinking Out Loud",
        artist: "Ed Sheeran",
        src: "./music/Thinking Out Loud.mp3",
        cover: "./images/tol.jpg"
    },
    {
        title: "Best Part of Me",
        artist: "Ed Sheeran",
        src: "./music/Best Part Of Me.mp3",
        cover: "./images/bestpartofme.jpg"
    },
    {
        title: "Best Part",
        artist: "Daniel Caesar & H.E.R.",
        src: "./music/Best Part.mp3",
        cover: "./images/bestpart.jpg"
    },
    {
        title: "Nothing",
        artist: "Bruno Major",
        src: "./music/BrunoNothing.mp3",
        cover: "./images/nothingb.jpg"
    },
    {
        title: "Fallin' All In You",
        artist: "Shawn Mendes",
        src: "./music/FallinAllInYou.mp3",
        cover: "./images/fallinallinyou.jpg"
    },
    {
        title: "I Like Me Better",
        artist: "Lauv",
        src: "./music/I Like Me Better.mp3",
        cover: "./images/ilikemebetter.jpg"
    },
    {
        title: "I Won't Give Up",
        artist: "Jason Mraz",
        src: "./music/I Won't Give Up.mp3",
        cover: "./images/iwontgiveup.jpg"
    },
    {
        title: "IDKW",
        artist: "Jeremy Passion",
        src: "./music/IDKW.mp3",
        cover: "./images/idkw.jpg"
    },
    {
        title: "I'm Yours",
        artist: "Jason Mraz",
        src: "./music/I'm Yours.mp3",
        cover: "./images/imyours.jpg"
    },
    {
        title: "Just The Way You Are",
        artist: "Bruno Mars",
        src: "./music/Just The Way You Are.mp3",
        cover: "./images/jtwya.jpg"
    },
    {
        title: "Kusapiling",
        artist: "Anthony Meneses",
        src: "./music/Kusapiling.mp3",
        cover: "./images/kusapiling.jpg"
    },
    {
        title: "Lalim",
        artist: "Sunlit Memory",
        src: "./music/Lalim.mp3",
        cover: "./images/lalim.jpg"
    },
    {
        title: "Lemonade",
        artist: "Jeremy Passion",
        src: "./music/Lemonade.mp3",
        cover: "./images/lemonade.jpg"
    },
    {
        title: "Lucky",
        artist: "Jason Mraz",
        src: "./music/Lucky.mp3",
        cover: "./images/lucky.jpg"
    },
    {
        title: "Nothing",
        artist: "Jeremy Passion",
        src: "./music/Nothing.mp3",
        cover: "./images/nothing.jpg"
    },
    {
        title: "Adore You",
        artist: "Harry Styles",
        src: "./music/AdoreU.mp3",
        cover: "./images/adoreyou.jpg"
    }
];

    let currentSongIndex = 0;
    let isPlaying = false;
    let isShuffle = false;
    let isRepeat = false;

    // Initialize the player
    function initPlayer() {
        if (!audioPlayer) return;

        // Load the first song to start the audio element
        loadSong(currentSongIndex);
        
        // Create playlist
        renderPlaylist();
        
        // Event Listeners
        playPauseBtn?.addEventListener('click', togglePlay);
        prevBtn?.addEventListener('click', prevSong);
        nextBtn?.addEventListener('click', nextSong);
        muteBtn?.addEventListener('click', toggleMute);
        volumeControl?.addEventListener('input', setVolume);
        
        // Core Audio Events
        audioPlayer.addEventListener('timeupdate', updateProgress);
        audioPlayer.addEventListener('ended', songEnded);
        audioPlayer.addEventListener('loadedmetadata', updateDuration);
        
        shuffleBtn?.addEventListener('click', toggleShuffle);
        repeatBtn?.addEventListener('click', toggleRepeat);
        
        // Seek functionality
        progressContainer?.addEventListener('click', setProgress);
        
        // Click on song in playlist
        playlist?.addEventListener('click', (e) => {
            const songElement = e.target.closest('.playlist-item');
            if (songElement) {
                const songIndex = parseInt(songElement.dataset.index);
                playSong(songIndex);
            }
        });
        
        // Set initial volume
        audioPlayer.volume = volumeControl?.value || 0.7;
    }

    // Load song into the player
    function loadSong(index) {
        const song = songs[index];
        audioPlayer.src = song.src;
        trackTitle.textContent = song.title;
        artistName.textContent = song.artist;
        albumArt.src = song.cover;
        
        // Update active state in playlist
        updateActiveSong();
        
        // Load the audio source
        audioPlayer.load();
    }

    // Play song (used for prev/next/playlist click)
    function playSong(index) {
        if (index >= 0 && index < songs.length) {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            
            // Only play immediately if the player was already in a playing state
            if (isPlaying) {
                play();
            } else {
                // Otherwise, just update the UI to show the new song loaded
                pause(); 
            }
        }
    }

    // Toggle play/pause (used for the main play button click)
    function togglePlay() {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }

    // Play
    function play() {
        // Use a Promise to handle potential autoplay errors gracefully
        const playPromise = audioPlayer.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Autoplay started!
                isPlaying = true;
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(error => {
                // Autoplay failed (e.g., browser requires user interaction)
                console.warn("Audio playback failed (likely browser policy):", error);
                isPlaying = false;
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                alert("Playback could not start automatically. Please click the play button again.");
            });
        }
    }

    // Pause
    function pause() {
        audioPlayer.pause();
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }

    // Previous song
    function prevSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = songs.length - 1;
        }
        playSong(currentSongIndex);
    }

    // Next song
    function nextSong() {
        if (isShuffle) {
            playRandomSong();
        } else {
            currentSongIndex++;
            if (currentSongIndex >= songs.length) {
                if (isRepeat) {
                    currentSongIndex = 0;
                } else {
                    currentSongIndex = 0; 
                    pause();
                    return;
                }
            }
            playSong(currentSongIndex);
        }
    }

    // Play random song
    function playRandomSong() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * songs.length);
        } while (newIndex === currentSongIndex && songs.length > 1);
        
        currentSongIndex = newIndex;
        playSong(currentSongIndex);
    }

    // Toggle shuffle
    function toggleShuffle() {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle('active', isShuffle);
    }

    // Toggle repeat
    function toggleRepeat() {
        isRepeat = !isRepeat;
        repeatBtn.classList.toggle('active', isRepeat);
    }

    // Toggle mute
    function toggleMute() {
        audioPlayer.muted = !audioPlayer.muted;
        muteBtn.innerHTML = audioPlayer.muted ? 
            '<i class="fas fa-volume-mute"></i>' : 
            '<i class="fas fa-volume-up"></i>';
    }

    // Set volume
    function setVolume() {
        audioPlayer.volume = volumeControl.value;
        toggleMuteIcon();
    }
    
    // Helper function to update mute icon based on volume
    function toggleMuteIcon() {
        if (audioPlayer.muted || audioPlayer.volume == 0) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }

    // Update progress bar
    function updateProgress() {
        const { currentTime, duration } = audioPlayer;
        if (isNaN(duration)) return; // Avoid error before metadata is loaded
        
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        currentTimeEl.textContent = formatTime(currentTime);
    }

    // Update duration when metadata loads
    function updateDuration() {
        durationEl.textContent = formatTime(audioPlayer.duration);
    }

    // Seek functionality
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        
        if (isNaN(duration) || duration === 0) return;

        audioPlayer.currentTime = (clickX / width) * duration;
    }

    // Format time in seconds to MM:SS
    function formatTime(seconds) {
        if (isNaN(seconds) || seconds === Infinity) return '0:00';
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // Song ended
    function songEnded() {
        if (isRepeat) {
            // Replay the current song
            audioPlayer.currentTime = 0;
            play();
        } else {
            nextSong();
        }
    }

    // Render playlist
    function renderPlaylist() {
        playlist.innerHTML = '';
        songs.forEach((song, index) => {
            const songElement = document.createElement('div');
            songElement.className = `playlist-item ${index === currentSongIndex ? 'active' : ''}`;
            songElement.dataset.index = index;
            // Duration is set to a placeholder and will not be dynamically calculated here
            songElement.innerHTML = `
                <div class="playlist-item-info">
                    <img src="${song.cover}" alt="${song.title}" class="playlist-item-img">
                    <div>
                        <div class="playlist-item-title">${song.title}</div>
                        <div class="playlist-item-artist">${song.artist}</div>
                    </div>
                </div>
                <div class="playlist-item-duration">...</div>
            `;
            playlist.appendChild(songElement);
        });
    }

    // Update active song in playlist
    function updateActiveSong() {
        const playlistItems = document.querySelectorAll('.playlist-item');
        playlistItems.forEach((item, index) => {
            item.classList.toggle('active', index === currentSongIndex);
        });
    }
    
    // The "Add to Playlist" button handler is commented out in the JS but the button remains in HTML
    // addToPlaylistBtn?.addEventListener('click', () => alert('Add song functionality is a future feature!'));

    // Initialize the player
    if (audioPlayer) {
        initPlayer();
    }

    // Love Meter Functionality
    const loveMeterEl = document.querySelector('.love-meter');
    const loveFillEl = document.querySelector('.love-fill');
    const loveBtnEl = document.querySelector('.love-btn');
    
    if (loveMeterEl && loveFillEl && loveBtnEl) {
        const loveMeterText = document.createElement('div');
        loveMeterText.className = 'love-meter-text';
        loveMeterEl.parentNode.insertBefore(loveMeterText, loveMeterEl.nextSibling);

        loveBtnEl.addEventListener('click', function() {
            // Generate a random percentage between 50-100 for more positive results
            const percentage = Math.floor(Math.random() * 51) + 50;
            
            // Update the fill width
            loveFillEl.style.width = `${percentage}%`;
            
            // Set the percentage text
            loveMeterText.textContent = `${percentage}%`;
            
            // Add a fun message based on the percentage
            let message = '';
            if (percentage >= 90) {
                message = 'Perfect Match! ';
            } else if (percentage >= 75) {
                message = 'Great Chemistry! ';
            } else if (percentage >= 60) {
                message = 'Good Potential! ';
            } else {
                message = 'Try Your Luck Again? ';
            }
            
            // Update the button text
            loveBtnEl.textContent = message;
            
            // Add a class to trigger animation
            loveFillEl.classList.add('animate');
            
            // Remove animation class after it completes
            setTimeout(() => {
                loveFillEl.classList.remove('animate');
            }, 1000);
        });
    }

// Update active navigation on scroll
window.addEventListener('scroll', updateActiveNav);

// Initial call to set active nav on page load
updateActiveNav()
});
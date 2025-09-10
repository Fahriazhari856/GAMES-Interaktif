// Data untuk permainan
        const conceptData = {
            "Konstruktivisme Kognitif": "Teori pembelajaran yang menekankan bahwa pengetahuan dibangun secara aktif oleh individu melalui interaksi dengan lingkungan",
            "Discovery Learning": "Metode pembelajaran dimana siswa menemukan sendiri pengetahuan melalui eksplorasi dan investigasi",
            "Asimilasi": "Proses mengintegrasikan informasi baru ke dalam skema yang sudah ada",
            "Akomodasi": "Proses memodifikasi skema yang ada untuk menampung informasi baru",
            "Equilibrasi": "Proses mencapai keseimbangan antara asimilasi dan akomodasi",
            "Skema": "Struktur kognitif yang mengorganisir pengetahuan dan pengalaman",
            "Zone of Proximal Development": "Area antara kemampuan aktual dan kemampuan potensial dengan bantuan",
            "Scaffolding": "Dukungan sementara yang diberikan untuk membantu pembelajaran"
        };

        const discoveryStages = [
            "Stimulasi (Stimulation)",
            "Identifikasi Masalah (Problem Statement)", 
            "Pengumpulan Data (Data Collection)",
            "Pengolahan Data (Data Processing)",
            "Pembuktian (Verification)",
            "Generalisasi (Generalization)"
        ];

        const schemaElements = {
            assimilation: [
                "Menggunakan pengetahuan lama",
                "Menambah contoh baru",
                "Memperluas kategori",
                "Mengkonfirmasi teori"
            ],
            accommodation: [
                "Mengubah cara berpikir",
                "Membuat kategori baru",
                "Merevisi konsep",
                "Adaptasi skema"
            ],
            equilibration: [
                "Mencapai keseimbangan",
                "Resolusi konflik kognitif",
                "Stabilitas baru",
                "Integrasi pengetahuan"
            ]
        };

        const quizQuestions = [
            {
                question: "Siapa tokoh utama teori konstruktivisme kognitif?",
                options: ["Jean Piaget", "Lev Vygotsky", "Jerome Bruner", "John Dewey"],
                correct: 0,
                explanation: "Jean Piaget adalah pelopor teori konstruktivisme kognitif dengan konsep asimilasi, akomodasi, dan equilibrasi."
            },
            {
                question: "Apa yang dimaksud dengan discovery learning?",
                options: [
                    "Pembelajaran dengan ceramah",
                    "Pembelajaran dengan menemukan sendiri",
                    "Pembelajaran dengan menghafal",
                    "Pembelajaran dengan imitasi"
                ],
                correct: 1,
                explanation: "Discovery learning adalah metode pembelajaran dimana siswa aktif menemukan pengetahuan melalui eksplorasi."
            },
            {
                question: "Proses mengintegrasikan informasi baru ke skema lama disebut:",
                options: ["Akomodasi", "Asimilasi", "Equilibrasi", "Adaptasi"],
                correct: 1,
                explanation: "Asimilasi adalah proses memasukkan informasi baru ke dalam skema yang sudah ada."
            },
            {
                question: "Tahap pertama dalam discovery learning adalah:",
                options: ["Pengumpulan data", "Stimulasi", "Identifikasi masalah", "Verifikasi"],
                correct: 1,
                explanation: "Stimulasi adalah tahap pembuka untuk menarik minat dan memotivasi siswa."
            },
            {
                question: "ZPD (Zone of Proximal Development) dikembangkan oleh:",
                options: ["Piaget", "Vygotsky", "Bruner", "Bandura"],
                correct: 1,
                explanation: "Vygotsky mengembangkan konsep ZPD sebagai area pembelajaran optimal dengan bantuan."
            },
            {
                question: "Scaffolding dalam pembelajaran berarti:",
                options: [
                    "Memberikan jawaban langsung",
                    "Dukungan sementara yang bertahap",
                    "Menghukum kesalahan",
                    "Pembelajaran mandiri sepenuhnya"
                ],
                correct: 1,
                explanation: "Scaffolding adalah dukungan bertahap yang dikurangi seiring kemajuan siswa."
            },
            {
                question: "Konflik kognitif dalam konstruktivisme berfungsi untuk:",
                options: [
                    "Menghambat pembelajaran",
                    "Memotivasi pembelajaran baru",
                    "Membuat siswa bingung",
                    "Mengurangi minat belajar"
                ],
                correct: 1,
                explanation: "Konflik kognitif memotivasi siswa untuk mencari pengetahuan baru dan memodifikasi pemahaman."
            },
            {
                question: "Pembelajaran konstruktivisme menekankan pada:",
                options: [
                    "Peran guru sebagai sumber utama",
                    "Peran aktif siswa",
                    "Pembelajaran pasif",
                    "Menghafal informasi"
                ],
                correct: 1,
                explanation: "Konstruktivisme menekankan peran aktif siswa dalam membangun pengetahuan sendiri."
            },
            {
                question: "Dalam discovery learning, peran guru adalah:",
                options: ["Memberikan semua jawaban", "Fasilitator", "Pengamat pasif", "Penguji"],
                correct: 1,
                explanation: "Guru berperan sebagai fasilitator yang membimbing proses penemuan siswa."
            },
            {
                question: "Tujuan utama pembelajaran konstruktivisme adalah:",
                options: [
                    "Menghapal fakta",
                    "Membangun pemahaman bermakna",
                    "Meniru guru",
                    "Lulus ujian"
                ],
                correct: 1,
                explanation: "Konstruktivisme bertujuan membangun pemahaman yang bermakna dan mendalam."
            }
        ];

        // Game state
        let currentGame = '';
        let gameScores = {
            matching: 0,
            discovery: 0,
            schema: 0,
            quiz: 0
        };

        let selectedConcept = null;
        let matchedPairs = 0;
        let currentQuizQuestion = 0;
        let quizScore = 0;

        function startGame(gameType) {
            currentGame = gameType;
            document.getElementById('main-menu').style.display = 'none';
            document.getElementById(gameType + '-game').classList.add('active');
            
            switch(gameType) {
                case 'matching':
                    initMatchingGame();
                    break;
                case 'discovery':
                    initDiscoveryGame();
                    break;
                case 'schema':
                    initSchemaGame();
                    break;
                case 'quiz':
                    initQuizGame();
                    break;
            }
        }

        function backToMenu() {
            document.querySelectorAll('.game-area').forEach(area => {
                area.classList.remove('active');
            });
            document.getElementById('main-menu').style.display = 'grid';
            resetGames();
        }

        function resetGames() {
            // Reset semua game states
            selectedConcept = null;
            matchedPairs = 0;
            currentQuizQuestion = 0;
            quizScore = 0;
            
            // Reset progress bars
            document.querySelectorAll('.progress-fill').forEach(bar => {
                bar.style.width = '0%';
            });
        }

        // Matching Game
        function initMatchingGame() {
            const conceptList = document.getElementById('concept-list');
            const definitionList = document.getElementById('definition-list');
            
            conceptList.innerHTML = '';
            definitionList.innerHTML = '';
            
            const concepts = Object.keys(conceptData);
            const definitions = Object.values(conceptData);
            
            // Shuffle definitions
            const shuffledDefinitions = [...definitions].sort(() => Math.random() - 0.5);
            
            concepts.forEach((concept, index) => {
                const conceptDiv = document.createElement('div');
                conceptDiv.className = 'concept-item';
                conceptDiv.textContent = concept;
                conceptDiv.onclick = () => selectConcept(concept, conceptDiv);
                conceptList.appendChild(conceptDiv);
            });
            
            shuffledDefinitions.forEach((definition, index) => {
                const definitionDiv = document.createElement('div');
                definitionDiv.className = 'definition-item';
                definitionDiv.textContent = definition;
                definitionDiv.onclick = () => selectDefinition(definition, definitionDiv);
                definitionList.appendChild(definitionDiv);
            });
            
            updateMatchingScore();
        }

        function selectConcept(concept, element) {
            document.querySelectorAll('.concept-item').forEach(item => {
                item.classList.remove('selected');
            });
            
            if (!element.classList.contains('matched')) {
                element.classList.add('selected');
                selectedConcept = concept;
            }
        }

        function selectDefinition(definition, element) {
            if (!selectedConcept || element.classList.contains('matched')) return;
            
            if (conceptData[selectedConcept] === definition) {
                // Benar!
                element.classList.add('matched');
                document.querySelectorAll('.concept-item').forEach(item => {
                    if (item.textContent === selectedConcept) {
                        item.classList.add('matched');
                    }
                });
                
                matchedPairs++;
                updateMatchingScore();
                
                if (matchedPairs === Object.keys(conceptData).length) {
                    showCelebration("Hebat! Anda berhasil mencocokkan semua konsep!");
                }
            } else {
                // Salah - beri feedback visual
                element.style.background = '#fed7d7';
                setTimeout(() => {
                    element.style.background = '';
                }, 1000);
            }
            
            selectedConcept = null;
            document.querySelectorAll('.concept-item').forEach(item => {
                item.classList.remove('selected');
            });
        }

        function updateMatchingScore() {
            const total = Object.keys(conceptData).length;
            document.getElementById('matching-score').textContent = `Skor: ${matchedPairs}/${total}`;
            document.getElementById('matching-progress').style.width = `${(matchedPairs/total)*100}%`;
        }

        // Discovery Learning Game
        function initDiscoveryGame() {
            const stagesContainer = document.getElementById('discovery-stages');
            const itemsContainer = document.getElementById('discovery-items');
            
            stagesContainer.innerHTML = '';
            itemsContainer.innerHTML = '';
            
            // Buat slot untuk tahapan
            discoveryStages.forEach((stage, index) => {
                const stageDiv = document.createElement('div');
                stageDiv.className = 'stage';
                stageDiv.dataset.order = index;
                stageDiv.innerHTML = `<strong>Tahap ${index + 1}</strong><br><span class="stage-content"></span>`;
                stageDiv.ondrop = drop;
                stageDiv.ondragover = allowDrop;
                stagesContainer.appendChild(stageDiv);
            });
            
            // Buat item yang bisa di-drag (acak)
            const shuffledStages = [...discoveryStages].sort(() => Math.random() - 0.5);
            shuffledStages.forEach((stage, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'draggable';
                itemDiv.textContent = stage;
                itemDiv.draggable = true;
                itemDiv.ondragstart = drag;
                itemDiv.id = `item-${index}`;
                itemsContainer.appendChild(itemDiv);
            });
            
            updateDiscoveryScore();
        }

        function allowDrop(ev) {
            ev.preventDefault();
        }

        function drag(ev) {
            ev.dataTransfer.setData("text", ev.target.id);
        }

        function drop(ev) {
            ev.preventDefault();
            const data = ev.dataTransfer.getData("text");
            const draggedItem = document.getElementById(data);
            const targetStage = ev.target.closest('.stage');
            
            if (targetStage && !targetStage.querySelector('.draggable')) {
                const expectedStage = discoveryStages[parseInt(targetStage.dataset.order)];
                
                if (draggedItem.textContent === expectedStage) {
                    targetStage.appendChild(draggedItem);
                    targetStage.classList.add('correct');
                    draggedItem.draggable = false;
                    
                    gameScores.discovery++;
                    updateDiscoveryScore();
                    
                    if (gameScores.discovery === discoveryStages.length) {
                        showCelebration("Sempurna! Anda menguasai tahapan Discovery Learning!");
                    }
                } else {
                    // Animasi salah
                    targetStage.style.background = '#fed7d7';
                    setTimeout(() => {
                        targetStage.style.background = '';
                    }, 1000);
                }
            }
        }

        function updateDiscoveryScore() {
            const total = discoveryStages.length;
            document.getElementById('discovery-score').textContent = `Tahapan Benar: ${gameScores.discovery}/${total}`;
            document.getElementById('discovery-progress').style.width = `${(gameScores.discovery/total)*100}%`;
        }

        // Schema Building Game
        function initSchemaGame() {
            const itemsContainer = document.getElementById('schema-items');
            itemsContainer.innerHTML = '';
            
            // Reset categories
            document.querySelectorAll('.schema-category').forEach(cat => {
                cat.innerHTML = '';
            });
            
            // Buat semua items dan acak
            const allItems = [];
            Object.keys(schemaElements).forEach(category => {
                schemaElements[category].forEach(item => {
                    allItems.push({text: item, category: category});
                });
            });
        }
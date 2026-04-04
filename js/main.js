document.addEventListener('DOMContentLoaded', () => {
    // 启动页逻辑
    const splash = document.getElementById('splashScreen');
    const mainApp = document.getElementById('mainApp');
    splash.addEventListener('click', () => {
        splash.classList.add('fade-out');
        setTimeout(() => {
            splash.style.display = 'none';
            mainApp.style.display = 'block';
            if (typeof window.initProgress === 'function') window.initProgress();
        }, 800);
    });

    // 模块HTML模板（含返回按钮）
    const modules = {
        spatial: `
            <div class="module">
                <button class="back-menu-btn" id="backToMenuBtn">← 返回菜单</button>
                <div class="module-header">
                    <h2 class="module-title">🏔️ 空间定位 · 诗从景来</h2>
                    <p class="module-subtitle">地理坐标中的文学震撼</p>
                </div>
                <div class="map-container">
                    <div class="map-controls">
                        <button class="map-btn active" id="modernMapBtn">🗺️ 现代地图</button>
                        <button class="map-btn" id="ancientMapBtn">🏯 古风地图</button>
                    </div>
                    <div id="map"></div>
                    <div class="map-caption">📍 岳阳楼（29.3746°N, 113.0968°E）· 洞庭湖 · 点击标注品读诗句</div>
                </div>
            </div>
        `,
        timeline: `
            <div class="module">
                <button class="back-menu-btn" id="backToMenuBtn">← 返回菜单</button>
                <div class="module-header">
                    <h2 class="module-title">📜 时间轴 · 文脉相承</h2>
                    <p class="module-subtitle">叠加效应：李白 → 杜甫 → 范仲淹 → 今日记忆</p>
                </div>
                <div class="timeline-container">
                    <input type="range" id="timelineSlider" class="timeline-slider" min="0" max="100" value="33">
                    <div class="timeline-labels">
                        <span>唐 (768)</span>
                        <span>宋 (1046)</span>
                        <span>当代</span>
                    </div>
                    <div id="poetryCard" class="poetry-card"></div>
                    <button id="autoPlayBtn" class="auto-play-btn">▶ 自动漫游 · 千年文脉</button>
                </div>
            </div>
        `,
        quiz: `
            <div class="module">
                <button class="back-menu-btn" id="backToMenuBtn">← 返回菜单</button>
                <div class="module-header">
                    <h2 class="module-title">✍️ 课后测试 · 深度研习</h2>
                    <p class="module-subtitle">基础通关 + 拓展挑战 + 深度鉴赏</p>
                </div>
                <!-- 填空题 -->
                <div class="quiz-section">
                    <div class="quiz-title">📝 一、诗词填空（基础通关）</div>
                    <div id="fillQuestionsContainer"></div>
                    <button id="submitFillBtn" class="btn-submit-module">📌 提交填空题 · 得分</button>
                    <div id="fillScore" class="score-badge" style="float:right;">填空题得分: 0/3</div>
                    <div style="clear:both"></div>
                </div>
                <!-- 匹配题（点击配对） -->
                <div class="quiz-section">
                    <div class="quiz-title">🔗 二、拓展挑战 · 匹配连线</div>
                    <div class="match-area">
                        <div class="match-column"><h3>📜 诗句卡片</h3><div id="poemsList"></div></div>
                        <div class="match-column"><h3>🎯 点击作者进行匹配</h3><div id="targetsList"></div></div>
                    </div>
                    <button id="submitMatchBtn" class="btn-submit-module">🎯 提交匹配题 · 得分</button>
                    <div id="matchScore" class="score-badge" style="float:right;">匹配得分: 0/4</div>
                    <div style="clear:both"></div>
                </div>
                <!-- 选择题 -->
                <div class="quiz-section">
                    <div class="quiz-title">🧠 三、深度鉴赏 · 选择题</div>
                    <div id="choiceQuestionsContainer"></div>
                    <button id="submitChoiceBtn" class="btn-submit-module">📖 提交选择题 · 得分</button>
                    <div id="choiceScore" class="score-badge" style="float:right;">选择题得分: 0/3</div>
                    <div style="clear:both"></div>
                </div>
                <div class="total-score" id="totalScoreDisplay">🏆 累计总分: 0 / 10</div>
                <div id="globalFeedback" class="feedback"></div>
            </div>
        `
    };

    // 全局总分更新函数（供各模块调用）
    window.updateTotalScore = function() {
        const fillSc = parseInt(document.getElementById('fillScore')?.innerText.match(/\d+/)?.[0] || '0');
        const matchSc = parseInt(document.getElementById('matchScore')?.innerText.match(/\d+/)?.[0] || '0');
        const choiceSc = parseInt(document.getElementById('choiceScore')?.innerText.match(/\d+/)?.[0] || '0');
        const total = fillSc + matchSc + choiceSc;
        const totalDisplay = document.getElementById('totalScoreDisplay');
        if (totalDisplay) totalDisplay.innerHTML = `🏆 累计总分: ${total} / 10`;
        if (total === 10) {
            canvasConfetti({ particleCount: 300, spread: 120, origin: { y: 0.5 } });
            const fb = document.getElementById('globalFeedback');
            if (fb) fb.innerHTML = "✨ 恭喜晋级！文脉相承，诗景共生，您已掌握杜甫《登岳阳楼》精粹 ✨";
            localStorage.setItem('quizPassed', 'true');
        } else {
            localStorage.setItem('quizPassed', 'false');
        }
        if (typeof window.updateProgressBadges === 'function') window.updateProgressBadges();
    };

    function loadModule(moduleName) {
        const container = document.getElementById('moduleContainer');
        container.innerHTML = modules[moduleName];
        // 绑定返回按钮
        const backBtn = document.getElementById('backToMenuBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                container.innerHTML = '';
                document.getElementById('cardsMenu').style.display = 'flex';
            });
        }
        // 隐藏菜单卡片
        document.getElementById('cardsMenu').style.display = 'none';

        // 初始化模块功能
        if (moduleName === 'spatial') {
            if (typeof window.initMapModule === 'function') window.initMapModule('map');
        } else if (moduleName === 'timeline') {
            if (typeof window.initTimelineModule === 'function') window.initTimelineModule();
        } else if (moduleName === 'quiz') {
            if (typeof window.initFillQuiz === 'function') window.initFillQuiz();
            if (typeof window.initMatchQuiz === 'function') window.initMatchQuiz();
            if (typeof window.initChoiceQuiz === 'function') window.initChoiceQuiz();
            setTimeout(() => {
                if (typeof window.updateTotalScore === 'function') window.updateTotalScore();
            }, 100);
        }
    }

    // 卡片点击事件
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const module = card.dataset.module;
            loadModule(module);
        });
    });

    // 初始状态：显示菜单卡片，模块容器为空
    document.getElementById('cardsMenu').style.display = 'flex';
});
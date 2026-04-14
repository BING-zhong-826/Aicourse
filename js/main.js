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

  // 模块 HTML 模板
  const modules = {
    spatial: `
      <div class="module">
        <button class="back-menu-btn" id="backToMenuBtn">← 返回菜单</button>
        <div class="module-header">
          <h2 class="module-title">🏔️ 空间定位 · 诗从景来</h2>
          <p class="module-subtitle">地理坐标中的文学震撼</p>
        </div>
        <div class="map-container">
          <div id="map"></div>
          <div class="map-caption">📍 岳阳楼 · 洞庭湖 · 吴地 · 楚地 — 点击标注品读诗句</div>
        </div>
      </div>
    `,
    timeline: `
      <div class="module">
        <!-- 时间轴内容由 initTimelineModule 动态生成 -->
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
          <div id="fillScore" class="score-badge" style="float:right;">填空题得分: 0/8</div>
          <div style="clear:both"></div>
        </div>
        <!-- 匹配题 -->
        <div class="quiz-section">
          <div class="quiz-title">🔗 二、拓展挑战 · 匹配连线</div>
          <div class="match-area">
            <div class="match-column"><h3>📜 诗句卡片</h3><div id="poemsList"></div></div>
            <div class="match-column"><h3>🎯 点击作者进行匹配</h3><div id="targetsList"></div></div>
          </div>
          <button id="submitMatchBtn" class="btn-submit-module">🎯 提交匹配题 · 得分</button>
          <div id="matchScore" class="score-badge" style="float:right;">匹配得分: 0/8</div>
          <div style="clear:both"></div>
        </div>
        <!-- 选择题 -->
        <div class="quiz-section">
          <div class="quiz-title">🧠 三、深度鉴赏 · 选择题</div>
          <div id="choiceQuestionsContainer"></div>
          <button id="submitChoiceBtn" class="btn-submit-module">📖 提交选择题 · 得分</button>
          <div id="choiceScore" class="score-badge" style="float:right;">选择题得分: 0/10</div>
          <div style="clear:both"></div>
        </div>
        <div class="total-score" id="totalScoreDisplay">🏆 累计总分: 0 / 26</div>
        <div id="globalFeedback" class="feedback"></div>
      </div>
    `
  };

  // 全局总分更新函数
  window.updateTotalScore = function() {
    const fillSc = parseInt(document.getElementById('fillScore')?.innerText.match(/\d+/)?.[0] || '0');
    const matchSc = parseInt(document.getElementById('matchScore')?.innerText.match(/\d+/)?.[0] || '0');
    const choiceSc = parseInt(document.getElementById('choiceScore')?.innerText.match(/\d+/)?.[0] || '0');
    const total = fillSc + matchSc + choiceSc;
    const totalDisplay = document.getElementById('totalScoreDisplay');
    if (totalDisplay) totalDisplay.innerHTML = `🏆 累计总分: ${total} / 26`;
    if (total === 26) {
      canvasConfetti({ particleCount: 300, spread: 120, origin: { y: 0.5 } });
      const fb = document.getElementById('globalFeedback');
      if (fb) fb.innerHTML = "✨ 恭喜晋级！文脉相承，诗景共生，您已掌握杜甫《登岳阳楼》精粹 ✨";
      localStorage.setItem('quizPassed', 'true');
    } else {
      localStorage.setItem('quizPassed', 'false');
    }
    if (typeof window.updateProgressBadges === 'function') window.updateProgressBadges();
  };

  // 加载模块
  function loadModule(moduleName) {
    const container = document.getElementById('moduleContainer');
    container.innerHTML = modules[moduleName];
    const backBtn = document.getElementById('backToMenuBtn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        container.innerHTML = '';
        document.getElementById('cardsMenu').style.display = 'flex';
      });
    }
    document.getElementById('cardsMenu').style.display = 'none';

    if (moduleName === 'spatial') {
      if (typeof window.initMapModule === 'function') window.initMapModule('map');
    } else if (moduleName === 'timeline') {
      if (typeof window.initTimelineModule === 'function') window.initTimelineModule();
    } else if (moduleName === 'quiz') {
      if (typeof window.initFillQuiz === 'function') window.initFillQuiz();
      if (typeof window.initMatchQuiz === 'function') window.initMatchQuiz();
      if (typeof window.initChoiceQuiz === 'function') window.initChoiceQuiz();
      setTimeout(() => { if (typeof window.updateTotalScore === 'function') window.updateTotalScore(); }, 100);
    }
  }

  // 卡片点击事件
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', () => loadModule(card.dataset.module));
  });

  // 初始显示菜单卡片
  document.getElementById('cardsMenu').style.display = 'flex';
});
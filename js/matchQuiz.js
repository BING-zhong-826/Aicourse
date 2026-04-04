// 原始匹配数据
const rawMatchData = [
    { text: "气蒸云梦泽，波撼岳阳城。", correct: "孟浩然《望洞庭湖赠张丞相》" },
    { text: "楼观岳阳尽，川迥洞庭开。", correct: "李白《与夏十二登岳阳楼》" },
    { text: "吴楚东南坼，乾坤日夜浮。", correct: "杜甫《登岳阳楼》" },
    { text: "先天下之忧而忧，后天下之乐而乐。", correct: "范仲淹《岳阳楼记》" }
];

let matchItems = [];      // 存储打乱后的诗句列表 [{ text, correct, matched }]
let targetOptions = [];   // 存储打乱后的作者列表 [{ name, matched }]
let selectedItemIndex = null;  // 当前选中的诗句索引
let selectedTargetIndex = null; // 当前选中的作者索引（仅用于高亮）

// 打乱数组函数
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// 初始化或重置匹配数据（顺序打乱）
function initMatchData() {
    matchItems = rawMatchData.map(item => ({
        text: item.text,
        correct: item.correct,
        matched: false
    }));
    matchItems = shuffleArray(matchItems);

    const uniqueTargets = [...new Set(rawMatchData.map(item => item.correct))];
    targetOptions = uniqueTargets.map(name => ({ name, matched: false }));
    targetOptions = shuffleArray(targetOptions);
}

// 清除所有高亮
function clearHighlights() {
    document.querySelectorAll('.match-card').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.target-zone').forEach(t => t.classList.remove('selected'));
}

// 渲染匹配界面（诗句卡片 + 作者卡片）
function renderMatch() {
    const poemsContainer = document.getElementById('poemsList');
    const targetsContainer = document.getElementById('targetsList');
    if (!poemsContainer || !targetsContainer) return;

    // 渲染左侧诗句卡片
    poemsContainer.innerHTML = '';
    matchItems.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = `match-card ${item.matched ? 'matched' : ''}`;
        card.textContent = `“${item.text}”`;
        card.dataset.index = idx;
        if (!item.matched) {
            card.addEventListener('click', () => {
                // 清除所有高亮
                clearHighlights();
                // 高亮当前诗句
                card.classList.add('selected');
                selectedItemIndex = idx;
                selectedTargetIndex = null;
            });
        } else {
            card.style.cursor = 'default';
        }
        poemsContainer.appendChild(card);
    });

    // 渲染右侧作者卡片
    targetsContainer.innerHTML = '';
    targetOptions.forEach((target, idx) => {
        const zone = document.createElement('div');
        zone.className = `target-zone ${target.matched ? 'matched' : ''}`;
        zone.textContent = target.name;
        zone.dataset.targetIdx = idx;
        if (!target.matched) {
            zone.addEventListener('click', () => {
                // 先清除其他作者高亮，然后高亮当前作者
                document.querySelectorAll('.target-zone').forEach(t => t.classList.remove('selected'));
                zone.classList.add('selected');
                selectedTargetIndex = idx;

                if (selectedItemIndex === null) {
                    const fb = document.getElementById('globalFeedback');
                    if (fb) fb.innerHTML = '⚠️ 请先点击选择一句诗句';
                    setTimeout(() => { if (fb) fb.innerHTML = ''; }, 1500);
                    // 延迟清除作者高亮
                    setTimeout(() => zone.classList.remove('selected'), 1000);
                    return;
                }
                const selectedItem = matchItems[selectedItemIndex];
                if (selectedItem.matched) {
                    const fb = document.getElementById('globalFeedback');
                    if (fb) fb.innerHTML = '❓ 这句诗已经配对过了';
                    setTimeout(() => { if (fb) fb.innerHTML = ''; }, 1500);
                    zone.classList.remove('selected');
                    return;
                }
                if (selectedItem.correct === target.name) {
                    // 配对成功
                    selectedItem.matched = true;
                    target.matched = true;
                    canvasConfetti({ particleCount: 80, spread: 60, origin: { y: 0.6 }, colors: ['#b46a3c', '#e9b35f'] });
                    const fb = document.getElementById('globalFeedback');
                    if (fb) fb.innerHTML = `🎉 配对成功！「${selectedItem.text}」 → ${target.name}`;
                    setTimeout(() => {
                        if (fb && fb.innerHTML.includes('配对成功')) fb.innerHTML = '';
                    }, 2000);
                    selectedItemIndex = null;
                    selectedTargetIndex = null;
                    clearHighlights();
                    renderMatch(); // 重新渲染
                } else {
                    const fb = document.getElementById('globalFeedback');
                    if (fb) fb.innerHTML = `❌ 配对错误：「${selectedItem.text}」不属于 ${target.name}，再试试看～`;
                    setTimeout(() => {
                        if (fb && fb.innerHTML.includes('配对错误')) fb.innerHTML = '';
                    }, 1500);
                    // 配对错误：只清除作者高亮，诗句高亮保留以便重选
                    zone.classList.remove('selected');
                    // 注意：不清除 selectedItemIndex，诗句仍保持高亮
                }
            });
        } else {
            zone.style.cursor = 'default';
            zone.style.opacity = '0.7';
        }
        targetsContainer.appendChild(zone);
    });

    // 如果有之前选中的诗句，恢复高亮（重绘后需要重新绑定）
    if (selectedItemIndex !== null && matchItems[selectedItemIndex] && !matchItems[selectedItemIndex].matched) {
        const cards = document.querySelectorAll('.match-card');
        if (cards[selectedItemIndex]) cards[selectedItemIndex].classList.add('selected');
    }
}

// 计算当前匹配得分
function calcMatchScore() {
    return matchItems.filter(item => item.matched).length;
}

// 外部调用初始化
window.initMatchQuiz = function() {
    initMatchData();
    selectedItemIndex = null;
    selectedTargetIndex = null;
    renderMatch();

    const submitBtn = document.getElementById('submitMatchBtn');
    if (submitBtn) {
        const newBtn = submitBtn.cloneNode(true);
        submitBtn.parentNode.replaceChild(newBtn, submitBtn);
        newBtn.addEventListener('click', () => {
            const score = calcMatchScore();
            const scoreSpan = document.getElementById('matchScore');
            if (scoreSpan) scoreSpan.innerHTML = `匹配得分: ${score}/4`;
            if (typeof window.updateTotalScore === 'function') window.updateTotalScore();
            if (score === 4) {
                canvasConfetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
                const fb = document.getElementById('globalFeedback');
                if (fb) fb.innerHTML = "🎉 恭喜！匹配题全对！文学景观叠加效应理解深刻！";
            }
        });
    }
};
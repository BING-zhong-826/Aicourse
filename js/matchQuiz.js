const matchData = [
    { text: "气蒸云梦泽，波撼岳阳城。", correct: "孟浩然《望洞庭湖赠张丞相》" },
    { text: "楼观岳阳尽，川迥洞庭开。", correct: "李白《与夏十二登岳阳楼》" },
    { text: "吴楚东南坼，乾坤日夜浮。", correct: "杜甫《登岳阳楼》" },
    { text: "先天下之忧而忧，后天下之乐而乐。", correct: "范仲淹《岳阳楼记》" }
];
let matchState = [false, false, false, false];
let draggedIndex = null;

function renderMatch() {
    const poemsContainer = document.getElementById('poemsList');
    const targetsContainer = document.getElementById('targetsList');
    if (!poemsContainer || !targetsContainer) return;
    poemsContainer.innerHTML = '';
    targetsContainer.innerHTML = '';

    matchData.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = `match-card ${matchState[idx] ? 'matched' : ''}`;
        card.setAttribute('draggable', !matchState[idx]);
        card.textContent = `“${item.text}”`;
        card.dataset.index = idx;
        if (!matchState[idx]) {
            card.addEventListener('dragstart', (e) => {
                draggedIndex = idx;
                e.dataTransfer.setData('text/plain', idx);
                card.classList.add('dragging');
            });
            card.addEventListener('dragend', () => {
                card.classList.remove('dragging');
                draggedIndex = null;
            });
        }
        poemsContainer.appendChild(card);
    });

    const targets = ["孟浩然《望洞庭湖赠张丞相》", "李白《与夏十二登岳阳楼》", "杜甫《登岳阳楼》", "范仲淹《岳阳楼记》"];
    targets.forEach(target => {
        const zone = document.createElement('div');
        zone.className = 'target-zone';
        zone.textContent = target;
        zone.setAttribute('data-target', target);
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('drag-over');
        });
        zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            if (draggedIndex === null) return;
            const poem = matchData[draggedIndex];
            if (matchState[draggedIndex]) return;
            if (poem.correct === target) {
                matchState[draggedIndex] = true;
                canvasConfetti({ particleCount: 80, spread: 60, origin: { y: 0.6 }, colors: ['#b46a3c', '#e9b35f'] });
                document.getElementById('globalFeedback').innerHTML = `🎉 配对成功！「${poem.text}」 → ${target}`;
                setTimeout(() => {
                    if (document.getElementById('globalFeedback').innerHTML.includes('配对成功'))
                        document.getElementById('globalFeedback').innerHTML = '';
                }, 2000);
                renderMatch();
            } else {
                document.getElementById('globalFeedback').innerHTML = `❌ 配对错误：「${poem.text}」不属于 ${target}，再试试看～`;
                setTimeout(() => {
                    if (document.getElementById('globalFeedback').innerHTML.includes('配对错误'))
                        document.getElementById('globalFeedback').innerHTML = '';
                }, 1500);
            }
        });
        targetsContainer.appendChild(zone);
    });
}

function calcMatchScore() {
    return matchState.filter(v => v === true).length;
}

function initMatchQuiz() {
    renderMatch();
    document.getElementById('submitMatchBtn').onclick = () => {
        const score = calcMatchScore();
        document.getElementById('matchScore').innerHTML = `匹配得分: ${score}/4`;
        if (typeof window.updateTotalScore === 'function') window.updateTotalScore();
        if (score === 4) {
            canvasConfetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
            document.getElementById('globalFeedback').innerHTML = "🎉 恭喜！匹配题全对！文学景观叠加效应理解深刻！";
        }
    };
}

window.initMatchQuiz = initMatchQuiz;
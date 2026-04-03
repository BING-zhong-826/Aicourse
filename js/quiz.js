/**
 * 模块三：互动测验
 * 实现诗句与作者的匹配功能
 */

// 测验数据
const quizData = [
    {
        id: 0,
        text: '气蒸云梦泽，波撼岳阳城。',
        correctMatch: '孟浩然《望洞庭湖赠张丞相》',
        category: '孟浩然'
    },
    {
        id: 1,
        text: '楼观岳阳尽，川迥洞庭开。',
        correctMatch: '李白《与夏十二登岳阳楼》',
        category: '李白'
    },
    {
        id: 2,
        text: '吴楚东南坼，乾坤日夜浮。',
        correctMatch: '杜甫《登岳阳楼》',
        category: '杜甫'
    },
    {
        id: 3,
        text: '先天下之忧而忧，后天下之乐而乐。',
        correctMatch: '范仲淹《岳阳楼记》',
        category: '范仲淹'
    }
];

const targetOptions = [
    '孟浩然《望洞庭湖赠张丞相》',
    '李白《与夏十二登岳阳楼》',
    '杜甫《登岳阳楼》',
    '范仲淹《岳阳楼记》'
];

// 状态管理
let quizState = {
    matchedItems: {},      // { 诗句id: true }
    matchedTargets: {}     // { 目标文本: true }
};
let selectedItemId = null;
let score = 0;

// 渲染测验界面
function renderQuiz() {
    const itemsContainer = document.getElementById('quizItems');
    const targetsContainer = document.getElementById('quizTargets');
    
    if (!itemsContainer || !targetsContainer) return;
    
    // 渲染诗句列表
    itemsContainer.innerHTML = '';
    quizData.forEach(item => {
        const isMatched = quizState.matchedItems[item.id];
        const div = document.createElement('div');
        div.className = `quiz-item ${isMatched ? 'matched' : ''}`;
        div.textContent = `“${item.text}”`;
        if (!isMatched) {
            div.addEventListener('click', () => selectItem(item.id));
        }
        itemsContainer.appendChild(div);
    });
    
    // 渲染目标选项
    targetsContainer.innerHTML = '';
    targetOptions.forEach(target => {
        const isMatched = quizState.matchedTargets[target];
        const div = document.createElement('div');
        div.className = `quiz-target ${isMatched ? 'matched' : ''}`;
        div.textContent = target;
        if (!isMatched) {
            div.addEventListener('click', () => selectTarget(target));
        }
        targetsContainer.appendChild(div);
    });
    
    // 更新得分显示
    updateScoreDisplay();
    
    // 检查是否全部完成
    checkCompletion();
}

// 选中诗句
function selectItem(itemId) {
    if (quizState.matchedItems[itemId]) return;
    selectedItemId = itemId;
    highlightSelectedItem(itemId);
    
    // 清除高亮
    document.querySelectorAll('.quiz-item').forEach(el => {
        el.classList.remove('selected');
    });
    const selectedEl = document.querySelector(`.quiz-item:nth-child(${itemId + 1})`);
    if (selectedEl) selectedEl.classList.add('selected');
}

// 选中目标
function selectTarget(targetText) {
    if (quizState.matchedTargets[targetText]) return;
    
    if (selectedItemId === null) {
        showMessage('⚠️ 请先选择一句诗句', 'warning');
        return;
    }
    
    const selectedItem = quizData.find(item => item.id === selectedItemId);
    if (!selectedItem) return;
    
    if (selectedItem.correctMatch === targetText) {
        // 匹配成功
        quizState.matchedItems[selectedItemId] = true;
        quizState.matchedTargets[targetText] = true;
        selectedItemId = null;
        renderQuiz();
        showMessage('✅ 匹配正确！', 'success');
    } else {
        // 匹配失败
        showMessage(`❌ 匹配错误！“${selectedItem.text}” 对应的作者是 ${selectedItem.correctMatch}`, 'error');
    }
}

// 高亮选中的诗句
function highlightSelectedItem(itemId) {
    document.querySelectorAll('.quiz-item').forEach((el, idx) => {
        if (idx === itemId) {
            el.style.border = '2px solid #b76e3e';
        } else {
            el.style.border = '1px solid #e0d6c0';
        }
    });
}

// 更新得分显示
function updateScoreDisplay() {
    const matchedCount = Object.keys(quizState.matchedItems).length;
    score = matchedCount;
    const scoreDisplay = document.getElementById('quizScore');
    if (scoreDisplay) {
        scoreDisplay.textContent = `匹配成功：${score} / ${quizData.length}`;
    }
}

// 检查是否全部完成
function checkCompletion() {
    const allMatched = Object.keys(quizState.matchedItems).length === quizData.length;
    if (allMatched) {
        showMessage('🎉 恭喜！全部匹配正确！你已成为“文学景观”鉴赏专家！🎉', 'success');
    }
}

// 显示消息
function showMessage(msg, type) {
    const msgDiv = document.getElementById('quizMessage');
    if (!msgDiv) return;
    msgDiv.textContent = msg;
    msgDiv.style.color = type === 'success' ? '#2e7d64' : (type === 'error' ? '#b22222' : '#b76e3e');
    setTimeout(() => {
        if (msgDiv) msgDiv.textContent = '';
    }, 3000);
}

// 重置测验
function resetQuiz() {
    quizState = {
        matchedItems: {},
        matchedTargets: {}
    };
    selectedItemId = null;
    renderQuiz();
    showMessage('🔄 已重置，重新挑战吧！', 'info');
}

// 初始化测验
function initQuiz() {
    renderQuiz();
    
    const resetBtn = document.getElementById('quizResetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetQuiz);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initQuiz);
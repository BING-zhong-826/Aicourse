const fillQuestions = [
    { text: "杜甫在《登岳阳楼》中用“_______________，________________”两句，写出了国家动荡不安、自己报国无门只有独自流泪的深沉的家国情怀。", ans1: "戎马关山北", ans2: "凭轩涕泗流" },
    { text: "孟浩然的“气蒸云梦泽，波撼岳阳城”与杜甫《登岳阳楼》中的“_______________，_______________”都写出了洞庭湖浩瀚无垠的磅礴气势。", ans1: "吴楚东南坼", ans2: "乾坤日夜浮" },
    { text: "杜甫《登高》“万里悲秋常作客，百年多病独登台”描写晚年孤独，《登岳阳楼》中“_______________，_______________”也写出类似境况。", ans1: "亲朋无一字", ans2: "老病有孤舟" }
];

function renderFillQuiz() {
    const container = document.getElementById('fillQuestionsContainer');
    if (!container) return;
    let html = '';
    fillQuestions.forEach((q, idx) => {
        html += `
            <div class="fill-blank-item" data-idx="${idx}">
                <div class="fill-question">${idx+1}. ${q.text}</div>
                <input type="text" class="fill-input" placeholder="上句" data-ans="${q.ans1}">
                <input type="text" class="fill-input" placeholder="下句" data-ans="${q.ans2}">
                <span class="fill-feedback"></span>
            </div>
        `;
    });
    container.innerHTML = html;
}

function checkFill() {
    let score = 0;
    const items = document.querySelectorAll('.fill-blank-item');
    items.forEach(item => {
        const inputs = item.querySelectorAll('.fill-input');
        const ans1 = inputs[0].getAttribute('data-ans');
        const ans2 = inputs[1].getAttribute('data-ans');
        const val1 = inputs[0].value.trim();
        const val2 = inputs[1].value.trim();
        const fbSpan = item.querySelector('.fill-feedback');
        if (val1 === ans1 && val2 === ans2) {
            score++;
            fbSpan.innerHTML = ' ✓ 正确';
            fbSpan.style.color = '#2e7d64';
        } else {
            fbSpan.innerHTML = ` ✗ 正确答案：${ans1} ${ans2}`;
            fbSpan.style.color = '#b22222';
        }
    });
    document.getElementById('fillScore').innerHTML = `填空题得分: ${score}/3`;
    return score;
}

window.initFillQuiz = function() {
    renderFillQuiz();
    const submitBtn = document.getElementById('submitFillBtn');
    if (submitBtn) {
        submitBtn.onclick = () => {
            checkFill();
            if (typeof window.updateTotalScore === 'function') window.updateTotalScore();
        };
    }
};
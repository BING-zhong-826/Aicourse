const choiceQuestions = [
    {
        text: "下列对杜甫称号、诗歌风格与《登岳阳楼》的理解，不正确的一项是（ ）",
        options: [
            "A. 杜甫被后人尊为“诗圣”，其诗歌因真实记录时代变故被称为“诗史”。",
            "B. “亲朋无一字，老病有孤舟”集中体现了杜诗“沉郁顿挫”的风格。",
            "C. 这两句只写了诗人晚年孤独漂泊的个人境遇，与家国命运无关。",
            "D. 诗人将个人身世之悲与时代离乱融为一体，正是“诗史”精神的体现。"
        ],
        correct: "C"
    },
    {
        text: "“亲朋无一字，老病有孤舟”之所以能体现杜甫“诗史”性质与“沉郁顿挫”风格，原因不包括（ ）",
        options: [
            "A. 诗句沉挚悲凉，情感深沉蕴藉，符合“沉郁顿挫”的特点。",
            "B. 诗人孤苦无依的处境，正是战乱时代普通百姓命运的缩影。",
            "C. 个人漂泊无依的“个人史”，折射出唐王朝动荡不安的“家国史”。",
            "D. 诗句意境开阔雄浑，以壮丽景色展现盛唐气象，故称“诗史”。"
        ],
        correct: "D"
    },
    {
        text: "关于“诗圣”“诗史”“沉郁顿挫”与“亲朋无一字，老病有孤舟”的关系，下列说法正确的一项是（ ）",
        options: [
            "A. “沉郁顿挫”是李白诗歌的主要风格，与杜甫无关。",
            "B. 这两句诗抒写个人老病孤愁，暗含对家国离乱的感慨，是“诗史”的体现。",
            "C. 只有描写战争和历史事件的诗作才算“诗史”，抒情诗句不算。",
            "D. “诗圣”是对杜甫诗歌想象奇特、风格豪放的高度赞誉。"
        ],
        correct: "B"
    }
];

function renderChoiceQuiz() {
    const container = document.getElementById('choiceQuestionsContainer');
    if (!container) return;
    let html = '';
    choiceQuestions.forEach((q, idx) => {
        html += `<div class="choice-item" data-q="${idx}">
                    <div class="fill-question">${idx+1}. ${q.text}</div>`;
        q.options.forEach(opt => {
            html += `<label class="choice-option">
                        <input type="radio" name="choice${idx}" value="${opt.charAt(0)}"> ${opt}
                     </label>`;
        });
        html += `</div>`;
    });
    container.innerHTML = html;
}

function calcChoiceScore() {
    let score = 0;
    for (let i = 0; i < choiceQuestions.length; i++) {
        const selected = document.querySelector(`input[name="choice${i}"]:checked`);
        if (selected && selected.value === choiceQuestions[i].correct) score++;
    }
    return score;
}

window.initChoiceQuiz = function() {
    renderChoiceQuiz();
    const submitBtn = document.getElementById('submitChoiceBtn');
    if (submitBtn) {
        submitBtn.onclick = () => {
            const score = calcChoiceScore();
            document.getElementById('choiceScore').innerHTML = `选择题得分: ${score}/3`;
            if (typeof window.updateTotalScore === 'function') window.updateTotalScore();
        };
    }
};
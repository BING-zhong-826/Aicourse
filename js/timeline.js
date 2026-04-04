const timelineData = {
    tang: {
        period: "唐代 · 大历三年（768年）",
        desc: "杜甫漂泊岳州，登楼望洞庭，感时伤怀。",
        poems: [
            { author: "李白", title: "与夏十二登岳阳楼", content: "楼观岳阳尽，川迥洞庭开。雁引愁心去，山衔好月来。", note: "李白定名" },
            { author: "杜甫", title: "登岳阳楼", content: "吴楚东南坼，乾坤日夜浮。亲朋无一字，老病有孤舟。", note: "沉郁顿挫，家国同悲" }
        ]
    },
    song: {
        period: "宋代 · 庆历六年（1046年）",
        desc: "范仲淹《岳阳楼记》注入「先忧后乐」精神。",
        poems: [
            { author: "范仲淹", title: "岳阳楼记", content: "不以物喜，不以己悲；先天下之忧而忧，后天下之乐而乐。", note: "千古名句" }
        ]
    },
    modern: {
        period: "当代",
        desc: "岳阳楼成为文学景观典范，叠加效应世代相传。",
        poems: [
            { author: "文脉记忆", title: "诗景共生", content: "李白、杜甫、范仲淹…… 文学赋予景观永恒生命。", note: "「山水藉文章以显，文章亦凭山水以传」" }
        ]
    }
};

let timelineSlider, autoInterval;

function renderTimeline(periodKey) {
    const data = timelineData[periodKey];
    const container = document.getElementById('poetryCard');
    if (!data) return;
    let html = `<h3>📜 ${data.period}</h3><p>${data.desc}</p>`;
    data.poems.forEach(p => {
        html += `<div style="margin:16px 0;"><b>${p.author} · ${p.title}</b>
        <div class="poetry-quote">${p.content}</div>
        <div style="font-size:0.85rem;">📌 ${p.note}</div>
        <button class="audio-btn" onclick="speakText('${p.content.replace(/'/g, "\\'")}')">🔊 朗诵</button></div>`;
    });
    container.innerHTML = html;
    localStorage.setItem('timelineVisited', 'true');
    if (typeof window.updateProgressBadges === 'function') window.updateProgressBadges();
}

function updateTimeline(value) {
    if (value <= 33) renderTimeline('tang');
    else if (value <= 66) renderTimeline('song');
    else renderTimeline('modern');
}

window.initTimelineModule = function() {
    const slider = document.getElementById('timelineSlider');
    if (!slider) return;
    timelineSlider = slider;
    updateTimeline(33);
    slider.value = 33;
    slider.addEventListener('input', (e) => updateTimeline(parseInt(e.target.value)));
    
    const autoBtn = document.getElementById('autoPlayBtn');
    if (autoBtn) {
        autoBtn.onclick = () => {
            if (autoInterval) clearInterval(autoInterval);
            let val = 0;
            slider.value = 0;
            updateTimeline(0);
            autoInterval = setInterval(() => {
                if (val <= 100) {
                    slider.value = val;
                    updateTimeline(val);
                    val += 2;
                } else clearInterval(autoInterval);
            }, 60);
        };
    }
};
/**
 * 模块二：时间轴叙事
 * 实现滑块滑动、诗歌卡片动态渲染、自动漫游功能
 */

// 时间轴数据
const timelineData = {
    tang: {
        period: '唐代（大历三年 · 768年）',
        description: '杜甫漂泊至岳州，登临向往已久的岳阳楼，面对浩瀚洞庭湖，写下千古名篇。',
        poems: [
            {
                author: '李白',
                title: '与夏十二登岳阳楼',
                content: '楼观岳阳尽，川迥洞庭开。\n雁引愁心去，山衔好月来。\n云间连下榻，天上接行杯。\n醉后凉风起，吹人舞袖回。',
                note: '李白为岳阳楼定名之作，豪迈浪漫。',
                audioUrl: null
            },
            {
                author: '杜甫',
                title: '登岳阳楼',
                content: '昔闻洞庭水，今上岳阳楼。\n吴楚东南坼，乾坤日夜浮。\n亲朋无一字，老病有孤舟。\n戎马关山北，凭轩涕泗流。',
                note: '被誉为“盛唐五律第一”。前四句写景壮阔，后四句抒情深沉，体现了“沉郁顿挫”的风格。',
                audioUrl: null
            }
        ]
    },
    song: {
        period: '宋代（庆历六年 · 1046年）',
        description: '范仲淹受滕子京函请，依据《洞庭晚秋图》写下《岳阳楼记》，虽未亲临岳阳楼，却将“先忧后乐”的精神注入文学景观。',
        poems: [
            {
                author: '范仲淹',
                title: '岳阳楼记（节选）',
                content: '予观夫巴陵胜状，在洞庭一湖。衔远山，吞长江，浩浩汤汤，横无际涯；朝晖夕阴，气象万千。……不以物喜，不以己悲。居庙堂之高则忧其民，处江湖之远则忧其君。先天下之忧而忧，后天下之乐而乐。',
                note: '千古名篇，“先忧后乐”成为中华民族的精神坐标。',
                audioUrl: null
            },
            {
                author: '袁中道',
                title: '游岳阳楼记（明代）',
                content: '洞庭为沅湘等九水之委，当其涸时，如匹练耳；及春夏间，九水发而后有湖。',
                note: '明代文人续写岳阳楼文学谱系。',
                audioUrl: null
            }
        ]
    },
    modern: {
        period: '当代',
        description: '岳阳楼历经千年，其文学形象不断累积，成为中华民族的文化记忆。今日游客登临岳阳楼，依然能感受到杜甫当年的家国情怀。',
        poems: [
            {
                author: '文学记忆',
                title: '叠加效应',
                content: '李白赋诗定名 → 杜甫书写壮阔与悲凉 → 范仲淹注入“先忧后乐”精神 → 袁中道等明代文人续写 → 岳阳楼成为集大成的“文学景观”。',
                note: '“山水藉文章以显，文章亦凭山水以传。”——尤侗',
                audioUrl: null
            }
        ]
    }
};

let currentTimelineValue = 33;
let autoPlayInterval = null;
let currentAudio = null;

// 根据滑块值获取当前时代
function getPeriodBySliderValue(value) {
    if (value <= 33) return 'tang';
    if (value <= 66) return 'song';
    return 'modern';
}

// 渲染诗歌卡片
function renderPoetryCard(periodKey) {
    const data = timelineData[periodKey];
    if (!data) return;
    
    const card = document.getElementById('poetryCard');
    if (!card) return;
    
    let poemsHtml = '';
    data.poems.forEach((poem, index) => {
        const audioBtnId = `audio-btn-${periodKey}-${index}`;
        poemsHtml += `
            <div style="margin-bottom: 20px; border-bottom: 1px dashed #e0d6c0; padding-bottom: 16px;">
                <h4>📖 ${poem.author} · 《${poem.title}》</h4>
                <div class="poetry-quote">${poem.content.replace(/\n/g, '<br>')}</div>
                <p style="font-size: 0.85rem; color: #6b5a4a;">📝 ${poem.note}</p>
                <button class="poetry-audio" data-period="${periodKey}" data-index="${index}" id="${audioBtnId}">
                    🔊 朗诵此篇
                </button>
            </div>
        `;
    });
    
    card.innerHTML = `
        <h3>📜 ${data.period}</h3>
        <p>${data.description}</p>
        ${poemsHtml}
    `;
    
    // 绑定音频按钮事件（音频使用 Web Speech API 实现朗诵）
    data.poems.forEach((poem, index) => {
        const btn = document.getElementById(`audio-btn-${periodKey}-${index}`);
        if (btn && poem.content) {
            btn.addEventListener('click', () => {
                // 使用 Web Speech API 朗读诗词
                if ('speechSynthesis' in window) {
                    if (currentAudio) {
                        window.speechSynthesis.cancel();
                    }
                    const utterance = new SpeechSynthesisUtterance(poem.content);
                    utterance.lang = 'zh-CN';
                    utterance.rate = 0.9;
                    window.speechSynthesis.speak(utterance);
                    currentAudio = utterance;
                } else {
                    alert('您的浏览器不支持语音朗诵功能');
                }
            });
        }
    });
}

// 更新时间轴滑块位置对应的显示
function updateTimeline(value) {
    currentTimelineValue = value;
    const period = getPeriodBySliderValue(value);
    renderPoetryCard(period);
    
    // 移动指示点（简单动画）
    const dot = document.getElementById('timelineDot');
    if (dot) {
        const percent = value / 100;
        const containerWidth = dot.parentElement.clientWidth - 8;
        dot.style.marginLeft = `${percent * containerWidth}px`;
    }
}

// 自动漫游功能
function startAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
    
    const slider = document.getElementById('timelineSlider');
    let currentVal = 0;
    slider.value = 0;
    updateTimeline(0);
    
    autoPlayInterval = setInterval(() => {
        if (currentVal <= 100) {
            slider.value = currentVal;
            updateTimeline(currentVal);
            currentVal += 2;
        } else {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
            // 播放完成，显示完成提示
            const msg = document.getElementById('quizMessage');
            if (msg) {
                msg.textContent = '✨ 时间轴漫游完成！从唐代到当代，感受岳阳楼文脉的千年传承 ✨';
                setTimeout(() => {
                    if (msg) msg.textContent = '';
                }, 3000);
            }
        }
    }, 80);
}

// 初始化时间轴
function initTimeline() {
    const slider = document.getElementById('timelineSlider');
    if (!slider) return;
    
    // 初始渲染（唐代）
    updateTimeline(33);
    slider.value = 33;
    
    // 监听滑块变化
    slider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        updateTimeline(val);
    });
    
    // 绑定自动播放按钮
    const autoPlayBtn = document.getElementById('autoPlayBtn');
    if (autoPlayBtn) {
        autoPlayBtn.addEventListener('click', startAutoPlay);
    }
    
    // 绑定时间轴标签点击
    const labels = document.querySelectorAll('.timeline-label');
    labels.forEach(label => {
        label.addEventListener('click', () => {
            const value = parseInt(label.getAttribute('data-value'), 10);
            if (!isNaN(value)) {
                slider.value = value;
                updateTimeline(value);
            }
        });
    });
}

// 页面加载完成后初始化时间轴
document.addEventListener('DOMContentLoaded', initTimeline);
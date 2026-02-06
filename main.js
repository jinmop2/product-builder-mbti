// Data Definitions (Korean)
const MBTI_TYPES = [
  // Analysts (NT) - 보라
  { code: 'INTJ', group: 'NT', label: '전략가', desc: '용의주도한 전략가', emoji: '🧠', preferences: ['I', 'N', 'T', 'J'] },
  { code: 'INTP', group: 'NT', label: '논리술사', desc: '논리적인 사색가', emoji: '🧪', preferences: ['I', 'N', 'T', 'P'] },
  { code: 'ENTJ', group: 'NT', label: '통솔자', desc: '대담한 통솔자', emoji: '🫡', preferences: ['E', 'N', 'T', 'J'] },
  { code: 'ENTP', group: 'NT', label: '변론가', desc: '뜨거운 논쟁을 즐기는 변론가', emoji: '🗣️', preferences: ['E', 'N', 'T', 'P'] },
  // Diplomats (NF) - 초록
  { code: 'INFJ', group: 'NF', label: '옹호자', desc: '선의의 옹호자', emoji: '🧙', preferences: ['I', 'N', 'F', 'J'] },
  { code: 'INFP', group: 'NF', label: '중재자', desc: '열정적인 중재자', emoji: '🌻', preferences: ['I', 'N', 'F', 'P'] },
  { code: 'ENFJ', group: 'NF', label: '선도자', desc: '정의로운 사회운동가', emoji: '⚔️', preferences: ['E', 'N', 'F', 'J'] },
  { code: 'ENFP', group: 'NF', label: '활동가', desc: '재기발랄한 활동가', emoji: '🦄', preferences: ['E', 'N', 'F', 'P'] },
  // Sentinels (SJ) - 파랑
  { code: 'ISTJ', group: 'SJ', label: '현실주의자', desc: '청렴결백한 논리주의자', emoji: '📊', preferences: ['I', 'S', 'T', 'J'] },
  { code: 'ISFJ', group: 'SJ', label: '수호자', desc: '용감한 수호자', emoji: '🛡️', preferences: ['I', 'S', 'F', 'J'] },
  { code: 'ESTJ', group: 'SJ', label: '경영자', desc: '엄격한 관리자', emoji: '💼', preferences: ['E', 'S', 'T', 'J'] },
  { code: 'ESFJ', group: 'SJ', label: '집정관', desc: '사교적인 외교관', emoji: '🍰', preferences: ['E', 'S', 'F', 'J'] },
  // Explorers (SP) - 노랑
  { code: 'ISTP', group: 'SP', label: '장인', desc: '만능 재주꾼', emoji: '🔧', preferences: ['I', 'S', 'T', 'P'] },
  { code: 'ISFP', group: 'SP', label: '예술가', desc: '호기심 많은 예술가', emoji: '🎨', preferences: ['I', 'S', 'F', 'P'] },
  { code: 'ESTP', group: 'SP', label: '사업가', desc: '모험을 즐기는 사업가', emoji: '🚀', preferences: ['E', 'S', 'T', 'P'] },
  { code: 'ESFP', group: 'SP', label: '연예인', desc: '자유로운 영혼의 연예인', emoji: '🎤', preferences: ['E', 'S', 'F', 'P'] }
];

const MBTI_TYPES_MAP = MBTI_TYPES.reduce((map, type) => {
  map[type.code] = type;
  return map;
}, {});

// State
const state = {
  left: null,
  right: null
};

// DOM Elements
let gridLeft, gridRight, actionBar, checkBtn, modal, closeModalBtn, shareBtn, lastActiveElement, heartIcon;

function getTabbableElements(container) {
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter(el => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement);
}

function generateFunctionalDescription(typeA, typeB) {
  const prefsA = MBTI_TYPES_MAP[typeA].preferences;
  const prefsB = MBTI_TYPES_MAP[typeB].preferences;
  const descriptions = [];

  const preferenceMap = {
    'E': '외향적', 'I': '내향적',
    'S': '현실적', 'N': '직관적',
    'T': '이성적', 'F': '감성적',
    'J': '계획적', 'P': '자율적'
  };

  // Dimension 1: E/I
  if (prefsA[0] === prefsB[0]) {
    if (prefsA[0] === 'E') descriptions.push("둘 다 외향적이라 에너지 넘치는 활동을 즐기며, 활발한 교류로 관계를 풍성하게 만듭니다.");
    else descriptions.push("둘 다 내향적이라 조용하고 아늑한 시간을 선호하며, 서로의 독립적인 공간을 존중해 줍니다.");
  } else {
    descriptions.push("한 명은 에너지를 발산하고, 다른 한 명은 에너지를 충전합니다. 서로에게 새로운 관점을 제공하지만, 활동량 조절이 필요할 수 있습니다.");
  }

  // Dimension 2: S/N
  if (prefsA[1] === prefsB[1]) {
    if (prefsA[1] === 'S') descriptions.push("둘 다 현실적이고 구체적인 것을 중요하게 여겨 실용적인 문제 해결에 강합니다. 안정적이고 예측 가능한 관계를 선호합니다.");
    else descriptions.push("둘 다 직관적이고 추상적인 것을 즐겨 아이디어 공유와 미래 계획에 열정적입니다. 깊이 있는 대화와 무한한 가능성을 탐구합니다.");
  } else {
    descriptions.push("한 명은 현재와 사실에 집중하고, 다른 한 명은 가능성과 미래를 봅니다. 서로에게 현실감각과 비전을 제공하지만, 관점 차이로 오해가 생길 수 있습니다.");
  }

  // Dimension 3: T/F
  if (prefsA[2] === prefsB[2]) {
    if (prefsA[2] === 'T') descriptions.push("둘 다 논리적이고 분석적으로 문제를 해결하며, 감정보다는 사실에 기반한 결정을 내립니다. 효율성과 합리성을 중시합니다.");
    else descriptions.push("둘 다 사람들의 감정과 조화를 중요하게 여겨 공감하고 배려하는 관계를 지향합니다. 따뜻하고 배려심 깊은 소통을 나눕니다.");
  } else {
    descriptions.push("한 명은 이성적인 판단을, 다른 한 명은 감정적인 조화를 중시합니다. 서로에게 필요한 균형을 제공하지만, 의사결정 과정에서 상호 이해와 존중이 필요합니다.");
  }

  // Dimension 4: J/P
  if (prefsA[3] === prefsB[3]) {
    if (prefsA[3] === 'J') descriptions.push("둘 다 계획적이고 체계적으로 생활하며, 질서와 완벽함을 추구합니다. 함께 목표를 세우고 달성하는 것을 좋아합니다.");
    else descriptions.push("둘 다 유연하고 자율적인 생활을 선호하며, 즉흥적인 활동과 변화를 즐깁니다. 함께 자유롭고 구속 없는 시간을 보냅니다.");
  } else {
    descriptions.push("한 명은 계획을 세우고, 다른 한 명은 상황에 따라 유연하게 대처합니다. 서로에게 조직력과 융통성을 줄 수 있지만, 생활 방식 차이로 갈등이 생길 수 있습니다.");
  }
  
  return descriptions;
}

function init() {
  gridLeft = document.getElementById('grid-left');
  gridRight = document.getElementById('grid-right');
  actionBar = document.getElementById('action-bar');
  checkBtn = document.getElementById('check-btn');
  modal = document.getElementById('result-modal');
  closeModalBtn = document.querySelector('.close-btn');
  shareBtn = document.getElementById('share-btn');
  heartIcon = document.querySelector('.heart-icon'); // Get reference to heart icon

  renderGrid('left', gridLeft);
  renderGrid('right', gridRight);
  
  checkBtn.addEventListener('click', showResults);
  closeModalBtn.addEventListener('click', hideModal);
  shareBtn.addEventListener('click', shareResult);
  
  window.addEventListener('click', (e) => {
    if (e.target === modal) hideModal();
  });
  
  modal.addEventListener('keydown', trapTabKey); // Add focus trap listener
}

function trapTabKey(e) {
  if (e.key === 'Tab' && modal.classList.contains('active')) {
    const tabbableElements = getTabbableElements(modal);
    if (tabbableElements.length === 0) {
      e.preventDefault();
      return;
    }

    const firstTabbableEl = tabbableElements[0];
    const lastTabbableEl = tabbableElements[tabbableElements.length - 1];

    if (e.shiftKey) { // Shift + Tab
      if (document.activeElement === firstTabbableEl) {
        lastTabbableEl.focus();
        e.preventDefault();
      }
    } else { // Tab
      if (document.activeElement === lastTabbableEl) {
        firstTabbableEl.focus();
        e.preventDefault();
      }
    }
  }
}


function renderGrid(side, container) {
  container.innerHTML = '';
  MBTI_TYPES.forEach(type => {
    const btn = document.createElement('div'); // Changed to div for better styling control
    btn.className = `mbti-card group-${type.group}`;
    btn.dataset.code = type.code;
    btn.dataset.side = side;
    btn.setAttribute('role', 'button');
    btn.tabIndex = 0;
    
    btn.innerHTML = `
      <div class="card-icon">${type.emoji}</div>
      <div class="card-info">
        <span class="card-code">${type.code}</span>
        <span class="card-label">${type.label}</span>
      </div>
    `;
    
    btn.addEventListener('click', () => handleSelect(side, type.code));
    container.appendChild(btn);
  });
}

function updateGridState(side) {
  const container = side === 'left' ? gridLeft : gridRight;
  const currentSelection = state[side];
  const cards = container.querySelectorAll('.mbti-card');
  
  cards.forEach(card => {
    const code = card.dataset.code;
    
    // Reset state
    card.classList.remove('selected', 'inactive');
    
    if (currentSelection) {
      if (currentSelection === code) {
        card.classList.add('selected');
      } else {
        card.classList.add('inactive');
      }
    }
  });
}

function handleSelect(side, code) {
  if (state[side] === code) {
    state[side] = null;
  } else {
    state[side] = code;
  }
  updateGridState(side);
  updateActionBar();
}

function updateActionBar() {
  if (state.left && state.right) {
    actionBar.classList.add('visible');
    heartIcon.classList.add('active'); // Add active class to heart icon
  } else {
    actionBar.classList.remove('visible');
    heartIcon.classList.remove('active'); // Remove active class
  }
}

const COMPATIBILITY_DETAILS = {
  // Default descriptions based on score ranges
  scoreRanges: {
    // Score >= 90
    excellent: {
      title: "환상의 짝꿍! 💖",
      desc: [
        "서로의 영혼을 채워주는 완벽한 매칭이에요. 눈빛만 봐도 통하는 사이!",
        "서로의 강점을 극대화하고 약점은 자연스럽게 보완해 줍니다.",
        "깊은 이해와 유대감을 바탕으로 안정적이고 행복한 관계를 만들어 갑니다."
      ]
    },
    // Score >= 70
    good: {
      title: "아주 좋아요 🔥",
      desc: [
        "서로 다르지만 끌리는 매력! 조금만 노력하면 최고의 커플이 될 수 있어요.",
        "새로운 관점을 주고받으며 함께 성장할 수 있는 관계입니다.",
        "적절한 자극과 신선함이 관계에 활력을 불어넣습니다."
      ]
    },
    // Score >= 50
    needsWork: {
      title: "노력이 필요해요 🌱",
      desc: [
        "성격 차이가 꽤 있네요. 서로를 이해하려는 노력이 사랑을 키워줄 거예요.",
        "의사소통 방식이나 가치관에서 충돌이 발생할 수 있습니다.",
        "서로의 다름을 인정하고 존중하는 꾸준한 노력이 중요합니다."
      ]
    },
    // Score < 50
    bad: {
      title: "파국이다... 🌪️",
      desc: [
        "만나면 싸울 확률 99%? 하지만 정반대라서 오히려 끌릴 수도...!",
        "관점과 생활 방식에서 큰 차이를 보여 오해와 갈등이 잦을 수 있습니다.",
        "서로에게 피로감을 느끼기 쉬우며, 관계 유지를 위한 각별한 인내가 필요합니다."
      ]
    }
  },
  // Specific pairings with custom scores and descriptions
  pairings: {
    'ENFP-INTJ': { // Sorted alphabetically for consistent key
      score: 99,
      title: "천생연분! ✨",
      desc: [
        "ENFP의 활기참과 INTJ의 전략적인 면모가 만나 시너지를 창출합니다.",
        "ENFP는 INTJ에게 새로운 영감과 사회성을, INTJ는 ENFP에게 현실적인 방향을 제시합니다.",
        "서로의 다름을 존중하며 무한한 발전을 기대할 수 있는 관계입니다."
      ]
    },
    'ENTP-INFJ': {
      score: 98,
      title: "운명적인 이끌림! 💫",
      desc: [
        "ENTP의 모험심과 INFJ의 깊은 통찰력이 균형을 이룹니다.",
        "ENTP는 INFJ에게 흥미와 자발성을, INFJ는 ENTP에게 깊이와 안정감을 제공합니다.",
        "서로에게 새로운 시야를 열어주고 함께 성장하는 이상적인 파트너입니다."
      ]
    },
    'ISTJ-ESFP': {
      score: 95,
      title: "환상의 조화! 🌟",
      desc: [
        "ISTJ의 안정성과 ESFP의 즐거움이 완벽한 조화를 이룹니다.",
        "ISTJ는 ESFP에게 든든한 버팀목이 되어주고, ESFP는 ISTJ의 삶에 활력을 불어넣습니다.",
        "서로의 강점을 인정하고 배우며 균형 잡힌 관계를 유지합니다."
      ]
    },
    'ISFJ-ESTP': {
      score: 93,
      title: "매력적인 케미! 💖",
      desc: [
        "ISFJ의 따뜻한 보살핌과 ESTP의 열정적인 에너지가 서로에게 긍정적인 영향을 줍니다.",
        "ISFJ는 ESTP에게 정서적 안정감을, ESTP는 ISFJ에게 새로운 경험과 자극을 선물합니다.",
        "서로의 차이점을 매력으로 받아들이며 즐거운 관계를 만들어갑니다."
      ]
    },
    'same-type': { // For when typeA === typeB
      score: 80,
      title: "든든한 동지애! 🤝",
      desc: [
        "서로를 가장 잘 이해하는 관계! 비슷한 생각과 행동으로 깊은 공감대를 형성합니다.",
        "강점은 극대화되지만, 단점 또한 비슷하여 새로운 관점이나 성장을 저해할 수 있습니다.",
        "때로는 너무 비슷해서 다소 지루해질 수 있으니, 새로운 시도를 통해 활력을 더하세요."
      ]
    }
  }
};

function calculateCompatibility(typeA, typeB) {
  // Sort types alphabetically to create a consistent key for pairings
  const sortedTypes = [typeA, typeB].sort();
  const pairKey = sortedTypes.join('-');

  let score;
  let title;
  let desc; // This will now be an array

  // 1. Check for specific pairings (including same-type)
  let compatibilityInfo;
  if (typeA === typeB) {
    compatibilityInfo = COMPATIBILITY_DETAILS.pairings['same-type'];
  } else {
    compatibilityInfo = COMPATIBILITY_DETAILS.pairings[pairKey];
  }

  if (compatibilityInfo) {
    score = compatibilityInfo.score;
    title = compatibilityInfo.title;
    desc = compatibilityInfo.desc;
  } else {
    // 2. If no specific pairing, use the hash-based score
    const combined = [typeA, typeB].sort().join('');
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      hash = combined.charCodeAt(i) + ((hash << 5) - hash);
    }
    score = Math.abs(hash % 101);

    // 3. Generate description using functional logic
    desc = generateFunctionalDescription(typeA, typeB);

    // 4. Determine title from score ranges (score is hash-based)
    if (score >= 90) {
      title = COMPATIBILITY_DETAILS.scoreRanges.excellent.title;
    } else if (score >= 70) {
      title = COMPATIBILITY_DETAILS.scoreRanges.good.title;
    } else if (score >= 50) {
      title = COMPATIBILITY_DETAILS.scoreRanges.needsWork.title;
    } else {
      title = COMPATIBILITY_DETAILS.scoreRanges.bad.title;
    }
  }
  
  return { score, title, desc };
}

function showResults() {
  if (!state.left || !state.right) return;
  
  const result = calculateCompatibility(state.left, state.right);
  
  document.getElementById('modal-emoji').textContent = "💘";
  document.getElementById('modal-title').textContent = result.title;
  document.getElementById('result-score').textContent = `${result.score}점`;
  document.getElementById('result-text').innerHTML = result.desc.join('<br>'); // Join array elements with <br>
  
  // Show selected types in modal for context
  document.getElementById('match-context').textContent = `${state.left} 🩷 ${state.right}`;

  lastActiveElement = document.activeElement; // Store the currently focused element
  modal.classList.add('active');
  closeModalBtn.focus(); // Focus the close button when modal opens
}

function hideModal() {
  modal.classList.remove('active');
  if (lastActiveElement) {
    lastActiveElement.focus(); // Return focus to the element that opened the modal
    lastActiveElement = null; // Clear the stored element
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    hideModal();
  }
});

function shareResult() {
  const text = `[MBTI 궁합 결과]\n${state.left} ❤️ ${state.right}\n점수: ${document.getElementById('result-score').textContent}\n${document.getElementById('modal-title').textContent}`;
  
  if (navigator.share) {
    navigator.share({
      title: 'MBTI 궁합 테스트',
      text: text,
      url: window.location.href,
    }).catch(console.error);
  } else {
    navigator.clipboard.writeText(text).then(() => {
      alert('결과가 클립보드에 복사되었습니다!');
    });
  }
}

init();
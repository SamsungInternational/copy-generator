import { useState, useRef } from "react";

const BRAND_DB = {
  "Bellca": { desc: "50 years of beauty origin. 내면과 외면의 조화를 이루는 아름다움을 추구하는 멀티케어 브랜드.", target: "아름다움에 관심 있는 폭넓은 연령대, 자연스럽고 건강한 피부를 원하는 소비자", tone: "따뜻하고 감성적이며 과학적 근거 기반. 아름다움의 철학을 담은 진솔한 어조.", keywords: ["natural beauty", "harmony", "inside & out", "origin", "glow", "care"], avoid: ["딱딱한 클리니컬 표현", "과도한 의학 용어", "차갑고 기계적인 톤"] },
  "WE+CURE": { desc: "Made by hippocratic way. 피부 전문의 500명이 믿는 더마 코스메틱 브랜드. 최소한의 성분으로 최대의 효과.", target: "민감성 피부, 트러블 고민, 피부 건강을 진지하게 생각하는 소비자", tone: "신뢰감 있고 전문적. 간결하며 의학적 권위가 느껴지는 어조. 과장 없이 정직하게.", keywords: ["biome", "barrier", "clinical", "honest", "derma", "do no harm", "gentle"], avoid: ["감성적 과장", "화려한 미사여구", "근거 없는 효능 클레임"] },
  "PINKROSA": { desc: "We believe in PINK. 여성의 당당한 라이프스타일을 지향하는 데일리 페미닌 케어 브랜드.", target: "자신감 있는 현대 여성, 데일리 케어를 즐기는 소비자, 퍼스널케어·바디·이너케어 관심층", tone: "발랄하고 자신감 있으며 감각적. 핑크 무드의 경쾌하고 당당한 어조.", keywords: ["feminine", "confidence", "daily", "independence", "pink", "glow", "self-care"], avoid: ["무겁거나 클리니컬한 표현", "남성적 어조", "지나치게 심각한 톤"] },
  "Eaudemoi": { desc: "가장 나다운 향기, 오드모아. 힐링이란 편안한 곳에서 가장 나다운 순간. Personal Scent 브랜드.", target: "나만의 향을 찾는 소비자, 향수·핸드밤·바디케어를 즐기는 감성 소비자", tone: "감성적이고 시적이며 내면적. 잔잔하고 은은한 감성. 기억과 순간을 담은 문학적 표현.", keywords: ["personal scent", "healing", "moment", "identity", "memory", "fragrance"], avoid: ["직접적 기능 클레임", "과학적 성분 강조", "딱딱한 설명체"] },
  "17Hours": { desc: "We're your skin director. 하루 17시간 피부와 함께하는 데일리 스킨케어. 합리적 가격의 효과적인 루틴 브랜드.", target: "20~40대 데일리 스킨케어 관심층, 합리적이고 효과적인 제품을 찾는 소비자", tone: "모던하고 친근하며 실용적. 전문적이지만 접근하기 쉬운 스킨 코치 같은 어조.", keywords: ["skin director", "routine", "essential", "effective", "daily", "barrier", "simple"], avoid: ["지나치게 고급스러운 럭셔리 표현", "복잡한 성분 나열", "과도한 감성"] },
  "SOLUCE": { desc: "Professional hair solution. 미용실 없이도 항상 관리받은 듯한 부드러움. 전문적 헤어 솔루션 브랜드.", target: "헤어 케어에 관심 있는 소비자, 탈모·두피 관리가 필요한 소비자", tone: "전문적이지만 친근하고 접근하기 쉬운 어조. 신뢰감 있고 실용적.", keywords: ["professional", "hair care", "solution", "soft", "nourish", "scalp", "volume"], avoid: ["지나치게 의학적인 표현", "화려한 뷰티 감성"] },
  "FREYA": { desc: "SE7EN COLORS 7EVEN SCENTS. Enhancing Fashion with a Touch of Fragrance. 7가지 향으로 즐기는 일주일.", target: "패션과 향에 관심 있는 트렌디한 소비자, 고체 향수 입문자, MZ세대", tone: "감각적이고 컬러풀하며 자유롭고 트렌디. 패션브랜드처럼 비주얼과 감성이 어우러진 어조.", keywords: ["fashion", "fragrance", "color", "memory", "scent of memories", "seven", "daily"], avoid: ["클리니컬하거나 기능성 표현", "무겁고 진지한 어조"] },
  "CELVÉNE": { desc: "Awaken the Rhythm of Your Cell. 피부가 기억하는 시간을 되돌리는 셀케어. 세포(Cell) 본질에 주목하는 프리미엄 스템셀 브랜드.", target: "안티에이징에 관심 있는 소비자, 프리미엄 스킨케어·디바이스 사용층, 시술 후 케어가 필요한 소비자", tone: "고급스럽고 과학적이며 신뢰감 있는 어조. 세포·리듬·시간의 메타포를 활용한 프리미엄 표현.", keywords: ["cell", "rhythm", "timecell", "biotech", "premium", "awaken", "precision"], avoid: ["가벼운 감성 표현", "저가 이미지 연상 단어", "의료 시술 직접 클레임"] }
};

const INGREDIENTS = [
  { category: "프리미엄 바이오·에이징 케어", items: ["PDRN 계열(소듐디엔에이)", "EGF", "FGF", "IGF", "NMN", "아세틸헥사펩타이드-8", "멀티 펩타이드", "콜라겐", "아데노신", "바쿠치올"] },
  { category: "광채·톤 케어", items: ["나이아신아마이드", "글루타티온", "아스코빅애씨드(비타민C)", "카카두플럼추출물", "알파-비사보롤", "다이아몬드콜로이드"] },
  { category: "탄력 케어", items: ["하이드롤라이즈드 콜라겐", "식물성 콜라겐", "보르피린", "엘라스틴", "아데노신"] },
  { category: "진정·장벽 케어", items: ["병풀추출물", "시카 콤플렉스", "세라마이드엔피", "판테놀", "엑토인", "알란토인", "마이크로바이옴"] },
  { category: "수분·보습 케어", items: ["8중 히알루론산 콤플렉스", "트레할로오스", "글리세릴글루코사이드", "호호바씨오일"] },
  { category: "영양·항산화 케어", items: ["비타민E(토코페롤)", "토코페릴아세테이트", "비타민나무열매오일"] },
  { category: "트러블 케어", items: ["티트리추출물"] },
  { category: "특허 원료", items: ["ACZERO(여드름케어)", "ANTICH(가려움케어)", "VAGESTOP(피부 보호)"] },
  { category: "각질 케어", items: ["AHA", "BHA(살리실릭애씨드)", "PHA"] },
];

const CONCEPTS = ["클리니컬 케어", "데일리 루틴", "안티에이징", "장벽 강화", "피부 진정", "딥 수분", "브라이트닝", "바디·퍼스널케어", "프리미엄 셀케어", "향·감성", "페미닌 케어", "시술 후 케어"];
const TARGETS = ["20대 초반", "20대 후반~30대", "40대 이상", "민감성 피부", "트러블성 피부", "건성·수분 부족", "안티에이징 관심", "여성 전용", "데일리 케어", "시술 후 케어", "향 소비자", "프리미엄 소비자"];
const STEP_LABELS = ["기본 정보", "제품 상세", "문안 생성"];
const PRODUCT_TYPES = ["스킨케어", "클렌징", "마스크·팩", "에센스·앰플", "크림·모이스처라이저", "선케어", "바디케어", "헤어케어", "향수·퍼퓸", "기타"];
const MEDIA_TYPES = ["패키지 (전면·측면)", "패키지 (후면)", "패키지 (전체)", "전시 배너", "리플렛·브로셔", "기타"];
const LANG_OPTIONS = ["한글 + 영문", "영문만", "한글만"];

const s = {
  card: { background: "var(--color-background-primary)", borderRadius: "var(--border-radius-lg)", border: "0.5px solid var(--color-border-tertiary)", padding: "1rem 1.25rem" },
  infoBox: { background: "var(--color-background-info)", borderRadius: "var(--border-radius-md)", padding: "10px 14px", border: "0.5px solid var(--color-border-info)", marginBottom: "1.25rem" },
  secBox: { background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "10px 14px", border: "0.5px solid var(--color-border-tertiary)", marginBottom: "1.25rem" },
};

function StepIndicator({ current }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
      {STEP_LABELS.map((label, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", flex: i < STEP_LABELS.length - 1 ? 1 : "none" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: i < current ? "var(--color-background-info)" : i === current ? "var(--color-text-primary)" : "var(--color-background-secondary)", border: i === current ? "none" : "0.5px solid var(--color-border-secondary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 500, color: i < current ? "var(--color-text-info)" : i === current ? "#fff" : "var(--color-text-secondary)" }}>
              {i < current ? <i className="ti ti-check" style={{ fontSize: 14 }} /> : i + 1}
            </div>
            <span style={{ fontSize: 11, color: i === current ? "var(--color-text-primary)" : "var(--color-text-secondary)", whiteSpace: "nowrap", fontWeight: i === current ? 500 : 400 }}>{label}</span>
          </div>
          {i < STEP_LABELS.length - 1 && <div style={{ flex: 1, height: "0.5px", background: i < current ? "var(--color-border-info)" : "var(--color-border-tertiary)", margin: "0 6px", marginBottom: 18 }} />}
        </div>
      ))}
    </div>
  );
}

function Field({ label, hint, children, required }) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 6 }}>
        {label}{required && <span style={{ color: "var(--color-text-danger)", marginLeft: 2 }}>*</span>}
      </label>
      {hint && <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 6px" }}>{hint}</p>}
      {children}
    </div>
  );
}

function Chip({ label, selected, onClick }) {
  return (
    <span onClick={onClick} style={{ display: "inline-block", padding: "5px 11px", fontSize: 12, borderRadius: 20, cursor: "pointer", margin: "3px 3px 3px 0", border: selected ? "2px solid var(--color-border-info)" : "0.5px solid var(--color-border-secondary)", background: selected ? "var(--color-background-info)" : "var(--color-background-primary)", color: selected ? "var(--color-text-info)" : "var(--color-text-secondary)", fontWeight: selected ? 500 : 400, transition: "all 0.12s", userSelect: "none" }}>
      {selected && <i className="ti ti-check" style={{ fontSize: 11, marginRight: 4 }} />}{label}
    </span>
  );
}

function CopyBlock({ label, labelKo, text, subtext, onCopy, copied }) {
  return (
    <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "0.875rem 1rem", marginBottom: "0.625rem", border: "0.5px solid var(--color-border-tertiary)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
        <div>
          <span style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-primary)" }}>{label}</span>
          {labelKo && <span style={{ fontSize: 11, color: "var(--color-text-secondary)", marginLeft: 6 }}>{labelKo}</span>}
        </div>
        <button onClick={onCopy} style={{ fontSize: 12, padding: "3px 10px", border: "0.5px solid var(--color-border-secondary)", borderRadius: 4, background: copied ? "var(--color-background-info)" : "transparent", cursor: "pointer", color: copied ? "var(--color-text-info)" : "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: 4, flexShrink: 0, marginLeft: 8, width: "auto" }}>
          <i className={`ti ${copied ? "ti-check" : "ti-copy"}`} style={{ fontSize: 13 }} />{copied ? "복사됨" : "복사"}
        </button>
      </div>
      <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-primary)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{text}</p>
      {subtext && <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{subtext}</p>}
    </div>
  );
}

function SectionHead({ icon, title }) {
  return (
    <h3 style={{ fontSize: 14, fontWeight: 500, margin: "1.5rem 0 0.625rem", color: "var(--color-text-primary)", display: "flex", alignItems: "center", gap: 6, borderTop: "0.5px solid var(--color-border-tertiary)", paddingTop: "1rem" }}>
      <i className={`ti ${icon}`} style={{ fontSize: 15 }} />{title}
    </h3>
  );
}

export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [apiKeyError, setApiKeyError] = useState("");
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ brand: "", product: "", productType: "", mediaType: "", lang: "한글 + 영문" });
  const [selIngredients, setSelIngredients] = useState([]);
  const [customIngredient, setCustomIngredient] = useState("");
  const [selConcepts, setSelConcepts] = useState([]);
  const [customConcept, setCustomConcept] = useState("");
  const [selTargets, setSelTargets] = useState([]);
  const [customTarget, setCustomTarget] = useState("");
  const [memo, setMemo] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState({});
  const [error, setError] = useState("");

  const setF = k => v => setForm(p => ({ ...p, [k]: v }));
  const toggleItem = (setter, arr, val) => setter(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  const selectedBrand = BRAND_DB[form.brand];

  const handleCopy = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopied(p => ({ ...p, [key]: true }));
    setTimeout(() => setCopied(p => ({ ...p, [key]: false })), 2000);
  };

  const handleApiKeySubmit = () => {
    if (!apiKeyInput.trim().startsWith("sk-ant-")) {
      setApiKeyError("올바른 Anthropic API 키를 입력해 주세요. (sk-ant- 로 시작)");
      return;
    }
    setApiKey(apiKeyInput.trim());
    setApiKeyError("");
  };

  const validate0 = () => {
    if (!form.brand) return "브랜드를 선택해 주세요.";
    if (!form.product.trim()) return "제품명을 입력해 주세요.";
    if (!form.productType) return "제품 유형을 선택해 주세요.";
    if (!form.mediaType) return "매체 유형을 선택해 주세요.";
    return "";
  };

  const allIngredients = [...selIngredients, ...(customIngredient.trim() ? [customIngredient.trim()] : [])];
  const allConcepts = [...selConcepts, ...(customConcept.trim() ? [customConcept.trim()] : [])];
  const allTargets = [...selTargets, ...(customTarget.trim() ? [customTarget.trim()] : [])];

  const generate = async () => {
    setLoading(true); setError(""); setResult(null);
    const b = BRAND_DB[form.brand] || {};
    const langNote = form.lang === "한글만"
      ? "한글 문안(korean 섹션)만 생성하고 english 섹션은 빈 객체로 반환하세요."
      : form.lang === "영문만"
      ? "영문 문안(english 섹션)만 생성하고 korean 섹션은 빈 객체로 반환하세요."
      : "한글과 영문 문안 모두 생성하세요.";

    const prompt = `당신은 글로벌 화장품 브랜드 패키지 문안 전문가입니다.

[브랜드 정보]
브랜드명: ${form.brand}
브랜드 소개: ${b.desc || ""}
톤앤무드: ${b.tone || ""}
핵심 키워드: ${(b.keywords || []).join(", ")}
피해야 할 표현: ${(b.avoid || []).join(", ")}

[제품 정보]
제품명: ${form.product}
제품 유형: ${form.productType}
매체 유형: ${form.mediaType}
메인 성분: ${allIngredients.length ? allIngredients.join(", ") : "미입력"}
제품 컨셉: ${allConcepts.length ? allConcepts.join(", ") : "미입력"}
타겟 고객: ${allTargets.length ? allTargets.join(", ") : b.target || "미입력"}
추가 메모: ${memo || "미입력"}

[언어 지시] ${langNote}

[규제 준수]
- 의약품성 표현 금지: 치료, 치유, 재생, 회복 등
- 과장 클레임 금지: 100%, 완전, 즉각, 영구 등
- em dash(—) 절대 사용 금지
- 글로벌 중립 표현 (중국·베트남·인도네시아·중동·남미 공통 적용)
- 허용: 보습, 진정, 수분 공급, 피부결 개선 등 화장품 범위 내 기능성

[출력 형식 - 순수 JSON만 반환]
{
  "english": {
    "headline": "3~6단어 헤드라인",
    "headlineKo": "헤드라인 한국어 번역",
    "subheadline": "8~14단어 서브헤드라인",
    "subheadlineKo": "서브헤드라인 한국어 번역",
    "shortCopies": [{"en": "2~3단어 숏카피", "ko": "한국어 번역"}],
    "ingredients": [{"en": "PDRN", "ko": "폴리디옥시리보뉴클레오타이드"}],
    "sensorySlogan": "감각적 슬로건 10단어 내외",
    "sensorySloganKo": "감각 슬로건 한국어 번역",
    "tagline": "브랜드 철학 반영 태그라인 5~8단어",
    "taglineKo": "태그라인 한국어 번역",
    "shortDesc": "짧은 설명 15~25단어",
    "shortDescKo": "짧은 설명 한국어 번역",
    "longDesc": "긴 설명 40~60단어",
    "longDescKo": "긴 설명 한국어 번역"
  },
  "korean": {
    "feature": "후면 제품 특징 한 문장 20~40자",
    "usage": "후면 사용법 2~3단계"
  }
}

성분명은 PDRN, NMN, EGF 등 약어 사용. ingredients는 입력된 순서 그대로 나열.
shortCopies는 정확히 5개 이상, en/ko 쌍으로 작성.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 2000, messages: [{ role: "user", content: prompt }] })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const raw = data.content.map(c => c.text || "").join("").replace(/```json|```/g, "").trim();
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
      setResult(parsed);
      setStep(2);
    } catch (e) {
      setError("오류: " + (e?.message || JSON.stringify(e)));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(0); setResult(null);
    setForm({ brand: "", product: "", productType: "", mediaType: "", lang: "한글 + 영문" });
    setSelIngredients([]); setCustomIngredient(""); setSelConcepts([]); setCustomConcept("");
    setSelTargets([]); setCustomTarget(""); setMemo(""); setError("");
  };

  // API 키 입력 화면
  if (!apiKey) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
        <div style={{ ...s.card, maxWidth: 420, width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <i className="ti ti-sparkles" style={{ fontSize: 32, color: "var(--color-text-secondary)", display: "block", marginBottom: 12 }} />
            <h1 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 6px" }}>화장품 문안 생성기</h1>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0 }}>Samsung International Co., Ltd.</p>
          </div>
          <Field label="Anthropic API 키" hint="입력한 키는 이 세션에서만 사용되며 저장되지 않습니다.">
            <input
              type="password"
              value={apiKeyInput}
              onChange={e => setApiKeyInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleApiKeySubmit()}
              placeholder="sk-ant-..."
            />
          </Field>
          {apiKeyError && <p style={{ color: "var(--color-text-danger)", fontSize: 13, marginBottom: 12 }}>{apiKeyError}</p>}
          <button
            onClick={handleApiKeySubmit}
            style={{ width: "100%", padding: "12px", fontSize: 15, fontWeight: 500, borderRadius: "var(--border-radius-md)", border: "none", background: "var(--color-text-primary)", color: "#fff", cursor: "pointer" }}>
            시작하기
          </button>
          <p style={{ fontSize: 12, color: "var(--color-text-secondary)", textAlign: "center", marginTop: 12 }}>
            API 키는 <a href="https://console.anthropic.com" target="_blank" rel="noreferrer" style={{ color: "var(--color-text-info)" }}>console.anthropic.com</a>에서 발급받을 수 있습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "1.5rem 1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.75rem" }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 2px" }}>화장품 문안 생성기</h2>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0 }}>브랜드 톤에 맞는 규제 안전 문안을 길이별로 생성합니다.</p>
        </div>
        <button onClick={() => setApiKey("")} style={{ fontSize: 12, color: "var(--color-text-secondary)", border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", padding: "5px 10px", background: "transparent", cursor: "pointer", flexShrink: 0 }}>
          <i className="ti ti-logout" style={{ fontSize: 13, marginRight: 4 }} />로그아웃
        </button>
      </div>
      <StepIndicator current={step} />

      {step === 0 && (
        <div>
          <Field label="브랜드 선택" required hint="선택한 브랜드의 톤앤무드가 문안에 자동 반영됩니다.">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {Object.keys(BRAND_DB).map(b => (
                <div key={b} onClick={() => setF("brand")(b)} style={{ padding: "10px 12px", borderRadius: "var(--border-radius-md)", cursor: "pointer", border: form.brand === b ? "2px solid var(--color-border-info)" : "0.5px solid var(--color-border-tertiary)", background: form.brand === b ? "var(--color-background-info)" : "var(--color-background-primary)", transition: "all 0.12s", userSelect: "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 500, fontSize: 14, color: form.brand === b ? "var(--color-text-info)" : "var(--color-text-primary)" }}>{b}</span>
                    {form.brand === b && <i className="ti ti-check" style={{ fontSize: 14, color: "var(--color-text-info)" }} />}
                  </div>
                  <p style={{ margin: "3px 0 0", fontSize: 11, color: "var(--color-text-secondary)", lineHeight: 1.4 }}>{BRAND_DB[b].tone.slice(0, 28)}...</p>
                </div>
              ))}
            </div>
          </Field>
          {selectedBrand && (
            <div style={s.infoBox}>
              <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-info)", lineHeight: 1.6 }}><strong>{form.brand}</strong> — {selectedBrand.tone}</p>
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="제품명" required>
              <input value={form.product} onChange={e => setF("product")(e.target.value)} placeholder="예: Pro Ridle Shot Essence" />
            </Field>
            <Field label="제품 유형" required>
              <select value={form.productType} onChange={e => setF("productType")(e.target.value)}>
                <option value="">선택</option>
                {PRODUCT_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
          </div>
          <Field label="매체 유형" required>
            <select value={form.mediaType} onChange={e => setF("mediaType")(e.target.value)}>
              <option value="">선택하세요</option>
              {MEDIA_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="생성 언어">
            <div style={{ display: "flex", gap: 8 }}>
              {LANG_OPTIONS.map(o => (
                <button key={o} onClick={() => setF("lang")(o)} style={{ flex: 1, padding: "8px 4px", fontSize: 13, borderRadius: "var(--border-radius-md)", border: form.lang === o ? "2px solid var(--color-border-info)" : "0.5px solid var(--color-border-secondary)", background: form.lang === o ? "var(--color-background-info)" : "transparent", color: form.lang === o ? "var(--color-text-info)" : "var(--color-text-secondary)", cursor: "pointer", fontWeight: form.lang === o ? 500 : 400, transition: "all 0.12s" }}>{o}</button>
              ))}
            </div>
          </Field>
          {error && <p style={{ color: "var(--color-text-danger)", fontSize: 13 }}>{error}</p>}
          <button onClick={() => { const e = validate0(); if (e) setError(e); else { setError(""); setStep(1); } }} style={{ width: "100%", padding: "12px", fontSize: 15, fontWeight: 500, borderRadius: "var(--border-radius-md)", border: "none", background: "var(--color-text-primary)", color: "#fff", cursor: "pointer", marginTop: 4 }}>다음 단계</button>
        </div>
      )}

      {step === 1 && (
        <div>
          <div style={{ ...s.secBox, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{form.brand}</span>
              <span style={{ fontSize: 12, color: "var(--color-text-secondary)", marginLeft: 8 }}>{form.product} · {form.productType}</span>
            </div>
            <button onClick={() => setStep(0)} style={{ fontSize: 12, color: "var(--color-text-secondary)", border: "none", background: "none", cursor: "pointer", width: "auto" }}>변경</button>
          </div>
          <Field label="성분 선택" hint="해당 성분을 모두 선택하세요. 목록에 없으면 하단에 직접 입력해 주세요.">
            {INGREDIENTS.map(group => (
              <div key={group.category} style={{ marginBottom: "0.875rem" }}>
                <p style={{ fontSize: 11, fontWeight: 500, color: "var(--color-text-secondary)", margin: "0 0 5px", letterSpacing: "0.03em" }}>{group.category}</p>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {group.items.map(item => <Chip key={item} label={item} selected={selIngredients.includes(item)} onClick={() => toggleItem(setSelIngredients, selIngredients, item)} />)}
                </div>
              </div>
            ))}
            <input value={customIngredient} onChange={e => setCustomIngredient(e.target.value)} placeholder="기타 성분 직접 입력" style={{ marginTop: 4 }} />
          </Field>
          <Field label="제품 컨셉" hint="복수 선택 가능합니다.">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {CONCEPTS.map(c => <Chip key={c} label={c} selected={selConcepts.includes(c)} onClick={() => toggleItem(setSelConcepts, selConcepts, c)} />)}
            </div>
            <input value={customConcept} onChange={e => setCustomConcept(e.target.value)} placeholder="직접 입력" style={{ marginTop: 8 }} />
          </Field>
          <Field label="타겟 고객" hint={`미선택 시 ${form.brand} 기본 타겟이 적용됩니다.`}>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {TARGETS.map(t => <Chip key={t} label={t} selected={selTargets.includes(t)} onClick={() => toggleItem(setSelTargets, selTargets, t)} />)}
            </div>
            <input value={customTarget} onChange={e => setCustomTarget(e.target.value)} placeholder="직접 입력" style={{ marginTop: 8 }} />
          </Field>
          <Field label="추가 메모">
            <textarea value={memo} onChange={e => setMemo(e.target.value)} rows={2} placeholder="특정 키워드, 톤 참고 사항 등 자유롭게" style={{ resize: "vertical" }} />
          </Field>
          {error && <p style={{ color: "var(--color-text-danger)", fontSize: 13 }}>{error}</p>}
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setStep(0)} style={{ flex: 1, padding: "11px", fontSize: 14, borderRadius: "var(--border-radius-md)" }}>이전</button>
            <button onClick={generate} disabled={loading} style={{ flex: 2, padding: "12px", fontSize: 15, fontWeight: 500, borderRadius: "var(--border-radius-md)", border: "none", background: loading ? "var(--color-background-secondary)" : "var(--color-text-primary)", color: loading ? "var(--color-text-secondary)" : "#fff", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              {loading ? <><i className="ti ti-loader" style={{ fontSize: 16, animation: "spin 1s linear infinite" }} />문안 생성 중...</> : "문안 생성하기"}
            </button>
          </div>
          <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
        </div>
      )}

      {step === 2 && result && (
        <div>
          <div style={{ ...s.secBox, marginBottom: "0.5rem" }}>
            <span style={{ fontSize: 13, fontWeight: 500 }}>{form.brand}</span>
            <span style={{ fontSize: 12, color: "var(--color-text-secondary)", marginLeft: 8 }}>{form.product} · {form.mediaType} · {form.lang}</span>
          </div>

          {(form.lang === "한글 + 영문" || form.lang === "영문만") && result.english && Object.keys(result.english).length > 0 && (
            <>
              <SectionHead icon="ti-language" title="디자인용 영문 문안" />
              {result.english.headline && <CopyBlock label="Headline" labelKo="헤드라인" text={result.english.headline} subtext={result.english.headlineKo} onCopy={() => handleCopy("hl", result.english.headline + (result.english.headlineKo ? "\n" + result.english.headlineKo : ""))} copied={copied.hl} />}
              {result.english.subheadline && <CopyBlock label="Subheadline" labelKo="서브헤드라인" text={result.english.subheadline} subtext={result.english.subheadlineKo} onCopy={() => handleCopy("shl", result.english.subheadline + (result.english.subheadlineKo ? "\n" + result.english.subheadlineKo : ""))} copied={copied.shl} />}

              {result.english.shortCopies?.length > 0 && (
                <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "0.875rem 1rem", marginBottom: "0.625rem", border: "0.5px solid var(--color-border-tertiary)" }}>
                  <div style={{ marginBottom: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-primary)" }}>Short Copies</span>
                    <span style={{ fontSize: 11, color: "var(--color-text-secondary)", marginLeft: 6 }}>숏 카피 (2~3단어)</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {result.english.shortCopies.map((c, i) => {
                      const en = typeof c === "object" ? c.en : c;
                      const ko = typeof c === "object" ? c.ko : "";
                      return (
                        <div key={i} onClick={() => handleCopy("sc" + i, en)} style={{ padding: "6px 14px", borderRadius: 20, border: copied["sc" + i] ? "1.5px solid var(--color-border-info)" : "0.5px solid var(--color-border-secondary)", background: copied["sc" + i] ? "var(--color-background-info)" : "var(--color-background-primary)", cursor: "pointer", color: copied["sc" + i] ? "var(--color-text-info)" : "var(--color-text-primary)", display: "flex", flexDirection: "column", alignItems: "center", transition: "all 0.1s" }}>
                          <span style={{ fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 5 }}>
                            {copied["sc" + i] ? <i className="ti ti-check" style={{ fontSize: 12 }} /> : <i className="ti ti-copy" style={{ fontSize: 12, opacity: 0.4 }} />}{en}
                          </span>
                          {ko && <span style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 2 }}>{ko}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {result.english.ingredients?.length > 0 && (
                <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "0.875rem 1rem", marginBottom: "0.625rem", border: "0.5px solid var(--color-border-tertiary)" }}>
                  <div style={{ marginBottom: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-primary)" }}>Key Ingredients</span>
                    <span style={{ fontSize: 11, color: "var(--color-text-secondary)", marginLeft: 6 }}>메인 성분</span>
                  </div>
                  {result.english.ingredients.map((ing, i) => (
                    <div key={i} onClick={() => handleCopy("ing" + i, ing.en)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: i < result.english.ingredients.length - 1 ? "0.5px solid var(--color-border-tertiary)" : "none", cursor: "pointer" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>{ing.en}</span>
                        <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{ing.ko}</span>
                      </div>
                      <i className={`ti ${copied["ing" + i] ? "ti-check" : "ti-copy"}`} style={{ fontSize: 13, color: copied["ing" + i] ? "var(--color-text-info)" : "var(--color-text-secondary)", opacity: 0.6 }} />
                    </div>
                  ))}
                </div>
              )}

              {result.english.sensorySlogan && <CopyBlock label="Sensory Slogan" labelKo="감각 슬로건" text={result.english.sensorySlogan} subtext={result.english.sensorySloganKo} onCopy={() => handleCopy("ss", result.english.sensorySlogan + (result.english.sensorySloganKo ? "\n" + result.english.sensorySloganKo : ""))} copied={copied.ss} />}
              {result.english.tagline && <CopyBlock label="Tagline" labelKo="태그라인" text={result.english.tagline} subtext={result.english.taglineKo} onCopy={() => handleCopy("tl", result.english.tagline + (result.english.taglineKo ? "\n" + result.english.taglineKo : ""))} copied={copied.tl} />}
              {result.english.shortDesc && <CopyBlock label="Short Description" labelKo="짧은 설명" text={result.english.shortDesc} subtext={result.english.shortDescKo} onCopy={() => handleCopy("sd", result.english.shortDesc + (result.english.shortDescKo ? "\n" + result.english.shortDescKo : ""))} copied={copied.sd} />}
              {result.english.longDesc && <CopyBlock label="Long Description" labelKo="긴 설명" text={result.english.longDesc} subtext={result.english.longDescKo} onCopy={() => handleCopy("ld", result.english.longDesc + (result.english.longDescKo ? "\n" + result.english.longDescKo : ""))} copied={copied.ld} />}
            </>
          )}

          {(form.lang === "한글 + 영문" || form.lang === "한글만") && result.korean && Object.keys(result.korean).length > 0 && (
            <>
              <SectionHead icon="ti-file-text" title="후면 제품 정보 (한글)" />
              {result.korean.feature && <CopyBlock label="제품 특징" text={result.korean.feature} onCopy={() => handleCopy("kf", result.korean.feature)} copied={copied.kf} />}
              {result.korean.usage && <CopyBlock label="사용법" text={result.korean.usage} onCopy={() => handleCopy("ku", result.korean.usage)} copied={copied.ku} />}
            </>
          )}

          <div style={{ display: "flex", gap: 8, marginTop: "1.5rem" }}>
            <button onClick={reset} style={{ flex: 1, padding: "11px", fontSize: 14, borderRadius: "var(--border-radius-md)" }}>
              <i className="ti ti-plus" style={{ marginRight: 4, fontSize: 14 }} />새 문안
            </button>
            <button onClick={() => { setResult(null); setStep(1); }} style={{ flex: 1, padding: "11px", fontSize: 14, borderRadius: "var(--border-radius-md)" }}>
              <i className="ti ti-edit" style={{ marginRight: 4, fontSize: 14 }} />정보 수정
            </button>
            <button onClick={() => { setResult(null); generate(); }} style={{ flex: 1, padding: "11px", fontSize: 14, borderRadius: "var(--border-radius-md)" }}>
              <i className="ti ti-refresh" style={{ marginRight: 4, fontSize: 14 }} />다시 생성
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
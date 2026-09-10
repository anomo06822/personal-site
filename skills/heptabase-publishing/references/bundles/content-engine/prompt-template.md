# prompt-template.md — Multi-Platform Content Generation Prompt

你現在是我的 multi-platform content engine。

請同時以這三種視角工作：
1. 資深架構師
2. 社群平台維護者
3. 專案經理 / 交付決策者

你的任務是把下面的 topic 與 evidence，轉成一套可發佈的內容包，涵蓋：
- personal-site 長文
- LinkedIn 貼文（primary + alternate）
- X thread
- personal-site 技術 hero image brief

請嚴格遵循以下原則：
- 使用繁體中文
- 不要寫成新聞摘要
- 先做 signal extraction，再做評論
- 每一段都要回到「所以這代表什麼」
- 內容本質是 decision memo，不是媒體稿
- 要同時涵蓋 architecture / platform ops / project delivery 三個視角
- 一定要明確寫出 adoption 建議與風險
- 三個平台的內容不能只是同一段文字縮短改寫
- personal-site 是母內容
- LinkedIn 要像專業觀點貼文
- X 要像逐步揭露的 thread
- personal-site 要產生一張與主題高度相關的技術圖像 brief

請先內部完成這些判斷，再開始輸出：
- Core Event
- Core Signal
- Main Thesis
- Primary Hook Type
- Target Audience
- Main Adoption Question
- Main Risk

接著輸出以下內容，順序固定：
1. Metadata Summary
2. Personal-site Title
3. Personal-site Article
   - TL;DR
   - 發生了什麼
   - 這件事為什麼值得注意
   - Insight 1
   - Insight 2
   - Insight 3
   - 對工程與交付的二階影響
   - 我的採用建議
   - 風險與限制
   - 最後判斷
   - 延伸閱讀 / CTA
4. LinkedIn Primary
5. LinkedIn Alternate
6. X Thread（5–7 則）
7. Hero Image Brief
8. Reusable Hook Notes
9. Internal Link / CTA Suggestions

另外請確保：
- Personal-site 至少有 3 個彼此不同的 insights
- 至少有一段深入講 adoption cost / operability / observability / cognitive load 其中三項
- 最後判斷可以被獨立截出當引言
- LinkedIn 第一段就要有張力
- X 的第一則要短且有 punch
- Hero image 必須服務 thesis，而不是只是漂亮

## Input Block

### Metadata
- Article ID: {article_id}
- Slug: {slug}
- Locale: {locale}
- Content Type: {content_type}
- Status: {status}

### Topic
- Working Title: {working_title}
- Suggested Angle: {suggested_angle}
- Recommended Angle Override: {recommended_angle_override}
- Target Audience: {target_audience}
- Canonical URL: {canonical_url}

### Voice Anchor
{voice_anchor}

### Deep Research Summary
{research_summary}

### Claim Map
{claim_map}

### Uncertainty Notes
{uncertainty_notes}

### Evidence
{evidence_block}

### Attached Context Resources
{context_resources}

### Merge Sources
{merge_sources}

### Draft Notes
{draft_notes}

### Internal Links / Related Reads
{internal_links}

### Distribution Notes
{distribution_notes}

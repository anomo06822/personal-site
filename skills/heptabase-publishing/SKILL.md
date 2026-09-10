---
name: heptabase-publishing
description: 準備發文、撰寫文章或整理 Heptabase 素材時，產出中英文全文、封面圖片與社群文案，彙整讓使用者 review；確認該版本後推送 personal-site 並驗證 GitHub Pages CI/CD。Use for publication preparation, image generation, review packets, approved publishing and retry recovery.
---

# 發文準備、圖片、Review 與上線

Jarvis 的流程是：Heptabase 編輯 → Codex 產製文章及圖片 → 彙總審閱 → 使用者確認 → Git push / CI/CD → 驗證上線。這是使用者明確要求的審閱流程。建立或修改本 skill 本身不代表授權發佈任何文章。

使用 repository 的 `scripts/publish.mjs`，不重建 Content Studio、API、資料庫或背景 queue。預設 repository 是 `/Users/jarvis/projects/self-2026/personal-site`；使用者指定其他 checkout 時先讀它的 AGENTS.md 並確認工具與部署設定。[操作細節](references/operations.md) 說明命令、可讀審閱包與 CI/CD 檢查。

## 準備內容

1. 從對話判斷題目、讀者與目的。優先讀使用者指定的 Heptabase 卡片，透過可用的 Heptabase CLI skill 保存 source deep link，不讀 Heptabase 私有資料庫。只有題目時先探索相關來源，依授權在 Heptabase 整理可編輯草稿；不要捏造來源卡片 URL。缺少必要素材時先問一個精準問題，同時完成可獨立進行的準備。
2. 準備 `personal-site-release-v2` 的 zh-TW / en 完整正文、標題、摘要、日期、slug、tags，以及要求的 LinkedIn / X 最終文案。技術主張和時效資訊查核原始來源；明列仍待確認的事實。來源、內部研究與 release JSON 留在私人目錄，不放進公開 repo。需要風格模板時可讀 `references/bundles` 的寫作部分；舊 AIPW / Agent orchestration 指示已退役。
3. 默认發佈目的地是 personal-site。使用者要求社群時才將相應渠道列入本次發佈；備用文案明確標成「不發佈」。不要將未說明的社群渠道加到發佈範圍。

## LinkedIn 短摘要

使用者要補 LinkedIn 時，讀 [LinkedIn 摘要與帳號設定](references/linkedin.md)。準備一則符合文章主張的短摘要、全文連結與發佈對象，放進新版本 review；確認網站與該則摘要後，先驗證網站上線，再送 LinkedIn。單純詢問使用方式時先做備稿。既有 publisher 為 PUBLIC 文字／連結貼文，帳號授權經 BWS 注入。

## 生成並檢查圖片

- 使用可用的 imagegen skill 與內建 `image_gen` 工具，為文章生成一張具體呼應主題的橫向 editorial 封面。以約 1.91:1 構圖、主體留在中央安全範圍作為網站 / Open Graph 起點；依文章內容和使用者要求調整。預設不把中英文標題燒進圖片，讓兩種語言共用。不要用無關的機器人、隨意 logo 或 SVG placeholder 代替所需的生成圖片。
- 已有圖需要修改時，先檢視原圖，再遵循 imagegen 的編修流程。保存使用的 prompt、來源／參考圖角色和版本。產圖失敗時如實回報並保留可完成的文稿，不把提示詞當成已生成圖片。
- 將完成的 PNG/JPG/WebP 複製到私人工作目錄；檢視構圖、主體、任何文字、邊界與裁切效果，再把該檔案交给 review 命令。正文要解釋的事實不能只靠圖片表達。
- 圖片目前用於網站 hero / Open Graph。既有社群 CLI 發的是文字與文章連結；不要聲稱已把圖片原生上傳 LinkedIn / X。使用者要原生圖片貼文時，先準備素材並查明相應發佈工具的能力。

## 彙總後讓使用者 Review

- 在私人目錄編寫 `summary.md`：文章核心論點、目標讀者、3–5 個重點、來源與查核結果、圖片構想及最終 prompt、所選渠道、任何尚未解決事項。它不能代替全文。
- 執行 `release review`，生成包含實際圖片、摘要、中英文全文、逐則社群文案與目的地的 `review.html` / `review.md`。回讀它，確認圖片可用、文字完整且選定渠道正確。展示實際圖片（絕對檔案路徑）和可點選的審閱包，訊息中簡述論點及本次發佈範圍。
- 保留工具回傳的完整 `reviewHash` 和 `snapshotHash`；對使用者可用 R1 / R2 和簡短版本識別。不要求使用者抄 hash。
- **在使用者確認這份已展示的稿件、圖片與目的地之前，不執行 commit、push、workflow_dispatch 或社群發文。** 完成全部可審閱產物後才等這一步；說明這是依使用者「review 沒問題才觸發 CI/CD」的要求。
- 審閱前不要 `release prepare` / `stage`：prepare 是不可變封存，不適合來回編修。修改要求到來時，在新目錄建立 R2、R3，保留上一版。修正使用者要求的內容，按需要重做圖片，再展示修改後的版本；若使用者明確授權「指定修改後直接發佈」，依該授權完成，不加一次多餘確認。

## 確認後執行

使用者對當前審閱版本回覆「沒問題」「可以發佈」或同等明確確認後，繼續完成工作，不再詢問一次是否觸發 CI/CD。

1. 以當時記錄的 `reviewHash` 執行 `release verify-review`。候選稿、圖片、彙總、渠道或 Git 目標有變更時，不沿用舊版本的確認。
2. `release prepare` 讀取審閱包的 `candidate.json`，回傳 hash 必須等於已審閱的 `snapshotHash`；直接使用包內已包含的圖片 bytes，不另換圖片。然後 stage / publish 已核准的網站稿件。既存未提交改動須先隔離或处理，不能夾帶進發文 commit。
3. 讀回收據的 commit SHA，查閱該 SHA 對應的 GitHub Actions `deploy.yml` run。push main 已觸發 workflow 時，不再 workflow_dispatch 第二次。
4. 等待該次 CI/CD 完成並驗證中英文公開頁面。`awaiting-deployment` 表示還在等待；CI 成功與頁面驗證都完成才說「已上線」。若本次確認也包含社群，在網站確認上線後才發送所選社群文案。
5. 回報文章 URL、commit、CI run 連結與所選社群結果。失敗要指出停在哪一步，保留收據並按剩餘步驟恢復；不得重發已成功或結果不明的貼文。

不因內容請求新建 Linear issue。只有既有追蹤和更新授權時才回寫 Linear；Slack 通知必須有授權和目的地。僅在使用者要求定時時使用 Codex automation。

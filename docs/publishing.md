# Heptabase → Codex → personal-site

Content Studio / AIPW 已於 2026-09-11 退役。Heptabase 保存研究、選題與可編輯草稿；Codex 產製和執行；此 repository 保存公開文章與發佈程式。Linear 只在需要追蹤交付時使用，Slack 通知沿用既有授權與指定目的地。

發佈程式直接使用 Node.js 22+、Git、pnpm 與外部平台 API，不需要 .NET、AIPW API、MCP server、PostgreSQL 或背景工作服務。網站沿用既有 GitHub Pages workflow。

## 準備與審閱

使用 `$heptabase-publishing`（[skill 原始檔](../skills/heptabase-publishing/SKILL.md)）或直接說「準備發文」。2026-09-11 使用者指定的流程是先產製內容與圖片，彙總供本人 review，確認後才推送並觸發 CI/CD。

Codex 會準備完整中英文正文、指定渠道的社群文案，以 image_gen 生成並檢視封面，再寫一份包含核心論點、讀者、重點、查核來源與圖片構想的 summary.md。接著生成私人審閱包：

```sh
pnpm publish:content release review --input /private/path/draft.json --hero /private/path/hero.png --summary /private/path/summary.md --output /private/path/review-r1
# 本次也要發社群時才加 --channels linkedin-main,x-main
```

`review.html` 內嵌實際圖片，展示彙總、兩種語言全文和逐則社群內容；`review.md` 供文字閱讀。未選社群版本標示為備用稿、不發佈。完整來源和證據只在私人包中，`artifacts/` 另列預計進 Git 的公開檔案。review 不改網站或 release store，允許在不同目錄建立 R1/R2 反覆修稿，不必因不可變快照而更改 article ID / slug。

**使用者確認展示的稿件、圖片及目的地後**，先核對當時保留的 reviewHash，再封存該版本；直接使用包內 candidate.json 中的圖片 bytes：

```sh
pnpm publish:content release verify-review --input /private/path/review-r1 --review-hash REVIEW_HASH
pnpm publish:content release prepare --input /private/path/review-r1/candidate.json
```

文字、圖片、彙總、所選渠道或 Git 目標修改後，原 reviewHash 不再有效，應按新的版本授權處理。prepare 回傳的 snapshotHash 必須與審閱包一致，接著才執行 stage / publish。準備內容或建立 skill 不會自動觸發 CI/CD。


依 [release.example.json](release.example.json) 產製 `personal-site-release-v2` JSON。來源卡片透過 Heptabase CLI 讀取，保留 deep link 與來源更新時間。公開正文、中英文版本、LinkedIn 完整貼文及 X 的逐則 `posts` 都由 Codex 事先完成，執行時不再呼叫模型、重寫或加入文字。

實際稿件 JSON 應放在公開 repository 以外。`sourceUrl`、`evidenceMarkdown` 與發佈收據保存在私人目錄，預設 `~/.local/share/personal-site-publishing`；可用 `PUBLISHING_HOME` 或 `--store` 指定。目錄權限 700、JSON 權限 600。CLI 拒絕將此目錄或私有 export 放進 personal-site。這個目錄只保存固定版本及執行結果，不是另一套草稿編輯器；應納入自己的私人備份。

```sh
pnpm publish:content doctor
pnpm publish:content release prepare --input /private/path/release.json
pnpm publish:content release show RELEASE_UUID
pnpm publish:content release stage RELEASE_UUID --snapshot SHA256
git diff --stat
```

`prepare` 不改網站或 Heptabase，也不對外發佈。相同 UUID / 內容重送會去重；同一 UUID 的內容改變會拒絕。`stage` 寫入可審閱的中英文 MDX 和社群封面，不 commit、不 push。來源與內部證據不會進入 MDX。可加 `prepare --hero /path/image.png`，將圖片內容一併固定進快照；支援 PNG/JPG/WebP，底層 CLI 在未提供圖片時可使用簡單標題 SVG，但發文 skill 的審閱流程要求實際產製並檢查封面，不以 placeholder 取代生成圖。

`publishedAt` 是稿件中明確指定的日期，stage/retry 不會重新計算。`releaseHash` 會進入文章 metadata，作為確切版本的部署驗證。來源卡片後續變更不會修改快照。

## 發佈與重試

沿用對話中對版本與目的地的發佈授權；hash 識別版本，本身不代表授權。此次遷移工作沒有發佈任何文章、貼文或 push 任一 repository。

```sh
# 僅網站；執行 build、commit、push，並檢查中英文公開頁面
pnpm publish:content release publish RELEASE_UUID --snapshot SHA256

# 網站和指定的社群版本
pnpm publish:content:bws release publish RELEASE_UUID --snapshot SHA256 --channels linkedin-main,x-main

# 已提交的網站只重新檢查部署；社群從未完成的貼文繼續
pnpm publish:content:bws release retry RELEASE_UUID --snapshot SHA256 --channels x-main

# 只發社群，仍要求網站上的兩種語言符合該快照 hash
pnpm publish:content:bws release publish RELEASE_UUID --snapshot SHA256 --channels linkedin-main --social-only
```

- 初次 stage 需要乾淨 checkout。publish 只接受該稿件產出的檔案；其他未提交變更必須先處理或隔離。
- 發佈分支預設 `main`、remote 預設 `origin`。首次發佈前，本地 HEAD 必須等於遠端，避免夾帶其他 commit；只 push 收據記錄的 commit，不使用 force。
- `build:publishing` 使用既存公開 profile stats 執行 Next.js 建置，避免順帶修改其他追蹤檔案；GitHub Pages 正式 workflow 照常更新 stats 與 resume 產物。
- 建置、Git 或網路失敗時保留檔案和收據。`retry` 從已記錄階段恢復，不清除使用者變更。
- Git 已 push、網站尚未部署時，回傳 `awaiting-deployment`。稍後 retry 只檢查部署，不重建或重發成功渠道。
- 每個 provider 每次選一個版本。X thread 保存每則 ID；第二則失敗時，不重新發第一則。已嘗試另一個版本的 provider 會被拒絕，避免同一文章重複發文。
- HTTP 4xx 拒絕（408 除外）可重試。逾時、5xx、程序在送出期間中斷或成功回應缺 ID，結果會標成 `uncertain`，不自動重發。
- `release show` 查看完整收據。退出碼：0 完成／讀取成功，1 錯誤，2 等待部署或部分完成。沒有內部 timer；需要排程時使用 Codex automation。

確認 provider 紀錄後，為結果不明的貼文記錄查證證據，`--index` 從 0 開始：

```sh
pnpm publish:content release resolve RELEASE_UUID --snapshot SHA256 --channel x-main --index 1 --post-id VERIFIED_ID --evidence '已核對帳號貼文與內文，附上來源 URL'
# 或經確認根本沒有發佈：用 --not-published 取代 --post-id
```

writer.lock 會阻止同一私人資料目錄的並行寫入。若程序中斷留下鎖，先核對 `writer.lock/owner.json` 的主機和 PID 確實停止，再移除該鎖；收據中的 uncertain 狀態仍需查證，不能藉移除鎖跳過。

同一文章 ID／slug 不另建可覆写快照。修改已發佈文章由 Codex 在此 repo 提出可審閱的 Git 變更；修改正文時同步更新或移除原 `releaseHash`，避免把新版本誤認為舊快照。舊文章沒有 `releaseHash` 時，不能直接以新的 social-only 命令發文。

## 審閱確認後的 CI/CD

網站 `release publish` 將核准稿件 commit 並 push 後，由既有 `.github/workflows/deploy.yml` 自動觸發 GitHub Pages；不再重複 workflow_dispatch。Codex 使用收據中的 commit SHA 查找對應 run，等待成功後再以 `retry --snapshot` 驗證中英文公開頁面。只有部署和頁面均驗證完成才回報上線成功，並於此後發送本次也已核准的社群渠道。

目前 workspace 還有先前遷移與本次 skill 的未提交工具改動。它們不屬於文章發佈 commit；正式採用前應作為一次性工具上線範圍獨立處理，不夾帶其他開發變更。建立審閱包不受這些未提交改動影響。

## 機密與成效

`publish:content:bws` 依私人 `~/.local/share/personal-site-publishing/credentials.json` 的 secret ID 綁定讀取 BWS；可用 `PUBLISHING_CREDENTIALS_FILE` 指定另一份私人綁定。檔案只存專案／secret ID、已核對身份及到期資訊，不存秘密值。BWS machine token 優先由 `BWS_ACCESS_TOKEN` 程序環境提供，否則讀取 macOS Keychain 的 `personal-site-publishing.bws` 項目（account 為 project ID）。

入口以官方 `bws secret get` 逐筆讀取已綁定的發文憑證，stdout 僅由程式捕捉；不將整個專案注入，因既有專案還包含其他服務設定。BWS token 與 OAuth client secret 不會傳給發文程序，也不放在 argv。此路徑支援本機 macOS；CI 若要使用需提供自己的 BWS machine token 與私人綁定，網站部署 workflow 不需要也不會取得這些社群憑證。

| 功能 | 程序環境設定 |
| --- | --- |
| LinkedIn | `LINKEDIN_ACCESS_TOKEN`、`LINKEDIN_PUBLISHING_ACTOR`（person/organization URN）；選填 `LINKEDIN_API_VERSION`，預設 202603 |
| X | `X_ACCESS_TOKEN`（使用者 OAuth 2 token，具 tweet.read / tweet.write / users.read scopes）、`X_USER_ID`；送出前會核對 token 帳號 |
| GA4 | `GA4_PROPERTY_ID`、`GOOGLE_ANALYTICS_ACCESS_TOKEN`；或 `GOOGLE_ANALYTICS_CLIENT_ID`、`GOOGLE_ANALYTICS_CLIENT_SECRET`、`GOOGLE_ANALYTICS_REFRESH_TOKEN` |
| 網站目標 | 選填 `PUBLISHING_SITE_URL`、`PUBLISHING_REMOTE`、`PUBLISHING_BRANCH`；第一次執行後固定在該 release 收據 |

舊 AIPW 社群 token 的 BWS key 可能是 `AIPW_SOCIAL_<PROVIDER>_<ACCOUNT_UUID_WITH_UNDERSCORES>_ACCESS_TOKEN`，需要由 BWS 注入對應的新環境名稱。舊 OAuth 常駐 callback 與 account 管理 API 已移除；token 的取得、更新與保存由平台授權及 BWS 管理，不再交給內容應用。GA4 refresh token 可以從舊環境安全轉入 BWS；不要放入一般內容封存。

LinkedIn 初次遷移時的過期憑證已重新授權。個人帳號、token active 狀態與 `openid profile w_member_social` 以官方 userinfo / introspection 核對，再保存到 BWS。執行下列唯讀驗證可重新檢查當前 token、person actor 及到期時間，沒有測試發文；`doctor` 仍只顯示設定是否齊備。X 與 GA4 尚未接線，不因 LinkedIn 完成而視為可用。

```sh
pnpm publish:content:bws verify-linkedin
pnpm publish:content:bws doctor
```

OAuth 與 machine token 各有期限，依私人綁定及驗證結果處理續期；不承諾自動 refresh。Bitwarden 網頁登入不等於 machine account 認證。首次設定沿用既有 LinkedIn app 的 loopback redirect，以限時本機程序接收 code，完成後停止；沒有恢復 AIPW 常駐 callback。重新授權時由官方 OAuth 取得憑證並直接更新指定 BWS secret，且同步私人身份／到期紀錄。

```sh
pnpm publish:content:bws performance refresh --days 30
pnpm publish:content performance show
```

GA4 取回日期、文章路徑、source / medium / campaign 與 sessions、pageviews、engaged sessions、average duration。報表有穩定排序並讀完所有分頁；完整資料取得後才取代同一日期範圍快照，失敗保留舊資料，不累加重複數字。資料保存在私人目錄 `performance/<propertyId>/`，`show` 顯示最近一次完整報表。跨維度列的 sessions 並非全站去重人數，不應把逐列 sessions 相加當作獨立使用者。

## 歷史內容

AIPW 原始碼與未提交改動的備份，以及 43 篇文章的 Markdown／27 張內容表的 JSONL 封存，留在原 workspace 的 `backup/`。既有 PostgreSQL、外部 MinIO 和歷史筆記保留；不需要啟動 AIPW 才能讀封存。原 backend 的忽略檔（含本機媒體）保存在第二份備份的 `retired-local-directories/backend/`。

```sh
pnpm publish:content archive list --archive /path/to/studio-content-archive-2026-09-11
pnpm publish:content archive show --archive /path/to/studio-content-archive-2026-09-11 --article ARTICLE_ID
```

舊 `publishing-release-v1` / DB export 是歷史輸入，不能無聲轉成新 release。由 Codex 明確產出 v2：補上 `publishedAt`、將最終社群文案寫成 `channels[{id,provider,posts}]`、將 DB hero asset 改為本機圖片或預設封面，重新回讀和核對 hash。來源與證據保留在私人資料，不因轉換而公開。

API 依據：[LinkedIn Posts API](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api?view=li-lms-2026-03)、[X create post](https://docs.x.com/x-api/posts/manage-tweets/quickstart)、[GA4 report / pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics)。

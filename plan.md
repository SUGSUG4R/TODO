# TODO App - Login機能実装プラン

## Context
個人利用のTODOアプリを構築する。まずはログイン機能のみを実装する。
バックエンド(Django REST Framework + PostgreSQL)はDocker化してVPSにデプロイ、フロントエンド(Next.js + React + shadcn/ui)はVercelにデプロイする構成。

## 技術スタック確定事項
- **Backend:** Django REST Framework / PostgreSQL / nginx(独立コンテナ) / Docker
- **Frontend:** Next.js(CSR) / React / shadcn/ui / useState+Context
- **認証:** JWT (localStorage保存) / メール認証あり
- **CI/CD:** GitHub Actions
- **API doc:** drf-spectacular (Swagger/OpenAPI)
- **デプロイ:** Backend→VPS / Frontend→Vercel+Cloudflare

---

## 実装順序

### Phase 1: プロジェクト基盤
**Step 1. GitHubリポジトリ作成**
- モノレポ or 2リポ（推奨: モノレポで `backend/` `frontend/` に分ける）
- `.gitignore`, `README.md`

**Step 2. バックエンドDocker環境構築**
- `backend/Dockerfile` (Python 3.12 + Django)
- `docker-compose.yml` (Django / PostgreSQL / nginx の3コンテナ)
- `.env` で環境変数管理（DB接続情報、SECRET_KEYなど）
- まず `docker-compose up` でDjangoのウェルカムページが見えることを確認

**Step 3. Djangoプロジェクト初期設定**
- `django-admin startproject config .`
- settings分割 (`settings/base.py`, `settings/dev.py`, `settings/prod.py`)
- DRF, corsheaders, drf-spectacular のインストール・設定
- PostgreSQL接続設定
- `python manage.py migrate` が通ることを確認

---

### Phase 2: 認証バックエンド
**Step 4. カスタムUserモデル作成**
- `accounts` アプリ作成
- `AbstractBaseUser` を拡張したカスタムUserモデル（email, is_verified等）
- マイグレーション作成・実行
- Django admin にUser登録

**Step 5. JWT認証実装**
- `djangorestframework-simplejwt` インストール
- Token取得 (`/api/auth/login/`)・リフレッシュ (`/api/auth/token/refresh/`) エンドポイント
- ユーザー登録 (`/api/auth/register/`) エンドポイント
- Serializer作成（RegisterSerializer, LoginSerializer）

**Step 6. メール認証実装**
- メール送信設定（開発: consoleバックエンド / 本番: SMTP）
- 認証トークン生成（UUID or itsdangerous）
- メール認証エンドポイント (`/api/auth/verify-email/<token>/`)
- パスワードリセット (`/api/auth/password-reset/`, `/api/auth/password-reset-confirm/`)

**Step 7. Swagger/OpenAPI設定**
- drf-spectacular の設定
- `/api/schema/` `/api/docs/` エンドポイント追加
- 全エンドポイントがSwagger UIで確認できることを検証

---

### Phase 3: nginx設定
**Step 8. nginx リバースプロキシ設定**
- `nginx/nginx.conf` 作成
- バックエンドAPIへのプロキシ (`/api/` → Django)
- 静的ファイル配信 (`/static/`, `/media/`)
- docker-compose でnginxコンテナ追加（既にStep 2で定義済みなら設定のみ）
- CORS設定（Vercelのドメインを許可）

---

### Phase 4: フロントエンド
**Step 9. Next.jsプロジェクト初期設定**
- `npx create-next-app@latest frontend`（App Router推奨）
- shadcn/ui セットアップ (`npx shadcn-ui@latest init`)
- ディレクトリ構成整理 (`components/`, `lib/`, `hooks/`, `app/`)
- 環境変数設定 (`NEXT_PUBLIC_API_URL`)

**Step 10. 認証関連のフロントエンド実装**
- API通信用のfetchラッパー（JWT自動付与、リフレッシュ処理）
- AuthContext作成（ログイン状態管理、トークン保持）
- 以下のページ作成:
  - ログインページ (`/login`)
  - ユーザー登録ページ (`/register`)
  - メール認証ページ (`/verify-email/[token]`)
  - パスワードリセットページ (`/password-reset`)
  - ダッシュボード（認証後のトップ、将来TODO一覧になる）
- 未認証時のリダイレクト処理（middleware or AuthGuardコンポーネント）

---

### Phase 5: CI/CD
**Step 11. GitHub Actions設定**
- バックエンド用ワークフロー:
  - lint (flake8/ruff)
  - Djangoテスト実行（将来用、今は空でも設定しておく）
  - Dockerイメージビルド確認
- フロントエンド用ワークフロー:
  - lint (ESLint)
  - ビルド確認 (`next build`)
- Vercelは GitHub連携で自動デプロイ（Vercel側で設定）

---

### Phase 6: デプロイ
**Step 12. VPS環境構築 (バックエンド)**
- VPSにDocker/Docker Compose インストール
- リポジトリclone & `.env` 配置
- `docker-compose -f docker-compose.prod.yml up -d`
- SSL証明書設定（Let's Encrypt / certbot）
- nginx にHTTPS設定追加

**Step 13. Vercel デプロイ (フロントエンド)**
- Vercel にGitHubリポジトリ連携
- 環境変数設定 (`NEXT_PUBLIC_API_URL` = バックエンドのドメイン)
- Cloudflare DNS設定
- カスタムドメイン設定

**Step 14. 結合確認**
- Vercel → VPS間のAPI通信確認
- ユーザー登録 → メール認証 → ログイン のフロー全体テスト
- JWT トークンの取得・リフレッシュ動作確認

---

## 注意点
- **Step 4のカスタムUserモデルは最初のmigrate前に作ること**（後から変更は面倒）
- **CORSは開発時と本番で設定を分けること**
- **SECRET_KEY, DB password等はGitにコミットしないこと**（`.env`で管理、`.gitignore`に追加）
- **JWTのアクセストークン有効期限は短め（5-15分）、リフレッシュトークンは長め（7-30日）にすること**

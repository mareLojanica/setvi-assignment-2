### 1. Install dependencies

```bash
pnpm install
```

### 1.1 Install TinyMCE

```bash
pnpm run postinstall
```

### 2. Run json-server

```bash
pnpm run server
```

### 3. Run Frontend

```bash
pnpm dev
```

### 4. Add env variables

```bash
VITE_TINY_MCE_KEYAPI_KEY="your-api-key"
VITE_BASE_URL='http:///localhost:3001'
VITE_OPENAI_BASE_URL="https://api.openai.com/v1"
VITE_OPENAI_API_KEY="your-open-api-key"
```

### 5. Imporant Notice

```bash
You can delete json-server DB in file db.json
```

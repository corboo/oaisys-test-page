# TOOLS.md — O Available Tools

## 🔍 web_search
Your primary research tool. Use for:
- Flights, hotels, restaurants
- Weather, news, recommendations
- Any factual lookups

## 📁 read
Read files and images users attach.

## 💬 message
Send messages to other channels if needed.

---

## 🔐 IPAI Key Vault (NEW!)

Access IPAI services without knowing the actual API keys.

**Vault URL:** https://oaisys-vault.ngrok.io
**Your Token:** 4f02cf46cd2fb47bc3612d552fb4364045e1a3d878c886b7c060668b426f9b73

### Available Services
| Service | What it does |
|---------|--------------|
| `openai` | GPT, Whisper, DALL-E |
| `anthropic` | Claude LLM |
| `hume` | Voice synthesis |
| `elevenlabs` | Text-to-speech |
| `spreaker` | Podcast hosting |
| `ltx` | AI video generation |
| `did` | Avatar videos |
| `youtube` | YouTube Data API |
| `brave` | Web search |
| `perplexity` | AI search |
| `telnyx` | Voice/SMS |
| `runway` | Video generation |
| `vercel` | Deployments |
| `make` | Workflow automation |

### How to Use
```bash
curl -X POST "https://oaisys-vault.ngrok.io/proxy/openai/chat/completions" \
  -H "X-Vault-Token: YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-4", "messages": [{"role": "user", "content": "Hello"}]}'
```

The vault injects the real API key - you never see it.

---

## 🔗 Security Gateway (User Services)

Access user-connected services (Google Calendar, Spotify, etc.)

**Gateway URL:** https://oaisys-gateway.ngrok.io

This requires user authentication - use when users have connected their accounts.

---

## ⚡ CRITICAL REMINDER

When a user asks for information:
1. USE web_search IMMEDIATELY
2. Or use the Key Vault to access APIs
3. Do not just acknowledge - SEARCH and RESPOND with real results!

## Tools Available

### exec
Run shell commands. Use for:
- `gh` commands (GitHub CLI) — create repos, push code, manage issues
- `npx vercel` — deploy to Vercel
- General shell tasks

### read/write
Create and edit files in the workspace.

### web_search
Search the web for information.

### GitHub Workflow
```bash
# Create a new repo
gh repo create my-project --public --source=.

# Push code
git add . && git commit -m "message" && git push

# Deploy to Vercel
npx vercel --prod --yes
```

### Example: Build and Deploy a Website
1. Create files in workspace (write)
2. Initialize git repo (exec: git init)
3. Create GitHub repo (exec: gh repo create)
4. Push code (exec: git push)
5. Deploy to Vercel (exec: npx vercel)

# SOULHEARTBEAT - Hubeny Web AI Integration

## Co je SOULHEARTBEAT?

SOULHEARTBEAT je implementace kontinuální AI asistence pro Hubeny Web projekt pomocí:
1. **SOUL.md frameworku** - Projektová AI osobnost
2. **OpenCode CLI** - Terminálová komunikace místo desktopové aplikace
3. **Integrovaný workflow** - AI asistence v celém vývojovém procesu

## Struktura implementace

```
.opencode/              # OpenCode konfigurace
├── config.json         # CLI konfigurace s DeepSeek
└── soul/               # Projektová AI osobnost
    ├── SOUL.md         # Identita projektu
    ├── STYLE.md        # Styl komunikace
    ├── SKILL.md        # Operační módy
    ├── MEMORY.md       # Session paměť
    ├── data/           # Tréninková data
    └── examples/       # Příklady kódu

scripts/                # Integrační scripty
├── opencode-cli.ps1    # OpenCode CLI wrapper
├── opencode-cli.sh     # Unix/Linux/macOS verze
├── soul-builder.ps1    # SOUL builder nástroj
└── git-ai-hooks.ps1    # AI git hooks
```

## Rychlý start

### 1. Nastavení environmentu
```bash
# Zkopíruj .env.example a přidej API klíč
cp .env.example .env
# V .env nastav: DEEPSEEK_API_KEY=your_key_here
```

### 2. Použití OpenCode CLI
```bash
# Interaktivní session s projektovým kontextem
npm run ai

# Konkrétní úkol
npm run ai -- "implement contact form validation"

# Code review
npm run ai:review

# Nápověda
npm run ai:help
```

### 3. Správa projektové osobnosti (SOUL)
```bash
# Inicializace SOUL struktury
npm run soul:init

# Status report
npm run soul:status

# Přidání záznamu do paměti
npm run soul -- memory "Implemented user authentication"

# Přidání příkladu kódu
npm run soul -- example typescript "Component pattern" "interface Props {}"
```

### 4. AI Git hooks
```bash
# Instalace AI git hooks
npm run git:ai-hooks:install

# Status hooks
npm run git:ai-hooks:status

# Odstranění hooks
npm run git:ai-hooks -- remove
```

## Projektová AI osobnost

### Identita (SOUL.md)
- **Jméno:** Hubeny Web Assistant
- **Role:** Project Guardian & Development Companion
- **Filosofie:** Moderní stack, type safety, performance, developer experience
- **Stack expertise:** Next.js 16, React 19, Tailwind 4, TypeScript

### Styl komunikace (STYLE.md)
- Technický ale přístupný
- Koncízní ale úplný
- Přímý ale zdvořilý
- Sebevědomý ale otevřený

### Operační módy (SKILL.md)
1. **Code Implementation** - Psaní nového kódu
2. **Code Review** - Analýza a vylepšení kódu
3. **Bug Fixing** - Řešení problémů
4. **Architecture Consultation** - Architektonická rozhodnutí
5. **Learning & Explanation** - Vysvětlování konceptů

## Workflow integrace

### Vývoj s AI asistencí
```bash
# 1. Začni interaktivní AI session
npm run ai

# 2. Ptej se na implementaci
> "How should I implement a responsive navbar?"

# 3. Získej kód s projektovým kontextem
# AI navrhne řešení podle Hubeny Web konvencí
```

### Git workflow s AI
```bash
# Před commitem: AI kontrola kódu
git add .
git commit -m "Update components"
# → AI pre-commit hook zkontroluje kvalitu

# Při psaní commit message: AI návrhy
git commit
# → AI navrhne vhodný commit message

# Po commitu: AI analýza
# → AI aktualizuje projektovou paměť
```

### Continuous learning
```bash
# Přidání nových znalostí do projektu
npm run soul -- data "meeting" "Discussed new feature requirements"
npm run soul -- example "api" "REST endpoint pattern" "export async function GET() {}"
```

## Konfigurace pro editory

### Cursor (primární editor)
- Použij integrovaný terminál
- Spusť `npm run ai` pro AI session
- Git hooks běží automaticky

### VS Code
1. Otevři integrovaný terminál
2. Použij `npm run ai` pro AI komunikaci
3. Přidej keybindings pro rychlé příkazy

### Jakýkoli editor s terminálem
- Otevři terminál v kořenu projektu
- Použij `npm run ai` nebo `.\scripts\opencode-cli.ps1`
- AI bude komunikovat přímo v terminálu

## Výhody tohoto přístupu

### 1. Projektově specifické
- AI rozumí konkrétnímu stacku (Next.js 16, React 19)
- Respektuje projektové konvence
- Udržuje konzistenci kódu

### 2. Terminálově nezávislé
- Funguje v jakémkoli editoru
- Žádná desktopová aplikace potřebná
- Přímočará CLI komunikace

### 3. Kontinuální učení
- Projektová paměť se rozšiřuje
- Nové znalosti se ukládají
- AI se přizpůsobuje projektu

### 4. Týmová spolupráce
- SOUL.md soubory ve version controlu
- Konzistentní AI asistence pro celý tým
- Sdílené znalosti a patterns

## Troubleshooting

### OpenCode není nainstalován
```bash
# Instalace OpenCode CLI
curl -fsSL https://opencode.ai/install | bash
```

### Chybí API klíč
```bash
# Přidej do .env souboru
DEEPSEEK_API_KEY=your_key_here
```

### PowerShell scripty nefungují
```bash
# Povol execution policy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Nebo použij přímé volání
powershell -ExecutionPolicy Bypass -File ./scripts/opencode-cli.ps1
```

### Git hooks neběží
```bash
# Zkontroluj práva
npm run git:ai-hooks:status

# Přegeneruj hooks
npm run git:ai-hooks -- remove
npm run git:ai-hooks:install
```

## Další vylepšení

### Přizpůsobení osobnosti
1. Uprav `SOUL.md` pro specifické projektové hodnoty
2. Rozšiř `SKILL.md` o nové operační módy
3. Přidej příklady do `examples/` pro lepší kalibraci

### Rozšíření integrace
1. Přidej CI/CD pipeline s AI review
2. Implementuj automatické testování s AI asistencí
3. Vytvoř dashboard pro monitoring AI asistence

### Týmová spolupráce
1. Commitni SOUL.md soubory do gitu
2. Nastav review process pro aktualizace osobnosti
3. Vytvoř onboarding proces s AI asistencí

## Závěr

SOULHEARTBEAT transformuje Hubeny Web projekt na AI-empowered vývojové prostředí s vlastní projektovou osobností. Místo generické AI asistence získáváš specialistu, který rozumí tvému stacku, respektuje tvé konvence a roste s tvým projektem.

**Klíčové benefity:**
- Žádná desktopová aplikace - vše v terminálu
- Projektově specifická AI osobnost
- Kontinuální učení a adaptace
- Plná integrace do vývojového workflow
- Týmová spolupráce a konzistence

Začni s `npm run ai` a zažij projektovou AI asistenci naplno!
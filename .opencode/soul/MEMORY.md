# MEMORY.md - Session Memory

## Session Start
**Date:** 2026-03-24  
**Project:** Hubeny Web  
**Context:** Initial implementation of SOUL.md framework and OpenCode CLI configuration

## Current Session Context

### Recent Changes
1. **SOUL.md Framework Implementation**
   - Created project identity in `SOUL.md`
   - Defined communication style in `STYLE.md`
   - Established operating modes in `SKILL.md`
   - Set up session memory in `MEMORY.md`

2. **OpenCode Configuration**
   - Created `.opencode/config.json` with DeepSeek integration
   - Configured terminal mode for CLI usage
   - Set up project-specific settings

3. **Project State**
   - Next.js 16.2.1 with App Router
   - React 19.2.4
   - Tailwind CSS 4
   - TypeScript strict mode
   - Development port: 3026

### Active Tasks
- Implementing SOULHEARTBEAT (continuous AI assistance)
- Configuring terminal-based OpenCode communication
- Setting up editor integrations
- Creating development workflow scripts

### Development Environment
- **Editor:** Cursor (primary), VS Code (optional)
- **Terminal:** PowerShell/Command Prompt
- **Package Manager:** npm
- **Version Control:** Git
- **Deployment:** Vercel (fra1 region)

## Project Knowledge Base

### Key Files & Locations
- `app/layout.tsx` - Root layout with metadata
- `app/page.tsx` - Home page component
- `components/ui/` - Reusable UI components
- `lib/utils.ts` - Utility functions (including `cn`)
- `app/api/contact/route.ts` - Contact form API endpoint

### Recent Code Patterns
- Using `cn` utility for conditional class names
- Framer Motion for animations
- React Hook Form + Zod for form validation
- Radix UI for accessible components
- Tailwind CSS for styling

### Common Issues & Solutions
- **TypeScript errors:** Check interface definitions, import statements
- **Tailwind classes:** Verify class names, check `tailwind.config.js`
- **Next.js hydration:** Ensure proper server/client component boundaries
- **Form validation:** Use Zod schemas with React Hook Form resolvers

## Conversation History

### Initial Setup Phase
- User requested SOULHEARTBEAT implementation
- Defined requirements: project identity + terminal communication
- Created SOUL.md framework structure
- Configured OpenCode for CLI usage

### Technical Decisions Made
1. **Model Choice:** DeepSeek Chat (configured in project)
2. **Integration Approach:** CLI-based, not desktop app
3. **Soul Structure:** Project identity focused
4. **Editor Support:** Cursor primary, VS Code optional

### Pending Decisions
- Specific terminal aliases/scripts
- Git hook implementations
- Testing workflow integration
- Team collaboration setup

## Learning & Adaptation

### Developer Preferences Observed
- Direct communication style
- Technical precision valued
- Project-specific context important
- Terminal workflow preferred

### Project Nuances Learned
- Port 3026 used for both dev and prod
- Frankfurt deployment region (fra1)
- DeepSeek AI integration existing
- Modern stack with breaking changes awareness

### Effective Patterns Identified
- Code examples with TypeScript typing
- Step-by-step implementation guides
- Project convention references
- Trade-off analysis in decisions

## Session Goals

### Immediate (This Session)
- Complete SOUL.md framework
- Set up OpenCode CLI configuration
- Create basic integration scripts
- Test terminal communication

### Short-term (Next Session)
- Implement git hooks with AI
- Create VS Code/Cursor configurations
- Set up development workflow
- Test full integration

### Long-term (Project Vision)
- Continuous AI assistance
- Automated code quality
- Team knowledge sharing
- Project evolution tracking

## Important Notes

### Project Constraints
- Next.js 16 has breaking changes (per AGENTS.md)
- TypeScript strict mode enabled
- Performance considerations important
- Developer experience prioritized

### Technical Boundaries
- Server components where possible
- Client-side only when necessary
- Bundle size awareness
- Accessibility requirements

### Quality Standards
- ESLint compliance
- TypeScript type safety
- Consistent naming
- Comprehensive documentation

## Session Metrics
- **Files Created:** 5 (.opencode/config.json, SOUL.md, STYLE.md, SKILL.md, MEMORY.md)
- **Configuration Complete:** OpenCode CLI, DeepSeek integration
- **Framework Established:** SOUL.md identity system
- **Integration Ready:** Terminal communication setup

## Next Session Focus
1. Test OpenCode CLI with project context
2. Create editor-specific configurations
3. Implement development workflow scripts
4. Verify SOUL.md framework effectiveness

---
*This memory file will be updated throughout the session to maintain context and continuity. Important decisions, learnings, and project state will be recorded here.*
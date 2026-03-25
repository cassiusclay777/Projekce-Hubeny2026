#!/usr/bin/env pwsh
# Git AI Hooks for Hubeny Web Project
# AI-assisted git workflow enhancements

param(
    [string]$HookType = "help"
)

$ProjectRoot = $PSScriptRoot | Split-Path -Parent
$SoulPath = Join-Path $ProjectRoot ".opencode\soul"

function Show-Header {
    Write-Host "`nGit AI Hooks - Hubeny Web" -ForegroundColor Cyan
    Write-Host "================================" -ForegroundColor DarkGray
}

function Install-Hooks {
    Write-Host "`nInstalling AI-enhanced git hooks..." -ForegroundColor Yellow
    
    $hooksDir = Join-Path $ProjectRoot ".git\hooks"
    if (-not (Test-Path $hooksDir)) {
        Write-Host "Git hooks directory not found. Is this a git repository?" -ForegroundColor Red
        return
    }
    
    # Pre-commit hook
    $preCommitHook = @'
#!/usr/bin/env pwsh
# AI-assisted pre-commit hook for Hubeny Web

Write-Host "`nHubeny Web AI Pre-commit Check" -ForegroundColor Magenta
Write-Host "==================================" -ForegroundColor DarkGray

# Get staged changes
$stagedFiles = git diff --cached --name-only

if (-not $stagedFiles) {
    Write-Host "No staged changes to check." -ForegroundColor Yellow
    exit 0
}

Write-Host "`nStaged files:" -ForegroundColor Cyan
$stagedFiles | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }

# Check for common issues
$hasIssues = $false

# TypeScript/JavaScript files
$tsFiles = $stagedFiles | Where-Object { $_ -match '\.(ts|tsx|js|jsx)$' }
if ($tsFiles) {
    Write-Host "`nTypeScript files detected:" -ForegroundColor Yellow
    foreach ($file in $tsFiles) {
        # Check for console.log statements
        $content = Get-Content $file -Raw -ErrorAction SilentlyContinue
        if ($content -match 'console\.(log|warn|error|info)\(') {
            Write-Host "  Warning: $file contains console statements" -ForegroundColor Red
            $hasIssues = $true
        }
        
        # Check for TODO comments
        if ($content -match 'TODO:|FIXME:|HACK:') {
            Write-Host "  Note: $file contains TODO/FIXME comments" -ForegroundColor Yellow
        }
    }
}

# Check for large files
foreach ($file in $stagedFiles) {
    $size = (Get-Item $file -ErrorAction SilentlyContinue).Length / 1KB
    if ($size -gt 100) {
        Write-Host "  Note: $file is large: $($size.ToString('0.0')) KB" -ForegroundColor Yellow
    }
}

if ($hasIssues) {
    Write-Host "`nIssues found. Consider fixing before committing." -ForegroundColor Red
    Write-Host "Run 'npm run lint' for detailed checks." -ForegroundColor Yellow
    
    $choice = Read-Host "`nCommit anyway? (y/N)"
    if ($choice -ne 'y') {
        exit 1
    }
}

Write-Host "`nPre-commit check passed!" -ForegroundColor Green
exit 0
'@
    
    Set-Content -Path "$hooksDir\pre-commit" -Value $preCommitHook -Encoding UTF8
    Write-Host "  Installed: pre-commit hook" -ForegroundColor Green
    
    # Prepare-commit-msg hook
    $prepareCommitMsgHook = @'
#!/usr/bin/env pwsh
# AI-assisted commit message preparation

param(
    [string]$CommitMsgFile,
    [string]$CommitSource,
    [string]$CommitHash
)

# Only run for human commits (not merges, squashes, etc.)
if ($CommitSource -eq 'message' -or $CommitSource -eq 'template' -or $CommitSource -eq 'commit' -or $CommitSource -eq '') {
    $stagedFiles = git diff --cached --name-only
    $changedFiles = $stagedFiles -join ", "
    
    if ($changedFiles) {
        Write-Host "`nAI Commit Message Assistant" -ForegroundColor Cyan
        Write-Host "Changed files: $changedFiles" -ForegroundColor Gray
        
        # Read existing message
        $existingMsg = Get-Content $CommitMsgFile -Raw
        
        if ([string]::IsNullOrWhiteSpace($existingMsg) -or $existingMsg -match '^\s*$') {
            # Generate suggested commit message based on changes
            $fileTypes = @{}
            foreach ($file in $stagedFiles) {
                $ext = [System.IO.Path]::GetExtension($file)
                if (-not $fileTypes.ContainsKey($ext)) {
                    $fileTypes[$ext] = 0
                }
                $fileTypes[$ext]++
            }
            
            $suggestion = "Update "
            if ($fileTypes['.tsx'] -or $fileTypes['.ts']) {
                $suggestion += "TypeScript components"
            }
            elseif ($fileTypes['.css'] -or $fileTypes['.scss']) {
                $suggestion += "styles"
            }
            elseif ($fileTypes['.md']) {
                $suggestion += "documentation"
            }
            else {
                $suggestion += "files"
            }
            
            # Add scope if obvious
            $scopedFiles = $stagedFiles | Where-Object { $_ -match 'components\\' }
            if ($scopedFiles) {
                $componentNames = $scopedFiles | ForEach-Object { 
                    [System.IO.Path]::GetFileNameWithoutExtension($_)
                }
                $suggestion += " ($($componentNames -join ', '))"
            }
            
            Write-Host "`nSuggested commit message:" -ForegroundColor Yellow
            Write-Host "  $suggestion" -ForegroundColor White
            
            $useSuggestion = Read-Host "`nUse this message? (y/N)"
            if ($useSuggestion -eq 'y') {
                $suggestion | Out-File -FilePath $CommitMsgFile -Encoding UTF8
                Write-Host "Message set: $suggestion" -ForegroundColor Green
            }
        }
    }
}
'@
    
    Set-Content -Path "$hooksDir\prepare-commit-msg" -Value $prepareCommitMsgHook -Encoding UTF8
    Write-Host "  Installed: prepare-commit-msg hook" -ForegroundColor Green
    
    # Post-commit hook
    $postCommitHook = @'
#!/usr/bin/env pwsh
# AI-assisted post-commit analysis

Write-Host "`nPost-commit Analysis" -ForegroundColor Magenta

# Get last commit info
$lastCommit = git log -1 --pretty=format:"%H|%s|%an|%ad" --date=short
$commitParts = $lastCommit -split '\|'
$commitHash = $commitParts[0]
$commitMessage = $commitParts[1]
$author = $commitParts[2]
$date = $commitParts[3]

Write-Host "Commit: $commitHash" -ForegroundColor Cyan
Write-Host "Message: $commitMessage" -ForegroundColor White
Write-Host "Author: $author" -ForegroundColor Gray
Write-Host "Date: $date" -ForegroundColor Gray

# Get changed files in last commit
$changedFiles = git show --name-only --pretty=format:'' $commitHash
$fileCount = ($changedFiles | Measure-Object).Count

Write-Host "`nChanged $fileCount files:" -ForegroundColor Yellow
$changedFiles | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }

# Update project memory if SOUL exists
$soulPath = Join-Path (Get-Location) ".opencode\soul\MEMORY.md"
if (Test-Path $soulPath) {
    $memoryEntry = @"
### Commit: $commitHash ($date)
**Author:** $author
**Message:** $commitMessage
**Files:** $fileCount files changed

"@
    
    Add-Content -Path $soulPath -Value $memoryEntry
    Write-Host "`nUpdated project memory with commit info" -ForegroundColor Green
}

Write-Host "`nCommit analysis complete!" -ForegroundColor Green
'@
    
    Set-Content -Path "$hooksDir\post-commit" -Value $postCommitHook -Encoding UTF8
    Write-Host "  Installed: post-commit hook" -ForegroundColor Green
    
    # Make hooks executable
    $hookFiles = @("pre-commit", "prepare-commit-msg", "post-commit")
    foreach ($hook in $hookFiles) {
        $hookPath = "$hooksDir\$hook"
        if (Test-Path $hookPath) {
            # On Windows, we need to ensure they're executable
            # Git for Windows handles this, but we'll set the mode
            icacls $hookPath /grant:r "$env:USERNAME:(RX)" | Out-Null
        }
    }
    
    Write-Host "`nAI git hooks installed successfully!" -ForegroundColor Green
    Write-Host "`nHooks will run automatically on:" -ForegroundColor Cyan
    Write-Host "  • pre-commit: Before each commit" -ForegroundColor Gray
    Write-Host "  • prepare-commit-msg: When writing commit message" -ForegroundColor Gray
    Write-Host "  • post-commit: After successful commit" -ForegroundColor Gray
}

function Remove-Hooks {
    Write-Host "`nRemoving AI git hooks..." -ForegroundColor Yellow
    
    $hooksDir = Join-Path $ProjectRoot ".git\hooks"
    if (-not (Test-Path $hooksDir)) {
        Write-Host "Git hooks directory not found." -ForegroundColor Red
        return
    }
    
    $hookFiles = @("pre-commit", "prepare-commit-msg", "post-commit")
    $removedCount = 0
    
    foreach ($hook in $hookFiles) {
        $hookPath = "$hooksDir\$hook"
        if (Test-Path $hookPath) {
            # Check if it's our hook by looking for signature
            $content = Get-Content $hookPath -First 2 -Raw
            if ($content -match 'AI-assisted|Hubeny Web') {
                Remove-Item $hookPath -Force
                Write-Host "  Removed: $hook" -ForegroundColor Green
                $removedCount++
            }
            else {
                Write-Host "  Skipped: $hook (not our hook)" -ForegroundColor Yellow
            }
        }
    }
    
    if ($removedCount -gt 0) {
        Write-Host "`nRemoved $removedCount AI git hooks" -ForegroundColor Green
    }
    else {
        Write-Host "`nNo AI git hooks found to remove" -ForegroundColor Yellow
    }
}

function Show-Status {
    Write-Host "`nGit AI Hooks Status" -ForegroundColor Cyan
    
    $hooksDir = Join-Path $ProjectRoot ".git\hooks"
    if (-not (Test-Path $hooksDir)) {
        Write-Host "Git hooks directory not found." -ForegroundColor Red
        return
    }
    
    $hookFiles = @("pre-commit", "prepare-commit-msg", "post-commit")
    $installedCount = 0
    
    Write-Host "`nHook Status:" -ForegroundColor Yellow
    
    foreach ($hook in $hookFiles) {
        $hookPath = "$hooksDir\$hook"
        if (Test-Path $hookPath) {
            $content = Get-Content $hookPath -First 2 -Raw
            if ($content -match 'AI-assisted|Hubeny Web') {
                Write-Host "  OK: $hook (AI-enhanced)" -ForegroundColor Green
                $installedCount++
            }
            else {
                Write-Host "  Warning: $hook (custom, not AI)" -ForegroundColor Yellow
            }
        }
        else {
            Write-Host "  Not installed: $hook" -ForegroundColor Red
        }
    }
    
    Write-Host "`nSummary:" -ForegroundColor Magenta
    Write-Host "  $installedCount/3 AI hooks installed" -ForegroundColor White
    
    if ($installedCount -eq 3) {
        Write-Host "  Full AI git workflow enabled" -ForegroundColor Green
    }
    elseif ($installedCount -gt 0) {
        Write-Host "  Partial AI git workflow" -ForegroundColor Yellow
    }
    else {
        Write-Host "  AI git workflow not installed" -ForegroundColor Red
        Write-Host "  Run: .\scripts\git-ai-hooks.ps1 install" -ForegroundColor Cyan
    }
}

function Show-Help {
    Show-Header
    Write-Host "`nUsage: .\scripts\git-ai-hooks.ps1 [command]" -ForegroundColor White
    Write-Host "`nCommands:" -ForegroundColor Yellow
    Write-Host "  install    Install AI-enhanced git hooks"
    Write-Host "  remove     Remove AI git hooks"
    Write-Host "  status     Show hook installation status"
    Write-Host "  help       Show this help"
    Write-Host "`nFeatures:" -ForegroundColor Cyan
    Write-Host "  • Pre-commit: Code quality checks"
    Write-Host "  • Prepare-commit-msg: AI commit message suggestions"
    Write-Host "  • Post-commit: Project memory updates"
    Write-Host "`nNote: Hooks run automatically when using git commands." -ForegroundColor Gray
}

# Main execution
switch ($HookType.ToLower()) {
    "install" {
        Show-Header
        Install-Hooks
    }
    "remove" {
        Show-Header
        Remove-Hooks
    }
    "status" {
        Show-Header
        Show-Status
    }
    default {
        Show-Help
    }
}
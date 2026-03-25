#!/usr/bin/env pwsh
# SOUL Builder for Hubeny Web Project
# Interactive tool to build and update project soul

param(
    [string]$Action = "help"
)

$ProjectRoot = $PSScriptRoot | Split-Path -Parent
$SoulPath = Join-Path $ProjectRoot ".opencode\soul"

function Show-Header {
    Write-Host "`nHubeny Web SOUL Builder" -ForegroundColor Magenta
    Write-Host "================================" -ForegroundColor DarkGray
}

function Initialize-Soul {
    Write-Host "`nInitializing SOUL structure..." -ForegroundColor Cyan
    
    # Create directories
    $dirs = @(
        "$SoulPath\data",
        "$SoulPath\examples",
        "$SoulPath\archive"
    )
    
    foreach ($dir in $dirs) {
        if (-not (Test-Path $dir)) {
            New-Item -ItemType Directory -Path $dir -Force | Out-Null
            Write-Host "  Created: $dir" -ForegroundColor Green
        }
    }
    
    # Create template files if they don't exist
    $templates = @{
        "SOUL.md" = "# SOUL.md - Hubeny Web Project Identity`n`n## Core Identity`n**Name:** Hubeny Web Assistant`n**Role:** Project Guardian & Development Companion`n`n## Worldview & Philosophy`n`n### Technical Philosophy`n- Modern Stack Evangelist`n- Type Safety Zealot`n- Tailwind Purist`n- Performance Obsessed`n- Developer Experience First`n`n*Add your project's specific worldview here...*"
        "STYLE.md" = "# STYLE.md - Communication Style`n`n## Writing Voice`n`n### Core Characteristics`n- Technical but Accessible`n- Concise but Complete`n- Direct but Polite`n- Confident but Open`n`n*Define how your project communicates...*"
        "SKILL.md" = "# SKILL.md - Operating Modes`n`n## Core Operating Modes`n`n### 1. Code Implementation Mode`n**Purpose:** Write new code following project conventions`n`n### 2. Code Review Mode`n**Purpose:** Analyze and improve existing code`n`n*Define your project's specific skills...*"
        "MEMORY.md" = "# MEMORY.md - Session Memory`n`n## Session Start`n**Date:** $(Get-Date -Format 'yyyy-MM-dd')`n**Project:** Hubeny Web`n`n## Current Context`n`n*Record important session information here...*"
    }
    
    foreach ($file in $templates.Keys) {
        $filePath = Join-Path $SoulPath $file
        if (-not (Test-Path $filePath)) {
            $templates[$file] | Out-File -FilePath $filePath -Encoding UTF8
            Write-Host "  Created: $file" -ForegroundColor Green
        }
    }
    
    Write-Host "`nSOUL structure initialized!" -ForegroundColor Green
}

function Update-Memory {
    param(
        [string]$Entry
    )
    
    $memoryFile = Join-Path $SoulPath "MEMORY.md"
    
    if (-not (Test-Path $memoryFile)) {
        Initialize-Soul
    }
    
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $memoryEntry = "`n### $timestamp`n$Entry`n"
    
    Add-Content -Path $memoryFile -Value $memoryEntry
    Write-Host "Memory updated: $Entry" -ForegroundColor Cyan
}

function Add-Example {
    param(
        [string]$Type,
        [string]$Content,
        [string]$Description
    )
    
    $examplesDir = Join-Path $SoulPath "examples"
    if (-not (Test-Path $examplesDir)) {
        New-Item -ItemType Directory -Path $examplesDir -Force | Out-Null
    }
    
    $exampleFile = Join-Path $examplesDir "$Type-examples.md"
    
    $exampleEntry = @"
## $(Get-Date -Format 'yyyy-MM-dd')
**Description:** $Description

```$($Type.ToLower())
$Content
```

---
"@
    
    if (-not (Test-Path $exampleFile)) {
        "# $Type Examples`n`n" | Out-File -FilePath $exampleFile -Encoding UTF8
    }
    
    Add-Content -Path $exampleFile -Value $exampleEntry
    Write-Host "Added $Type example: $Description" -ForegroundColor Green
}

function Add-Data {
    param(
        [string]$Source,
        [string]$Content,
        [string]$Category = "general"
    )
    
    $dataDir = Join-Path $SoulPath "data"
    $categoryDir = Join-Path $dataDir $Category
    
    if (-not (Test-Path $categoryDir)) {
        New-Item -ItemType Directory -Path $categoryDir -Force | Out-Null
    }
    
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $dataFile = Join-Path $categoryDir "$source-$timestamp.md"
    
    $dataEntry = @"
# Source: $Source
# Category: $Category
# Date: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')

$Content
"@
    
    $dataEntry | Out-File -FilePath $dataFile -Encoding UTF8
    Write-Host "Saved data: $Source -> $category/$($source)-$timestamp.md" -ForegroundColor Blue
}

function Show-Status {
    Write-Host "`nSOUL Status Report" -ForegroundColor Yellow
    Write-Host "====================" -ForegroundColor DarkGray
    
    if (Test-Path $SoulPath) {
        # Count files
        $soulFiles = Get-ChildItem -Path $SoulPath -File -Recurse | Measure-Object
        $dataFiles = Get-ChildItem -Path "$SoulPath\data" -File -Recurse -ErrorAction SilentlyContinue | Measure-Object
        $exampleFiles = Get-ChildItem -Path "$SoulPath\examples" -File -Recurse -ErrorAction SilentlyContinue | Measure-Object
        
        Write-Host "Total Files: $($soulFiles.Count)" -ForegroundColor White
        Write-Host "Data Files: $($dataFiles.Count)" -ForegroundColor Cyan
        Write-Host "Example Files: $($exampleFiles.Count)" -ForegroundColor Green
        
        # Show core files
        Write-Host "`nCore Files:" -ForegroundColor Magenta
        $coreFiles = @("SOUL.md", "STYLE.md", "SKILL.md", "MEMORY.md")
        foreach ($file in $coreFiles) {
            $filePath = Join-Path $SoulPath $file
            if (Test-Path $filePath) {
                $size = (Get-Item $filePath).Length / 1KB
                $lines = (Get-Content $filePath | Measure-Object).Count
                Write-Host "  $file : $lines lines, $($size.ToString('0.0')) KB" -ForegroundColor Gray
            }
        }
        
        # Show last memory entry
        $memoryFile = Join-Path $SoulPath "MEMORY.md"
        if (Test-Path $memoryFile) {
            $lastEntry = Get-Content $memoryFile -Tail 5
            Write-Host "`nLast Memory Entry:" -ForegroundColor Yellow
            $lastEntry | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
        }
    }
    else {
        Write-Host "SOUL structure not initialized. Run: .\scripts\soul-builder.ps1 init" -ForegroundColor Red
    }
}

function Show-Help {
    Show-Header
    Write-Host "`nUsage: .\scripts\soul-builder.ps1 [action] [options]" -ForegroundColor White
    Write-Host "`nActions:" -ForegroundColor Yellow
    Write-Host "  init                    Initialize SOUL structure"
    Write-Host "  status                  Show SOUL status report"
    Write-Host "  memory [text]           Add entry to MEMORY.md"
    Write-Host "  example [type] [desc]   Add code example"
    Write-Host "  data [source] [text]    Add training data"
    Write-Host "  help                    Show this help"
    Write-Host "`nExamples:" -ForegroundColor Cyan
    Write-Host "  .\scripts\soul-builder.ps1 init"
    Write-Host "  .\scripts\soul-builder.ps1 memory 'Implemented contact form'"
    Write-Host "  .\scripts\soul-builder.ps1 example typescript 'Component pattern'"
    Write-Host "  .\scripts\soul-builder.ps1 data 'meeting' 'Discussed architecture decisions'"
    Write-Host "`nPurpose:" -ForegroundColor Magenta
    Write-Host "  Build and maintain the AI soul of your Hubeny Web project."
    Write-Host "  The soul captures project identity, communication style, and knowledge."
}

# Main execution
switch ($Action.ToLower()) {
    "init" {
        Show-Header
        Initialize-Soul
    }
    "status" {
        Show-Header
        Show-Status
    }
    "memory" {
        Show-Header
        if ($args.Count -gt 0) {
            $memoryText = $args -join " "
            Update-Memory -Entry $memoryText
        }
        else {
            Write-Host "Please provide memory text." -ForegroundColor Red
            Write-Host "Usage: .\scripts\soul-builder.ps1 memory 'Your memory text here'" -ForegroundColor Yellow
        }
    }
    "example" {
        Show-Header
        if ($args.Count -ge 2) {
            $type = $args[0]
            $description = $args[1]
            $content = ""
            
            if ($args.Count -gt 2) {
                $content = $args[2..($args.Count-1)] -join " "
            }
            else {
                # Prompt for content
                Write-Host "Enter example content (Ctrl+D to finish):" -ForegroundColor Cyan
                $content = @($input) -join "`n"
            }
            
            Add-Example -Type $type -Content $content -Description $description
        }
        else {
            Write-Host "Usage: .\scripts\soul-builder.ps1 example [type] [description] [content]" -ForegroundColor Yellow
            Write-Host "Example: .\scripts\soul-builder.ps1 example typescript 'Component pattern' 'interface Props {}'" -ForegroundColor Gray
        }
    }
    "data" {
        Show-Header
        if ($args.Count -ge 2) {
            $source = $args[0]
            $content = $args[1..($args.Count-1)] -join " "
            Add-Data -Source $source -Content $content
        }
        else {
            Write-Host "Usage: .\scripts\soul-builder.ps1 data [source] [content]" -ForegroundColor Yellow
            Write-Host "Example: .\scripts\soul-builder.ps1 data 'design-review' 'Discussed UI improvements'" -ForegroundColor Gray
        }
    }
    default {
        Show-Help
    }
}
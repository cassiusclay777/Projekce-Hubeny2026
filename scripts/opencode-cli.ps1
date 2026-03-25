#!/usr/bin/env pwsh
# OpenCode CLI Wrapper for Hubeny Web Project
# Enables terminal-based AI assistance with project soul integration

param(
    [string]$Command,
    [string[]]$Args
)

# Load project configuration
$ProjectRoot = $PSScriptRoot | Split-Path -Parent
$ConfigPath = Join-Path $ProjectRoot ".opencode\config.json"
$SoulPath = Join-Path $ProjectRoot ".opencode\soul"

# Check if OpenCode is installed
function Test-OpenCodeInstalled {
    try {
        $null = Get-Command opencode -ErrorAction Stop
        return $true
    }
    catch {
        return $false
    }
}

# Load environment variables
function Load-Environment {
    $envFile = Join-Path $ProjectRoot ".env"
    $envExample = Join-Path $ProjectRoot ".env.example"
    
    if (Test-Path $envFile) {
        Get-Content $envFile | ForEach-Object {
            if ($_ -match '^\s*([^#][^=]+)=(.*)') {
                $key = $matches[1].Trim()
                $value = $matches[2].Trim()
                [Environment]::SetEnvironmentVariable($key, $value)
            }
        }
    }
    elseif (Test-Path $envExample) {
        Write-Host "Using .env.example for configuration" -ForegroundColor Yellow
        Get-Content $envExample | ForEach-Object {
            if ($_ -match '^\s*([^#][^=]+)=(.*)') {
                $key = $matches[1].Trim()
                $value = $matches[2].Trim()
                [Environment]::SetEnvironmentVariable($key, $value)
            }
        }
    }
}

# Build OpenCode command with project context
function Build-OpenCodeCommand {
    param(
        [string]$UserCommand,
        [string[]]$UserArgs
    )
    
    $baseCommand = "opencode"
    
    # Add project context
    $contextArgs = @(
        "--project", $ProjectRoot,
        "--config", $ConfigPath
    )
    
    # Add soul context if available
    if (Test-Path $SoulPath) {
        $contextArgs += @("--context", $SoulPath)
    }
    
    # Construct full command
    $fullCommand = @($baseCommand) + $contextArgs
    
    if ($UserCommand) {
        $fullCommand += $UserCommand
    }
    
    if ($UserArgs) {
        $fullCommand += $UserArgs
    }
    
    return $fullCommand
}

# Main execution
function Main {
    # Load environment
    Load-Environment
    
    # Check OpenCode installation
    if (-not (Test-OpenCodeInstalled)) {
        Write-Host "OpenCode CLI is not installed." -ForegroundColor Red
        Write-Host "Install it with: curl -fsSL https://opencode.ai/install | bash" -ForegroundColor Yellow
        exit 1
    }
    
    # Check for DeepSeek API key
    if (-not $env:DEEPSEEK_API_KEY) {
        Write-Host "DEEPSEEK_API_KEY is not set." -ForegroundColor Yellow
        Write-Host "Add it to your .env file or set it as an environment variable." -ForegroundColor Yellow
        Write-Host "Example: DEEPSEEK_API_KEY=your_key_here" -ForegroundColor Gray
    }
    
    # Build and execute command
    $ocCommand = Build-OpenCodeCommand -UserCommand $Command -UserArgs $Args
    
    Write-Host "`n🚀 Starting OpenCode with Hubeny Web project context..." -ForegroundColor Green
    Write-Host "Project: $ProjectRoot" -ForegroundColor Cyan
    Write-Host "Soul: $SoulPath" -ForegroundColor Cyan
    Write-Host "`nCommand: $($ocCommand -join ' ')" -ForegroundColor Gray
    Write-Host "-" * 80 -ForegroundColor DarkGray
    
    # Execute OpenCode
    & $ocCommand[0] $ocCommand[1..($ocCommand.Length - 1)]
}

# Handle help command
if ($Command -eq "help" -or $Command -eq "--help" -or $Command -eq "-h") {
    Write-Host "`nHubeny Web OpenCode CLI Wrapper" -ForegroundColor Green
    Write-Host "=" * 40 -ForegroundColor DarkGray
    Write-Host "`nUsage: .\scripts\opencode-cli.ps1 [command] [args...]" -ForegroundColor White
    Write-Host "`nCommands:" -ForegroundColor Yellow
    Write-Host "  help                    Show this help message"
    Write-Host "  [any opencode command]  Pass through to OpenCode CLI"
    Write-Host "  (no command)            Start interactive OpenCode session"
    Write-Host "`nExamples:" -ForegroundColor Cyan
    Write-Host "  .\scripts\opencode-cli.ps1                    # Interactive session"
    Write-Host "  .\scripts\opencode-cli.ps1 'fix this bug'     # Specific task"
    Write-Host "  .\scripts\opencode-cli.ps1 review components/ # Code review"
    Write-Host "`nProject Context:" -ForegroundColor Magenta
    Write-Host "  • Loads .opencode/config.json automatically"
    Write-Host "  • Integrates SOUL.md project identity"
    Write-Host "  • Uses DeepSeek API from .env"
    Write-Host "  • Sets project root as working directory"
    exit 0
}

# Run main function
Main
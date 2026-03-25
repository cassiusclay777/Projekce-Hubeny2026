#!/bin/bash
# OpenCode CLI Wrapper for Hubeny Web Project
# Unix/Linux/macOS version

set -e

# Load project configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONFIG_PATH="$PROJECT_ROOT/.opencode/config.json"
SOUL_PATH="$PROJECT_ROOT/.opencode/soul"

# Check if OpenCode is installed
check_opencode_installed() {
    if command -v opencode &> /dev/null; then
        return 0
    else
        return 1
    fi
}

# Load environment variables
load_environment() {
    local env_file="$PROJECT_ROOT/.env"
    local env_example="$PROJECT_ROOT/.env.example"
    
    if [[ -f "$env_file" ]]; then
        set -a
        source "$env_file"
        set +a
    elif [[ -f "$env_example" ]]; then
        echo "Using .env.example for configuration"
        set -a
        source "$env_example"
        set +a
    fi
}

# Build OpenCode command with project context
build_opencode_command() {
    local user_command="$1"
    shift
    local user_args=("$@")
    
    local base_command="opencode"
    local context_args=(
        "--project" "$PROJECT_ROOT"
        "--config" "$CONFIG_PATH"
    )
    
    # Add soul context if available
    if [[ -d "$SOUL_PATH" ]]; then
        context_args+=("--context" "$SOUL_PATH")
    fi
    
    # Construct full command
    local full_command=("$base_command" "${context_args[@]}")
    
    if [[ -n "$user_command" ]]; then
        full_command+=("$user_command")
    fi
    
    if [[ ${#user_args[@]} -gt 0 ]]; then
        full_command+=("${user_args[@]}")
    fi
    
    echo "${full_command[@]}"
}

# Main execution
main() {
    # Load environment
    load_environment
    
    # Check OpenCode installation
    if ! check_opencode_installed; then
        echo "OpenCode CLI is not installed."
        echo "Install it with: curl -fsSL https://opencode.ai/install | bash"
        exit 1
    fi
    
    # Check for DeepSeek API key
    if [[ -z "$DEEPSEEK_API_KEY" ]]; then
        echo "DEEPSEEK_API_KEY is not set."
        echo "Add it to your .env file or set it as an environment variable."
        echo "Example: DEEPSEEK_API_KEY=your_key_here"
    fi
    
    # Get command and arguments
    local user_command=""
    local user_args=()
    
    if [[ $# -gt 0 ]]; then
        user_command="$1"
        shift
        user_args=("$@")
    fi
    
    # Build and execute command
    local oc_command
    IFS=' ' read -r -a oc_command <<< "$(build_opencode_command "$user_command" "${user_args[@]}")"
    
    echo ""
    echo "🚀 Starting OpenCode with Hubeny Web project context..."
    echo "Project: $PROJECT_ROOT"
    echo "Soul: $SOUL_PATH"
    echo ""
    echo "Command: ${oc_command[*]}"
    echo "----------------------------------------------------------------"
    echo ""
    
    # Execute OpenCode
    "${oc_command[@]}"
}

# Handle help command
if [[ "$1" == "help" || "$1" == "--help" || "$1" == "-h" ]]; then
    echo ""
    echo "Hubeny Web OpenCode CLI Wrapper"
    echo "========================================"
    echo ""
    echo "Usage: ./scripts/opencode-cli.sh [command] [args...]"
    echo ""
    echo "Commands:"
    echo "  help                    Show this help message"
    echo "  [any opencode command]  Pass through to OpenCode CLI"
    echo "  (no command)            Start interactive OpenCode session"
    echo ""
    echo "Examples:"
    echo "  ./scripts/opencode-cli.sh                    # Interactive session"
    echo "  ./scripts/opencode-cli.sh 'fix this bug'     # Specific task"
    echo "  ./scripts/opencode-cli.sh review components/ # Code review"
    echo ""
    echo "Project Context:"
    echo "  • Loads .opencode/config.json automatically"
    echo "  • Integrates SOUL.md project identity"
    echo "  • Uses DeepSeek API from .env"
    echo "  • Sets project root as working directory"
    exit 0
fi

# Run main function
main "$@"
# Claude Code CLI Reference

## Commands

| Command | Description |
|---|---|
| `claude` | Start interactive session |
| `claude "query"` | Start with an initial prompt |
| `claude -p "query"` | Non-interactive (print & exit) |
| `claude -c` | Continue most recent conversation |
| `claude -r "<id>" "query"` | Resume session by ID or name |
| `claude update` | Update to latest version |
| `claude auth login/logout/status` | Auth management |
| `claude mcp` | Configure MCP servers |
| `claude agents` | List configured subagents |

## Key Flags

### Session
- `--print, -p` — Print response and exit (non-interactive)
- `--continue, -c` — Load most recent conversation
- `--resume, -r` — Resume specific session
- `--name, -n` — Set session display name
- `--worktree, -w` — Start in isolated git worktree

### Model
- `--model` — Set model for session
- `--effort` — Set effort level (`low`, `medium`, `high`, `max`)
- `--fallback-model` — Fallback when default model is overloaded

### Permissions
- `--permission-mode` — Start in a specific permission mode
- `--allowedTools` — Tools that run without prompting
- `--disallowedTools` — Tools removed from context
- `--dangerously-skip-permissions` — Skip all permission prompts

### System Prompt
- `--system-prompt` — Replace default system prompt
- `--append-system-prompt` — Append to default system prompt
- `--system-prompt-file` — Load system prompt from file

### Output
- `--output-format` — `text`, `json`, or `stream-json`
- `--input-format` — `text` or `stream-json`
- `--json-schema` — Validated JSON output matching a schema
- `--max-turns` — Limit agentic turns (print mode only)
- `--max-budget-usd` — Cap API spend

### MCP & Plugins
- `--mcp-config` — Load MCP servers from JSON
- `--strict-mcp-config` — Use only the provided MCP config
- `--plugin-dir` — Load plugins from a directory

### Debug
- `--debug` — Enable debug mode
- `--verbose` — Verbose logging
- `--version, -v` — Show version number

## All CLI Flags (Complete Reference)

### Core Session Flags
- `--name, -n` — Set a display name for the session
- `--continue, -c` — Load the most recent conversation in the current directory
- `--resume, -r` — Resume a specific session by ID or name
- `--session-id` — Use a specific session ID for the conversation
- `--fork-session` — Create a new session ID instead of reusing the original when resuming
- `--from-pr` — Resume sessions linked to a specific GitHub PR
- `--print, -p` — Print response without interactive mode
- `--remote` — Create a new web session on claude.ai
- `--remote-control, --rc` — Start an interactive session with Remote Control enabled
- `--teleport` — Resume a web session in your local terminal
- `--worktree, -w` — Start Claude in an isolated git worktree

### Model and Effort Configuration
- `--model` — Sets the model for the current session
- `--effort` — Set the effort level (low, medium, high, max)
- `--fallback-model` — Enable automatic fallback to specified model when default is overloaded

### System Prompt Customization
- `--system-prompt` — Replace the entire default system prompt with custom text
- `--system-prompt-file` — Load system prompt from a file
- `--append-system-prompt` — Append custom text to the end of the default system prompt
- `--append-system-prompt-file` — Load additional system prompt text from a file and append

### Permissions and Security
- `--permission-mode` — Begin in a specified permission mode
- `--dangerously-skip-permissions` — Skip all permission prompts (use with caution)
- `--allow-dangerously-skip-permissions` — Enable permission bypassing as an option
- `--permission-prompt-tool` — Specify an MCP tool to handle permission prompts

### Tool Configuration
- `--tools` — Restrict which built-in tools Claude can use
- `--allowedTools` — Tools that execute without prompting for permission
- `--disallowedTools` — Tools that are removed from the model's context
- `--chrome` — Enable Chrome browser integration
- `--no-chrome` — Disable Chrome browser integration for this session

### MCP and Plugins
- `--mcp-config` — Load MCP servers from JSON files or strings
- `--strict-mcp-config` — Only use MCP servers from `--mcp-config`, ignoring all other configurations
- `--plugin-dir` — Load plugins from a directory for this session only

### Agent and Subagent Configuration
- `--agent` — Specify an agent for the current session
- `--agents` — Define custom subagents dynamically via JSON
- `--teammate-mode` — Set how agent team teammates display (auto, in-process, or tmux)

### Working Directory
- `--add-dir` — Add additional working directories for Claude to access

### Output and Format Options
- `--output-format` — Specify output format for print mode (text, json, stream-json)
- `--input-format` — Specify input format for print mode (text, stream-json)
- `--include-partial-messages` — Include partial streaming events in output
- `--json-schema` — Get validated JSON output matching a JSON Schema

### Advanced Options
- `--init` — Run initialization hooks and start interactive mode
- `--init-only` — Run initialization hooks and exit
- `--maintenance` — Run maintenance hooks and exit
- `--debug` — Enable debug mode with optional category filtering
- `--verbose` — Enable verbose logging
- `--version, -v` — Output the version number
- `--betas` — Beta headers to include in API requests
- `--disable-slash-commands` — Disable all skills and commands for this session
- `--settings` — Path to a settings JSON file or a JSON string
- `--setting-sources` — Comma-separated list of setting sources to load
- `--max-turns` — Limit the number of agentic turns (print mode only)
- `--max-budget-usd` — Maximum dollar amount to spend on API calls before stopping
- `--no-session-persistence` — Disable session persistence so sessions are not saved to disk
- `--ide` — Automatically connect to IDE on startup

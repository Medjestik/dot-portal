Param(
  [string]$ApiUrl = "",
  [int]$Port = 0
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Import-DotEnvFile([string]$path) {
  if (-not (Test-Path -LiteralPath $path)) { return }
  Get-Content -LiteralPath $path | ForEach-Object {
    $line = $_.Trim()
    if (-not $line) { return }
    if ($line.StartsWith("#")) { return }
    $eq = $line.IndexOf("=")
    if ($eq -lt 1) { return }

    $key = $line.Substring(0, $eq).Trim()
    $value = $line.Substring($eq + 1).Trim()

    # strip optional quotes
    if (($value.StartsWith('"') -and $value.EndsWith('"')) -or ($value.StartsWith("'") -and $value.EndsWith("'"))) {
      $value = $value.Substring(1, $value.Length - 2)
    }

    if ($key) {
      Set-Item -Path "Env:$key" -Value $value
    }
  }
}

# Load local env files (without committing secrets)
Import-DotEnvFile (Join-Path $PSScriptRoot "..\\.env.local")
Import-DotEnvFile (Join-Path $PSScriptRoot "..\\.env.development.local")
Import-DotEnvFile (Join-Path $PSScriptRoot "..\\.env.development")

if ($ApiUrl.Trim()) {
  $env:REACT_APP_API_URL = $ApiUrl.Trim()
}

if ($Port -gt 0) {
  $env:PORT = "$Port"
}

Write-Host "REACT_APP_API_URL=$($env:REACT_APP_API_URL)"
if ($env:PORT) { Write-Host "PORT=$($env:PORT)" }

Push-Location (Join-Path $PSScriptRoot "..")
try {
  npm start
} finally {
  Pop-Location
}

$ErrorActionPreference = 'Stop'

$teams = [ordered]@{
  'racing-club' = 'Racing Club'
  'independiente' = 'Independiente'
  'santos' = 'Santos FC'
  'sao-paulo' = 'Sao Paulo'
  'seattle-sounders' = 'Seattle Sounders'
  'al-ittihad-club' = 'Al Ittihad Club'
  'aberdeen' = 'Aberdeen FC'
  'fenerbahce-sk' = 'Fenerbahce SK'
  'besiktas-jk' = 'Besiktas'
  'shanghai-port' = 'Shanghai Port'
  'shanghai-shenhua' = 'Shanghai Shenhua'
  'shandong-taishan' = 'Shandong Taishan'
  'beijing-guoan' = 'Beijing Guoan'
  'zenit-saint-petersburg' = 'Zenit Saint Petersburg'
  'cska-moscow' = 'CSKA Moscow'
  'spartak-moscow' = 'Spartak Moscow'
  'dynamo-moscow' = 'Dynamo Moskva'
  'club-brugge-kv' = 'Club Brugge'
  'rsc-anderlecht' = 'Anderlecht'
  'krc-genk' = 'Genk'
  'union-saint-gilloise' = 'Union St Gilloise'
  'penarol' = 'Penarol'
  'club-nacional-de-football' = 'Nacional de Football'
  'defensor-sporting' = 'Defensor Sporting'
}

$destination = Join-Path $PSScriptRoot '..\assets\crests-v2'
New-Item -ItemType Directory -Force -Path $destination | Out-Null

foreach ($entry in $teams.GetEnumerator()) {
  $target = Join-Path $destination ($entry.Key + '.png')
  if (Test-Path -LiteralPath $target) { continue }
  $query = [uri]::EscapeDataString($entry.Value)
  $response = Invoke-RestMethod -Uri "https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=$query"
  $team = $response.teams | Where-Object { $_.strSport -eq 'Soccer' -and $_.strBadge } | Select-Object -First 1
  if (-not $team) {
    Write-Warning "No badge found for $($entry.Value)"
    continue
  }

  Invoke-WebRequest -Uri $team.strBadge -OutFile $target
  Write-Output "Downloaded $($entry.Key).png from $($team.strTeam)"
}

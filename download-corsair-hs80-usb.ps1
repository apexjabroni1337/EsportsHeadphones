$dest = "$PSScriptRoot\public\images\headphones"
$headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
    "Accept" = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
    "Accept-Language" = "en-US,en;q=0.5"
}

# Try multiple ASINs for Corsair HS80 RGB USB
$asins = @("B09YHSGK8R", "B0B4CHLXKH", "B09W9J19KQ")
$outFile = Join-Path $dest "Corsair-HS80-RGB-USB.jpg"

foreach ($asin in $asins) {
    Write-Host "Trying ASIN: $asin..." -ForegroundColor Cyan -NoNewline
    try {
        $response = Invoke-WebRequest -Uri "https://www.amazon.com/dp/$asin" -Headers $headers -UseBasicParsing -TimeoutSec 20
        $html = $response.Content
        $imageUrl = $null
        if ($html -match '"hiRes"\s*:\s*"(https://m\.media-amazon\.com/images/I/[^"]+)"') { $imageUrl = $matches[1] }
        elseif ($html -match '"large"\s*:\s*"(https://m\.media-amazon\.com/images/I/[^"]+)"') { $imageUrl = $matches[1] }
        elseif ($html -match 'data-old-hires="(https://m\.media-amazon\.com/images/I/[^"]+)"') { $imageUrl = $matches[1] }
        if ($imageUrl) {
            Invoke-WebRequest -Uri $imageUrl -OutFile $outFile -Headers $headers -UseBasicParsing -TimeoutSec 15
            $size = [math]::Round((Get-Item $outFile).Length / 1KB)
            if ($size -gt 10) {
                Write-Host " OK (${size}KB)" -ForegroundColor Green
                break
            } else {
                Remove-Item $outFile -Force -ErrorAction SilentlyContinue
                Write-Host " too small (${size}KB)" -ForegroundColor Yellow
            }
        } else { Write-Host " no image found" -ForegroundColor Yellow }
    } catch { Write-Host " error: $($_.Exception.Message)" -ForegroundColor Red }
    Start-Sleep -Milliseconds 1500
}

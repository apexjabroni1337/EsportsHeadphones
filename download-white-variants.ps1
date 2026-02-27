$dest = "$PSScriptRoot\public\images\headphones"
if (!(Test-Path $dest)) { New-Item -ItemType Directory -Path $dest -Force | Out-Null }

# White variant headphones - corrected ASINs for actual white versions
$headphones = @(
    @{ Name = "Razer-BlackShark-V2-Pro-White";                      ASIN = "B0CXH96HJV" },
    @{ Name = "Logitech-G-PRO-X-2-White";                          ASIN = "B0F1P6B7SF" },
    @{ Name = "Razer-BlackShark-V3-Pro-White";                      ASIN = "B0F3QG16DN" },
    @{ Name = "SteelSeries-Arctis-Nova-Pro-Wireless-White";         ASIN = "B0D1S7D9YX" }
)

$headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
    "Accept" = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
    "Accept-Language" = "en-US,en;q=0.5"
}

$success = 0
$failed = 0

Write-Host "=== Downloading 4 White Variant Images (corrected ASINs) ===" -ForegroundColor Cyan

foreach ($hp in $headphones) {
    $name = $hp.Name
    $asin = $hp.ASIN
    $outFile = Join-Path $dest "$name.jpg"

    if ((Test-Path $outFile) -and ((Get-Item $outFile).Length / 1KB) -gt 10) {
        Write-Host "SKIP: $name.jpg (already exists)" -ForegroundColor Yellow
        continue
    }

    Write-Host "Fetching: $name (ASIN: $asin)..." -ForegroundColor Cyan -NoNewline

    try {
        $productUrl = "https://www.amazon.com/dp/$asin"
        $response = Invoke-WebRequest -Uri $productUrl -Headers $headers -UseBasicParsing -TimeoutSec 20
        $html = $response.Content
        $imageUrl = $null

        if ($html -match '"hiRes"\s*:\s*"(https://m\.media-amazon\.com/images/I/[^"]+)"') {
            $imageUrl = $matches[1]
        }
        elseif ($html -match '"large"\s*:\s*"(https://m\.media-amazon\.com/images/I/[^"]+)"') {
            $imageUrl = $matches[1]
        }
        elseif ($html -match 'data-old-hires="(https://m\.media-amazon\.com/images/I/[^"]+)"') {
            $imageUrl = $matches[1]
        }
        elseif ($html -match '"(https://m\.media-amazon\.com/images/I/[A-Za-z0-9\+\-]+\._AC_SL1[0-9]+_\.jpg)"') {
            $imageUrl = $matches[1]
        }
        elseif ($html -match '"(https://m\.media-amazon\.com/images/I/([A-Za-z0-9\+\-]+))\._[^"]*\.jpg"') {
            $imageUrl = $matches[1] + "._AC_SL1500_.jpg"
        }

        if ($imageUrl) {
            if ($imageUrl -notmatch '_SL1[0-9]{3}_') {
                $imageUrl = $imageUrl -replace '\._[^.]+_\.jpg', '._AC_SL1500_.jpg'
            }
            try {
                Invoke-WebRequest -Uri $imageUrl -OutFile $outFile -Headers $headers -UseBasicParsing -TimeoutSec 15
                $size = [math]::Round((Get-Item $outFile).Length / 1KB)
                if ($size -gt 5) {
                    Write-Host " OK (${size}KB)" -ForegroundColor Green
                    $success++
                } else {
                    Remove-Item $outFile -Force -ErrorAction SilentlyContinue
                    Write-Host " FAIL (too small)" -ForegroundColor Red
                    $failed++
                }
            } catch {
                try {
                    $plainUrl = $imageUrl -replace '\._[^.]+_\.jpg', '.jpg'
                    Invoke-WebRequest -Uri $plainUrl -OutFile $outFile -Headers $headers -UseBasicParsing -TimeoutSec 15
                    $size = [math]::Round((Get-Item $outFile).Length / 1KB)
                    Write-Host " OK (${size}KB) [plain]" -ForegroundColor Green
                    $success++
                } catch {
                    Write-Host " FAIL (download error)" -ForegroundColor Red
                    $failed++
                }
            }
        } else {
            Write-Host " FAIL (no image in page)" -ForegroundColor Red
            $failed++
        }
    } catch {
        Write-Host " FAIL ($($_.Exception.Message))" -ForegroundColor Red
        $failed++
    }

    Start-Sleep -Milliseconds 2000
}

Write-Host "`nDone: $success downloaded, $failed failed" -ForegroundColor Cyan
$total = (Get-ChildItem $dest -Filter "*.jpg").Count
Write-Host "Total images in folder: $total" -ForegroundColor Cyan

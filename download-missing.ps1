$dest = "$PSScriptRoot\public\images\headphones"
if (!(Test-Path $dest)) { New-Item -ItemType Directory -Path $dest -Force | Out-Null }

# Verified ASINs from Amazon search results
$headphones = @(
    @{ Name = "ASUS-ROG-Pelta";                    ASIN = "B0DNTLYK6Z" },
    @{ Name = "EPOS-GSP-500";                      ASIN = "B07CK4J1SW" },
    @{ Name = "EPOS-H6PRO-White";                  ASIN = "B09FPLRT7X" },
    @{ Name = "JBL-Quantum-400";                   ASIN = "B084CZDX61" },
    @{ Name = "JBL-Quantum-One";                   ASIN = "B085R7TPCR" },
    @{ Name = "Logitech-G-PRO-X-2";               ASIN = "B0B3F8V4JG" },
    @{ Name = "Logitech-G-Pro-X-Wireless-Headset"; ASIN = "B081PP4CB6" },
    @{ Name = "Razer-BlackShark-V3-Pro";           ASIN = "B0F3QDLZKG" },
    @{ Name = "Razer-Kraken-V3-Pro";               ASIN = "B09HJB6R4Z" },
    @{ Name = "SONY-INZONE-H9-II";                 ASIN = "B0FJ2WXDRY" },
    @{ Name = "Sennheiser-GAME-ZERO";              ASIN = "B00KNPYAEY" },
    @{ Name = "Sennheiser-GSP-600";                ASIN = "B078VM929R" },
    @{ Name = "Sennheiser-HD-600";                 ASIN = "B00004SY4H" },
    @{ Name = "Sennheiser-HD800-S";                ASIN = "B01JP436TS" },
    @{ Name = "Sennheiser-PC38X";                  ASIN = "B08TX6GQTB" }
)

$headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
    "Accept" = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
    "Accept-Language" = "en-US,en;q=0.5"
}

$success = 0
$failed = 0

Write-Host "=== Downloading 15 Missing Headphone Images ===" -ForegroundColor Cyan

foreach ($hp in $headphones) {
    $name = $hp.Name
    $asin = $hp.ASIN
    $outFile = Join-Path $dest "$name.jpg"

    # Skip if already exists and is valid
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

        # Method 1: hiRes image from colorImages JSON
        if ($html -match '"hiRes"\s*:\s*"(https://m\.media-amazon\.com/images/I/[^"]+)"') {
            $imageUrl = $matches[1]
        }
        # Method 2: large image
        elseif ($html -match '"large"\s*:\s*"(https://m\.media-amazon\.com/images/I/[^"]+)"') {
            $imageUrl = $matches[1]
        }
        # Method 3: data-old-hires attribute
        elseif ($html -match 'data-old-hires="(https://m\.media-amazon\.com/images/I/[^"]+)"') {
            $imageUrl = $matches[1]
        }
        # Method 4: landing image src
        elseif ($html -match 'id="landingImage"[^>]+src="(https://m\.media-amazon\.com/images/I/[^"]+)"') {
            $imageUrl = $matches[1]
        }
        # Method 5: Any large product image
        elseif ($html -match '"(https://m\.media-amazon\.com/images/I/[A-Za-z0-9\+\-]+\._AC_SL1[0-9]+_\.jpg)"') {
            $imageUrl = $matches[1]
        }
        # Method 6: Extract image ID and construct URL
        elseif ($html -match '"(https://m\.media-amazon\.com/images/I/([A-Za-z0-9\+\-]+))\._[^"]*\.jpg"') {
            $imageUrl = $matches[1] + "._AC_SL1500_.jpg"
        }

        if ($imageUrl) {
            # Ensure large version
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
                # Fallback: try plain .jpg
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
Write-Host "Total images in folder: $total / 67 needed" -ForegroundColor Cyan

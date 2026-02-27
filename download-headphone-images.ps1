$dest = "$PSScriptRoot\public\images\headphones"
if (!(Test-Path $dest)) { New-Item -ItemType Directory -Path $dest -Force | Out-Null }

# Headphone name → Amazon ASIN (verified product pages)
$headphones = @(
    @{ Name = "Razer-BlackShark-V2-Pro";               ASIN = "B08FQG96RP" },
    @{ Name = "Razer-BlackShark-V3-Pro";               ASIN = "B0DT8XCZM8" },
    @{ Name = "Razer-BlackShark-V2";                   ASIN = "B086PKMZ1Q" },
    @{ Name = "Razer-BlackShark-V2-X";                 ASIN = "B086PKMZ21" },
    @{ Name = "Razer-BlackShark-V2-HyperSpeed";        ASIN = "B0CF3LHQSM" },
    @{ Name = "Razer-Kraken-V4";                       ASIN = "B0D9ZV97P6" },
    @{ Name = "Razer-Kraken-V3-Pro";                   ASIN = "B09CM2STGS" },
    @{ Name = "Razer-Kraken-TE";                       ASIN = "B07G5TP4BN" },
    @{ Name = "Razer-Kraken-Kitty";                    ASIN = "B07XYPXB9Q" },
    @{ Name = "Razer-Barracuda-Pro";                   ASIN = "B09Z1KLJ7L" },
    @{ Name = "Razer-Atlas";                           ASIN = "B0BWLZ65D7" },
    @{ Name = "HyperX-Cloud-II";                       ASIN = "B00SAYCXWG" },
    @{ Name = "HyperX-Cloud-III";                      ASIN = "B0C3BV19Q3" },
    @{ Name = "HyperX-Cloud-Alpha-S";                  ASIN = "B07X6HDSDY" },
    @{ Name = "HyperX-Cloud-Alpha";                    ASIN = "B074NBSF9N" },
    @{ Name = "HyperX-Cloud-Flight-S";                 ASIN = "B082R1GMV2" },
    @{ Name = "SteelSeries-Arctis-Nova-Pro";           ASIN = "B09ZWF9BCJ" },
    @{ Name = "SteelSeries-Arctis-Nova-Pro-Wireless";  ASIN = "B09ZWCYQTX" },
    @{ Name = "SteelSeries-Arctis-Nova-7";             ASIN = "B0B15QM5LL" },
    @{ Name = "SteelSeries-Arctis-7";                  ASIN = "B07FZVXS8H" },
    @{ Name = "SteelSeries-Arctis-Pro-Wireless";       ASIN = "B079YBKT3H" },
    @{ Name = "SteelSeries-Arctis-Pro";                ASIN = "B07B32GY9Z" },
    @{ Name = "SteelSeries-Arctis-5";                  ASIN = "B07FZQJ8PY" },
    @{ Name = "Corsair-HS80";                          ASIN = "B09YHSGK8R" },
    @{ Name = "Corsair-HS80-RGB";                      ASIN = "B09BBPTDWX" },
    @{ Name = "Corsair-HS80-MAX";                      ASIN = "B0D5Z1C5TB" },
    @{ Name = "Corsair-Virtuoso-RGB-XT";               ASIN = "B09BXZKNDB" },
    @{ Name = "Corsair-Virtuoso-SE";                   ASIN = "B07VSHL7V6" },
    @{ Name = "Corsair-Virtuoso-Pro";                  ASIN = "B0CGXTF225" },
    @{ Name = "Corsair-Virtuoso-MAX";                  ASIN = "B0DG8XHXPD" },
    @{ Name = "Corsair-Virtuoso-RGB-Wireless-XT";      ASIN = "B09L9QK63G" },
    @{ Name = "Corsair-Void-Pro";                      ASIN = "B0748N6796" },
    @{ Name = "Corsair-Void-RGB-Elite";                ASIN = "B07X8SJ8HM" },
    @{ Name = "Corsair-VOID-Wireless-V2";              ASIN = "B0DYVD72P2" },
    @{ Name = "Logitech-G-Pro-X-Headset";              ASIN = "B07PDFBJZD" },
    @{ Name = "Logitech-G-PRO-X-2";                    ASIN = "B0CJ5GN4HY" },
    @{ Name = "Logitech-G733";                         ASIN = "B081415GCS" },
    @{ Name = "Logitech-G435";                         ASIN = "B08R8DT7X6" },
    @{ Name = "Logitech-G435-LIGHTSPEED";              ASIN = "B08R8DT7X6" },
    @{ Name = "Logitech-G-Pro-Headset";                ASIN = "B079J3TH9M" },
    @{ Name = "beyerdynamic-DT-990-Pro";               ASIN = "B0011UB9CQ" },
    @{ Name = "beyerdynamic-MMX-300";                   ASIN = "B06WGVJ9GY" },
    @{ Name = "beyerdynamic-DT-770-Pro";               ASIN = "B0016MNAAI" },
    @{ Name = "beyerdynamic-DT-900-Pro-X";             ASIN = "B09G777VG7" },
    @{ Name = "Sennheiser-GAME-ONE";                   ASIN = "B00GWU8FTK" },
    @{ Name = "Sony-INZONE-H9";                        ASIN = "B0B1TDHLPT" },
    @{ Name = "ASUS-ROG-Delta-II";                     ASIN = "B0DGZY13L6" },
    @{ Name = "Audeze-Maxwell";                        ASIN = "B0BP6BC17P" },
    @{ Name = "Sennheiser-HD-560S";                    ASIN = "B08J9MVB6W" },
    @{ Name = "ASTRO-A50";                             ASIN = "B07R4Q8FQY" },
    @{ Name = "ASTRO-A40-TR";                          ASIN = "B07NSRYDH9" },
    @{ Name = "ASTRO-A40";                             ASIN = "B07NSRYDH9" },
    @{ Name = "Turtle-Beach-Stealth-700-Gen-2";        ASIN = "B08D45WDR7" },
    @{ Name = "JBL-Quantum-910";                       ASIN = "B0BQL6J6D2" },
    @{ Name = "EPOS-H3";                               ASIN = "B08YZ9NMB5" }
)

$headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
    "Accept" = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
    "Accept-Language" = "en-US,en;q=0.5"
}

$success = 0
$failed = 0
$skipped = 0

Write-Host "=== Headphone Image Downloader ===" -ForegroundColor Cyan
Write-Host "Downloading from Amazon product pages by ASIN...`n" -ForegroundColor Cyan

foreach ($hp in $headphones) {
    $name = $hp.Name
    $asin = $hp.ASIN
    $outFile = Join-Path $dest "$name.jpg"

    # Skip if already exists and is valid
    if (Test-Path $outFile) {
        $existingSize = [math]::Round((Get-Item $outFile).Length / 1KB)
        if ($existingSize -gt 10) {
            Write-Host "SKIP: $name.jpg (already ${existingSize}KB)" -ForegroundColor Yellow
            $skipped++
            continue
        } else {
            # File exists but too small, re-download
            Remove-Item $outFile -Force
        }
    }

    Write-Host "Fetching: $name (ASIN: $asin)..." -ForegroundColor Cyan -NoNewline

    try {
        # Fetch the Amazon product page
        $productUrl = "https://www.amazon.com/dp/$asin"
        $response = Invoke-WebRequest -Uri $productUrl -Headers $headers -UseBasicParsing -TimeoutSec 20

        $html = $response.Content

        # Method 1: Extract from colorImages JavaScript data (most reliable)
        $imageUrl = $null

        # Look for the hiRes image in the colorImages JSON data
        if ($html -match '"hiRes"\s*:\s*"(https://m\.media-amazon\.com/images/I/[^"]+)"') {
            $imageUrl = $matches[1]
        }
        # Method 2: Look for large image in the landing image
        elseif ($html -match '"large"\s*:\s*"(https://m\.media-amazon\.com/images/I/[^"]+)"') {
            $imageUrl = $matches[1]
        }
        # Method 3: Look for any main product image
        elseif ($html -match 'data-old-hires="(https://m\.media-amazon\.com/images/I/[^"]+)"') {
            $imageUrl = $matches[1]
        }
        # Method 4: Extract from img tag with landingImage id
        elseif ($html -match 'id="landingImage"[^>]+src="(https://m\.media-amazon\.com/images/I/[^"]+)"') {
            $imageUrl = $matches[1]
        }
        # Method 5: Any m.media-amazon image in the main content
        elseif ($html -match '"(https://m\.media-amazon\.com/images/I/[A-Za-z0-9\+\-]+\._AC_SL1[0-9]+_\.jpg)"') {
            $imageUrl = $matches[1]
        }
        # Method 6: Look for main image in any format
        elseif ($html -match '"(https://m\.media-amazon\.com/images/I/[A-Za-z0-9\+\-]+)\._[^"]*\.jpg"') {
            $imageUrl = "https://m.media-amazon.com/images/I/" + $matches[1].Split('/')[-1] + "._AC_SL1500_.jpg"
        }

        if ($imageUrl) {
            # Ensure we get the large version
            if ($imageUrl -notmatch '_SL1[0-9]{3}_') {
                # Replace any size suffix with SL1500
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
                    Write-Host " FAIL (image too small: ${size}KB)" -ForegroundColor Red
                    $failed++
                }
            } catch {
                # Try without the SL1500 suffix
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
            Write-Host " FAIL (no image found in page)" -ForegroundColor Red
            $failed++
        }
    } catch {
        Write-Host " FAIL (page fetch error: $($_.Exception.Message))" -ForegroundColor Red
        $failed++
    }

    # Polite delay to avoid throttling
    Start-Sleep -Milliseconds 2000
}

Write-Host "`n=== Results ===" -ForegroundColor Cyan
Write-Host "Downloaded: $success" -ForegroundColor Green
Write-Host "Skipped:    $skipped" -ForegroundColor Yellow
Write-Host "Failed:     $failed" -ForegroundColor Red
Write-Host "Images in:  $dest" -ForegroundColor Cyan

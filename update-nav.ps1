$files = @(
    "about.html",
    "auction-detail.html",
    "auctions.html",
    "buyer-guide.html",
    "categories.html",
    "contact.html",
    "faq.html",
    "how-to-bid.html",
    "index-2.html",
    "live.html",
    "privacy-policy.html",
    "returns-policy.html",
    "sell-with-us.html",
    "shipping-info.html",
    "terms-of-service.html"
)

foreach ($file in $files) {
    Write-Host "Processing $file..." -ForegroundColor Cyan
    
    $content = Get-Content $file -Raw -Encoding UTF8
    
    # Add Dashboard button in mobile nav (before Login button)
    $mobilePattern = '(<div class="mobile-nav-actions">[\s\r\n]+)(<a href="login\.html")'
    $mobileReplacement = '$1<a href="dashboard.html" class="btn btn-nav-outline"><i class="bi bi-speedometer2"></i> Dashboard</a>' + "`r`n                    " + '$2'
    $content = $content -replace $mobilePattern, $mobileReplacement
    
    # Add Dashboard button in desktop nav (after dark mode toggle, before Login button)
    $desktopPattern = '(</button>[\s\r\n]+)(<a href="login\.html")'
    $desktopReplacement = '$1<a href="dashboard.html" class="btn btn-nav-outline"><i class="bi bi-speedometer2"></i> Dashboard</a>' + "`r`n                " + '$2'
    $content = $content -replace $desktopPattern, $desktopReplacement
    
    Set-Content $file $content -Encoding UTF8 -NoNewline
    Write-Host "Completed $file" -ForegroundColor Green
}

Write-Host "All files updated successfully!" -ForegroundColor Yellow

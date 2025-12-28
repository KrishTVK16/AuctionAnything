$files = @(
    "index.html",
    "index-2.html",
    "about.html",
    "auction-detail.html",
    "auctions.html",
    "buyer-guide.html",
    "categories.html",
    "contact.html",
    "faq.html",
    "how-to-bid.html",
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
    
    # Pattern to match the entire mobile-nav-actions div and replace it with just Dashboard and Sign Up
    $pattern = '(<div class="mobile-nav-actions">)([\s\S]*?)(</div>)'
    $replacement = '$1' + "`r`n                    <a href=`"dashboard.html`" class=`"btn btn-nav-outline`"><i class=`"bi bi-speedometer2`"></i> Dashboard</a>`r`n                    <a href=`"signup.html`" class=`"btn btn-nav-primary`">Sign Up</a>`r`n                " + '$3'
    
    $content = $content -replace $pattern, $replacement
    
    Set-Content $file $content -Encoding UTF8 -NoNewline
    Write-Host "Completed $file" -ForegroundColor Green
}

Write-Host "All files updated successfully!" -ForegroundColor Yellow

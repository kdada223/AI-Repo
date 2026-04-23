while ($true) {
    if (git status --porcelain) {
        git add .
        git commit -m "Auto-commit at $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        git push origin main
    }
    Start-Sleep -Seconds 60
}

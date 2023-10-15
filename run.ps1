$stackName = 'mongodb'
$services = docker-compose ps $stackName -q

try
{
    if ($services.Count -eq 0) {
        Write-Host "The Docker Compose stack '$stackName' is not running."
        docker-compose up -d
    } else {
        Write-Host "The Docker Compose stack '$stackName' is running. Running services:"
        Write-Host $services
    }
    
    npm run start
}
catch
{
    Write-Output "Something threw an exception"
    Write-Output $_
}


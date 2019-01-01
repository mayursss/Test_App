try {
  $properties = @{
    'User Name'  = $env:USERNAME
    'Domain'     = $env:USERDOMAIN
    'Home Drive' = $env:HOMEDRIVE
    'Profile'    = $env:USERPROFILE
  }
  $out = New-Object psobject -Property $properties
}
catch [System.Management.Automation.RuntimeException] {
  $myError = @{
    Message = $_.Exception.Message
    Type    = $_.FullyQualifiedErrorID
  }
  $out = @{Error = $myError}
}
$html = $out | ConvertTo-Html -Fragment
$html[2..$($html.length - 2)]

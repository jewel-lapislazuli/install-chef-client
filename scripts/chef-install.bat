@echo off

set BASE_DIR="%~dp0.."
set SCRIPT_PATH=%BASE_DIR%"\scripts\chef-install.js"
set CHEF_CLIENT_PACKAGEPATH=%BASE_DIR%"\packages\chef-client-11.4.0-1.windows.msi"

cscript //nologo %SCRIPT_PATH% %CHEF_CLIENT_PACKAGEPATH%

pause

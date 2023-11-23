installation process

# Step 1: 

Download and install node.js
https://nodejs.org/en/download/ 

<!-- optionally run on terminal: npm install -g node-gyp -->

then install python if not installed

https://www.python.org/downloads/release/python-3114/

on windows: 

open powershell as admin and paste

Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

then paste

choco install visualstudio2017-workload-nativedesktop visualstudio2019buildtools visualstudio2019-workload-vctools

if it fails then paste 

npm install --g --production windows-build-tools

if it fails then just download and install this

https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=BuildTools and make sure to desktop desktop development with c++


# Step 2: 

On windows: 

Open window.last_installer.bat 
after that done, open run_on_windows.bat
then restart your system, that's all


On Linux & Mac OS: 
Open project in terminal and paste the following command
npm install && npm start

# Finally

On Windows: You're all setup

On Linux/Mac OS: restart step 2 to utilize drivers

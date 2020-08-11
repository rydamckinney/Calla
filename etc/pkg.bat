cmd /C "cd ..\Calla-Lib\js && pkg"

cmd /C "cd ..\Calla-Lib\game && rollup -c"
cmd /C "minify ..\Calla-Lib\game\bundle.js > ..\Calla-Site\wwwroot\bundle.min.js"
cmd /C "minify ..\Calla-Lib\game\version.js > ..\Calla-Site\wwwroot\version.min.js"
cmd /C "del ..\Calla-Lib\game\bundle.js"
cmd /C "del ..\Calla-Lib\game\version.js"

cmd /C "cd ..\Calla-Lib\basic && rollup -c"
cmd /C "minify ..\Calla-Lib\basic\bundle.js > ..\Calla-Lib\wwwroot\basic\bundle.min.js"
cmd /C "del ..\Calla-Lib\basic\bundle.js"
-command in terminal to build for development mode - 'npm run dev'
-command in terminal to build for production mode - 'npm run build'

-if you want to add widget to your project you need:

1. command in terminal to build for production mode - 'npm run build'
2. In folder "dist" take file 'weather-widget.js' and add it in your project
3. add '<script src="path/to/weather-widget.js"></script>' in tag <head> without atr 'defer'!
4. add <weather-widget></weather-widget> in your HTML.

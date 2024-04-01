
main();

function main() {
    Helper.log("Just Screenshots 0.1")
    gameLoop()
}

function gameLoop() {
    var cont = 1;
    var lastActionResult = true;
    while(cont) {
        // determine screen res:
        var size = Android.getSize().width + "x" + Android.getSize().height;
        Helper.log("Screen size: " + size);
        // take screenshot
        var screenshot = Android.takeScreenshot();
        // save screenshot
        var path = Config.getValue("botFolder") + "/screenshots/" + size + "";
        var filename = Date.now() + ".png";
        var fullpath = path + "/" + filename;
        Helper.log("Saving screenshot to " + fullpath);
        screenshot.save(fullpath);
        // Sleep
        Helper.log("Sleeping for 5 seconds");
        Helper.sleep(5);
    }
}
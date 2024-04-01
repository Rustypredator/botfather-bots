//Config
var appPackage = "com.raongames.growcastle";
var accuracy = 0.95;
var supportedSizes = {
    "1920x1080": new Size(1920, 1080),
    "2412x1080": new Size(2412, 1080)
};

//Colors
var black = new Color('black');
var blue = new Color('blue');
var cyan = new Color('cyan');
var darkblue = new Color('darkblue');
var darkcyan = new Color('darkcyan');
var darkgreen = new Color('darkgreen');
var darkmagenta = new Color('darkmagenta');
var darkred = new Color('darkred');
var darkyellow = new Color('darkyellow');
var gray = new Color('gray');
var green = new Color('green');
var lightgray = new Color('lightgray');
var magenta = new Color('magenta');
var red = new Color('red');
var white = new Color('white');
var yellow = new Color('yellow');

if(Android.connected()) {
    Helper.log("Found Device, trying to start bot...");
    checkPhone();
    main();
} else {
    Helper.log("No device connected!");
}

function checkPhone() {
    Helper.log("Check if app is installed:");
    if(Android.listPackages().indexOf(appPackage) != -1){
        Helper.log("App is installed!");
    } else {
        Helper.log("App is not installed!");
        return 1;
    }
    Helper.log("Check if resolution is supported:");
    var size = Android.getSize();
    var sizeIndex = size.width + 'x' + size.height;
    if(supportedSizes[sizeIndex] != undefined) {
        Helper.log("Resolution is supported!");
    } else {
        Helper.log("Resolution is not supported! If you can, please submit Screenshots of your game on a GitHub Issue!");
        return 1;
    }
}

function main() {
    Helper.log("Welcome to GrowCastle Bot v1");
    Helper.log("Trying to start the game...");
    Android.startApp(appPackage);
    //create a browser that displays the monitor.html file:
    if (Config.getValue("prntMatches")) {
        if (Config.getValue("botFolder") == "") {
            Helper.log("Bot Folder not set, cannot print matches!");
            return 1;
        }
        var monitorBrowser = new Browser("Monitor", new Size(1024, 720));
        monitorBrowser.loadUrl("file://" + Config.getValue("botFolder") + "/monitor.html");
    }
    gameLoop();
}

function gameLoop() {
    var cont = 1;
    var lastActionResult = true;
    while(cont) {
        //Get Size:
        var size = Android.getSize();
        Helper.log(size);
        //Take Screenshot:
        var scrn = Android.takeScreenshot();
        //get matches to determine state:
        var results = matches(scrn);
        var state = detectState(results);
        Helper.log("Determined state: " + state);
        //act on detected state:
        if(stateAction(state, results)) {
            Helper.log("Current loop finished!");
        } else {
            if(lastActionResult) {
                Helper.log("Encountered a Problem, trying again!");
            } else {
                Helper.log("Encountered a Problem on action!");
                return 1;
            }
        }
    }
}

function matches(scrn) {
    //test:
    var matchesToTest = {
        "1920x1080": {
            //states
            main: {
                tmplt: "templates/1920x1080/state/main.png",
                score: accuracy
            },
            booting: {
                tmplt: "templates/1920x1080/state/loadScreen.png",
                score: accuracy
            },
            dailyEvent: {
                tmplt: "templates/1920x1080/state/event.png",
                score: accuracy
            },
            bossSelection: {
                tmplt: "templates/1920x1080/state/bossSelection.png",
                score: accuracy
            },
            bossLootScreen: {
                tmplt: "templates/1920x1080/state/bossLoot.png",
                score: accuracy
            },
            //buttons
            eventCloseBtn: {
                tmplt: "templates/1920x1080/btns/btn_closeEvent.png",
                score: accuracy
            },
            dragonStatueBtn: {
                tmplt: "templates/1920x1080/btns/btn_dragonStatue.png",
                score: accuracy
            },
            greenDragonBtn: {
                tmplt: "templates/1920x1080/btns/btn_grnDrgn.png",
                score: accuracy
            },
            blackDragonBtn: {
                tmplt: "templates/1920x1080/btns/btn_blkDrgn.png",
                score: accuracy
            },
            redDragonBtn: {
                tmplt: "templates/1920x1080/btns/btn_redDrgn.png",
                score: accuracy
            },
            sinDragonBtn: {
                tmplt: "templates/1920x1080/btns/btn_sinDrgn.png",
                score: accuracy
            },
            legendaryDragonBtn: {
                tmplt: "templates/1920x1080/btns/btn_lgndryDrgn.png",
                score: accuracy
            },
            boneDragonBtn: {
                tmplt: "templates/1920x1080/btns/btn_boneDrgn.png",
                score: accuracy
            },
            confirmBossBattleBtn: {
                tmplt: "templates/1920x1080/btns/btn_confirmBossBattle.png",
                score: accuracy
            },
            bossLootSellMoneyBtn: {
                tmplt: "templates/1920x1080/btns/btn_sellBossLootMoney.png",
                score: accuracy
            },
            bossLootSellMatBtn: {
                tmplt: "templates/1920x1080/btns/btn_sellBossLootMat.png",
                score: accuracy
            },
            bossLootGetBtn: {
                tmplt: "templates/1920x1080/btns/btn_getBossLoot.png",
                score: accuracy
            }
        },
        "2412x1080": {
            //states
            main: {
                tmplt: "templates/2412x1080/state/main.png",
                score: accuracy
            },
            booting: {
                tmplt: "templates/2412x1080/state/loadScreen.png",
                score: accuracy
            },
            dailyEvent: {
                tmplt: "templates/2412x1080/state/event.png",
                score: accuracy
            },
            bossSelection: {
                tmplt: "templates/2412x1080/state/bossSelection.png",
                score: 0.99
            },
            bossLootScreen: {
                tmplt: "templates/2412x1080/state/bossLoot.png",
                score: accuracy
            },
            //buttons
            eventCloseBtn: {
                tmplt: "templates/2412x1080/btns/btn_close.png",
                score: 0.99
            },
            dragonStatueBtn: {
                tmplt: "templates/2412x1080/btns/btn_dragonStatue.png",
                score: accuracy
            },
            greenDragonBtn: {
                tmplt: "templates/2412x1080/btns/btn_grnDrgn.png",
                score: accuracy
            },
            blackDragonBtn: {
                tmplt: "templates/2412x1080/btns/btn_blkDrgn.png",
                score: accuracy
            },
            redDragonBtn: {
                tmplt: "templates/2412x1080/btns/btn_redDrgn.png",
                score: accuracy
            },
            sinDragonBtn: {
                tmplt: "templates/2412x1080/btns/btn_sinDrgn.png",
                score: accuracy
            },
            legendaryDragonBtn: {
                tmplt: "templates/2412x1080/btns/btn_lgndryDrgn.png",
                score: accuracy
            },
            boneDragonBtn: {
                tmplt: "templates/2412x1080/btns/btn_boneDrgn.png",
                score: accuracy
            },
            confirmBossBattleBtn: {
                tmplt: "templates/2412x1080/btns/btn_confirmBossBattle.png",
                score: accuracy
            },
            bossLootSellMoneyBtn: {
                tmplt: "templates/2412x1080/btns/btn_sellBossLootMoney.png",
                score: accuracy
            },
            bossLootSellMatBtn: {
                tmplt: "templates/2412x1080/btns/btn_sellBossLootMat.png",
                score: accuracy
            },
            bossLootGetBtn: {
                tmplt: "templates/2412x1080/btns/btn_getBossLoot.png",
                score: accuracy
            }
        }
    }
    var toTest = matchesToTest[Android.getSize().width + "x" + Android.getSize().height];
    var allmatches = [];
    var results = {};
    //run checks:
    Object.keys(toTest).forEach(function(key) {
        var vals = toTest[key];
        Helper.log("Comparing current screenshot with " + vals.tmplt + " Min Score: " + vals.score);
        //Try to find matches
        var template = new Image(vals.tmplt);
        var matches = Vision.findMatches(scrn, template, vals.score);
        //Set results
        if(matches.length > 0) {
            allmatches = allmatches.concat(matches);
            results[key] = matches;
        }
    });
    Object.keys(results).forEach(function(key) {
        var vals = results[key];
        Helper.log(Object.keys(vals).length + " Results found for " + key);
    });
    Helper.log(allmatches.length + " Matches for various checks found.");
    if(Config.getValue("prntMatches")) {
        scrnmatches = Vision.markMatches(scrn, allmatches, magenta, 4);
        scrnmatches.save("scrnmatches.png");
    }
    return results;
}

function detectState(results) {
    var resultKeys = Object.keys(results);
    Helper.log("Trying to determine gamestate from the following: " + resultKeys);
    //check if game is still booting:
    if(typeof(results.booting) == "object" && Object.keys(results.booting).length > 0) {
        Helper.log("Detected game is in booting!");
        return "booting";
    }
    //Check overlays
    if(typeof(results.dailyEvent) == "object" && Object.keys(results.dailyEvent).length > 0) {
        Helper.log("Detected Daily Event!");
        return "dailyEvent";
    }
    if(typeof(results.bossSelection) == "object" && Object.keys(results.bossSelection).length > 0) {
        Helper.log("Detected Boss Selection Screen");
        if(typeof(results.confirmBossBattleBtn) == "object" && Object.keys(results.confirmBossBattleBtn).length > 0) {
            return "bossBattleConfirmation";
        }
        return "bossSelection";
    }
    if((typeof(results.bossLootScreen) == "object" && Object.keys(results.bossLootScreen).length > 0) ||
    (typeof(results.bossLootSellMatBtn) == "object" && Object.keys(results.bossLootSellMatBtn) > 0) ||
    (typeof(results.bossLootSellMoneyBtn) == "object" && Object.keys(results.bossLootSellMoneyBtn) > 0) ||
    (typeof(results.bossLootGetBtn) == "object" && Object.keys(results.bossLootGetBtn) > 0)) {
        Helper.log("Detected Boss Loot Screen");
        return "bossLootScreen";
    }
    if(typeof(results.bossTreasure) == "object" && Object.keys(results.bossTreasure).length > 0) {
        Helper.log("Detected Boss Treasure screen. nothing to do here but wait.");
        return "bossTreasureScreen";
    }
    //check if main screen:
    if(typeof(results.main) == "object" && Object.keys(results.main).length > 0) {
        Helper.log("Detected Main Screen");
        return "main";
    }
    return "unknown";
}

function stateAction(state, results) {
    if(state == "unknown") {
        Helper.log("Game has an unknown status, waiting another loop.");
        return true;
    }
    if(state == "booting") {
        Helper.log("Game is still booting, waiting!");
        return true;
    }
    if(state == "dailyEvent") {
        //check if closebtn was detected
        if(typeof(results.eventCloseBtn) == "object" && Object.keys(results.eventCloseBtn).length > 0) {
            //Click the closebtn:
            return AndroidRandomTap(results.eventCloseBtn[0]);
        }
        return false;
    }
    if(state == "bossSelection") {
        if(Config.getValue("farmDragon")) {
            //start specified dragon:
            var drgn = Config.getValue("dragon");
            switch (drgn) {
                case "green":
                    AndroidRandomTap(results.greenDragonBtn[0]);
                    break;
                case "black":
                    AndroidRandomTap(results.blackDragonBtn[0]);
                    break;
                case "red":
                    AndroidRandomTap(results.redDragonBtn[0]);
                    break;
                case "sin":
                    AndroidRandomTap(results.sinDragonBtn[0]);
                    break;
                case "legendary":
                    AndroidRandomTap(results.legendaryDragonBtn[0]);
                    break;
                case "bone":
                    AndroidRandomTap(results.boneDragonBtn[0]);
                    break;
                default:
                    AndroidRandomTap(results.greenDragonBtn[0]);
                    break;
            }
            return true;
        } else {
            //close boss screen:
            Helper.log("Boss Selection screen detected, farming is not activated, closing.");
            return AndroidBottomRightTap(results.bossSelection[0]);
        }
    }
    if(state == "bossBattleConfirmation") {
        if(Config.getValue("farmDragon")) {
            //start specified dragon:
            return AndroidRandomTap(results.confirmBossBattleBtn[0]);
        }
        Helper.log("Boss Selection screen detected, boss farming is not activated! Closing boss Selection screen...");
        return AndroidBottomRightTap(results.bossSelection[0]);
    }
    if(state == "bossTreasureScreen") {
        Helper.log("Waiting for Treasure screen to go.");
        Helper.sleep(2);
        return true;
    }
    if(state == "bossLootScreen") {
        //get what to do with the loot:
        var wtd = Config.getValue("sellLoot");
        switch (wtd) {
            case "money":
                Helper.log("selling loot for money.");
                AndroidRandomTap(results.bossLootSellMoneyBtn[0]);
                Helper.sleep(1);
                AndroidRandomTap(results.bossLootSellMoneyBtn[0]);
                break;
            case "mat":
                Helper.log("selling loot for mats.");
                AndroidRandomTap(results.bossLootSellMatBtn[0]);
                Helper.sleep(1);
                AndroidRandomTap(results.bossLootSellMatBtn[0]);
                break;
            case "inventory":
            default:
                Helper.log("getting loot in inventory.");
                AndroidRandomTap(results.bossLootGetBtn[0]);
                Helper.sleep(1);
                AndroidRandomTap(results.bossLootGetBtn[0]);
                break;
        }
        return true;
    }
    if(state == "main") {
        if(Config.getValue("farmDragon")) {
            //try to start bossfight:
            if(typeof(results.dragonStatueBtn) == "object" && Object.keys(results.dragonStatueBtn).length > 0) {
                //dragonstatue button was detected, tap.
                return AndroidRandomTap(results.dragonStatueBtn[0]);
            }
        } else {
            Helper.log("Bot has nothing to do! stopping");
            return false;
        }
        return false;
    }
    return false;
}

function AndroidRandomTap(match) {
    if(Android.sendTap(match.getRect().randomPoint())) {
        return true;
    }
    return false;
}

function AndroidBottomRightTap(match) {
    if(Android.sendTap(match.getRect().getBottomRight())) {
        return true;
    }
    return false;
}
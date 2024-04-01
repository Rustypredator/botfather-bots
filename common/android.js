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
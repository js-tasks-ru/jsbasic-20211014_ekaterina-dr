function checkSpam(str) {
  let lowerStr = str.toLowerCase();
  if (lowerStr.includes('1xBet'.toLowerCase()) || lowerStr.includes('XXX'.toLowerCase())) {
    return true;
  }
  return false;
}

const pupHelper = require('../helpers/puphelper');

module.exports.scrapeyoutube_post = async (req, res) => {
  let browser;
  try {
    const {url} = req.body;
    browser = await pupHelper.launchBrowser();
    const page = await pupHelper.launchPage(browser);
    await page.goto(url, {timeout: 0, waitUntil: 'networkidle2'});
    await page.waitForSelector('paper-tabs#tabs > #tabsContainer > #tabsContent > paper-tab:nth-last-of-type(2)');

    await page.click('paper-tabs#tabs > #tabsContainer > #tabsContent > paper-tab:nth-last-of-type(2)');
    await page.waitForSelector('ytd-channel-about-metadata-renderer > #right-column > yt-formatted-string:nth-of-type(3)');

    let views = await pupHelper.getTxt('ytd-channel-about-metadata-renderer > #right-column > yt-formatted-string:nth-of-type(3)', page);
    views = Number(views.replace(/,/gi, '').trim().replace(/views/gi, '').trim());
    
    await browser.close();
    res.status(200).json({status: 'success', data: views});
  } catch (error) {
    if (browser) await browser.close();
    console.log(`scrapeyoutube error: ${error}`);
    res.status(500).json({status: 'error', data: error});
  }
}
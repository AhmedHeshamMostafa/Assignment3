import { test, expect } from '@playwright/test';

test('test event cards', async ({ page }) => {
  
  const loginEmail = 'ahmedheshamhany9@gmail.com';
  const loginPass = '93827155aA@';

  const eventsPgHeadingTxt = 'Upcoming Events';
  const eventsPgSrchItem = 'World';
  const eventsPgCategory = 'Conference';
  const eventsPgCity = 'Hyderabad';
  const eventNameExp = 'World Tech Summit';
  const currency = '$';


  const emailTxtFldLoc = page.locator('#email');
  const passTxtFldLoc = page.locator('#password');
  const loginBtnLoc = page.locator('#login-btn');
  const eventsTabLoc = page.locator('#nav-events');

  const eventsPgHeadLoc = page.locator('h1').first();
  const eventsPgSrchLoc = page.locator('input');
  const eventsPgcategsDrpDnLoc = page.locator('select').first();
  const eventsPgcitiesDrpDnLoc = page.locator('select').nth(1);
  const eventsPgClrFiltersLoc = page.locator('[type="button"]').first();
  const eventsPgbookNwCrdBtnLoc = page.locator('#book-now-btn');
  const h3Elements = page.locator('h3');
  const wrldTchSmitEvntNmeLoc = page.locator('//h3[text()="World Tech Summit"]');
  const wrldTchSmitEvntPricLoc = page.locator('xpath=//article[@data-testid="event-card" and .//h3[text()="World Tech Summit"]]//p[contains(@class, "text-lg")]');
  const wrldTchSmitSeatsLoc = page.locator('span.text-xs.text-amber-600');
  const wrldTchSmitBookNwLoc = page.locator('xpath=//article[@data-testid="event-card" and .//h3[text()="World Tech Summit"]]//a[@data-testid="book-now-btn"]');

  const evntDtlsPgHeadLoc = page.locator('h1').first();
  const evntDtlsPgPricLoc = page.locator('span').nth(13);

  await page.goto('');

  //Enter login credentials and click Sign In button
  await emailTxtFldLoc.fill(loginEmail);
  await passTxtFldLoc.fill(loginPass);
  await loginBtnLoc.click();
  await eventsTabLoc.click();

  await expect(eventsPgHeadLoc).toHaveText(eventsPgHeadingTxt);


  //Apply searching and filtering on the Events page
  await eventsPgSrchLoc.fill(eventsPgSrchItem);
  await eventsPgcategsDrpDnLoc.selectOption(eventsPgCategory);
  await eventsPgcitiesDrpDnLoc.selectOption(eventsPgCity);
 
  await expect(eventsPgbookNwCrdBtnLoc).not.toHaveCount(0);
  await expect(wrldTchSmitEvntNmeLoc).toHaveCount(1);

  const seatsTxt = await wrldTchSmitSeatsLoc.innerText();
  const seatsNo = await seatsTxt[0];

  await expect(wrldTchSmitEvntNmeLoc).toHaveText(eventNameExp);
  await expect(wrldTchSmitEvntPricLoc).toContainText(currency);
  await expect(Number(seatsNo)).toBeGreaterThan(0);
  const evntPricExp = await wrldTchSmitEvntPricLoc.innerText();

  await wrldTchSmitBookNwLoc.click();

  await expect(page).toHaveURL(/\/events\//);
  await expect(evntDtlsPgHeadLoc).toHaveText(eventNameExp);
  await expect(evntDtlsPgPricLoc).toHaveText(evntPricExp);

  await page.goBack();


  await eventsPgClrFiltersLoc.click();

  await expect.poll(async () => await eventsPgbookNwCrdBtnLoc.count()).toBeGreaterThanOrEqual(3);

  const eventsTitles = (await h3Elements.allInnerTexts()).slice(0, -4);

// Verify that all items in the array are unique (different from each other)
expect(new Set(eventsTitles).size).toBe(eventsTitles.length);

for (const title of eventsTitles) {
  expect(title.trim().length).toBeGreaterThan(0);
}

  



  

  


  







 
});

import {Builder, By, WebDriver} from "selenium-webdriver";
import "chromedriver";
import {describe, expect, test,beforeAll,afterAll} from '@jest/globals'

describe("Aura Code Challenge - Create User Account Tests", () => {
  let driver:WebDriver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  }); 

  afterAll(async () => {
    // await driver.quit();
  });

  test("Register User", async () => {
    await driver.manage().setTimeouts({pageLoad:50000,implicit:20000});
    await driver.get(
      "http://automationpractice.com/index.php?controller=authentication&back=my-account"
    );

    const title = await driver.getTitle();
    expect(title).toBe("Login - My Store");

    await driver.findElement(By.id("email_create")).sendKeys(Date.now()+"@Email.com");

    await driver.findElement(By.id("SubmitCreate")).click();
    await driver.findElement(By.id("customer_firstname")).sendKeys("firstname");
    await driver.findElement(By.id("customer_lastname")).sendKeys("lastname");
    await driver.findElement(By.id("passwd")).sendKeys("password");

    //select birthday
    await driver.findElement(By.css("#days *[value='12']")).click();
    await driver.findElement(By.css("#months *[value='6']")).click();
    await driver.findElement(By.css("#years *[value='2012']")).click();

    await driver.findElement(By.css("input#firstname")).sendKeys("firstname");
    await driver.findElement(By.css("input#lastname")).sendKeys("lastname");
    await driver.findElement(By.css("input#company")).sendKeys("qtpsudhakar");
    await driver.findElement(By.css("input#address1")).sendKeys("hyderabad");
    await driver.findElement(By.css("input#city")).sendKeys("hyderabad");
    
    await driver.findElement(By.xpath("//select[@id='id_state']/option[.='Indiana']")).click();
    await driver.findElement(By.css("input#postcode")).sendKeys("50007");
    await driver.findElement(By.xpath("//select[@id='id_country']/option[text()='United States']")).click();
    await driver.findElement(By.css("input#phone")).sendKeys("8008113344");
    await driver.findElement(By.css("input#alias")).sendKeys("test");
    await driver.findElement(By.css("#submitAccount")).click();
    
    expect(await driver.findElements(By.xpath("//h1[.='My account']"))).toHaveLength(1);
      
  });
});

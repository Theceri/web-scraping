// import { Builder, By, Key, until } from 'selenium-webdriver';
// import { writeFileSync } from 'fs';

// console.log('Script started');

// export default async function handler(req, res) {
//     const driver = await new Builder().forBrowser('chrome').build();
//     try {
//         await driver.get('https://crm.aviatorepic.com/site/login');
//         console.log('Navigated to the login page');

//         await driver.wait(until.elementLocated(By.id('loginform-email_address')), 10000);
//         const username_email_field = await driver.findElement(By.id('loginform-email_address'));
//         await username_email_field.clear();
//         await username_email_field.sendKeys('matronixx14@gmail.com');
//         console.log('Entered the username');

//         await driver.wait(until.elementIsVisible(driver.findElement(By.id('loginform-password'))), 10000);
//         const password_field = await driver.findElement(By.id('loginform-password'));
//         await password_field.clear();
//         await password_field.sendKeys('K@riuki21');
//         console.log('Entered the password');

//         await driver.wait(until.elementIsVisible(driver.findElement(By.css('.btn.btn-block.btn-outline-red.my-4'))), 10000);
//         const login_btn = await driver.findElement(By.css('.btn.btn-block.btn-outline-red.my-4'));
//         await login_btn.click();
//         console.log('Clicked on the Sign In button')

//         await driver.sleep(5000);

//         await driver.get('https://crm.aviatorepic.com/users');
//         await driver.sleep(5000);
//         console.log('Navigated to the Users table')

//         // Wait for the table to load
//         let table;
//         try {
//             table = await driver.wait(until.elementLocated(By.id('w0-container')), 10000);
//         } catch (error) {
//             console.log("Table not found or took too long to load.");
//             await driver.quit();
//             return;
//         }

//         // Extract the table data
//         let rows = await table.findElements(By.tagName('tr'));
//         let phoneNumbers = [];
//         for (let i = 2; i < rows.length; i++) { // Skip the header row
//             let cols = await rows[i].findElements(By.tagName('td'));
//             if (cols.length > 11) { // Ensure there are enough columns
//                 let phoneNumber = await cols[11].getText();
//                 phoneNumbers.push(phoneNumber.trim());
//             }
//         }

//         console.log(phoneNumbers);

//         // Assuming there's a way to select all phone numbers, this part needs to be adjusted based on the actual page structure
//         // For demonstration, let's assume we can select all phone numbers with a specific selector
//         // const phoneNumbers = await driver.findElements(By.className('phone-number-class'));
//         // const phoneNumbersText = await Promise.all(phoneNumbers.map(phone => phone.getText()));

//         // Write phone numbers to an Excel file
//         // This part requires a library like 'exceljs' or similar to handle Excel file creation
//         // For simplicity, we'll write to a CSV file which can be opened in Excel
//         writeFileSync('phone_numbers.csv', phoneNumbers.join('\n'));

//         res.status(200).json({ message: 'Script executed successfully.' });
//     } catch (e) {
//         console.error(e);
//         res.status(500).json({ error: 'An error occurred while executing the script.' });
//         console.log('catch is running')
//     } finally {
//         await driver.quit();
//         console.log('driver quit')
//     }
// }

// handler()

import { Builder, By, Key, until } from 'selenium-webdriver';
import { writeFileSync } from 'fs';

console.log('Script started');

export default async function handler(req, res) {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://crm.aviatorepic.com/site/login');
        console.log('Navigated to the login page');

        await driver.wait(until.elementLocated(By.id('loginform-email_address')), 10000);
        const username_email_field = await driver.findElement(By.id('loginform-email_address'));
        await username_email_field.clear();
        await username_email_field.sendKeys('matronixx14@gmail.com');
        console.log('Entered the username');

        await driver.wait(until.elementIsVisible(driver.findElement(By.id('loginform-password'))), 10000);
        const password_field = await driver.findElement(By.id('loginform-password'));
        await password_field.clear();
        await password_field.sendKeys('K@riuki21');
        console.log('Entered the password');

        await driver.wait(until.elementIsVisible(driver.findElement(By.css('.btn.btn-block.btn-outline-red.my-4'))), 10000);
        const login_btn = await driver.findElement(By.css('.btn.btn-block.btn-outline-red.my-4'));
        await login_btn.click();
        console.log('Clicked on the Sign In button');

        await driver.sleep(5000);

        await driver.get('https://crm.aviatorepic.com/users');
        await driver.sleep(5000);
        console.log('Navigated to the Users table');

        let phoneNumbers = [];
        let hasNextPage = true;

        while (hasNextPage) {
            // Wait for the table to load
            let table;
            try {
                table = await driver.wait(until.elementLocated(By.id('w0-container')), 10000);
            } catch (error) {
                console.log("Table not found or took too long to load.");
                await driver.quit();
                return;
            }

            // Extract the table data
            let rows = await table.findElements(By.tagName('tr'));
            for (let i = 2; i < rows.length; i++) { // Skip the header row
                let cols = await rows[i].findElements(By.tagName('td'));
                if (cols.length > 11) { // Ensure there are enough columns
                    let phoneNumber = await cols[11].getText();
                    phoneNumbers.push(phoneNumber.trim());
                }
            }

            // Check for next page
            try {
                const nextPageButton = await driver.findElement(By.css('.page-item.next .page-link'));
                await nextPageButton.click();
                await driver.sleep(5000); // Wait for the next page to load
            } catch (error) {
                console.log("No more pages.");
                hasNextPage = false;
            }
        }

        console.log(phoneNumbers);

        // Write phone numbers to a CSV file
        writeFileSync('phone_numbers.csv', phoneNumbers.join('\n'));

        res.status(200).json({ message: 'Script executed successfully.' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'An error occurred while executing the script.' });
        console.log('catch is running');
    } finally {
        await driver.quit();
        console.log('driver quit');
    }
}

handler();
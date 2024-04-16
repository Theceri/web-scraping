from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Setup WebDriver (assuming Chrome)
driver = webdriver.Chrome()

# Navigate to the login page
login_url = "https://crm.aviatorepic.com/site/login"
driver.get(login_url)

# Log in (adjust the selectors based on the actual page structure)
username_field = driver.find_element(By.NAME, 'LoginForm[email_address]')
password_field = driver.find_element(By.NAME, 'LoginForm[password]')
username_field.send_keys("matronixx14@gmail.com")
password_field.send_keys("K@riuki21")
password_field.submit() # Submit the form

# Navigate to the table page
table_url = "https://crm.aviatorepic.com/users"
driver.get(table_url)

# Wait for the table to load (adjust the selector based on the actual page structure)
try:
    # Replace 'table_selector' with the actual selector for your table
    table = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "w0-container"))
    )
except:
    print("Table not found or took too long to load.")
    driver.quit()
    exit()

# Extract the table data
rows = table.find_elements(By.TAG_NAME, 'tr')
phone_numbers = []
for row in rows[1:]: # Skip the header row
    cols = row.find_elements(By.TAG_NAME, 'td')
    if len(cols) > 11: # Ensure there are enough columns
        phone_numbers.append(cols[11].text.strip())

print(phone_numbers)

# Close the browser
driver.quit()
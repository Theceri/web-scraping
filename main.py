import requests
from bs4 import BeautifulSoup

# Step 1: Log in to the website
login_url = "https://crm.aviatorepic.com/site/login" # Replace with the actual login URL
payload = {
    'username': "matronixx14@gmail.com",
    'password': "K@riuki21"
}
session = requests.Session()
response = session.post(login_url, data=payload)

# Check if login was successful
if response.status_code == 200:
    print("Login successful")
else:
    print(f"Login failed with status code: {response.status_code}")
    print(response.text) # Print the response content to debug

# Step 2: Navigate to the page with the table
table_url = "https://crm.aviatorepic.com/users"
response = session.get(table_url)

if response.status_code == 200:
    print("Navigated to table page successfully")
else:
    print(f"Failed to navigate to table page with status code: {response.status_code}")
    print(response.text) # Print the response content to debug

# Step 3: Parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

# Step 4: Extract the phone numbers
# The table has the classes 'kv-grid-table', 'table', 'table-bordered', 'table-striped', 'kv-table-wrap', and the phone numbers are in the 12th column
table = soup.find("table", class_='kv-grid-table table table-bordered table-striped kv-table-wrap')
if table:
    print("Table found")
    rows = table.find_all("tr")
    phone_numbers = []
    for row in rows[1:]: # Skip the header row
        cols = row.find_all("td")
        if len(cols) > 11: # Ensure there are enough columns
            phone_numbers.append(cols[11].text.strip()) # Assuming phone numbers are in the second column
    # Now phone_numbers list contains all the phone numbers from the table
    print(phone_numbers)
else:
    print("Table not found")
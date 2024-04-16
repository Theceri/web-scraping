import requests
from bs4 import BeautifulSoup
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    url = 'https://aiandfaith.org/our-community/'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36'
    }
    response = requests.get(url, headers=headers)
    print(response)
    soup = BeautifulSoup(response.text, 'html.parser')
    with open("output.html", "w", encoding="utf-8") as file:
        file.write(soup.prettify())

    profiles = []

    # Locate the profile containers and extract their content
    # for profile_container in soup.find_all('div', class_='column'):
    #     photo_url = profile_container.find('img')['src']
    #     name = profile_container.find('h4').text.strip()
    #     normal_text_runs = profile_container.find_all('span')
    #     description = ' '.join(span.text for span in normal_text_runs)
    #     profiles.append({'photo_url': photo_url, 'name': name, 'description': description})

    for profile_container in soup.find_all('div', class_='column'):
        photo_url = profile_container.find('img')['src']
        name = profile_container.find('h4').text.strip()
        
        normal_text_runs = profile_container.find_all(['span', 'p'])
        description = ' '.join(tag.text.strip() for tag in normal_text_runs if not tag.find(['span', 'h4', 'style', 'div', 'a']))
        
        profiles.append({'photo_url': photo_url, 'name': name, 'description': description})

    print('These are the profiles: ', profiles)

    return render_template('index.html', profiles=profiles)

if __name__ == '__main__':
    app.run(debug=True)
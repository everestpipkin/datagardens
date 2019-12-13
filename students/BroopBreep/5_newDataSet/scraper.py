import requests

from bs4 import BeautifulSoup, SoupStrainer


page = requests.get("http://ppg.thebrownhouse.org/")

soup = BeautifulSoup(page.content, 'html.parser')

print(soup.find_all('td', class_='table_body'))

for elem in soup.find_all('td', class_="table_body"):

                   print (elem.text)

                   next_tag = elem.findNext('td')

                   print (next_tag.text)


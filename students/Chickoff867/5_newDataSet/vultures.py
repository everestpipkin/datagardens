##Cora Hickoff
##Data Gardens
##Webscraping a Subforum on Vultures

import requests
from bs4 import BeautifulSoup, SoupStrainer

page = requests.get("https://www.chronofhorse.com/forum/forum/discussion-forums/around-the-farm/201850-vultures")
soup = BeautifulSoup(page.text, 'html.parser')

## print the text of page, only (no html). this does mess up sometimes, especially on things like embedded ads and tracking.
text_soup = soup.text
print (text_soup)
		

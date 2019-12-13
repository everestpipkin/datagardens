##this is a more complex example that scrapes all the URL links from a page, then scrapes the data from _those_ pages! important if you want to use pages that don't follow a numbered structure. 

import requests
import csv
from bs4 import BeautifulSoup, SoupStrainer

# Create a file to write our data to, add a headers row
f = csv.writer(open('buildings.csv', 'w'))

# writes our headers. we're looking for 6 different attributes this time!
f.writerow(['Description', 'Image', 'Climate', 'Context', 'Style', 'Notes'])

# Create empty array for your multiple pages to get stored to
pages = []

#the base url you're scraping
url = 'https://www.rottentomatoes.com/celebrity/akira_kurosawa' 
mainpage_return = requests.get(url)
url_soup = BeautifulSoup(mainpage_return.text, 'html.parser')

#find all the links on this page
all_links= url_soup.findAll('a')
filter(None, all_links)

for link in all_links:
	link = link.get('href')
	if link is not None:
		#this tests if the link is a link to page we want info off of. this will change project to project. 
		if "/buildings" in link:
			#print (link)
			pages.append(link)

#for each url we have stored
for item in pages:
	print (item)
	# checks if each url is a complete link. if so, good!
	if item.startswith("https"):
				item = item
	# if not, add the base back in. this may take finessing for different projects.
	else:
		baseURL = 'https://www.rottentomatoes.com/m'
		item = baseURL + item

	#get each of these pages
	page = requests.get(item)
	if page:
		soup = BeautifulSoup(page.text, 'html.parser')
	
		
	# NOW you do the type of data scraping from html that we were doing before
	# if you wanted to sub in your own page/process, you could take out everything following this and rewrite it for your scraping project. this is just an example.

	#this looks for the building type
		building_type = soup.find("td", text="Building Type")
		if building_type is not None:
			building_type = building_type.find_next_sibling("td").text
		else:
			building_type = ""

	#this looks for the construction system
		construction_type = soup.find("font", text=chr(160)+'Construction'+chr(160)+'System')
		if construction_type is not None:
			construction_type = construction_type.find_next("td").text
		else:
			construction_type = ""

	#this looks for the climate
		climate = soup.find("td", text="Climate")
		if climate is not None:
			climate = climate.find_next_sibling("td").text
		else:
			climate = ""

	#this looks for the context
		context = soup.find("td", text="Context")
		if context is not None:
			context = context.find_next_sibling("td").text
		else:
			context = ""

	#this looks for the style
		style = soup.find("td", text="Style")
		if style is not None:
			style = style.find_next_sibling("td").text
		else:
			style = ""

	#this looks for the notes
		notes = soup.find(text="Notes")
		if notes is not None:
			notes = notes.find_next("td").text
		else:
			notes = ""

	#writes all this info to a file!
		f.writerow([building_type, construction_type, climate, context, style, notes])
import requests
import csv
# import scrapy
from bs4 import BeautifulSoup, SoupStrainer


pages = []

# home = requests.get('https://www.flowershopnetwork.com/blog/flower-dictionary/')
home = requests.get('https://www.nike.com/w/baseball-cleats-spikes-39flmz99fch')

soup = BeautifulSoup(home.content, 'html.parser')


# Create a file to write our data to, add a headers row
f = csv.writer(open('cleats_only_new.csv', 'w'))
# writes our headers. we're looking for 6 different attributes this time!
f.writerow(['Name', 'Description', 'More Description', 'Image_Link'])


# Create empty array for your multiple pages to get stored to
pages = []



#the base url you're scraping
url = 'https://www.nike.com/w/baseball-cleats-spikes-39flmz99fch' 
mainpage_return = requests.get(url)
url_soup = BeautifulSoup(mainpage_return.text, 'html.parser')



#find all the links on this page
all_links= url_soup.findAll('a', attrs={"class": "product-card__link-overlay"})


filter(None, all_links)

for link in all_links:
	#get the href of the links
	link = link.get('href')
	if link is not None:
		pages.append(link)






##########################################

# NOW FOR THE SCRAPPPPPING #

##########################################



###### CLEAT NAME FUNCTIONS ######

def getCleatNameForYou(soup):
	cleat_name = soup.find("h1", attrs={"class": "exp-pdp-title__main-title"})
	if cleat_name is not None:
		cleat_name = cleat_name.text
	else:
		cleat_name = ""
	return cleat_name

def getCleatName(soup):
	cleat_name = soup.find("h1", attrs={"id":"pdp_product_title"})
	if cleat_name is not None:
		cleat_name = cleat_name.text
	else:
		cleat_name = ""
	return cleat_name



###### CLEAT DESCRIPTION FUNCTIONS ######

def getCleatDescForYou(soup):
	cleat_desc = soup.find(attrs={"class": "pi-sub-title"})
	if cleat_desc is not None:
		# .p is getting paragraph tags within div
		cleat_desc = cleat_desc.text
	else:
		cleat_desc = ""
	return cleat_desc

def getCleatDesc(soup):
	cleat_desc = soup.find(attrs={"class": "description-preview"})

	if cleat_desc is not None:
		# .p is getting paragraph tags within div
		cleat_desc = cleat_desc.p.text
	else:
		cleat_desc = ""
	return cleat_desc




###### MORE CLEAT DESCRIPTION FUNCTIONS ######


def getCleatDescMore(soup):

	for section in soup.findAll(attrs={"class": "pi-tier3"}):
		cleat_desc = section.findAll('li')

	if cleat_desc is not []:
		# .p is getting paragraph tags within div
		print(type(cleat_desc))
		cleat_desc = cleat_desc.text
		print(cleat_desc)
	else:
		cleat_desc = ""
	return cleat_desc




###### CLEAT IMAGE FUNCTIONS ######

def getCleatImgForYou(soup):

	cleat_img = soup.find("img", attrs={"name": "productImg"})
	if cleat_img is not None:
		# ['src'] method from https://www.w3resource.com/python-exercises/web-scraping/web-scraping-exercise-8.php
		cleat_img = cleat_img['src']
	else:
		cleat_img = ""
	return cleat_img

def getCleatImg(soup):
	cleat_img = soup.find(attrs={"class": "css-viwop1"})
	if cleat_img is not None:
		cleat_img = cleat_img['src']
	else:
		cleat_img = ""
	return cleat_img







#for each url we have stored
for item in pages:
	
	# for keeping track of different formats of pages, for you vs. standard cleats
	for_you = True
	print (item[20:23])
	
	#this tests if it is a full link to another cleat, if it isn't, add http 
	if item[20:23] == '/t/':
		for_you = False
	
	


	#get each of these pages
	page = requests.get(item)
	if page:
		soup = BeautifulSoup(page.text, 'html.parser')
		# print(soup.title.text)
	
	

	#this looks for the cleat_name of the cleat, depending on whether it's for you or regular
		if for_you:
			cleat_name = getCleatNameForYou(soup)
			cleat_desc = getCleatDescForYou(soup)
			cleat_more_desc = ""
			cleat_img = getCleatImgForYou(soup)
		else:
			cleat_name = getCleatName(soup)
			cleat_desc = getCleatDesc(soup)
			cleat_more_desc = getCleatDescMore(soup)
			cleat_img = getCleatImg(soup)

	print(cleat_more_desc)
	





	#writes all this info to a file!
	f.writerow([cleat_name, cleat_desc, cleat_more_desc, cleat_img])



import requests
import csv
# import scrapy
from bs4 import BeautifulSoup, SoupStrainer

pages = []

home = requests.get('https://www.flowershopnetwork.com/blog/flower-dictionary/')
# cleats = requests.get('https://www.nike.com/w/baseball-cleats-spikes-39flmz99fch')

##this is a more complex example that scrapes all the URL links from a page, then scrapes the data from _those_ pages! important if you want to use pages that don't follow a numbered structure. 



# Create a file to write our data to, add a headers row
f = csv.writer(open('flowers_only.csv', 'w'))

# writes our headers. we're looking for 6 different attributes this time!

f.writerow(['Name', 'History', 'Blossom Texture', 'Img Link'])


# Create empty array for your multiple pages to get stored to
pages = []

#the base url you're scraping
url = 'https://www.flowershopnetwork.com/blog/flower-dictionary/' 
mainpage_return = requests.get(url)
url_soup = BeautifulSoup(mainpage_return.text, 'html.parser')

#find all the links on this page
all_links= url_soup.findAll('a')


filter(None, all_links)

for link in all_links:
	#make sure that it is one of our flowers
    if link.findAll('div', attrs={"class":"flowerDictionarySubPage"}) != []:
        link = link.get('href')
        # get the actual link from the page
        if link is not None:
            # print(link)
            pages.append(link)


# print(pages)

#for each url we have stored
for item in pages:
	# print (item)
	# checks if each url is a complete link. if so, good!
	if item.startswith("http"):
		item = item
	# if not, add the base back in. this may take finessing for different projects.
	else:
		baseURL = 'https://www.flowershopnetwork.com/blog/flower-dictionary/'
		item = baseURL + item

	#get each of these pages
	page = requests.get(item)
	if page:
		soup = BeautifulSoup(page.text, 'html.parser')
		# print(soup.title)
	
		
	# NOW you do the type of data scraping from html that we were doing before
	# if you wanted to sub in your own page/process, you could take out everything following this and rewrite it for your scraping project. this is just an example.

	#this looks for the flower_name of the flower
		flower_name = soup.find("h1", attrs={"class":"entry-title"})
		if flower_name is not None:
			flower_name = flower_name.text
		else:
			flower_name = ""
		print(flower_name)


	#looks for img of flower
		flower_img = soup.find("dt")
		if flower_img is not None:
			flower_img = flower_img.a['href']
		else:
			flower_img = ""
		print(flower_img)


	# this finds all the attributes of the flower, which we will loop through

		attributes = soup.find_all("p", attrs={"style":"padding-left: 30px;"})

		flower_history = ''
		flower_texture = ''


	#this looks for the flower_history system
		
		for a in attributes:
			# print('hi')
			if  "History" in a.text:
				flower_history = a.text.replace('History\n', '')
				# print('flower history:', flower_history)
				break


	#this looks for the blossom texture
		for a in attributes:
			if "Blossom Texture:" in a.text:
				flower_texture = a.text.replace('Blossom Texture: ', '')
				# print('flower texture: ', flower_texture)
				break



	#writes all this info to a file!
		f.writerow([flower_name, flower_history, flower_texture, flower_img])












# soup = BeautifulSoup(home.content, 'html.parser')
# print(soup.prettify())









################################

# OPEN/CREATE SOME SORT OF CSV

################################


# with open('links.csv', mode='w') as csv_file:
#     fieldflower_names = ['text', 'link']
#     writer = csv.DictWriter(csv_file, fieldflower_names=fieldflower_names)

#     writer.writeheader()
#     for link in links:
#     	writer.writerow({'text': link.text, 'link': link.href})



# Adapted from Everest Pipkin, BeautifulSoup documentation, & Ethan Jarrell from codeburst.io. 
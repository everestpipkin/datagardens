##this is a more complex example that scrapes all the URL links from a page, then scrapes the data from _those_ pages! important if you want to use pages that don't follow a numbered structure. 

import requests
import csv
from bs4 import BeautifulSoup, SoupStrainer
import json

# Create a file to write our data to, add a headers row
f = csv.writer(open('movies.csv', 'w'))

finalKurosawa = open("finalKurosawa", 'w')
finalReviewsKurosawa = open("finalReviewsKurosawa", "w")
data = {}
data['movies'] = []

# writes our headers. we're looking for 6 different attributes this time!
f.writerow(['Review', 'Synopsis'])

# Create empty array for your multiple pages to get stored to
pages = []
pageTexts = []

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
        if "/m/" in link:
            #print (link)
            pages.append(link)

#for each url we have stored
for item in pages:
    #print (item)
    # checks if each url is a complete link. if so, good!
    if item.startswith("https"):
                item = item
    # if not, add the base back in. this may take finessing for different projects.
    else:
        baseURL = 'https://www.rottentomatoes.com'
        item = baseURL + item
    #print(item)
    #get each of these pages
    page = requests.get(item)
    if page:
        soup = BeautifulSoup(page.text, 'html.parser')

        if soup is not None:
            review = soup.find("blockquote")
            if review is not None:
                review = review.find("p").getText()
                splitReview = review.split()
                review = ' '.join(splitReview)
                finalReviewsKurosawa.write(review + "\n")
        
        if soup is not None:
            synopsis = soup.find("div", id="movieSynopsis").getText()
            splitSynopsis = synopsis.split()
            synopsis = " ".join(splitSynopsis)
            finalKurosawa.write(synopsis+ "\n")

        data['movies'].append({
            "review" : review,
            "synopsis": synopsis
            })


    #writes all this info to a file!


        f.writerow([review, synopsis])



with open("final.json", 'w') as outfile:
    json.dump(data, outfile)
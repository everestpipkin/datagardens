import requests
import csv
from bs4 import BeautifulSoup, SoupStrainer
import os #new dependency
from time import sleep #may be needed if downloading big images to keep it from stumbling/crashing


## Create a file to write our data to. only works if this file doesn't exist already though!
f = csv.writer(open('yourfile.csv', 'w'))

## Write the elements on our header row - can add as many as needed, helps organize our elements
f.writerow(['title', 'user'])

## Create empty array for your multiple pages to get stored to
pages = []

url = 'https://www.rottentomatoes.com/' 

for link in range(1,2):
    pages.append(url + str(link))

##for each url we have stored
for item in pages:
    print (item) ##prints the url we're trying to GET

	##request each url
    page = requests.get(item)
    if page: ##if this url exists,
        soup = BeautifulSoup(page.text, 'html.parser')

        for link in soup.find_all('img'):
            image = link.get("src")
 
            #prints link it found for the image
            print(image)
 
            #checks if the image is a complete link or not
            if image.startswith("http"):
                image_url = image
 
            #if it is not, please add the base URL of the domain here! might have to go into the inspector to establish what this is, if it isn't what you started with at the top
            else:
                baseURL = url #may be something like 'http://www.ahajokes.com/'
                image_url = baseURL + image
           
            #gets the image offline
            r2 = requests.get(image_url)
 
            #gets the image name
            image_name = os.path.split(image_url)[1]
 
            #saves the image to the local folder
            with open(image_name, "wb") as im:
                im.write(r2.content)
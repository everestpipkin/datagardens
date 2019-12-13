import time
from bs4 import BeautifulSoup
from selenium import webdriver  
from webdriver_manager.chrome import ChromeDriverManager

BASE_URL = "https://www.ycombinator.com/companies/"

# get list of urls from y combinator's companies page
def get_page_urls(num):

    driver = webdriver.Chrome(ChromeDriverManager().install())
    driver.get(BASE_URL)

    links = driver.find_elements_by_tag_name("a")

    page_urls = []
    for a in links:
        url = a.get_attribute("href")
        if "ycombinator" not in url:
            page_urls.append(url)

    driver.close()
    

    return page_urls[:num]
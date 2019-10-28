import time
import requests
from bs4 import BeautifulSoup
from selenium import webdriver  
from webdriver_manager.chrome import ChromeDriverManager

BASE_URL = "https://producthunt.com"

# scroll down the infinite loading page for x iterations
def scroll_down_for(driver, iterations):
    SCROLL_PAUSE_TIME = 0.5
    i = 0

    last_height = driver.execute_script("return document.body.scrollHeight")

    while i < iterations:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(SCROLL_PAUSE_TIME)
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height
        i += 1

# open the producthunt page and scroll down to load posts, then collect
# links to posts
def open_scroll_collect_posts(num_scrolls):
    driver = webdriver.Chrome(ChromeDriverManager().install())
    driver.get(BASE_URL)

    scroll_down_for(driver, num_scrolls)

    links = driver.find_elements_by_tag_name("a");
    post_links = []
    for a in links:
        if "/posts/" in a.get_attribute("href"):
            post_links.append(a.get_attribute("href"))

    driver.close()
    return post_links

# get the producthunt post pages and find the link to the product url 
def get_page_urls_from_posts(post_links):
    page_urls = []

    for link in post_links:
        page = requests.get(link)
        soup = BeautifulSoup(page.content, 'html.parser')

        for tag in soup.find_all('a'):
            redir = tag['href']
            if "Website" in tag.get_text() and "http" not in redir:
                url = BASE_URL + redir
                if url not in page_urls:
                    print("Got redir link: {}".format(redir))
                    page_urls.append(url)
                    break;

    return page_urls


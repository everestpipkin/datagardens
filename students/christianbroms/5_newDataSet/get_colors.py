import requests
import re
from colour import Color # pip install colour
from bs4 import BeautifulSoup # pip install bs4

# find all valid css colors and convert to hex
def extract_css_colors(css):
    # https://gist.github.com/olmokramer/82ccce673f86db7cda5e#gistcomment-2029233
    colors = re.findall(r'(#(?:[0-9a-f]{2}){2,4}|#[0-9a-f]{3}|(?:rgba?|hsla?)\((?:\d+%?(?:deg|rad|grad|turn)?(?:,|\s)+){2,3}[\s\/]*[\d\.]+%?\))', css)

    # convert rgb, rgba, hsl, hsla to hex
    hex_colors = []
    for color in colors:
        if color[0] == '#':
            hex_colors.append(color)
        else:
            color = color.replace(" ", "")
            color = color.split(',')
            if color[0][0] == 'r':
                if len(color) == 4:
                    color[0] = color[0].replace("rgba(", "")
                    color = color[:3]
                else:
                    color[0] = color[0].replace("rgb(", "")
                    color[2] = color[2].replace(")", "")

                c = Color(rgb=(int(color[0])/255, int(color[1])/255, int(color[2])/255))
                hex_colors.append(c.hex_l)
            else: 
                if len(color) == 4:
                    color[0] = color[0].replace("hsla(", "")
                    color = color[:3]
                else:
                    color[0] = color[0].replace("hsl(", "")
                    color[2] = color[2].replace(")", "") 
                if '%' in color[1]:
                    color[1] = int(color[1].replace("%", "")) / 100
                if '%' in color[2]:
                    color[2] = int(color[2].replace("%", "")) / 100
                c = Color(hsl=(int(color[0])/255, int(color[1])/255, int(color[2])/255))
                hex_colors.append(c.hex_l)
    return hex_colors

# flatten the list and remove duplicate items
def remove_dupes_and_flatten(arr):
    flattened = [item for sublist in arr for item in sublist]
    return list(set(flattened))

# get the css files from a page and extract the color values
def get_page_colors(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    info = {"url": page.url.replace("?ref=producthunt", ""), "title": soup.find("title").text}

    colors = []
    for tag in soup.find_all('link', rel='stylesheet'):
        css_url = tag['href']
        if "http" not in css_url:
            css_url = url + css_url
        page = requests.get(css_url)
        colors.append(extract_css_colors(page.text))

    for tag in soup.find_all('style'):
        colors.append(extract_css_colors(tag.text))

    colors = remove_dupes_and_flatten(colors)
    print("Got colors for: {}".format(info["url"]))
    return {"url": info["url"], "title": info["title"], "colors": colors}

import requests
import uuid
from bs4 import BeautifulSoup

# get all the svgs from a page and save them as individual files
def get_page_svgs(url):

    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    info = {"url": page.url.replace("?ref=producthunt", ""), "title": soup.find("title").text}
    page_id = uuid.uuid4()

    svgs = 0
    svg_names = []

    for tag in soup.find_all('img'):
        if 'src' in tag:
            svg_url = tag['src']
            if ".svg" in svg_url:
                svgs += 1
                if "http" not in svg_url:
                    if "//" in svg_url:
                        svg_url = svg_url.replace("//", "http://")
                    else:
                        svg_url = page.url + svg_url

                svg = requests.get(svg_url)
                name = "{}-{}".format(page_id, svgs)
                svg_names.append(name)

                # save the svg
                with open("svgs/{}.svg".format(name), 'w', encoding='utf-8') as f:
                    f.write(svg.text)

    for tag in soup.find_all('svg'):
        svgs += 1
        name = "{}-{}".format(page_id, svgs)
        svg_names.append(name)

        # save the svg
        with open("svgs/{}.svg".format(name), 'w', encoding='utf-8') as f:
            f.write(str(tag))


    if len(svg_names) == 0:
        return None
    else:
        print("Got SVG(s) from: {}".format(info["url"]))
        return {"url": info["url"], "title": info["title"], "svgs": svg_names }



import sys
from get_colors import get_page_colors
from get_producthunt_urls import open_scroll_collect_posts, get_page_urls_from_posts
from get_ycombinator_urls import get_page_urls
from save_data import create_save_json

PRODUCTHUNT_NUM_SITES_TO_GET = 400
YCOMBINATOR_NUM_SITES_TO_GET = 400

if __name__ == "__main__":

    if len(sys.argv) > 1:

        urls = []

        if sys.argv[1] == "ph":
            # open the browser to collect post links from producthunt 
            posts = open_scroll_collect_posts(int(PRODUCTHUNT_NUM_SITES_TO_GET / 9))

            # get the urls to the projects from the producthunt post pages
            print("Getting website links")
            urls = get_page_urls_from_posts(posts)

        elif sys.argv[1] == "yc":

            # get the urls from the y combinator companies page
            print("Getting website links")
            urls = get_page_urls(YCOMBINATOR_NUM_SITES_TO_GET)
            print(urls)

        colors = []

        # get the colors from each of the sites
        print("Getting colors from websites")
        for url in urls:
            try:
                colors.append(get_page_colors(url))
            except:
                print("An error ocurred getting a page's colors")
                continue

        # create the json file
        print("Saving data")

        if sys.argv[1] == "ph":
            create_save_json(colors, "startup_colors_producthunt.json")
        elif sys.argv[1] == "yc":
            create_save_json(colors, "startup_colors_ycombinator.json")

        print("Done, got colors from {} websites".format(len(colors)))

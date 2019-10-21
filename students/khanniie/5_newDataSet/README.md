# Files
1. [crying_dataset.json](crying_dataset.json): Contains 105 makeup reviews from Sephora that mention crying, tears or sobbing. Usernames have been changed to less revealing "user ids" with a hash function.
2. all_json folder: Contains json files with the raw review data (not just tears) for the 13 products I scraped the reviews from.
3. [username_credit.txt](helpers/parse_data.py): Thank you to the Sephora users who are a part of my dataset.
4. [helpers/parse_data.py](helpers/parse_data.py): The file I used to process the data and filter the raw json data to make the final "crying reviews" dataset.
5. [helpers/sephora.js](helpers/sephora.js): Snippets of code I would run in the browser console in order to scrape the review data. I couldn't use beautiful soup because Sephora hides the reviews until you click the "Load 6 more" button. So I had to write a script that would continuously click the button. I think Sephora's server clamps the number of responses it sends back to an address for some time frame, because I noticed that I could only get 30 reviews at a time no matter how many times my script "clicked." So I had to manually visit a page, give the button to click an id (there's no id because Sephora uses React to build their site), and then run my script to click over and over until I had loaded 400 - 700 reviews. I couldn't just save the page source, since the page source shows the source code and not the dynamically rendered content. Sadly, I also couldn't just save the rendered HTML from the developer tools to parse at that point because whenever I would do that, it would be missing significant chunks of information (page size too large with those hundreds of reviews perhaps?). So, I then ran the bottom half of the snippet to convert the parts that I wanted into json data, which I then downloaded.

# Online Viewer
I made a site to view these reviews through! Visit [this online viewer](https://connie.dog/sephora/).

# Stats:
1. 5018 total reviews
2. 13 different products
    a. 5 mascara
    b. 5 eyeliners
    c. 1 face primer
    d. 1 eye primer
    e. 1 setting spray
3. 105 total crying reviews found
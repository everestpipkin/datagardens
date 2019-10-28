# Startup Website Colors and Icons

This repository contains the colors and icons and illustrations from around 400 startup websites, collected in mid-October 2019.

## Colors

There are two separate files with color data, one for websites scraped from [producthunt.com](https://www.producthunt.com/) and another from [Y Combinator's list of funded companies](https://www.ycombinator.com/companies/). The files are `startup_colors_producthunt.json` and `startup_colors_ycombinator.json` respectively. Each of the files contains the name of the website that the data comes from, its url, and a list of all the colors used on the site in hexadecimal format. Here's a sample:

```json
{
    "url": "https://smartgrade.net/",
    "title": "SmartGrade - grade multiple choice exams in seconds",
    "colors": [
        "#f3f3f3",
        "#c9c9c9",
        "#3d3d3d",
        "#000",
        "#305cbb",
        "#f9f9f9",
        "#45d965",
        "#ff0",
        "#999",
        "#30303f",
        "#5898f1",
        "#fff",
        "#4dc667"
    ]
}
```

## Icons

The SVG icons and illustrations from startup websites scraped from the same two sources are also available. The files `startup_svgs_producthunt.json` and `startup_svgs_ycombinator.json` are organized in the same way as the color files, but include the names of SVG files which can be found in the `svgs/` directory. Here's a sample:

```json
{
    "url": "https://flextripod.com",
    "title": "FlexTripod - Flexible Mini Tripod\n– Flex Tripod",
    "svgs": [
        "e4a17ffb-b64c-4a60-9edb-a93bb14282d2-1",
        "e4a17ffb-b64c-4a60-9edb-a93bb14282d2-2",
        "e4a17ffb-b64c-4a60-9edb-a93bb14282d2-3",
        "e4a17ffb-b64c-4a60-9edb-a93bb14282d2-4",
        "e4a17ffb-b64c-4a60-9edb-a93bb14282d2-5",
        "e4a17ffb-b64c-4a60-9edb-a93bb14282d2-6",
        "e4a17ffb-b64c-4a60-9edb-a93bb14282d2-7",
        "e4a17ffb-b64c-4a60-9edb-a93bb14282d2-8",
        "e4a17ffb-b64c-4a60-9edb-a93bb14282d2-9"
    ]
}
```

Each of the strings in the `svgs` list corresponds to the name of a file in the `svgs/` directory.

# Method

To scrape the colors and SVGs from the startup websites, it was first necessary to compile a list of urls to these websites. For this, I turned to producthunt.com and Y Combinator. On Producthunt, people post their startups and projects for the community. The posts on Producthunt are anything from Facebook's new cryptocurrency to Joe Schmoe's note-taking app that he's been working on solo for a few months. Popular posts are voted up and each day, week, and month has a top-voted product.

Y Combinator is a bit different, as all of the startups listed on their website were funded for at least \$150,000 by the seed accelerator. Many of these sites have grown much larger, and plenty have shut down completely.

Both of the websites lazy-load the data, so I had to create a browser session with selenium to scrape the site contents. Producthunt has an infinite-scrolling system which required that the script execute javascript in the browser to automatically scroll down and trigger the loading of more data. Once a certain number of posts have been loaded, it pulls the links to each post. Then the script requests each post page and extracts the url to the featured project's website. A similar process takes place for the Y Combinator site, which lazy-loads the contents all at once.

Once I had a list of startup websites from both Producthunt and Y Combinator, I could begin to scrape colors and SVGs. For each site, I make a request and pull out the references to CSS files and SVG files in the site's HTML. I then request each of these resources. For the colors, I pull out any valid CSS color in rgb, hsl, and hex. Each is then converted to a hex value and saved.

## Running the scraper

All the files needed to scrape a larger dataset of colors and SVGs are in this repository. The process of pulling the latest startup urls from each of the two sources and collecting data from them is combined into one common script for both colors and SVGs.

To collect colors, run `scraper_colors.py` followed by `ph` for websites from Producthunt and `yc` for websites from Y Combinator. For example:

```shell
python scraper_colors.py yc
```

To collect SVGs use the script `scraper_svgs.py` and the same `ph` and `yc` flags.

You can control approximately how many results you get back with the variable `_NUM_SITES_TO_GET` in both of the two scraper scripts. For the color script, the number here is fairly representative of the number of websites that will have data, but for the SVGs it can be rather off due to some sites not having any SVGs at all. For example, on one run out of 400 websites visited 113 had SVG content.

# Why?

Startups are unique in that they have the chance to completely redefine what a website can be and how it looks. They're new, they're thinking different, they're revolutionizing cloud computing/human resources/security testing/legal and compliance workflows/modern medical billing/cannabis delivery/code delivery/electric scooters. Yet so often, the design of these websites is [exactly](https://www.percept.ai/) [the](https://www.scholarme.co/) [same](https://www.emailjs.com/), [over](https://www.askdata.com/) [and](https://credpal.com/) [over](https://slapdash.com/) [again](https://www.inscribe.ai/). There's clearly a "safe" route to go; a landing page with pastel colors and gradients, bubbly two-dimensional illustrations of people with massive hands and tiny heads, a call to action and logos of more reputable companies that could conceivably be users of their revolutionary new SaaS/DaaS/ITaaS/PaaS/IaaS/MSaaS/ITMaaS.

It's a bit of a shame that these websites, some of them less than a day old, follow such a familiar pattern. Yet in this homogeneity there is an opportunity to learn more about this style, to better define it. Artistic styles and painters are defined by their palettes, and so should web styles. We all are aware of the differences between the web styles of the late 90's and late 2000's, but there is no codified difference between them in terms of colors and border styles and padding. We take for granted the differences but have not defined them. Yet the information is all there, linked in stylesheets and ready to be scraped, analyzed, and built upon.

The aesthetics of the web are always a consideration, but the content is usually the core of what we're concerned with. This is reflected in our tools for interfacing with the web; there's a plethora of python and javascript packages for parsing and extracting bits of content from HTML but there are none for CSS. The medium of the web might be HTML, CSS and javascript, but we're often only really interested in the content by way of the HTML. The site's javscript and CSS is often discarded as a byproduct of the scraping process.

Artistically, however, there's just as much potential to work with the aesthetics of the website as there is the content. Someone's impression of a site is very much defined by its style; a site with a monospace font with strong colors has a very different association than a site with a sans-serif and pale blues. In some cases the content doesn't really matter; an impression of a website is formed by its style alone. Consider these two startup websites: [one](https://www.inscribe.ai/) and [two](https://percept.ai/). How do they feel? Would the same kind of people work at these two companies? Are the sites designed for the same user? In this case, the content of the sites and the focus of the two companies are different; one makes customer support chatbots and another analyses documents. Yet the feel of the sites, who they're designed for, and how they work is very much the same. There's a nearly identical page layout, color scheme, and illustration style. Such a relationship can be better understood with the actual color and style values, especially across many more sites.

Interestingly, a website's style is a somewhat legally gray area. Of course all the code (including the code for the illustrations) that's used to display a website can be copyrighted by the owner, but what about the colors? An "arrangement of colors" can be copyrighted, but not a general color palette. Extracting the hex values from the CSS file of a website and reusing those values in another site wouldn't be considered a copyright violation, as color values are akin to words. A particular arrangement of words can be copyrighted, as can a particular arrangement of colors, but not words or colors in general. [Source](https://www.colormatters.com/color-and-marketing/color-branding-legal-rights). It seems like the same would be true of other CSS properties, so they could be reused but just not to create the same arrangement of elements. This could make creating and using datasets of stylistic elements from websites legal in a way that reusing content, like the illustrations, is not.

Legality, though, is just one component. There's also the moral element. When it comes to harvesting colors from corporate sites without the expressed permission of the owners, the morals of such an action are probably safely on the side of justifiable. However, some designer or group of designers worked hard to pick out the perfect color palette, only to have it swiped away by some random user across the Internet. But they don't have any right to their work anymore either; it was done for the corporation who now owns it. If we are to think of a corporation as an abstracted entity rather than the group of people that comprise it, this act is pretty well justified. If we were doing the same thing to people's personal websites, it might be a bit different. Under this circumstance, it would probably be best to get permission, or at least credit in a more substantial way than a simple url.

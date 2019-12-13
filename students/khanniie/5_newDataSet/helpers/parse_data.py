import json

jsonPaths = ["better_than_sex_waterproof.json", 
                "better_than_sex.json", 
                "cannonball.json", 
                "diorshow_waterproof.json", 
                "hangover_primer.json", 
                "kat_von_d_tattoo_liner.json", 
                "primer.json", 
                "stila_waterproof_eyeliner.json", 
                "urban_decay_setting_spray.json",
                "fenty.json",
                "highliner.json",
                "emotionproof.json"]

#hash(object)

final_set = {"reviews": []}
total_reviews = 0

words_to_check = ["cry", "CRY", "tears", "TEARS", "sob", "SOB"]

for file in jsonPaths:
    with open("../all_json/" + file) as json_file:
        data = json.load(json_file)
        product_name = data["product_name"]
        brand = data["brand"]
        product_type = data["product_type"]
        url = data["url"]
        reviews = data["reviews"]
        for r in reviews:
            total_reviews = total_reviews + 1
            body = reviews[r]["description"]
            title = reviews[r]["title"]
            stars = reviews[r]["stars"]
            date = reviews[r]["date"]
            username = hash(r)
            add_to_set = False
            for word in words_to_check:
                if(word in body or word in title):
                    add_to_set = True
            if add_to_set:
                new_entry = {}
                new_entry["product_info"] = {   
                    "name": product_name,
                        "brand" : brand,
                        "type" : product_type,
                        "url" : url
                    }
                new_entry["review_title"] = title
                new_entry["stars"] = stars
                new_entry["date"] = date
                new_entry["review_body"] = body
                new_entry["userid"] = username
                final_set["reviews"].append(new_entry)

print("done with " + str(len(final_set["reviews"])) + " reviews")

final_set["number_of_reviews"] = len(final_set["reviews"])
print(total_reviews)

with open('crying_dataset.json', 'w') as outfile:
    json.dump(final_set, outfile, sort_keys=True, indent=4, separators=(',', ': '))
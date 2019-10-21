

```python
import nltk
from textblob import TextBlob
import textblob.en
import os
import string 
import re
import markovify
        
    
def markov_atblank():
    with open("all_lerner.txt") as b:
        text = b.read()
        text_model = markovify.NewlineText(text)
        for i in range(14):
            print(text_model.make_short_sentence(80))      

def markov_atperiod():
    with open("all_lerner.txt") as p:
        text = p.read()
        text_model.Text(text)
        for s in range(14):
            print(text_model2.make_short_sentence(80))


def markov_multi_mod():
    with open("lichtenburg_full.txt") as a:
        text_a = a.read()
        model_a = markovify.NewlineText(text_a)
    with open("angleofyaw_full.txt") as b:
        text_b = b.read()
        model_b = markovify.NewlineText(text_a)
    with open("meanfreepath_full.txt") as c:
        text_c = c.read()
        model_c = markovify.NewlineText(text_c)
    model_combo = markovify.combine([ model_a, model_b, model_c ], [ 1.3, 1.1, 1.2])
    return model_combo

            

my_data = ["lichtenburg_full.txt", "angleofyaw_full.txt", "meanfreepath_full.txt"]


#################### Helper Functions ###############################

def get_text(file):
    fhand = open (file)
    text = fhand.read()
    fhand.close()
    clean_t = re.sub(r"[’.?—,]","", text)
    clean_t = re.sub(r"[—]"," ", clean_t)
    return clean_t


####################Generate Files of Titles Using BiGrams#####################
from nltk.tokenize import RegexpTokenizer      
from nltk.corpus import webtext
from nltk.collocations import BigramCollocationFinder
from nltk.metrics import BigramAssocMeasures
from nltk.corpus import stopwords
import random

tokenizer = RegexpTokenizer("['\w']+")
stopset = set(stopwords.words('english'))   

def make_titles():
    text = get_text("all_lerner.txt")
    words = tokenizer.tokenize (text)
    bcf = BigramCollocationFinder.from_words(words)
    filter_stops = lambda w: len(w) < 3 or w in stopset
    bcf.apply_word_filter(filter_stops)   
    res = bcf.nbest(BigramAssocMeasures.likelihood_ratio, 300)
    outfile_name = "my_titles.txt"
    outfile = open(outfile_name,'w')
    for x,y in res:
        title = "{} {}\n".format(x.upper(), y.upper())
        outfile.write(title)
    outfile.close()
def get_titles():
    fhand = open ("my_titles.txt")
    titles = fhand.read().split("\n")
    return titles
        
    
##############Generate Lerner-Like Poems with Titles##################
def make_poems():
    title_lst = get_titles()
    markov_model = markov_multi_mod()
    n_poems = 50
    outfile_name = "my_poems.txt"
    outfile = open(outfile_name,'w')
    for p in range(n_poems):
        title = random.choice(title_lst)
        outfile.write(title +"\n\n")
        for i in range(15):
            poem = markov_model.make_short_sentence(80,state_size = 10, tries = 100)
            if i < 14:
                outfile.write(poem + "\n")
            if i == 14:
                outfile.write(poem + "\n\n")
    outfile.close()
        

#################### Run Functions#####################################################
         
    
# markov_atblank()
# markov_atperiod()
# markov_multi_mod()
# endline_pos_w_lst()
# analyze_end_w_pos()
# make_titles()
# get_titles()
# make_poems()

###HERE ARE MY FAILED ATTEMPTS AT MAKING MY OWN MARKOV CHAIN#########
    
    
# def each_file_basic():
#     folder = "lichtenberg_figures"
#     long =  []
#     for file in os.listdir(folder): 
# #         print (file)
#         infile =  folder + "/" + file
#         fhand = open (infile)
#         text = fhand.read()
#         clean_t = re.sub(r"[’.]", '', text)
#         clean_lst = clean_t.lower().split()
#         long.extend(clean_lst)
#         print(long)
#         freq_dict = dict()
#         for w in clean_lst:
#             if w in freq_dict:
#                 freq_dict[w] += 1
#             else:
#                 freq_dict[w] = 1
#         print (freq_dict)

        
#         tb = TextBlob(clean_t, pos_tagger=textblob.en.taggers.PatternTagger())
#         tagged = tb.tags
#         outfile_name = infile + "onlyPOS"
#         each_pos_poem = ""
#         for t in tagged:
#             print (t)
# #         for t[0] in tagged:
            
        
# #         for t in tagged:
# #             word = t[0]
# #             pos = t[1]
# #             outfile_name = infile + "only_POS"
# #             outfile = open(outfile_name,'w')
# #             outfile.write(word + "(" + pos + ")")
# #             outfile.close()




# each_file_basic()
# pre_process()
```

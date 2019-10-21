#!/usr/bin/env python
# coding: utf-8

# In[198]:


text_a = open("bears.txt").read()
text_b = open("frogs.txt").read()


# In[199]:


import random


# In[200]:


a_words = text_a.split()
b_words = text_b.split()


# In[215]:


random.sample(a_words, 10)


# In[216]:


' '.join(random.sample(b_words,50))


# In[217]:


pairs = [" ".join(a_words[i:i+3]) for i in range(len(a_words))]


# In[219]:


pairs


# In[ ]:





# In[204]:


import markovify 


# In[205]:


generator_a = markovify.Text(text_a.split("\n"), state_size=2)
generator_b = markovify.Text(text_b.split("\n"), state_size=2)


# In[206]:


print(generator_a.make_sentence(tries=2000))


# In[207]:


print(generator_a.make_short_sentence(100, tries=100))


# In[208]:


class SentencesByChar(markovify.Text):
    def word_split(self, sentence):
        return list(sentence)
    def word_join(self, words):
        return "".join(words)


# In[209]:


gen_a_char = SentencesByChar(text_a.split("\n"), state_size=7)


# In[210]:


print(gen_a_char.make_sentence(tries=1000))


# In[211]:


combo = markovify.combine([generator_a, generator_b], [0.4, 0.6])


# In[212]:


print(combo.make_sentence())


# In[213]:


# change to "word" for a word-level model, "char" for a character-level model
level = "char"
# controls the length of the n-gram
order = 7
# controls the number of lines to output
output_n = 20
# weights between the models; text A first, text B second.
# if you want to completely exclude one model, set its corresponding value to 0
weights = [0.5, 0.5]
# limit sentence output to this number of characters
length_limit = 280


# In[214]:


model_cls = markovify.Text if level == "word" else SentencesByChar
gen_a = model_cls(text_a.split("\n"), state_size=order)
gen_b = model_cls(text_b.split("\n"), state_size=order)
gen_combo = markovify.combine([gen_a, gen_b], weights)
for i in range(output_n):
    out = gen_combo.make_short_sentence(length_limit) #test_output=False)
    out = out.replace("\n", " ")
    print(out)
    print()


# In[153]:


from textgenrnn import textgenrnn


# In[154]:


textgen = textgenrnn(name="text_a")


# In[156]:


from markovify.splitters import split_into_sentences
text_a_sentences = split_into_sentences(text_a)
text_b_sentences = split_into_sentences(text_b)


# In[158]:


random.sample(text_a.split("\n"), 5)


# In[159]:


random.sample(text_b_sentences, 5)


# In[194]:


textgen.train_on_texts(text_b.split("\n")[:100], num_epochs=10)


# In[192]:


generated_strs = textgen.generate(10, temperature=0.3, return_as_list=True)
print(generated_strs)


# In[193]:


for item in generated_strs:
    print(item)


# In[ ]:





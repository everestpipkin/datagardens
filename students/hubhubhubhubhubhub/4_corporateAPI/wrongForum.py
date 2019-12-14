import praw
import random

reddit = praw.Reddit(client_id='-fJRHuYpA3vo1w',
                     client_secret='mk9LFHxx-lHXcli6Va87b1B9Upk',
                     user_agent='my user agent')


bank = ["post belongs","wrong subreddit","wrong place"]
sub = reddit.subreddit('BreakUps')
posts = [post for post in sub.top (limit=1000)]
c = []
file=open("breakups.txt","a+")

for post in posts:
    post.comments.replace_more(limit=0) # flatten tree
    comments = post.comments.list()
    for comment in comments:
        #bod = comment.body.lower()
#        for word in bank:
#           if word in bod:
#               print(comment.body)
    	file.write(comment.body+'\n')
file.close()


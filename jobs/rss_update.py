import feedparser

feed = feedparser.parse("https://finance.yahoo.com/rss/")

# feed_title = feed['feed']['title']  # NOT VALID
feed_entries = feed.entries

for entry in feed.entries:
    print(entry)
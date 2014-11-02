A Taylor Swift lorem ipsum generator :scream:

This is a work in progress, however it is functioning. Below is a running TODO list for me:
- ~~In `generateIpsum` remove the chosen word to remove the possibility of duplicate words~~
_Actually, should not be done because a user may wish to generate a number of words greater than the total number of unique words available_
- ~~In `highlightHashtags` we might want to add the tumblr hastag link (which would be super easy)~~
_Nah, this might be annoying for people when they try to copy the text_
- Find new way to highlight Tumblr hashtags for cases when longer than one word
- Impliment a different way to get wordcount, possibly by number of spaces
- In `addGrammar` we want the first letter of the hashtag to be uppercase if it's at the beginning of the sentence
- Refactor ajax / css
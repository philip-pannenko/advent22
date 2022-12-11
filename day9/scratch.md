```
use a stack for each, tail and head.
keep a lagging x/y cordinates for the tail

for each line input
    always move the Head based on the parsed info.
    if the lagging x/y coordinates are more than 1 value off the head x/y, 
        then update the lagging x/y coordinates.
        and add a new rope location to the tail array
        and add a new rope location to the set for quicker calculation

head: 0,0
tail: 0,0

head: 1,0
tail: 0,0

move
head: 2,0
tail: 0,0


```


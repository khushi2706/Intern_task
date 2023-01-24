
// total no of account group by total no of id 
db.accounts.aggregate([
...     { "$group": {
...         "_id": {
...             "owner": "$ownerId",
...             "account": "$accountId"
...         },
...         "accountcount": { "$sum": 1 }
...     }},
...     { "$group": {
...         "_id": "$_id.owner",
...         "Accounts": {
...             "$push": {
...                 "account": "$_id.account",
...                 "count": "$accountcount"
...             },
...         }
...     }}])

// gt than 10

db.accounts.aggregate([{"$group" : {_id:{ownerId :"$ownerId"}, count:{$sum:1}}},{$match MongoPrac> db.accounts.aggregate([{"$group" : {_id:{ownerId :"$ownerId"}, count:{$sum:1}}},{$match : { count : {$gt : 3}  }  } ])
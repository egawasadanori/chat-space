## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|


### Association
- belongs_to :group
- belongs_to :user


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|text||
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|
|created_at|datetime|null: false|


### Association
- belongs_to :group
- belongs_to :user


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|bigint|null: false|
|nickname|string|null: false|


### Association
- has_many :groups
- has_many :messages
- has_many :members


## groupテーブル

|Column|Type|Options|
|------|----|-------|
|id|bigint|null: false|
|user_id|reference|null: false, foreign_key: true|
|created_at|datetime|null: false|
|update_at|datetime||
|name|varchar|null: false|


### Association
- has_many :groups
- has_many :messages
## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|


### Association
- belongs_to :group
- belongs_to :user


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|text||
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|
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
- has_many :members
- has_many :groups, through: :members
- has_many :messages



## groupテーブル

|Column|Type|Options|
|------|----|-------|
|id|bigint|null: false|
|user_id|reference|null: false, foreign_key: true|
|created_at|datetime|null: false|
|update_at|datetime||
|name|string|null: false|


### Association
- has_many :members
- has_many :users, through: :members
- has_many :messages
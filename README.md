## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|


### Association
- belongs_to :group
- belongs_to :user


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false |
|image|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|created_at|datetime|null: false|


### Association
- belongs_to :group
- belongs_to :user


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|bigint|null: false|
|email|varchar|null: false|
|encrypted_password|varchar|null: false|
|reset_password_token|varchar||
|reset_password_sent_at|varchar||
|created_at|datetime||
|update_at|datetime||
|nickname|varchar|null: false|


### Association
- belongs_to :group
- has_many :messages


## groupテーブル

|Column|Type|Options|
|------|----|-------|
|id|bigint|null: false|
|user_id|integer|null: false, foreign_key: true|
|created_at|datetime||
|update_at|datetime||
|group_name|varchar|null: false|


### Association
- has_many :groups
- has_many :messages
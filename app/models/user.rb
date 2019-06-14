class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :messages
  has_many :group_users
  has_many :groups, through: :group_users
  has_many :messages

  #  def show_group_user
    #  if @users
    #  @groups.users.each do |user|
      #  puts @groups.users end
    #  end
# 　 end
end
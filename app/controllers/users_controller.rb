class UsersController < ApplicationController

  def index
    # binding.pry
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%")
    respond_to do |format| 
      format.json
    end
  end
  
  def edit 
  end

  def update
    if current_user.update(user_params)
      redirect_to room_path
    else
      render :edit  
    end
  end

  private

  def user_params
    params.requre(:user).permit(:name, :email)
  end
end
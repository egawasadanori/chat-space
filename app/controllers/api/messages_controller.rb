class Api::MessagesController < ApplicationController
  def index
    # message.last
    #params[:message][:id]
    #binding.pry
    @messages = Message.where("id>?", params[:id] )
    respond_to do |format| 
      format.json
    end
  end
end
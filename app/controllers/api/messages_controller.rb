class Api::MessagesController < ApplicationController
  def index
    @messages = Message.where("id>?", params[:id] )
    respond_to do |format| 
      format.json
    end
  end
end
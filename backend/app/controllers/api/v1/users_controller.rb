class Api::V1::UsersController < ApplicationController
  # todo 修正
  # before_action :authenticate_api_v1_user!, unless: :signed_in?

  def index
    users = User.all
    render json: make_json_list(users)
  end

  def show
    user = User.find(params[:id])
    render json: make_json(user)
  end
#  todo: current userのみ修正できるようにする。
  def update
    user = User.find(params[:id])
    if user.update(user_params)
      render json: make_json(user)
    end
  end

  private
  def user_params
    params.require(:user).permit(:name,:introduce,:occupation,:image,url:{})
  end

  def make_json_list(users)
    users.map do |e|
      make_json(e)
    end
  end

  def make_json(e)
    {id: e.id, name: e.name, introduce: e.introduce, occupation: e.occupation,url:e.url,image:e.image_url,combinedTime:e.combined_time}
  end
end


class Api::V1::UsersController < ApplicationController
  # todo 修正
  # before_action :authenticate_api_v1_user!, unless: :signed_in?

  def index
    users = User.all
    render json: users
  end

  def show
    user = User.find(params[:id])
    render json: user
  end
#  todo: current userのみ修正できるようにする。
  def update
    user = User.find(params[:id])
    if user.update(user_params)
      render json: user
    end
  end

  private
  def user_params
    params.require(:user).permit(:name,:introduce,:image,:occupation,urls: [])
  end
end


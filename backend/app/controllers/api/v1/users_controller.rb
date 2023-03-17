class Api::V1::UsersController < ApplicationController
  # todo 修正
  # before_action :authenticate_api_v1_user!, unless: :devise_controller?

  def index
    users = User.all
    render json: users
  end

  def show
    user = User.find(params[:id])
    render json: user
  end

  def update
    if current_user.update(user_params)
      render json: current_user
    end
  end

  private
  def user_params
    params.require(:user).permit(:id,:name,:introduce,:image,:urls,:occupation)
  end
end


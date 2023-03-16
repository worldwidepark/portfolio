class Api::V1::Auth::SessionsController < ApplicationController
  before_action :authenticate_api_v1_user!, unless: :devise_controller?
  def index
    @user = User.all
    if current_api_v1_user
      render json: { is_login: true, data: current_api_v1_user }
    else
      @user_info = @user.map do |user|
        user
      end

      render json: { is_login: false, message: @user_info}
    end
  end
end

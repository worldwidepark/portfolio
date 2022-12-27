class Api::V1::UsersController < ApplicationController
  # before_action :authenticate_api_v1_user!, unless: :devise_controller?
  def index
    users = User.all
    user_info = []
    users.map do |user|
      if !user.work_experiences.empty?
        user_info.push( user)
      end
    end
    render json: {data: user_info}
  end

  def show
    user = User.find(params[:id])
    # user_info = {}
    if !user.work_experiences.empty?
      user_info = {user: user, work_experiences: user.work_experiences}
      # user.work_experiences.map.with_index(1) do |work_experience, idx|
        # user_info.store("work_experience_#{idx}", work_experience)
      # end
    else
      user_info = {user:user}
    end
    render json: {data: user_info}
  end
end


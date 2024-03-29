class Api::V1::UsersController < ApplicationController
  # todo 修正
  # before_action :authenticate_api_v1_user!, unless: :signed_in?

  def index
    users = User.all
    # 学習時間が??時間以上のみ、表示
    users_filtered = users.select { |user| user.combined_time >= 1 }
    render json: make_json_list(users_filtered)
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
  def search
    users = User.all
    users_filtered = users.select { |user| user.combined_time >= 1 }
    results = User.joins(:programming_languages).where("users.combined_time >= ? AND programming_languages.name LIKE ?", 1,"%#{user_params[:programming_language_name]}%").uniq
    if results
      render json: make_json_list(results)
    end
  end

  private
  def user_params
    params.require(:user).permit(:name,:introduce,:occupation,:image,:programming_language_name,url:{})
  end

  def make_json_list(users)
    users.map do |e|
      make_json(e)
    end
  end

  def make_json(e)
    {id: e.id, name: e.name, introduce: e.introduce, occupation: e.occupation,url:e.url,image:e.image_url,combinedTime:e.combined_time, tags:e.programming_languages}
  end
end


class Api::V1::AchivementsController < ApplicationController
  before_action :user_finder

  def index
    achivements = @user.achivements.order(id: :DESC)
    render json: achivements
  end

  def create
    achivement = @user.achivements.new(achivement_params)
    if achivement.save
      render json: achivement
    else
      render json: achivement.errors, status: 422
    end
  end

  def update
    achivement = @user.achivements.find(params[:id])

    if achivement.update(achivement_params)
      render json: achivement
    else
      render json: achivement.errors, status: 422
    end
  end

  def destroy
    if @user.achivement.find(params[:id]).destroy
      render json: { messege: "削除しました。"}
    end
  end


  private
  def achivement_params
    params.require(:achivement).permit(:title,:text,:url)
  end

  def user_finder
    @user = User.find(params[:user_id])
  end

end

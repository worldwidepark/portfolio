class Api::V1::AchivementsController < ApplicationController
  before_action :user_finder

  def index
    achivements = @user.achivements.order(id: :DESC)
    render json: make_json_list(achivements)
  end

  def create
    achivement = @user.achivements.new(achivement_params)
    if achivement.save
      achivement.presentations.create(user:@user)
      render json: make_json(achivement)
    else
      render json: achivement.errors, status: 422
    end
  end

  def update
    achivement = @user.achivements.find(params[:id])

    if achivement.update(achivement_params)
      render json: make_json(achivement)
    else
      render json: achivement.errors, status: 422
    end
  end

  def destroy
    if @user.achivements.find(params[:id]).destroy
      render json: { messege: "削除しました。"}
    end
  end


  private
  def achivement_params
    params.require(:achivement).permit(:title,:text,:start_date_on,:end_date_on,urls: [] )
  end

  def user_finder
    @user = User.find(params[:user_id])
  end

  def make_json(e)
    {id: e.id, title: e.title, text: e.text, startDateOn: e.start_date_on, endDateOn: e.end_date_on, urls: e.urls}
  end

  def make_json_list(daily_reports)
    daily_reports.map do |e|
      make_json(e)
    end
  end



end

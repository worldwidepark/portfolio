class Api::V1::PresentationsController < ApplicationController
  before_action :user_finder

  def index
    # presentations = @user.presentations.order(id: :DESC)
    daily_reports = @user.presentations.where(target_type: "DailyReport").map do |e|
      {id: e.target.id, text: e.target.text, present: e.present}
    end

    achivements = @user.presentations.where(target_type: "Achivement").map do |e|
      {id: e.target.id, title: e.target.title, text: e.target.text, urls: e.target.urls, present: e.present}
    end
    # achievements = @user.achivements.where(present: true)
    render json: {dailyReports: daily_reports, achivements: achivements}
  end

  # def create
  #   achivement = @user.achivements.new(achivement_params)
  #   if achivement.save
  #     render json: achivement
  #   else
  #     render json: achivement.errors, status: 422
  #   end
  # end

  # def update
  #   achivement = @user.achivements.find(params[:id])

  #   if achivement.update(achivement_params)
  #     render json: achivement
  #   else
  #     render json: achivement.errors, status: 422
  #   end
  # end

  # def destroy
  #   if @user.achivements.find(params[:id]).destroy
  #     render json: { messege: "削除しました。"}
  #   end
  # end


  private
  # def achivement_params
  #   params.require(:achivement).permit(:title,:text,urls: [])
  # end

  def user_finder
    @user = User.find(params[:user_id])
  end

end

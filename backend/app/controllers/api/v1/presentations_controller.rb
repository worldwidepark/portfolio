class Api::V1::PresentationsController < ApplicationController
  before_action :user_finder

  def index
    # presentations = @user.presentations.order(id: :DESC)
    daily_reports = @user.presentations.where(target_type: "DailyReport").map do |e|
      {id: e.id, text: e.target.text, time: e.target.time, present: e.present, reportDateOn: e.target.report_date_on}
    end

    achivements = @user.presentations.where(target_type: "Achivement").map do |e|
      {id: e.id, title: e.target.title, text: e.target.text, urls: e.target.urls, present: e.present, startDateOn: e.target.start_date_on, endDateOn: e.target.end_date_on}
    end
    # achievements = @user.achivements.where(present: true)

    programming_language_tags = @user.programming_languages.map do |e|
      {id:e.id,name:e.name}
    end
    render json: {userInfo: make_user_info_to_json(@user),programmingLanguageTags:programming_language_tags ,dailyReports: daily_reports, achivements: achivements}



  end

  # def create
  #   achivement = @user.achivements.new(achivement_params)
  #   if achivement.save
  #     render json: achivement
  #   else
  #     render json: achivement.errors, status: 422
  #   end
  # end

  def update
    presentation = @user.presentations.find(params[:id])

    if presentation.update(presentation_params)
      render json: presentation
    else
      render json: presentation.errors, status: 422
    end
  end

  # def destroy
  #   if @user.achivements.find(params[:id]).destroy
  #     render json: { messege: "削除しました。"}
  #   end
  # end


  private
  def presentation_params
    params.require(:presentation).permit(:present)
  end

  def user_finder
    @user = User.find(params[:user_id])
  end

  def make_user_info_to_json(e)
    {id:e.id,name: e.name, introduce:e.introduce,occupation:e.occupation,url:e.url,image:e.image_url,combinedTime:e.combined_time}
  end
end

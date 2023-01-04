class Api::V1::DailyReportsController < ApplicationController
  before_action :user_finder

  def index
    daily_reports = @user.daily_reports.order(id: :DESC)
    render json: daily_reports
  end

  def create
    daily_reports = @user.daily_reports.new(daily_report_params)
    if daily_reports.save
      render json: daily_reports
    else
      render json: daily_reports.errors, status: 422
    end
  end

  def destroy
    if @user.daily_reports.find(params[:id]).destroy
      render json: { messege: "削除しました。"}
    end
  end


  private
  def daily_report_params
    params.require(:daily_report).permit(:text)
  end

  def user_finder
    @user = User.find(params[:user_id])
  end

end

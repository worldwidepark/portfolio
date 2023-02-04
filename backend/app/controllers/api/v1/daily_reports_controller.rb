class Api::V1::DailyReportsController < ApplicationController
  before_action :user_finder

  def index
    daily_reports = @user.daily_reports.order(id: :DESC)
    render json: daily_reports
  end

  def create
    daily_report = @user.daily_reports.new(daily_report_params)
    if daily_report.save
      render json: daily_report
    else
      render json: daily_report.errors, status: 422
    end
  end

  def update
    daily_report = @user.daily_reports.find(params[:id])

    if daily_report.update(daily_report_params)
      render json: daily_report
    else
      render json: daily_report.errors, status: 422
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

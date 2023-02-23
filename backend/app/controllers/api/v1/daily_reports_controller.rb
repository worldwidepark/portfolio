class Api::V1::DailyReportsController < ApplicationController
  before_action :user_finder

  def index
    daily_reports = @user.daily_reports.order(report_date_on: :DESC)
    render json: daily_reports
  end

  def create
    daily_report = @user.daily_reports.new(daily_report_params)

    if daily_report.save
      daily_report.presentations.create(user:@user)
      @user.combined_time += daily_report.time
      @user.save
      render json: [daily_report, {combined_time: @user.combined_time}]
    else
      render json: daily_report.errors, status: 422
    end
  end

  def update
    daily_report = @user.daily_reports.find(params[:id])
    previous_time = daily_report.time
    if daily_report.update(daily_report_params)
      @user.combined_time = @user.combined_time - previous_time + daily_report.time
      @user.save
      render json: [daily_report, {combined_time: @user.combined_time}]
    else
      render json: daily_report.errors, status: 422
    end
  end

  def destroy
    daily_report = @user.daily_reports.find(params[:id])
    previous_time = daily_report.time
    if daily_report.destroy
      @user.combined_time -= previous_time
      @user.save
      render json: { messege: "削除しました。"}
    end
  end


  private
  def daily_report_params
    params.require(:daily_report).permit(:text,:time,:report_date_on )
  end

  def user_finder
    @user = User.find(params[:user_id])
  end

end
